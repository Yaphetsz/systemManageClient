/**
*  员工列表
* Created by fu_gh on 2018-01-09 16:59
*/

<template>
    <div class='employee-list'>
        <div class='crumbs'>
            <el-breadcrumb separator-class='el-icon-arrow-right'>
                <el-breadcrumb-item>员工管理</el-breadcrumb-item>
                <el-breadcrumb-item>员工列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-main class='panel-body'>
            <div class='search-group page-wrap'>
                <div class='name-search page-wrap wrap-vcenter'>
                    <p>姓名：</p>
                    <el-input class='input-group' v-model='searchName' placeholder='请输入姓名'></el-input>
                </div>
                <div class='mobile-search page-wrap wrap-vcenter'>
                    <p>手机号：</p>
                    <el-input class='input-group' v-model='searchPhone' placeholder='请输入手机号'></el-input>
                </div>
                <div class='btn-group'>
                    <el-button type='primary' @click='search'>查询</el-button>
                    <el-button type='primary' @click='addEmployee'>添加</el-button>
                </div>
            </div>
            <div class='table-group'>
                <el-table
                    :data='tableData'
                    border
                    style='width: 100%;text-align: center;'>
                    <el-table-column label='姓名'>
                        <template slot-scope='scope'>
                            <router-link :to="{ name: 'employeeDetail', params: { id: scope.row.id,status: scope.row.status}}">
                                <p title='点击可查看详情'>{{scope.row.name}}</p>
                            </router-link>
                        </template>
                    </el-table-column>
                    <el-table-column
                        prop='phone'
                        label='手机号'>
                    </el-table-column>
                    <el-table-column
                        prop='department_name'
                        label='部门'>
                    </el-table-column>
                    <el-table-column
                        prop='job'
                        label='岗位'>
                    </el-table-column>
                    <el-table-column
                        prop='create_time'
                        label='创建时间'>
                    </el-table-column>
                    <el-table-column
                        prop='status'
                        label='状态'>
                    </el-table-column>
                    <el-table-column
                        fixed='right'
                        label='操作'
                        width=''>
                        <template slot-scope='scope'>
                            <div style="text-align:center;">
                                <el-button v-if="scope.row.status =='在职'" type='text' size='small' @click='editEmployee(scope.row)'>编辑</el-button>
                                <el-button v-if="scope.row.status =='在职'" type='text' size='small' @click='dimission(scope.row)'>离职</el-button>
                                <el-dropdown>
                                    <span class="el-dropdown-link">
                                        <el-button v-if="scope.row.status =='在职'" type='text' size='small'>更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
                                    </span>
                                    <el-dropdown-menu slot="dropdown">
                                        <el-dropdown-item><el-button v-if="scope.row.status =='在职'" type='text' size='small' @click="resetPsd(scope.row)">重置密码</el-button></el-dropdown-item>
                                        <el-dropdown-item><el-button v-if="scope.row.status =='在职'" type='text' size='small' @click='definePostDetail(scope.row)'>机构自定义</el-button></el-dropdown-item>
                                    </el-dropdown-menu>
                                </el-dropdown>
                            </div>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <el-dialog
                :title='dialogTitle'
                :visible.sync='dialogFormAddVisible'
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                @click='open'
                width='600px'>
                <span class="el-icon-close close" @click='closeDialog(ruleForm)'></span>
                <el-form :model='ruleForm' :rules='rules' ref='ruleForm' class='demo-ruleForm'>
                    <el-form-item label='姓名:' prop='name' :label-width='formLabelWidth'>
                        <el-input v-model='ruleForm.name' placeholder='姓名' ></el-input>
                    </el-form-item>
                    <el-form-item label='手机号:' prop='phone' :label-width='formLabelWidth'>
                        <el-input v-model='ruleForm.phone' placeholder='手机号' :readonly="readOnly"></el-input>
                    </el-form-item>
                    <el-form-item v-if='passwordShow' label='密码:' prop='password' :label-width='formLabelWidth'>
                        <el-input type="password" v-model='ruleForm.password' placeholder='密码' ></el-input>
                    </el-form-item>
                    <el-form-item v-if='passwordShow' label='确认密码:' prop='ensurePassword' :label-width='formLabelWidth'>
                        <el-input type="password"  v-model='ruleForm.ensurePassword' placeholder='确认密码' ></el-input>
                    </el-form-item>
                    <el-form-item label='归属部门:' prop='department_id' :label-width='formLabelWidth'>
                        <el-select v-model='ruleForm.department_id' placeholder='请选择归属部门'>
                            <el-option
                                v-for='item in departmentOptions'
                                :key='item.id'
                                :label='item.name'
                                :value='item.id'>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label='岗位:' prop='jobs' :label-width='formLabelWidth'>
                        <el-select v-model="ruleForm.jobs" multiple placeholder="请选择">
                            <el-option
                              v-for="item in postOptions"
                              :key="item.id"
                              :label="item.name"
                              :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item class='page-wrap wrap-end btn-group' style="margin-bottom:0;">
                        <el-button type='primary' @click='submitForm()' v-if='!eidtShow'>确定</el-button>
                        <el-button type='primary' @click='editSubmitForm()' v-if='eidtShow'>确定</el-button>
                        <el-button @click='closeDialog(ruleForm)'>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog
                title='重置密码'
                :visible.sync='dialogResetVisible'
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                width='600px'>
                <span class="el-icon-close close" @click='closeResetDialog(resetRuleForm)'></span>
                <el-form :model='resetRuleForm' status-icon :rules='resetRules' ref='resetRuleForm' class='demo-ruleForm'>
                    <el-form-item label='姓名:' style="margin-bottom: 0px;" prop='name' :label-width='formLabelWidth'>
                        <p style="font-weight:bold;">{{resetRuleForm.name}}</p>
                    </el-form-item>
                    <el-form-item label='手机号:' style="margin-bottom: 10px;" prop='phone' :label-width='formLabelWidth'>
                        <p style="font-weight:bold;">{{resetRuleForm.phone}}</p>
                    </el-form-item>
                    <el-form-item label="密码:" class="is-required" prop="pass" :label-width='formLabelWidth'>
                        <el-input type="password" v-model="resetRuleForm.pass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="确认密码:" class="is-required" prop="checkPass" :label-width='formLabelWidth'>
                        <el-input type="password" v-model="resetRuleForm.checkPass" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item class='page-wrap wrap-end btn-group' style="margin-bottom:0;">
                        <el-button type='primary' @click="ensureReset">确定</el-button>
                        <el-button @click='closeResetDialog(resetRuleForm)'>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <el-dialog
                title='岗位机构自定义设置'
                :visible.sync='dialogDefineVisible'
                :close-on-click-modal='false'
                :close-on-press-escape='false'
                width='800px'>
                <span class="el-icon-close close" @click='closeDefineDialog(customForm)'></span>
                <el-form :model='customForm' status-icon  ref='customForm' class='demo-ruleForm demo-dynamic'>
                    <div class="page-wrap" v-for="(job,index) in customJobs">
                        <div class="">
                            <el-form-item
                                :label="job.name"
                                :key="'job10'+index"
                                :prop="job.formName"
                                :label-width='companyLabelWidth'
                              >
                            </el-form-item>
                        </div>
                        <div class="" style="width:100%;">
                            <el-form-item>
                                <el-select  v-model='customForm[job.formName]' value-key="customForm[job.id]"  multiple placeholder="请选择">
                                    <el-option
                                        v-for='item in customerServiceOptions'
                                        :key='item.id'
                                        :value='item.id'
                                        :label='item.name'>
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </div>

                    </div>
                    <el-form-item class='page-wrap wrap-end btn-group' style="margin-bottom:0;">
                        <el-button type='primary' @click="ensureDefine">确定</el-button>
                        <el-button @click='closeDefineDialog(customForm)'>取消</el-button>
                    </el-form-item>
                </el-form>
            </el-dialog>
            <div class='page-group'>
                <v-page @sentToParantPageNo='getCurrentPage' :totalNum='totalNum'></v-page>
            </div>
        </el-main>
    </div>
</template>
<script>
    import EmployeeApi from '../../../api/EmployeeApi';
    import JobApi from '../../../api/JobApi';
    import DepartmentApi from '../../../api/DepartmentApi';
    let employeeApi=new EmployeeApi();
    let jobApi=new JobApi();
    let departmentApi=new DepartmentApi();
    function searchList(instance) {
        let param = {
            page_no: instance.pageNo,
            name: instance.searchName,
            phone: instance.searchPhone       // searchPhone 有问题
        }
        employeeApi.employeeList(param)
            .then((res) => {
                console.log(res, "search");
                if (res.code == 200) {
                    for (let i = 0; i < res.data.list.length; i++) {
                        res.data.list[i].create_time = new Date(res.data.list[i].create_time).Format("yyyy-MM-dd hh:mm:ss");
                    }
                    instance.tableData = res.data.list;
                    instance.totalNum = res.data.count;
                }
            });
    }
    // 数组去重
    function unique(array){
        var n = [];
        for(var i = 0; i < array.length; i++){
            if (n.indexOf(array[i]) == -1) n.push(array[i]);
        }
        return n;
    }
    export default {
        name: '',
        data() {
            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.resetRuleForm.checkPass !== '') {
                        this.$refs.ruleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validateEditPass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请输入密码'));
                } else {
                    if (this.resetRuleForm.checkPass !== '') {
                        this.$refs.resetRuleForm.validateField('checkPass');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.ruleForm.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            var validateEditPass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.resetRuleForm.pass) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            }
            return {
                searchName: '',       //查询
                searchPhone: '',
                totalNum: 0,
                pageNo: 1,
                pageSize: 10,
                tableData: [],
                dialogFormAddVisible: false,
                dialogResetVisible: false,
                dialogDefineVisible: false,
                ruleForm: {
                    name: '',
                    phone: '',
                    password: 'oms123',
                    ensurePassword: 'oms123',
                    department_id: '',
                    jobs: ''
                },
                resetRuleForm: {
                    pass: '',
                    checkPass: '',
                    id: '',
                    phone: '',
                    name: '',
                },
                rules: {
                    name: [
                        {required: true, message: '姓名不能为空', trigger: 'blur'},
                        {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'},
                    ],
                    phone: [
                        {required: true, message: '手机号不能为空', trigger: 'blur'},
                        {nameType: '', message: '手机号格式错误', trigger: 'blur'}
                    ],
                    password: [
                        {required: true,validator: validatePass, trigger: 'blur'},
                        {min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur'},
                    ],
                    ensurePassword: [
                        {required: true,validator: validatePass2, trigger: 'blur'},
                    ],
                    department_id: [
                        {required: true, message: '归属部门不能为空', trigger: 'blur'},
                    ],
                    jobs: [
                        {required: true, message: '岗位不能为空', trigger: 'blur'},
                    ]
                },
                resetRules: {
                    pass: [
                        {validator: validateEditPass, trigger: 'blur'},
                        {min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur'},
                    ],
                    checkPass: [
                        {validator: validateEditPass2, trigger: 'blur'},
                        {min: 6, max: 8, message: '长度在 6 到 8 个字符', trigger: 'blur'},
                    ],
                },
                defineId: '',
                formLabelWidth: '90px',
                companyLabelWidth:'200px',
                departmentOptions: [
                    {value: '1'}, {value: '2'}, {value: '3'}
                ],
                postOptions: [],   // 岗位选择
                definePostOptions: [], // 自定义岗位选择
                customerServiceOptions: [], //机构自定义
                passwordShow: true,
                dialogTitle: '',
                eidtShow: false,
                id: '',
                readOnly: false,
                customCompanyVisible:false,
                jobsId: '',
                companyId: '',
                customForm:{
                    job_1:[''],     //102020002
                },
                customJobs:[{
                    name:'jobtest',
                    formName:'job_1',
                }]
            }
        },
        methods: {
            //重置密码
            resetPsd(row) {
                console.log("重置密码row:", row);
                this.dialogResetVisible = true;
                this.resetRuleForm.name = row.name;
                this.resetRuleForm.phone = row.phone;
                this.resetRuleForm.id = row.id;
                this.resetRuleForm.pass = 'oms123';
                this.resetRuleForm.checkPass = 'oms123';
            },
            closeResetDialog(resetRuleForm) {
                this.dialogResetVisible = false;
                this.$refs['resetRuleForm'].resetFields();
            },
            ensureReset() {
                this.$refs['resetRuleForm'].validate(err => {
                    if (err) {
                        let _psd = ''
                        if (this.resetRuleForm.pass == this.resetRuleForm.checkPass) {
                            _psd = this.resetRuleForm.checkPass;
                        }
                        let param = {
                            id: this.resetRuleForm.id,
                            phone: this.resetRuleForm.phone,
                            password: _psd,
                        }
                        console.log(param, "param");
                        employeeApi.employeeReset(param).then((res) => {
                            console.log(res);
                            if (res.code == 200) {
                                this.dialogResetVisible = false;
                                this.$refs['resetRuleForm'].resetFields();
                                this.$message({
                                    message: '修改成功',
                                    type: 'success'
                                });
                            }
                        })
                    }
                });
            },

            // 岗位机构自定义详情
            definePostDetail(row) {
                let _self=this;
                console.log("机构自定义row:", row);
                this.dialogDefineVisible = true;
                this.defineId=row.id;
                _self.customFormClear();
                let param = {
                    id: row.id,
                }
                //
                console.log('aa',_self.customerServiceOptions);
                employeeApi.definePostDetail(param).then((res)=>{
                    console.log(res,"机构自定义详情");
                    if(res.code==200 && res.data.length){
                        res.data.forEach(item=>{
                            let formName = 'job_'+item.id;
                            _self.customJobs.push({
                                name:item.name,
                                formName:formName,
                                id: item
                            });
                            let companys = [];
                            item.companys.forEach(citem=>{
                                companys.push(citem.id);
                            });
                            let newObj = { };
                            newObj[formName] = companys;
                            _self.customForm = Object.assign({}, _self.customForm, newObj );
                        });
                    }
                });
            },

            customFormClear(){
                this.customForm = {};
                this.customJobs = [];
            },
            ensureDefine(){
                let _self=this;
                console.log('custom submit:',this.customForm);
                let keys = Object.keys(this.customForm);
                console.log('keys:',keys);
                let submitJobs = [];
                keys.forEach(item=>{
                    console.log('keys item:',item);
                    console.log('index of ',item.indexOf('job'));
                    if(item.indexOf('job') >= 0){
                        let jobId = item.split('_')[1];
                        let companys = this.customForm[item];
                        submitJobs.push({
                            id:jobId,
                            companys:companys,
                        });
                    }
                });
                console.log('submit Jobs:',submitJobs);
                let _jobs=[];
                for(let i=0;i<submitJobs.length;i++){
                    for(let j=0;j<submitJobs[i].companys.length;j++){
                        // _jobs=[submitJobs[i].id+'|'+submitJobs[i].companys.join('$')];
                        _jobs.push(submitJobs[i].id+'|'+submitJobs[i].companys.join('$'));
                    }
                }
                let newJobs=unique(_jobs);
                console.log(newJobs,"newJobs");
                let param = {
                    id: this.defineId,
                    jobs: newJobs.toString()
                }
                console.log("param:",param);
                employeeApi.definePost(param).then((res)=>{
                    console.log(res,"机构自定义详情");
                    if(res.code==200){
                        this.closeDefineDialog();
                    }
                })
            },
            getFocus(id){
                this.jobsId=id;
            },
            closeDefineDialog(formName) {
                this.dialogDefineVisible = false;
                this.customFormClear();
            },
            //查询
            search() {
                searchList(this);
            },
            // 添加
            addEmployee() {
                this.dialogFormAddVisible = true;
                this.dialogTitle = '员工添加';
                this.passwordShow = true;
                this.eidtShow = false;
                this.readOnly = false;
                this.ruleForm.password = 'oms123';
                this.ruleForm.ensurePassword= 'oms123';
            },
            submitForm() {
                console.log('add');
                this.$refs['ruleForm'].validate(err => {
                    if (err) {
                        let param = {
                            name: this.ruleForm.name,
                            phone: this.ruleForm.phone,
                            password: this.ruleForm.password,
                            department_id: this.ruleForm.department_id,
                            jobs: this.ruleForm.jobs.join()
                        }
                        console.log(param, 'param')
                        employeeApi.employeeAdd(param).then((res) => {
                            if (res.code == 200) {
                                this.$message.success('添加成功');
                                this.dialogFormAddVisible = false;
                                this.$refs['ruleForm'].resetFields();
                                searchList(this);
                            } else {
                                this.$message.error('添加失败:'+res.msg);
                            }
                        })
                    }
                });
            },

            // 编辑
            // 编辑详情(参考)
            editEmployee(row) {
                console.log('编辑详情', row);
                this.eidtShow = true;
                this.readOnly = true;
                this.dialogFormAddVisible = true;
                this.dialogTitle = '员工编辑';
                this.passwordShow = false;
                this.id = row.id;
                let param = {
                    id: row.id
                }
                employeeApi.employeeEdititem(param).then((res) => {
                    console.log('edit:', res);
                    if (res.code == 200) {
                        this.ruleForm.name = res.data.employee.name;
                        this.ruleForm.phone = res.data.employee.phone;
                        this.ruleForm.department_id = res.data.employee.department_id;
                        if (res.data.employee.jobs) {
                            for (let i = 0; i < res.data.employee.jobs.length; i++) {
                                //console.log(res.data.employee.jobs[i].id);
                                this.ruleForm.jobs.push(res.data.employee.jobs[i].id);
                            }
                        }
                    }

                })
            },
            editSubmitForm() {
                console.log('编辑添加');
                this.$refs['ruleForm'].validate(err => {
                    if (err) {
                        let param = {
                            id: this.id.toString(),
                            name: this.ruleForm.name,
                            phone: this.ruleForm.phone,
                            department_id: this.ruleForm.department_id,
                            jobs: this.ruleForm.jobs.join()
                        }
                        console.log(param, "编辑添加");
                        employeeApi.employeeEdit(param).then((res) => {
                            console.log(res);
                            if (res.code == 200) {
                                this.$message.success('编辑成功');
                                this.dialogFormAddVisible = false;
                                this.ruleForm.name = '';
                                this.ruleForm.phone = '';
                                this.ruleForm.password = '';
                                this.ruleForm.ensurePassword = '';
                                this.ruleForm.department_id = '';
                                this.ruleForm.jobs = [];
                                searchList(this);
                            } else {
                                this.$message.error('编辑失败:'+res.msg);
                            }
                        })
                    }
                });
            },
            handleDelete(index, row) {
                console.log(index, row);
                row.splice(index, 1)
            },
            // dialog methods
            open(id) {

            },
            handleClose(done) {
                done();
                //this.ruleForm= {};
            },
            closeDialog(ruleForm) {
                this.dialogFormAddVisible = false;
                this.$refs['ruleForm'].resetFields();
            },

            getCurrentPage(val) {
                this.pageNo = val;
                searchList(this);
            },
            dimission(row) {
                this.$confirm('此操作该员工将永久离职, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    employeeApi.dimission({id: row.id})
                        .then(res => {
                            if (res.code == 200) {
                                this.$message.success('离职成功');
                            } else {
                                this.$message.error('离职失败:' + res.msg);
                            }
                            searchList(this);
                        });
                });
            },

        },
        mounted(){
             searchList(this);
            // dialog 岗位列表
            jobApi.allList().then((res)=>{
                console.log(res,"jobApi");
                if(res.code==200){
                    this.postOptions=res.data.list;
                    this.definePostOptions=res.data.list;
                    console.log(this.postOptions,"this.postOptions");
                }
            })
            departmentApi.allCompanys().then((res)=>{
                if(res.code==200){
                    this.customerServiceOptions=res.data.list;
                }
            })
            // 部门列表
            departmentApi.departmentList().then((res=>{
                if(res.code==200){
                    this.departmentOptions = res.data.list.filter(x => {
                        return x.name !== 'root';
                    });
                    console.log(this.departmentOptions,"currentData");
                }
            }))
        }
    }
</script>
<style media="screen">
    /*  更多下拉功能样式 */
    .el-dropdown{
        margin-left: 9px;
    }
    .el-dropdown i{
        color: #409EFF;
    }
</style>
