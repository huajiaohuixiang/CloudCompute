<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 前N季度查询
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="请输入N">
                <el-input v-model="price"  width="80px"></el-input>
                
            </el-form-item>
        <el-form-item label=" ">
                
                <el-button @click="submit()" type="primary" style="margin-left: 16px;">
                    查询
            </el-button>
            </el-form-item>
        </el-form>
           
            
            
         
        
          
            <el-table
                :data="tableData"
                stripe
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                v-loading="loading"
                
               
            >
            <!-- @row-click="showInfo" -->
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="theyear" label="年"  align="center"></el-table-column>
                <el-table-column prop="thequot" label="季度"  align="center"></el-table-column>
               <el-table-column prop="sumofamount" label="订单金额"  align="center"></el-table-column>
               
 
                           
             
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
            loading:false,
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
         
          
        },

         submit(){
             this.loading=true;
        let that=this;
          this.$axios.get('http://192.168.1.104:7000/hive/list2?n='+this.price)
            .then(function(response){
                console.log(response)
                that.tableData=response.data;
                that.loading=false;
            }) 
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
