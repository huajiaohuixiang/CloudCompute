<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 年度最畅销的商品
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container" v-loading="loading">
     
          
            <el-table
                :data="tableData"
                stripe
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                
                
               
            >
            <!-- @row-click="showInfo" -->
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="theyear" label="年"  align="center"></el-table-column>
                <el-table-column prop="itemid" label="货物编号"  align="center"></el-table-column>
               <el-table-column prop="maxofamount" label="订单次数"  align="center"></el-table-column>
               
 
                           
             
            </el-table>
        

        </div>

       

          
            
    </div>
</template>
<script>
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
            query: {
                address: '',
                name: '',
                pageIndex: 1,
                pageSize: 10
            },
            loading: true,
            drawer:false,
            tableData: [],
            sumData:[],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            packagenum:0,
            form: {},
            delpack:{},
            idx: -1,
            id: -1,
           price:''
         
        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
         let that=this;
          this.$axios.get('http://192.168.1.104:7000/hive/list4')
            .then(function(response){
                console.log(response)
                that.tableData=response.data;
            }) 
          that.loading=false;
        },

         submit(){

        
        },

      
      
       
      

       
      
        // 分页导航
        handlePageChange(val) {

            var that=this;
            // this.$axios.get('https://www.csystd.cn:9999/worker/package/countPackage')
            //     .then(function(response){
            //         console.log(response.data)
            //         that.packagenum=response.data

            //     })
            this.$axios.get('https://www.csystd.cn:9999/worker/package/allQuery/'+that.query.pageSize+'/'+val,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            })
                .then(function(response){
                    console.log(val)
                    that.tableData=response.data.records
                    console.log(that.tableData)
                    
                })   .catch(function(error) {
                    console.log("b");                
                })
            this.$set(this.query, 'pageIndex', val);
           // this.getData();
        }
    }
};
</script>

<style scoped>
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
