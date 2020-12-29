<template>
    <div>
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 包裹管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>
      
            <div>    
                <el-input v-model="this.price"> 请输入价格</el-input>
          
            <el-button @click="drawer = true" type="primary" style="margin-left: 16px;">
                    点我打开
            </el-button>
            <el-table
                :data="tableData"
                stripe
                border
                class="table"
                ref="multipleTable"
                header-cell-class-name="table-header"
                @selection-change="handleSelectionChange"
                
                @cell-dblclick="showInfo"
            >
            <!-- @row-click="showInfo" -->
                <el-table-column type="selection" width="55" align="center"></el-table-column>
                <el-table-column prop="packageID" label="包裹编号" width="100" align="center"></el-table-column>
                <el-table-column prop="senderName" label="发件人" width="80" align="center"></el-table-column>
                <el-table-column prop="senderPhone" label="发件人手机" width="120" align="center"> </el-table-column>
                <el-table-column prop="senderAddress" label="发件人地址"  align="center">
                    
                </el-table-column>
                <el-table-column prop="receiverName" label="收件人" width="80" align="center">
                 
                    <!-- <template slot-scope="scope">{{scope.row.toname}}</template> -->
                </el-table-column>
                <el-table-column prop="receiverPhone" label="收件人手机" width="100"></el-table-column> 
               
                <el-table-column prop="company" label="快递公司"  width="100" align="center">
                   <!-- :type="scope.row.state==='0'?'info':(scope.row.state==='1'?'warning':(scope.row.state=='2'?'success':''))" 
                           -->
                </el-table-column>
                <el-table-column prop="status" label="状态" align="center" width="80" >
                    <template slot-scope="scope">
                        <el-tag
                          :type="scope.row.status==='2'?'error':(scope.row.status==='1'?'warning':(scope.row.status=='0'?'success':''))"   
                                                    
                        >{{test(scope.row.status)}}</el-tag>
                    </template>
                </el-table-column>
 
                           
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            icon="el-icon-edit"
                            @click="handleEdit(scope.$index, scope.row)"
                        >编辑</el-button>
                        <!-- <el-button
                            type="text"
                            icon="el-icon-delete"
                            class="red"
                            @click="handleDelete(scope.$index, scope.row)"
                        >删除</el-button> -->
                    </template>
                </el-table-column>
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

        <!-- 编辑弹出框 -->
       
    </div>
</template>
<script>
import func from '../../../vue-temp/vue-editor-bridge';
import { fetchData } from '../../api/index';
export default {
    name: 'basetable',
    data() {
        return {
           
            amount:'',

            tableData: [],
          
           

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
          this.$axios/get('http://192.168.1.104:7000/hive/list?amount='+this.amount)
            .then(function(response){
                console.log(response)
            }) 
        },



        showInfo(row, column, event){
            let that=this
            this.packInfo=row
            console.log(this.packInfo)           
            if(column.label=='操作'){
                
            }else{
                console.log(column)
                this.drawer = true
                 this.$axios.get('https://www.csystd.cn:9999/worker/package/tracePackage/'+this.packInfo.packageID,{
               
                params:{
                    token:localStorage.getItem('token')
                }
                }).then(function(response){
                        console.log("aaa")
                        console.log(response.data)
                        that.packInfo=response.data
                        that.activities[0].content="由员工"+response.data.employee1+"于"+response.data.inWareDate+"日将快递放入"+response.data.warehouseID+"仓库"
                        that.activities[0].timestamp=response.data.inWareDate
                        that.activities[1].content="由员工"+response.data.employee2+"于"+response.data.inBoxDate+"日将快递放入"+response.data.boxID+"快递箱"
                        that.activities[1].timestamp=response.data.inBoxDate
                        if(response.data.receiveDate==null){
                            that.activities[2].timestamp=""
                            that.activities[2].content="未签收"
                        }else{
                            that.activities[2].content="您的快递于"+response.data.receiveDate+"日签收"
                            that.activities[2].timestamp=response.data.receiveDate
                        }
                        
                        
                    }) 
            }
//  boxID: "1"
// employee1: "000001"
// employee2: "000002"
// inBoxDate: "2020-12-24"
// inWareDate: "2020-12-24"
// receiveDate: null
// warehouseID: "000001" -


            //下面为抽屉里的东西赋值，调用接口
        },
        dbshowInfo(row, column, cell,event){
            this.packInfo=row
            console.log(this.packInfo)           
            console.log(cell)
                
                console.log(column)
                this.drawer = true
           



            //下面为抽屉里的东西赋值，调用接口
        },
        // 触发搜索按钮
        handleSearch() {
            let that=this;
            this.$axios.get('https://www.csystd.cn:9999/worker/package/singleQuery/'+this.query.name,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            })
            .then(function(response){
                that.tableData=[];
                that.tableData.push(response.data);
                that.packagenum=1
                console.log(response)
                console.log(response.data)
            })   
            
            this.$set(this.query, 'pageIndex', 1);
            //this.getData();
        },

        test(packstatus){
            if(packstatus=="2"){
                return "问题包裹"
            }else if(packstatus=="1"){
                return "未签收"
            }else if(packstatus=="0"){
                return "已签收"
            }
        },
        //筛选
        getDataBySelect(){
            let that=this;
            if(this.query.address=='全部'){
                this.getData();
            }else{
                this.$axios.get('https://www.csystd.cn:9999/worker/package/queryPackagesByStatus/'+this.query.address+'/1000000000/1',{
                params:{
                    token:localStorage.getItem('token')
                }
            })
            .then(function(response){
                 that.tableData=response.data.records;
                  that.packagenum=response.data.total
                console.log(response)
             //   console.log(response.data)
            })   
            }
            


            // console.log("还活着");
            // if(this.query.address=="全部"){
            //     this.tableData=this.sumData;
            //     this.$set(this.query, 'pageIndex', 1)
            // }else{
            //     let tempData=this.sumData;
            //     console.log(tempData);
            //     let result=[];           
            //     tempData.forEach(element => {
            //         if(element.state==this.query.address){ result.push(element);}  
            //     });
            //     this.tableData=result;
            // }
            // this.pageTotal=this.tableData.length
            // console.log("没了")
        },
        // 删除操作
        handleDelete(index, row) {
            // 二次确认删除
            this.$confirm('确定要删除吗？', '提示', {
                type: 'warning'
            })
                .then(() => {
                    let that=this;
                    let del=this.tableData.splice(index, index+1);
                    del=del[0];
                    this.delpack.packageID=del.packageID;
                    
                    this.$axios.post('https://www.csystd.cn:9999/worker/package/del',this.delpack)
                        .then(function(response){
                            
                            console.log(response)
                            console.log(response.data)

                            that.$message.success(`删除第 ${that.idx + 1} 行成功`);
                            that.$set(that.tableData, that.idx, that.form);
                        })  
                        .catch(function(error){
                            that.$message.warning(`删除第 ${that.idx + 1} 行失败`);
                        }) 
                    

                    this.$message.success('删除成功');
                    
                })
                .catch(() => {});
        },
        // 多选操作
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        delAllSelection() {
            const length = this.multipleSelection.length;
            let str = '';
            this.delList = this.delList.concat(this.multipleSelection);
            for (let i = 0; i < length; i++) {
                str += this.multipleSelection[i].name + ' ';
            }
            this.$message.error(`删除了${str}`);
            this.multipleSelection = [];
        },


        // 编辑操作
        handleEdit(index, row) {
            this.idx = index;
            this.form = row;
            this.editVisible = true;
        },
        // 保存编辑
        saveEdit() {
            this.editVisible = false;
            let that=this;
            this.$axios.post('https://www.csystd.cn:9999/worker/package/updatePackageInfo',this.form,{
               
                params:{
                    token:localStorage.getItem('token')
                }
            })
                .then(function(response){
                    
                    console.log(response)
                    console.log(response.data)

                     that.$message.success(`修改第 ${that.idx + 1} 行成功`);
                    that.$set(that.tableData, that.idx, that.form);
                })  
                .catch(function(error){
                    that.$message.warning(`修改第 ${that.idx + 1} 行失败`);
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
