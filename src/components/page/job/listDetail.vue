
/**
*  组织架构
* Created by fu_gh on 2018-01-09 17:08
*/
<template>
    <div class="detail-list department">
        <div class="crumbs">
            <el-breadcrumb separator-class='el-icon-arrow-right'>
                <el-breadcrumb-item>权限管理</el-breadcrumb-item>
                <el-breadcrumb-item>
                    <router-link to="/job/list">岗位列表</router-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>岗位详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class='panel-body page-wrap'>
            <el-form ref="form" :model="form">
                <p class="info-title">基本信息</p>
                <div class="page-wrap wrap-between first-form form-box">
                    <el-form-item style="margin-bottom: 0px;" label="名称：">
                        <p>{{form.name}}</p>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 0px;" label="创建人：">
                        <p>{{form.createPerson}}</p>
                    </el-form-item>
                    <el-form-item style="margin-bottom: 0px;" label='创建时间：'>
                        <p>{{form.createTimes}}</p>
                    </el-form-item>
                </div>
                <div class="">
                    <el-form-item label="员工列表"  class="function-power" style="width: 100%;margin-bottom: 0px;">
                        <br/>
                        <div class="form-box">
                            <div v-for="el in employeesList">
                                <el-tag type="info" class="tags">
                                    {{el.name}}
                                </el-tag>
                            </div>
                        </div>
                    </el-form-item>
                </div>
                <div class="">
                    <el-form-item label="功能权限"  class="function-power" style="width: 100%;margin-bottom: 0px;">
                        <br/>
                        <div class="form-box">
                            <el-card class="box-card" v-for="el in powersList" style="width:100%;padding-bottom:10px;">
                              <div slot="header" class="clearfix">
                                <span>{{el.name}}</span>
                              </div>
                              <div>
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
<script type='text/javascript'>
    import JobApi from '../../../api/JobApi';
    // import EmployeeApi from '../../../api/EmployeeApi';
    let jobApi = new JobApi();
    // let employeeApi = new EmployeeApi();
    export default {
        name: "",
        data: () => ({
            form:{
                name: '',
                createPerson: '',
                createTimes: '',
            },
            employeesList: [
                // {name: '111',id: 111},{name: '222',id: 222}
            ],
            powersList: [],
        }),
        mounted() {
            let param= {
                id: this.$route.params.id
            }
            jobApi.jobDetail(param).then((res)=>{
                console.log(res);
                if(res.code==200){
                    this.form.name=res.data.job.name;
                    this.form.createPerson=res.data.job.create_by;
                    this.form.createTimes=new Date(res.data.job.create_time).Format('yyyy-MM-dd hh:mm:ss');
                    // 员工列表
                    this.employeesList=res.data.job.employees;
                    // 功能权限
                    this.powersList=res.data.job.powers;
                }
            })
        }
    }
</script>
<style media="screen" >
    .department .employeesTag{
       margin-left:20px;
    }
</style>
