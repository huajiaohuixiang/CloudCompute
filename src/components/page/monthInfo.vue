<template>
    <div>
      <el-select v-model="query.address" placeholder="年份选择" class="handle-select mr10" @change="setyear($event)">
                    <el-option key="3" label="2003" value="2003"></el-option>
                    <el-option key="4" label="2004" value="2004"></el-option>
                    <el-option key="5" label="2005" value="2005"></el-option>
                    <el-option key="6" label="2006" value="2006"></el-option>
                    <el-option key="7" label="2007" value="2007"></el-option>
                    <el-option key="8" label="2008" value="2008"></el-option>
                    <el-option key="9" label="2009" value="2009"></el-option>
                    <el-option key="10" label="20010" value="20010"></el-option>
                   
                </el-select>
        <el-row :gutter="30">
            <el-col :span="12">
                <el-card shadow="hover"  v-loading="loading">
                    <schart ref="bar" class="schart" canvasId="bar" :options="options"></schart>
                </el-card>
            </el-col>
          <el-col :span="12">
                <el-card shadow="hover"  v-loading="loading">
                    <schart ref="line" class="schart" canvasId="line" :options="options2"></schart>
                </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="30">
            
        </el-row>
    </div>
</template>

<script>
import Schart from 'vue-schart';
import bus from '../common/bus';
export default {
    name: 'dashboard',
    data() {
        return {
            name: localStorage.getItem('ms_username'),
            query:{
                address:''
            },
            address:'2009',
            loading:true,
           chartData:[],
            data: {
                chartData:[],
               
            
            },
            
            options: {
                type: 'bar',
                title: {
                    text: '月销售图'
                },
                xRorate: 25,
                labels: ['1', '2', '3', '4', '5','6', '7', '8','9','10','11','12'],
                datasets: [
                    {
                        label: '每月销售额',
                        data: [0, 0, 0, 0, 0,0, 0, 0,0,0,0,0]
                    },
                  
                ]
            },
            options2: {
                type: 'line',
                title: {
                    text: '月销售趋势图'
                },
                labels: ['1', '2', '3', '4', '5','6', '7', '8','9','10','11','12'],
                datasets: [
                    {
                        label: '月销售额',
                        data: [0, 0, 0, 0, 0,0, 0, 0,0,0,0,0]
                    },
                   
                ]
            }
        };
    },
    components: {
        Schart
    },
    computed: {
        role() {
            return this.name === 'admin' ? '超级管理员' : '普通用户';
        }
    },
    created() {
        this.getData();
        this.handleListener();
        this.changeDate();
    },
    activated() {
        this.handleListener();
    },
    deactivated() {
        window.removeEventListener('resize', this.renderChart);
        bus.$off('collapse', this.handleBus);
    },
    methods: {
        getData(){
        let that=this;
          this.$axios.get('http://192.168.1.104:7000/hive/list5')
            .then(function(response){
                console.log(response)
                that.chartData=response.data;
                let temp=[]
                that.chartData.forEach(element => {
                    if(element.theyear=='2004')
                    temp.push(element.sumofamount)
                });
                let length=temp.length;
                for(let i=length;i<12;i++){
                    temp.push(0);
                }
                that.options.datasets[0].data=temp
                that.options2.datasets[0].data=temp
                that.loading=false;
            }) 
        
            

        },
        setyear(){
            let temp=[]
            console.log(this.query.address)
            console.log(this.chartData);
                this.chartData.forEach(element => {

                    if(element.theyear==this.query.address)
                    temp.push(element.sumofamount)
                });
                let length=temp.length;
                for(let i=length;i<12;i++){
                    temp.push(0);
                }
                this.options.datasets[0].data=temp
                this.options2.datasets[0].data=temp
        },
        changeDate() {
            const now = new Date().getTime();
            
        },
        handleListener() {
            bus.$on('collapse', this.handleBus);
            // 调用renderChart方法对图表进行重新渲染
            window.addEventListener('resize', this.renderChart);
        },
        handleBus(msg) {
            setTimeout(() => {
                this.renderChart();
            }, 200);
        },
        renderChart() {
            this.$refs.bar.renderChart();
            this.$refs.line.renderChart();
        }
    }
};
</script>


<style scoped>
.el-row {
    margin-bottom: 20px;
}

.grid-content {
    display: flex;
    align-items: center;
    height: 100px;
}

.grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
}

.grid-num {
    font-size: 30px;
    font-weight: bold;
}

.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}

.grid-con-1 .grid-con-icon {
    background: rgb(45, 140, 240);
}

.grid-con-1 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-2 .grid-con-icon {
    background: rgb(100, 213, 114);
}

.grid-con-2 .grid-num {
    color: rgb(45, 140, 240);
}

.grid-con-3 .grid-con-icon {
    background: rgb(242, 94, 67);
}

.grid-con-3 .grid-num {
    color: rgb(242, 94, 67);
}

.user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
}

.user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
}

.user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
}

.user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
}

.user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
}

.user-info-list span {
    margin-left: 70px;
}

.mgb20 {
    margin-bottom: 20px;
}

.todo-item {
    font-size: 14px;
}

.todo-item-del {
    text-decoration: line-through;
    color: #999;
}

.schart {
    width: 100%;
    height: 300px;
}


.handle-box {
    margin-bottom: 20px;
}

.handle-select {
    width: 120px;
}

.handle-input {
    width: 300px;
    display: inline-block;
}
.table {
    width: 100%;
    font-size: 14px;
}
.red {
    color: #ff0000;
}
.mr10 {
    margin-right: 10px;
}
.table-td-thumb {
    display: block;
    margin: auto;
    width: 40px;
    height: 40px;
}


</style>
