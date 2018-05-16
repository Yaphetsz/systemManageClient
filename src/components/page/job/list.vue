/**
* 岗位列表
* Created by fu_gh on 2018-01-09 17:07
*/

<template>
    <div class='job-list'>
        <div class='crumbs'>
            <el-breadcrumb separator-class='el-icon-arrow-right'>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>岗位列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-main class='panel-body'>
            <div class='search-group page-wrap'>
                <div class='name-search page-wrap wrap-vcenter'>
                    <p>姓名：</p>
                    <el-input class='input-group' v-model='searchName' placeholder='请输入姓名'></el-input>
                </div>
                <div class='btn-group'>
                    <el-button type='primary' @click='search'>查询</el-button>
                    <el-button type='primary' @click='addJob'>添加</el-button>
                </div>
            </div>
            <div class='table-group'>
                <el-table
                    :data='tableData'
                    border
                    style='width: 100%;margin-top:20px;'>
                    <el-table-column label='名称'>
                        <template slot-scope='scope'>
                            <router-link :to="{ name: 'jobDetail', params: { id: scope.row.id}}">
                                <p title='点击可查看详情'>{{scope.row.name}}</p>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop='create_by'
                        label='创建人'>
                    </el-table-column>
                    <el-table-column
                        prop='create_time'
                        label='创建时间'>
                    </el-table-column>
                    <el-table-column
                        prop='update_time'
                        label='最后修改时间'>
                    </el-table-column>
                    <el-table-column
                        fixed='right'
                        label='操作'
                        width='150'>
                        <template slot-scope='scope' >
                            <div class='' style="text-align:center;">
                                <el-button type='text' size='small' @click='edit(scope.row)'>编辑</el-button>
                                <el-button  type='text' size='small' @click='del(scope.row)'>删除</el-button>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog
                :title='jobFunction'
                :visible.sync='dialogFormAddVisible'
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                width='600px'>
                <span class="el-icon-close close" @click='closeDialog(ruleForm)'></span>
                <el-form :model='ruleForm' :rules='rules' ref='ruleForm' class='demo-ruleForm'>
                    <el-form-item label='名称:' prop='name' :label-width='formLabelWidth'>
                        <el-input  v-model='ruleForm.name' placeholder='请输入名称' ></el-input>
                    </el-form-item>
                    <el-form-item  class="is-required" label='功能权限:' prop='function' :label-width='formLabelWidth'>
                        <p class="p-text" @click="showTree" placeholder="请输入功能权限">
                            <span class="span-box" v-for="(el,index) in functionList" :key="index">
                                {{el.name}}
                                <i class="el-icon-error del" @click="delNode(index)"></i>
                            </span>
                        </p>
                     </el-form-item>
                     <el-tree
                        :data="treeData"
                        show-checkbox
                        node-key="id"
                        ref="refTree"
                        :accordion='true'
                        :props="defaultProps"
                        v-show="treeShow"
                        @check-change="nodeClick">
                     </el-tree>
                     <el-form-item class='page-wrap wrap-end btn-group' style="margin-bottom:0;">
                        <el-button type='primary' @click='submitForm()' v-if="!editBtnShow">确定</el-button>
                        <el-button type='primary' @click='editSubmitForm()' v-if="editBtnShow">确定</el-button>
                        <el-button @click='closeDialog(ruleForm)'>取消</el-button>
                     </el-form-item>
                </el-form>
            </el-dialog>
            <div class='page-group'>
                <v-page @sentToParantPageNo='getCurrentPage' :totalNum='totalNum'></v-page>
            </div>
        </el-main>
    </div>
</template>
<script type='text/javascript'>
    import JobApi from '../../../api/JobApi';
    import PowerApi from '../../../api/PowerApi';
    let jobApi = new JobApi();
    let powerApi = new PowerApi();
    function searchList(instance) {
        let param = {
            page_no: instance.pageNo,
            name: instance.searchName
        };
        jobApi.pageList(param)
            .then((res) => {
                if (res.code == 200) {
                    for (let i = 0; i < res.data.list.length; i++) {
                        res.data.list[i].create_time = new Date(res.data.list[i].create_time).Format("yyyy-MM-dd hh:mm:ss");
                        if (res.data.list[i].update_time) {
                            res.data.list[i].update_time = new Date(res.data.list[i].update_time).Format("yyyy-MM-dd hh:mm:ss");
                        } else {
                            res.data.list[i].update_time = '';
                        }
                    }
                    instance.tableData = res.data.list;
                    instance.totalNum = res.data.count;
                }
            });
    }
    export default {
        data() {
            var validatePower = (rule, value, callback) => {
                if (this.powers.length === 0) {
                    callback(new Error('请选择功能权限'));
                } else {
                    callback();
                }
            };
            return {
                editBtnShow: false,
                searchName: '',       //查询
                totalNum: 0,
                pageNo: 1,
                pageSize: 10,
                tableData: [],
                tableList: [],
                dialogFormAddVisible: false,
                jobFunction: '',
                ruleForm: {
                    name: '',
                    function: '',
                },
                rules: {
                    name: [
                        {required: true, max: 20, min: 2, message: '名称为2 到 20个字符', trigger: 'blur'},
                    ],
                    function: [
                        {validator: validatePower,trigger: 'blur'},
                    ],
                },
                formLabelWidth: '100px',
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                treeShow: false,
                functionList: [],
                powers: [],
                treeData: [],
                id: '',
            }
        },
        methods: {
            //查询
            search(){
                 searchList(this);
            },

            addJob(){
                this.dialogFormAddVisible=true;
                this.jobFunction='岗位添加';
                this.editBtnShow=false;
            },
            // 添加
            submitForm(){
                this.$refs['ruleForm'].validate((err)=>{
                    if(err){
                        let arr=[];
                        for(let i=0;i<this.powers.length;i++){
                            arr.push(this.powers[i].id);
                        }
                        let param = {
                            name: this.ruleForm.name,
                            powers: arr.join(),
                        }
                        console.log(param,"paramADD");
                        jobApi.jobAdd(param).then((res)=>{
                            console.log('jobAdd:',res);
                            if(res.code==200){
                                this.$message.success('添加成功');
                                this.dialogFormAddVisible=false;
                                this.ruleForm.name='';
                                this.$refs.refTree.setCheckedNodes([]);
                                searchList(this);
                            }else {
                                this.$message.error('添加失败:'+res.msg);
                            }
                        })
                    }
                });
            },
            // 编辑详情
            edit(row){
                this.dialogFormAddVisible=true;
                this.jobFunction='岗位编辑';
                this.editBtnShow=true;
                console.log('row',row);
                let param = {
                    id: row.id,
                }
                jobApi.editItem(param).then((res)=>{
                    if(res.code==200){
                        this.ruleForm.name=res.data.job.name;
                        this.id=res.data.job.id;
                        console.log(res,"treeData");
                        this.$refs.refTree.setCheckedNodes(res.data.job.powers);
                    }
                })
            },
            // 编辑 添加修改
            editSubmitForm() {
                this.$refs['ruleForm'].validate(err => {
                    if (err) {
                        let arr = [];
                        for (let i = 0; i < this.powers.length; i++) {
                            arr.push(this.powers[i].id);
                        }
                        let param = {
                            id: this.id,
                            name: this.ruleForm.name,
                            powers: arr.join(),
                        }
                        console.log(param);
                        jobApi.jobEdit(param).then((res) => {
                            if (res.code == 200) {
                                this.$message.success('编辑成功');
                                this.dialogFormAddVisible = false;
                                this.ruleForm.name = '';
                                this.$refs.refTree.setCheckedNodes([]);
                                searchList(this);
                            } else {
                                this.$message.error('编辑失败:' + res.msg);
                            }
                        })
                    }
                })
            },
            closeDialog(ruleForm){
                this.$refs['ruleForm'].resetFields();
                this.dialogFormAddVisible=false;
                this.treeShow=false;
                this.$refs.refTree.setCheckedKeys([]);
            },
            handleClose(done) {
                done();
                this.treeShow=false;
                this.$refs['ruleForm'].resetFields();
                this.ruleForm.name='';
                this.functionList=[];
                this.$refs.refTree.setCheckedKeys([]);
            },
            getCurrentPage(val) {
              //console.log(val,'val');
                this.pageNo = val;
                 searchList(this);
            },
            showTree(){
                this.treeShow=true;
            },
            delNode(index){
                console.log(index);
                console.log(this.functionList);
                this.functionList.splice(index,1);
                this.$refs.refTree.setCheckedNodes(this.functionList);
            },
            nodeClick(){
                this.powers=this.$refs.refTree.getCheckedNodes();
                this.functionList=this.$refs.refTree.getCheckedNodes();
            },
            getDetail(){
                let param= {
                    id: 1515651915990,
                }
                jobApi.jobDetail(param).then((res)=>{
                    console.log(res);
                    if(res.code==200){

                    }
                })
            },
            del(row){
                this.$confirm('此操作将永久删除该岗位, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    jobApi.del({id: row.id})
                        .then(res => {
                            if (res.code == 200) {
                                this.$message.success('删除成功');
                            } else {
                                this.$message.error('删除失败:' + res.msg);
                            }
                            searchList(this);
                        });
                });
            }
        },
        mounted() {
           searchList(this);
          powerApi.powerTreeList().then((res)=>{
              //console.log('tree:',res);
              if(res.code==200){
                  this.treeData=res.data.tree;
              }
          })
        },

    }
</script>
<style scoped>
.job-list .p-text{
    width: 100%;
    min-height: 40px;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    padding: 0 15px;
}
.job-list .p-text .span-box{
    padding: 3px 10px;
}
.job-list .p-text .span:first-child{
    margin-left: 0px;
}
.job-list .el-tree{
    overflow-y: auto;
    margin-left: 120px;
}

</style>
