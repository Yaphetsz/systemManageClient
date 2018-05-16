/**
*  组织架构
* Created by fu_gh on 2018-01-09 17:08
*/

<template>
    <div class="detail-list department">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>组织架构</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-main class='panel-body page-wrap'>
            <div class="tree-group">
                <el-tree
                    :data="treeData"
                    node-key="id"
                    ref="refTree"
                    :accordion='true'
                    :highlight-current='true'
                    :props="defaultProps"
                    @node-click="handleNodeClick"
                    :default-expand-all='true'>
                </el-tree>
            </div>
            <div class="table-content" style="width:100%;" >
                <div class="btn-group">
                    <el-button type='primary' @click='add'>添加</el-button>
                    <el-button type='primary' @click='edit' :disabled="disabled" >编辑</el-button>
                    <el-button type='primary' @click='del' :disabled="disabled">删除</el-button>
                </div>
                <div class="crumbs department-crumbs" v-show="tableShow">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item v-for="(el,index) in crumbs" :key='index'>{{el.name}}</el-breadcrumb-item>
                        <el-breadcrumb-item>{{crumbsSon}}</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <div class="form-group" v-show="tableShow">
                    <div class="">
                        <el-form ref="form" :model="form" >
                                <el-form-item style="margin-bottom: 0px;" label="创建人：">
                                    <p>{{form.createBy}}</p>
                                </el-form-item>
                                <el-form-item style="margin-bottom: 0px;" label="创建时间：">
                                    <p>{{form.createTime}}</p>
                                </el-form-item>
                            <div class="">
                                <el-form-item label="机构列表"  class="function-power" style="width: 100%;margin-bottom: 0px;">
                                    <br/>
                                    <div class="form-box">
                                        <div v-for="(el,index) in companyList" :key="index">
                                            <el-tag type="info" class="tags">
                                                {{el.name}}
                                            </el-tag>
                                        </div>
                                    </div>
                                </el-form-item>
                            </div>
                            <div class="">
                                <el-form-item label="成员列表"  class="function-power" style="width: 100%;margin-bottom: 0px;">
                                    <br/>
                                    <div class="form-box">
                                        <div v-for="(el,index) in memberList" :key="index">
                                            <el-tag type="info" class="tags">
                                                {{el.name}}
                                            </el-tag>
                                        </div>
                                    </div>
                                </el-form-item>
                            </div>
                        </el-form>
                    </div>
                </div>
            </div>
            <el-dialog
                :title='depTitle'
                :visible.sync='dialogFormAddVisible'
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                width='600px'>
                <span class="el-icon-close close" @click='closeDialog(ruleForm)'></span>
                <el-form :model='ruleForm' :rules='rules' ref='ruleForm' class='demo-ruleForm'>
                    <el-form-item label='名称:' prop='name' :label-width='formLabelWidth'>
                        <el-input v-model='ruleForm.name' placeholder='请输入名称' ></el-input>
                    </el-form-item>
                    <el-form-item label='父部门:' prop='parentDep' :label-width='formLabelWidth'>
                        <el-select v-model="ruleForm.parentDep" placeholder="请选择">
                            <el-option
                                v-for="item in parentDepOptions"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='机构:' prop='company' :label-width='formLabelWidth'>
                        <el-select v-model="ruleForm.company" filterable multiple placeholder="请选择">
                            <el-option
                              v-for="item in companyOptions"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class='page-wrap wrap-end btn-group dep-btn' style="margin-bottom:0;width: 100%;">
                        <el-button type='primary' @click='submitForm()' v-if="!editBtnShow">确定</el-button>
                        <el-button type='primary' @click='editSubmitForm()' v-if="editBtnShow">确定</el-button>
                        <el-button @click='closeDialog(ruleForm)' style="margin-right:30px;">取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
        </el-main>
    </div>
</template>
<script type='text/javascript'>
    import DepartmentApi from '../../../api/DepartmentApi';
    import EmployeeApi from '../../../api/EmployeeApi';
    let departmentApi = new DepartmentApi();
    let employeeApi = new EmployeeApi();
    export default {
        name: "",
        data: () => ({
            one: '',
            two: '',
            three: '',
            // tree组件
            treeData: [{

            }],
            options: [{}],      //  级联
            defaultProps: {
                //value: 'id',      级联
                children: 'children',
                label: 'name'
            },
            form:{
                createBy: '',
                createTime: '',
            },
            editBtnShow: '',
            dialogFormAddVisible: false,
            depTitle: '',
            formLabelWidth: '70px',
            ruleForm: {
                name: '',
                parentDep: '',
                company: '',
            },
            rules: {
                name: [
                    { required: true, message: '名称不能为空', trigger: 'blur' },
                    {min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur'},
                ],
                parentDep: [
                    { required: true, message: '父部门不能为空', trigger: 'blur' },
                ],
                company: [
                    { required: true, message: '机构不能为空', trigger: 'blur' },
                ],
            },
            companyOptions: [],
            parentDepOptions: [],
            id: '',
            checkedId: '',
            selectedOptions: [],
            companyList: [],
            memberList: [],
            disabled: false,
            crumbs:[],
            crumbsSon:'',
            tableShow: false,
        }),
        methods: {
            handleNodeClick(data) {
                console.log("data:",data);
                this.tableShow=true;
                let param = {
                    id: data.id,
                }
                this.disabled=false;
                console.log(param,"param");
                departmentApi.departmentDetail(param).then((res)=>{
                    console.log(res,"详情");
                    if(res.code==200){
                        this.crumbs=res.data.department.parents;
                        this.crumbsSon=res.data.department.name;
                        this.form.createBy=res.data.department.create_name;
                        this.form.createTime=new Date(res.data.department.create_time).Format("yyyy-MM-dd hh:mm:ss");
                        this.companyList=res.data.department.companys;
                        this.memberList=res.data.department.employees;
                        sessionStorage.setItem('depId',res.data.department.id);
                    }
                })
            },
            //  添加
            add(){
                // 父部门
                departmentApi.departmentList().then((res)=>{
                    if(res.code==200){
                        this.parentDepOptions = res.data.list;
                    }
                })
                this.dialogFormAddVisible=true;
                this.depTitle='部门添加';
                this.editBtnShow=false;
            },
            // 编辑详情
            edit(){
                // 父部门
                departmentApi.departmentList().then((res)=>{
                    if(res.code==200){
                        this.parentDepOptions = res.data.list;
                    }
                })
                this.dialogFormAddVisible=true;
                this.depTitle='部门编辑';
                this.editBtnShow=true;
                let param = {
                    id: sessionStorage.getItem('depId'),
                }
                departmentApi.departmentEdititem(param).then((res)=>{
                    if(res.code==200){
                        this.ruleForm.name=res.data.department.name;
                        this.ruleForm.parentDep=res.data.department.parent_id;
                        console.log(res);
                        if(res.data.department.companys){
                            for(let i=0;i<res.data.department.companys.length;i++){
                                console.log(res.data.department.companys[i].id);
                                this.ruleForm.company.push(res.data.department.companys[i].id);
                            }
                        }
                    }
                })
            },
            del(){
                let param={
                    id: sessionStorage.getItem('depId'),
                }
                console.log(param,'dsddss');
                this.$confirm('此操作将永久删除该机构, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(()=>{
                    departmentApi.departmentDel(param).then((res)=>{
                        if(res.code==200){
                            this.$message.success('删除成功');
                            departmentApi.departmentTreelist().then((res)=>{
                                console.log("tree列表:",res);
                                if(res.code==200){
                                    this.treeData=res.data.list;
                                    window.location.reload();
                                }
                            })
                            // 所有机构列表
                            departmentApi.allCompanys().then((res)=>{
                                console.log("机构列表：",res);
                                if(res.code==200){
                                    this.companyOptions=res.data.list;
                                }
                            })
                        }else{
                            this.$message.error('删除失败:' + res.msg);
                        }
                    })
                })

            },
            submitForm(){
                this.$refs['ruleForm'].validate(err => {
                    if (err) {
                        let param = {
                            name: this.ruleForm.name,
                            parent_id: this.ruleForm.parentDep,
                            companys: this.ruleForm.company.join(),
                        }
                        console.log(param,"param");
                        departmentApi.departmentAdd(param).then((res)=>{
                            console.log(res);
                            if(res.code==200){
                                departmentApi.departmentTreelist().then((res)=>{
                                    //this.options=res.data.list;  //级联
                                    if(res.code==200){
                                        this.treeData=res.data.list;  //tree
                                        window.location.reload();
                                    }
                                })
                                this.ruleForm.name='';
                                this.ruleForm.parentDep='';
                                this.ruleForm.company='';
                                this.dialogFormAddVisible=false;
                            }else if(res.code==500){
                                this.$message.error('添加失败:' + res.msg);
                            }
                        })
                    }
                });
            },
            editSubmitForm(){
                this.$refs['ruleForm'].validate(err => {
                    if (err) {
                        let param = {
                            id: sessionStorage.getItem('depId'),
                            name: this.ruleForm.name,
                            parent_id: this.ruleForm.parentDep,
                            companys: this.ruleForm.company.join(),
                        }
                        console.log('params:',param);
                        departmentApi.departmentEdit(param).then((res)=>{
                            console.log(res);
                            if(res.code==200){
                                // 左侧tree列表
                                departmentApi.departmentTreelist().then((res)=>{
                                    console.log("tree列表:",res);
                                    if(res.code==200){
                                        this.treeData=res.data.list;
                                        window.location.reload();
                                    }
                                })
                                // 所有机构列表
                                departmentApi.allCompanys().then((res)=>{
                                    console.log("机构列表：",res);
                                    if(res.code==200){
                                        this.companyOptions=res.data.list;
                                    }
                                })
                                let param = {
                                    id: sessionStorage.getItem('depId'),
                                }
                                departmentApi.departmentDetail(param).then((res)=>{
                                    console.log(res,"详情");
                                    if(res.code==200){
                                        this.form.createBy=res.data.department.create_name;
                                        this.form.createTime=new Date(res.data.department.create_time).Format("yyyy-MM-dd hh:mm:ss");
                                        this.companyList=res.data.department.companys;
                                        this.memberList=res.data.department.employees;
                                        sessionStorage.setItem('depId',res.data.department.id);
                                    }
                                })
                                this.dialogFormAddVisible=false;
                            }else if(res.code==500){
                                this.$message.error('信息不完整');
                            }
                        })
                    }
                });
            },
            closeDialog(ruleForm){
                this.dialogFormAddVisible=false;
                this.$refs['ruleForm'].resetFields();
            },
        },
        mounted() {
          if(this.form.createBy==''){
              this.disabled=true;
          }
          //do something after mounting vue instance
          // 左侧tree列表
          departmentApi.departmentTreelist().then((res)=>{
              console.log("tree列表:",res);
              if(res.code==200){
                  this.treeData=res.data.list;
              }
          })
          // 所有机构列表
          departmentApi.allCompanys().then((res)=>{
              console.log("机构列表：",res);
              if(res.code==200){
                  this.companyOptions=res.data.list;
              }
          })

          // 父部门
          departmentApi.departmentList().then((res)=>{
              // 过滤
              console.log("父部门：",res);
              if(res.code==200){
                  this.parentDepOptions = res.data.list;
                  console.log(this.parentDepOptions,"currentData");
              }
          })
        }
    }
</script>
<style media="screen" >
    .department .btn-group,.department .form-group{
        margin-left: 30px;
    }
    .tree-group{
        border-right: 2px solid #efefef;
        padding-right: 20px;
    }
    .department-crumbs{
        margin-left: 10px;
    }
    .department .btn-group{
        width: 50%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>
