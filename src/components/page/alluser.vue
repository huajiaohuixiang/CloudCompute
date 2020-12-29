<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 时间信息
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <div class="handle-box">
             
<!--                
                <el-input v-model="query.name" placeholder="订单编号" class="handle-input mr10"></el-input>
                <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button> -->
            </div>
        
          
            <el-table
                :data="tableData"
                stripe
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
                
               
            >
            <!-- @row-click="showInfo" -->
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="dateid" label="日期编号" width="100" align="center"></el-table-column>
                <el-table-column prop="theyear" label="年" width="80" align="center"></el-table-column>
                <el-table-column prop="themonth" label="月" width="120" align="center"> </el-table-column>
                <el-table-column prop="thedate" label="日"  align="center">
                    
                </el-table-column>
                <el-table-column prop="theweek" label="周" width="80" align="center">
                 
                    <!-- <template slot-scope="scope">{{scope.row.toname}}</template> -->
                </el-table-column>
                <el-table-column prop="thequot" label="季度" width="100"></el-table-column> 
               
              
               
            </el-table>
            <div class="pagination">
                <el-pagination
                    background
                    layout="total, prev, pager, next"
                    :current-page="query.pageIndex"
                    :page-size="query.pageSize"
                    :total="packagenum"
                    @current-change="handlePageChange"
                ></el-pagination>
            </div>

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
            drawer:false,
            tableData: [],
            sumData:[],
            multipleSelection: [],
            delList: [],
            editVisible: false,
            pageTotal: 0,
            packagenum:4383,
            form: {},
            delpack:{},
            idx: -1,
            id: -1,
            packInfo:{

            },
            

        };
    },
    created() {
        this.getData();
    },
    methods: {
        // 获取 easy-mock 的模拟数据
        getData() {
          let that=this;
            this.$axios.get('http://192.168.1.104:7000/hive/list8?pageIndex=1&pageSize=10')
            .then(function(response){
                that.tableData=response.data;
                
                console.log(response)
                console.log(response.data)
            })   
          
        },
      


          

           
      
        // 触发搜索按钮
        handleSearch() {
            let that=this;
            this.$axios.get('http://192.168.1.104:7000/hive/list8?pageIndex=1&pageSize=10')
            .then(function(response){
                that.tableData=response.data;
                
                console.log(response)
                console.log(response.data)
            })   
            
            this.$set(this.query, 'pageIndex', 1);
            //this.getData();
        },

      
      
     
      
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
      
        // 分页导航
        handlePageChange(val) {

            var that=this;
            // this.$axios.get('https://www.csystd.cn:9999/worker/package/countPackage')
            //     .then(function(response){
            //         console.log(response.data)
            //         that.packagenum=response.data

            //     })
            this.$axios.get('http://192.168.1.104:7000/hive/list8?pageIndex='+val+'&pageSize=10')
            .then(function(response){
                that.tableData=response.data;
                
                console.log(response)
                console.log(response.data)
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
