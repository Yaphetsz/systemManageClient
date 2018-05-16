/**
* 子系统管理
* Created by fu_gh on 2018-01-26 11:00
*/

<template>
    <div class="employee-list">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>业务子系统</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-main class="panel-body">
            <div class="search-group page-wrap">
                <div class="name-search page-wrap wrap-vcenter">
                    <p>名称：</p>
                    <el-input class="input-group" v-model="searchName"  placeholder="请输入名称"></el-input>
                </div>
                <div class="btn-group">
                    <el-button type="primary" @click="search">查询</el-button>
                    <el-button type="primary" @click="add">添加</el-button>
                </div>
            </div>
            <div class="table-group">
                <el-table :data="tableData" :default-sort = "{prop: 'create_time', order: 'descending'}" border>
                    <el-table-column prop="name" label="名称"></el-table-column>
                    <el-table-column prop="host" label="host"></el-table-column>
                    <el-table-column prop="code" label="编码"></el-table-column>
                    <el-table-column prop="sort" sortable label="排序"></el-table-column>
                    <el-table-column prop="create_time" sortable label="创建时间"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text"  size="small" @click="editItem(scope.row)">编辑</el-button>
                            <el-button type="text" size="small" @click="del(scope.row)">删除</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-group">
                <v-page @sentToParantPageNo="pageSearch" :totalNum="totalNum"></v-page>
            </div>
            <el-dialog :title="dialogTitle" :visible.sync="dialogVisible"
                       :close-on-click-modal="false" :close-on-press-escape="false" width="600px">
                <span class="el-icon-close close" @click="closeDialog"></span>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label="名称:" prop="name" :label-width="formLabelWidth">
                        <el-input v-model="ruleForm.name" placeholder="名称"></el-input>
                    </el-form-item>
                    <el-form-item label="host:" prop="host" :label-width="formLabelWidth">
                        <el-input v-model="ruleForm.host" placeholder="host"></el-input>
                    </el-form-item>
                    <el-form-item label="编码:" prop="code" :label-width="formLabelWidth">
                        <el-input v-model="ruleForm.code" placeholder="编码"></el-input>
                    </el-form-item>
                    <el-form-item label="排序:" prop="sort" :label-width="formLabelWidth">
                        <el-input v-model="ruleForm.sort" type="number" placeholder="排序"></el-input>
                    </el-form-item>
                    <el-form-item class="page-wrap wrap-end btn-group" style="margin-bottom:0;">
                        <el-button type="primary" @click="save">确定</el-button>
                        <el-button @click="closeDialog">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-main>
    </div>
</template>

<script>
    import SubSystemApi  from '../../../api/SubSystemApi';
    let subSystemApi = new SubSystemApi();
    function searchList(instance) {
        subSystemApi.getPageList({name:instance.searchName,page_no:instance.pageNo})
            .then(res=>{
                if(res.code == 200){
                    instance.totalNum = res.data.count;
                    res.data.list.forEach(item=>{
                        item.create_time=new Date(item.create_time).Format("yyyy-MM-dd hh:mm:ss");
                    });
                    instance.tableData = res.data.list;
                }
            });
    }
    function formInit(instance) {
        instance.dialogVisible = false;
        instance.ruleForm.name = '';
        instance.ruleForm.host = '';
        instance.ruleForm.code = '';
        instance.ruleForm.sort = '';
    }
    function formSave(instance) {
        if(instance.saveType =='add'){
            subSystemApi.add(instance.ruleForm)
                .then((res)=>{
                    if(res.code == 200){
                        formInit(instance);
                        searchList(instance);
                        instance.$message.success('添加成功');
                    } else {
                        instance.$message.error('添加失败:' + res.msg);
                    }
                });
        } else {
            subSystemApi.edit(Object.assign(instance.ruleForm,{id:instance.id}))
                .then((res)=>{
                    if(res.code == 200){
                        formInit(instance);
                        searchList(instance);
                        instance.$message.success('编辑成功');
                    } else {
                        instance.$message.error('编辑失败:' + res.msg);
                    }
                });
        }
    }
    export default {
        data(){
            return {
                searchName:'',
                tableData:[],
                totalNum:0,
                pageNo:1,
                pageSize:10,
                dialogTitle:'',
                dialogVisible:false,
                ruleForm:{
                    name:'',
                    host:'',
                    code:'',
                    sort:'',
                },
                rules:{
                    name:[
                        {required:true,message:'名称不能为空',trigger:'blur'},
                        {min:2,max:10,message:'长度在2到10个字符',trigger:'blur'},
                    ],
                    host:[
                        {required:true,message:'host不能为空',trigger:'blur'},
                        {min:2,max:40,message:'长度在2到40个字符',trigger:'blur'},
                    ],
                    code:[
                        {required:true,message:'编码不能为空',trigger:'blur'},
                        {min:2,max:20,message:'长度在2到20个字符',trigger:'blur'},
                    ],
                    sort:[
                        {required:true,min:1,max:5,message:'排序为 1 到 99999',trigger:'blur'},
                    ]
                },
                formLabelWidth: '90px',
                saveType:'',
                id:'',
            }
        },
        methods:{

            search(){
                searchList(this);
            },

            add(){
                this.saveType='add';
                this.dialogTitle ='业务子系统添加';
                formInit(this);
                this.dialogVisible = true;
            },

            editItem(item){
                this.id= item.id;
                this.saveType= 'edit';
                this.dialogTitle = '业务子系统编辑';
                this.dialogVisible = true;
                this.ruleForm.name = item.name;
                this.ruleForm.host = item.host;
                this.ruleForm.code = item.code;
                this.ruleForm.sort = item.sort;
            },

            del(item) {
                this.$confirm('此操作将永久业务子系统, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    subSystemApi.del({id: item.id})
                        .then((res) => {
                            if (res.code == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                });
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: '删除失败：' + res.msg,
                                });
                            }
                            searchList(this);
                        });
                });
            },

            closeDialog(){
                formInit(this);
                this.$refs['ruleForm'].resetFields();
            },

            save(){
                this.$refs['ruleForm'].validate(err=>{
                    if(err){
                        formSave(this);
                    }
                });
            },

            pageSearch(pageNo){
                this.pageNo = pageNo;
                searchList(this);
            }
        },
        mounted(){
            searchList(this);
        }
    }
</script>
