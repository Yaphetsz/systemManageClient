<!--
    员工列表
 -->
<template>
    <div class='detail-list employee-list'>
        <div class='crumbs'>
            <el-breadcrumb separator-class='el-icon-arrow-right'>
                <el-breadcrumb-item>员工管理</el-breadcrumb-item>
                <el-breadcrumb-item>
                    <router-link to="/employee/list">员工列表</router-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>员工详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='panel-body page-wrap'>
            <el-form ref="form" :model="form">
                <p class="info-title">基本信息</p>
                <div class="page-wrap wrap-between first-form form-box">
                    <el-form-item style="margin-bottom: 0px;" label="姓名：">
                        <p>{{form.name}}</p>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 0px;" label="手机号：">
                        <p>{{form.phone}}</p>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 0px;" label='状态：'>
                        <p>{{form.status}}</p>
                    </el-form-item>
                </div>
                <div class="page-wrap wrap-between form-box">
                    <el-form-item style="margin-bottom: 0px;" label='创建时间：'>
                        <p>{{form.create_time}}</p>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 0px;" label='创建人：'>
                        <p>{{form.createPerson}}</p>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 0px;" label='归属部门：'>
                        <p>{{form.department}}</p>
                    </el-form-item>
                </div>
                <div class="page-wrap wrap-between form-box">
                    <el-form-item style="margin-bottom: 0px;" label='归属机构：'>
                        <p>{{form.organization}}</p>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 0px;" label='岗位：'>
                        <p>{{form.post}}</p>
                    </el-form-item>
                    <el-form-item>
                        <p></p>
                    </el-form-item>
                </div>
                <div class="">
                    <el-form-item label="岗位机构自定义"  class="function-power" style="width: 100%;">
                        <br/>
                        <div class="form-box">
                            <el-card class="box-card" v-for="el in customName" >
                                <div slot="header" class="clearfix">
                                    <span>{{el.name}}</span>
                                </div>
                                <div >
                                    <div class="list-content" v-for="item in el.companys">
                                        <el-tag type="info" class="tags">
                                            {{item.name}}
                                        </el-tag>
                                    </div>
                                </div>
                            </el-card>
                        </div>
                    </el-form-item>
                </div>
                <div class="">
                    <el-form-item label="功能权限"  class="function-power" style="width: 100%;">
                        <br/>
                        <div class="form-box">
                            <el-card class="box-card" v-for="el in powersList" >
                              <div slot="header" class="clearfix">
                                <span>{{el.name}}</span>
                              </div>
                              <div >
                                  <div class="list-content" v-for="item in el.subs">
                                    <el-tag type="info" class="tags">
                                        {{item.name}}
                                    </el-tag>
                                  </div>
                              </div>
                            </el-card>
                        </div>
                    </el-form-item>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
    import EmployeeApi from '../../../api/EmployeeApi';
    let employeeApi=new EmployeeApi();
    export default {
        name: '',
        data () {
            return {
                labelPosition: 'right',
                form: {
                    id: '',
                    name: '',
                    phone: '',
                    status: '',
                    create_time: '',
                    createPerson: '',
                    department: '',
                    organization: '',   //机构
                    post: ''
                },
                tableData:[],
                tableList:[

                ],
                powersList: [],
                customName: [],     //匹配机构
            }
        },
        mounted(){
            let param={
                id: this.$route.params.id
            }
            employeeApi.employeeDetail(param).then((res)=>{
                console.log("employeeDetail::",res);
                if(res.code==200){
                    this.form.name=res.data.employee.name;
                    this.form.phone=res.data.employee.phone;
                    this.form.status=this.$route.params.status;                 //状态
                    this.form.createPerson=res.data.employee.create_by;
                    this.form.create_time=new Date(res.data.employee.create_time).Format("yyyy-MM-dd hh:mm:ss");
                    let arr=[];
                    if(res.data.employee.jobs){
                        for(let i=0;i<res.data.employee.jobs.length;i++){
                            arr.push(res.data.employee.jobs[i].name);
                        }
                        this.form.post=arr.join()                               //岗位
                    }
                    this.form.department=res.data.employee.department_name;     //归属部门
                    let orgArr=[];
                    if(res.data.employee.powers){
                        for(let i=0;i<res.data.employee.companys.length;i++){
                            orgArr.push(res.data.employee.companys[i].name);
                            console.log(orgArr,"orgArr");
                        }
                        this.form.organization=orgArr.join()                               //
                    }
                    // 功能权限
                    this.powersList=res.data.employee.powers;
                    // 机构自定义详情
                    this.customName=res.data.employee.customs;
                }
            })
        }
    }
</script>
<style lang='less'>
    /* //  岗位机构自定义和功能权限 列表样式 */
    .employee-list .job-define .el-card__header{
        width: 8%;
        border-bottom: none;
        float: left;
        text-align: center;
    }
    .employee-list .job-define .job-define .el-card__body{
        width: 92%;
        float: left;
    }
    .employee-list .job-define .post-title{
        display: inline-block;
        width: 8%;
        border-right: 1px solid #f3f3f3;
        text-align: center;
        margin-left: 1px;
    }
    .employee-list .job-define .match-company{
        display: inline-block;

        padding-left: 40px;
        font-weight: bold;
    }
    .employee-list .box-card {
        width: 100%;
    }
    .job-define .title-group{
        border: 1px solid #ebeef5;
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        color: #303133;
        border-radius: 4px;
        border-bottom: none;
    }
    .employee-list .job-define .box-card{
        border-top: 0;
        border-bottom: 0;
    }
</style>
