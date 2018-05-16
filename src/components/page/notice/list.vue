/**
* 公告管理
* Created by fu_gh on 2018-03-09 15:24
*/


<template>
    <div class="notice-list">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>消息管理</el-breadcrumb-item>
                <el-breadcrumb-item>消息列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-main class="panel-body">
            <div class="search-group page-wrap">
                <div class="name-search page-wrap wrap-vcenter">
                    <p>创建日期：</p>
                    <el-date-picker
                        v-model="searchTime"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="mobile-search page-wrap wrap-vcenter">
                    <p>标题：</p>
                    <el-input class="input-group" v-model="searchTitle"  placeholder="请输入标题"></el-input>
                </div>
                <div class="btn-group">
                    <el-button type="primary" @click="searchList">查询</el-button>
                    <el-button type="primary" @click="add">添加</el-button>
                </div>
            </div>
            <div class="table-group">
                <el-table :data="tableData" border>
                    <el-table-column prop="title" width="400px" label="标题"></el-table-column>
                    <el-table-column prop="statusDesc"  label="状态"></el-table-column>
                    <el-table-column prop="create_name" label="创建人"></el-table-column>
                    <el-table-column prop="create_time"  label="创建时间"></el-table-column>
                    <el-table-column prop="read_number" label="已读"></el-table-column>
                    <el-table-column prop="unreader_number" label="未读"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text"v-if="scope.row.status == 1" size="small" @click="editItem(scope.row)">编辑</el-button>
                            <el-button type="text" v-if="scope.row.hasWithdraw" size="small" @click="withdraw(scope.row)">撤回</el-button>
                            <el-button type="text" size="small" @click="preview(scope.row)">预览</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-group">
                <v-page @sentToParantPageNo="pageSearch" :totalNum="totalNum"></v-page>
            </div>
            <el-dialog :title="dialogTitle" :visible.sync="dialogVisible"
                       :close-on-click-modal="false" :close-on-press-escape="false" width="1000px">
                <span class="el-icon-close close" @click="closeDialog"></span>
                <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
                    <el-form-item label="标题:" prop="title" :label-width="formLabelWidth">
                        <el-input v-model="ruleForm.title" placeholder="请输入标题"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <div  style="height:300px;" >
                        <quill-editor v-model="ruleForm.content"
                                      ref="myQuillEditor"
                                      class="editer"
                                      :options="editorOption">
                        </quill-editor>
                        </div>
                    </el-form-item>
                    <el-form-item class="page-wrap wrap-end btn-group" style="margin-bottom:0;">
                        <el-button type="primary" @click="draft">草稿</el-button>
                        <el-button type="primary" @click="publish">发布</el-button>
                        <el-button @click="closeDialog">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-main>
    </div>
</template>

<script>
    import NoticeApi  from '../../../api/NoticeApi';
    import { quillEditor } from 'vue-quill-editor';
    import 'quill/dist/quill.core.css';
    import 'quill/dist/quill.snow.css';
    import 'quill/dist/quill.bubble.css';
    let noticeApi = new NoticeApi();
    export default {
        components: {quillEditor},
        data(){
            return {
                searchTitle:'',
                searchTime:[],
                tableData:[],
                totalNum:0,
                pageNo:1,
                pageSize:10,
                dialogTitle:'',
                dialogVisible:false,
                ruleForm:{
                    title:'',
                    content:''
                },
                rules: {
                    title: [
                        {required: true, message: '标题不能为空', trigger: 'blur'},
                        {min: 2, max: 100, message: '长度在2到100个字符', trigger: 'blur'},
                    ]
                },
                formLabelWidth: '55px',
                editorOption: {
                    toolbar:[],
                    placeholder:'请输入内容'
                },
                dialogType:'',
                saveStatus:null,
                editId:null,
            }
        },
        computed: {
            editor() {
                return this.$refs.myQuillEditor.quill
            }
        },
        methods:{
            //查询
            searchList(){
                let param = {
                    page_no:this.pageNo,
                    title:this.searchTitle,
                };
                if(this.searchTime.length){
                    param.start = this.searchTime[0].Format("yyyy-MM-dd");
                    param.end = this.searchTime[1].Format("yyyy-MM-dd");
                }
                noticeApi.getPageList(param)
                    .then((res)=>{
                       if(res.code == 200){
                           this.totalNum = res.data.count;
                           res.data.list.forEach(item=>{
                               item.create_time=new Date(item.create_time).Format("yyyy-MM-dd hh:mm:ss");
                               item.statusDesc = '已发布';
                               if(item.status == 1){
                                   item.statusDesc = '草稿';
                               } else if(item.status == 3){
                                   item.statusDesc = '已撤回';
                               }
                               item.unreader_number = null;
                               if(item.total_number){
                                   item.unreader_number = item.total_number - item.read_number;
                               }
                           });
                           console.log('data list:',res.data.list);
                           this.tableData = res.data.list;
                       }
                    });
            },
            //添加
            add(){
                this.dialogTitle ='消息添加';
                this.dialogVisible = true;
                this.dialogType = 'add';
            },
            //编辑
            editItem(item){
                this.dialogTitle ='消息编辑';
                this.dialogVisible = true;
                this.dialogType = 'edit';
                this.ruleForm.title = item.title;
                this.ruleForm.content = item.content;
                this.editId = item.id;
            },
            //撤回
            withdraw(item) {
                this.$confirm('此操作将永久撤回已发布的消息, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    noticeApi.withdraw({id: item.id})
                        .then(res => {
                            if (res.code == 200) {
                                this.$message({
                                    type: 'success',
                                    message: '撤回成功!'
                                });
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: '撤回失败：' + res.msg,
                                });
                            }
                            this.searchList();
                        });
                });
            },
            //关闭
            closeDialog(){
                this.formClear();
            },
            //表单清除
            formClear(){
                this.$refs['ruleForm'].resetFields();
                this.dialogVisible = false;
                this.dialogType ='';
                this.saveStatus = null;
                this.editId = null;
                this.ruleForm.title = '';
                this.ruleForm.content = '';
            },
            //保存草稿
            draft(){
                console.log('form:',this.ruleForm);
                this.$refs['ruleForm'].validate(err=>{
                    if(err){
                        this.saveStatus = 1;
                        this.save();
                    }
                });
            },
            //发布
            publish(){
                this.$refs['ruleForm'].validate(err=>{
                    if(err){
                        this.saveStatus = 2;
                        this.save();
                    }
                });
            },
            //保存
            save(){
                let formParam = {
                    title:this.ruleForm.title,
                    content:this.ruleForm.content,
                    status:this.saveStatus,
                };
                let saveMsg = this.saveStatus == 1 ? '保存草稿':'发布';
                if(this.dialogType =='add'){
                    noticeApi.add(formParam)
                        .then((res)=>{
                            if (res.code == 200) {
                                this.$message({
                                    type: 'success',
                                    message: saveMsg +'成功!'
                                });
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: saveMsg+'失败：' + res.msg,
                                });
                            }
                            this.formClear();
                            this.searchList();
                        });
                } else {
                    Object.assign(formParam,{id:this.editId});
                    noticeApi.edit(formParam)
                        .then((res)=>{
                            if (res.code == 200) {
                                this.$message({
                                    type: 'success',
                                    message: saveMsg +'成功!'
                                });
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: saveMsg+'失败：' + res.msg,
                                });
                            }
                            this.formClear();
                            this.searchList();
                        });
                }
            },
            //分页
            pageSearch(pageNo){
                this.pageNo = pageNo;
                this.searchList();
            },
            //预览
            preview(item){
               let url = 'http://'+ window.location.host+'/#/mynotice/detail/'+item.id+'/prview';
               window.open(url);
            }
        },
        mounted(){
            this.searchList();
        }
    }
</script>

<style lang="less">
    .edit_container{
        padding: 40px;
        margin-bottom: 40px;
    }
    .editer{
        height: 240px;
    }
   .ql-picker-label::before, .ql-picker-item::before,.ql-picker-label svg,.ql-picker-label svg{
        position: absolute;
    }
    .ql-toolbar.ql-snow .ql-picker.ql-expanded .ql-picker-options{
        width:100%;
        padding-bottom: 30px;
    }
    .ql-toolbar.ql-snow .ql-formats:nth-child(9) .ql-picker-options{
        width:150px;
        padding-bottom: 10px;
    }
    .ql-snow .ql-picker-options .ql-picker-item{
        margin-bottom: 20px;
    }
    /* 文本样式*/
    .notice-list .el-form-item__content{
        line-height: 0;
    }
    .notice-list .el-form-item__label{
        text-align: left;
    }
    .notice-list .el-form-item__label{
        width:55px!important;
    }
</style>
