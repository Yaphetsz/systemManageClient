<!--
    功能权限详情
 -->
<template>
    <div class='power-list-detail detail-list'>
      <div class='crumbs'>
        <el-breadcrumb separator-class='el-icon-arrow-right'>
            <el-breadcrumb-item>系统设置</el-breadcrumb-item>
            <el-breadcrumb-item>
                <router-link to="/sysset/power">功能权限</router-link>
            </el-breadcrumb-item>
            <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class='panel-body page-wrap' style="padding-bottom: 20px;">
          <div class="form-group">
              <el-form ref="form" :model="form">
                  <p class="info-title">基本信息</p>
                  <div class="page-wrap wrap-between first-form form-box">
                      <el-form-item style="margin-bottom: 0px;" label="姓名：">
                          <p>{{form.name}}</p>
                      </el-form-item>
                      <el-form-item style="margin-bottom: 0px;" label="所属子系统：">
                          <p>{{form.subsystem_code}}</p>
                      </el-form-item>
                      <el-form-item style="margin-bottom: 0px;" label='状态：'>
                          <p>{{form.status}}</p>
                      </el-form-item>
                  </div>
                  <div class="page-wrap wrap-between form-box">
                      <el-form-item style="margin-bottom: 0px;" label='父节点：'>
                          <p>{{form.parent_id}}</p>
                      </el-form-item>
                      <el-form-item style="margin-bottom: 0px;" label='排序：'>
                          <p>{{form.sort}}</p>
                      </el-form-item>
                      <el-form-item style="margin-bottom: 0px;" label='创建人：'>
                          <p>{{form.create_by}}</p>
                      </el-form-item>
                  </div>
                  <div class="page-wrap wrap-between form-box">

                      <el-form-item style="margin-bottom: 0px;" label='创建时间：'>
                          <p>{{form.create_time}}</p>
                      </el-form-item>
                      <el-form-item style="margin-bottom: 0px;" label='是否叶子节点：'>
                          <p>{{form.is_leaf}}</p>
                      </el-form-item>
                      <el-form-item style="margin-bottom: 0px;" label='叶子节点类型：' v-if="show">
                          <p>{{form.leaf_type}}</p>
                      </el-form-item>
                  </div>
                  <div class="page-wrap wrap-between form-box">
                      <el-form-item style="margin-bottom: 0px;" label='url：' v-if="show">
                          <p>{{form.url}}</p>
                      </el-form-item>
                      <el-form-item style="margin-bottom: 0px;" label='授权编码：' v-if="show">
                          <p>{{form.auth_code}}</p>
                      </el-form-item>
                      <el-form-item>
                          <p></p>
                      </el-form-item>
                  </div>
                  <div class="">
                      <el-form-item label="所属岗位"  class="function-power" style="width: 100%;margin-bottom: 0px;">
                          <br/>
                          <div class="form-box">
                              <div v-for="el in jobsList">
                                  <el-tag type="info" class="tags">
                                      {{el.name}}
                                  </el-tag>
                              </div>
                          </div>
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
              </el-form>
          </div>
      </div>
    </div>
</template>
<script>
    import PowerApi from '../../../api/PowerApi';
    let powerApi=new PowerApi();
    export default {
        name: '',
        data () {
            return {
                form: {
                    name: '',
                    subsystem_code: '',
                    status: '',
                    parent_id: '',
                    sort: '',
                    icon: '',
                    create_by: '',
                    create_time: '',
                    is_leaf: '',
                    leaf_type: '',
                    url: '',
                    auth_code: ''
                },
                jobsList: [],
                employeesList: [],
                show: true,
            }
        },
        methods:{
        },

        mounted(){
            let param={
                id: this.$route.params.id
            }
            powerApi.powerDetail(param).then((res)=>{
                console.log("res:",res);
                if(res.code==200){
                    this.form.name=res.data.power.name;
                    this.form.subsystem_code=res.data.power.subsystem_code;
                    let _status='';
                    if(res.data.power.status=='2'){
                        _status='禁用';
                    }else if(res.data.power.status=='1'){
                        _status='启用';
                    }
                    this.form.status=_status;
                    this.form.parent_id=res.data.power.parent_name;
                    this.form.sort=res.data.power.sort;
                    this.form.icon=res.data.power.icon;
                    this.form.create_by=res.data.power.create_by;
                    this.form.create_time=new Date(res.data.power.create_time).Format('yyyy-MM-dd hh:mm:ss');
                    let _isLeaf='';
                    if(res.data.power.is_leaf=='1'){
                        _isLeaf='是';
                    }else if(res.data.power.is_leaf=='0'){
                        _isLeaf='否';
                    }
                    this.form.is_leaf=_isLeaf;
                    if(_isLeaf=='否'){
                        this.show=false;
                    }
                    let _leafType='';
                    if(res.data.power.leaf_type==1){
                        _leafType='功能菜单'
                    }else if(res.data.power.leaf_type==1){
                        _leafType='功能菜单'
                    }
                    this.form.leaf_type=_leafType;
                    this.form.url=res.data.power.url;
                    this.form.auth_code=res.data.power.auth_code;
                    // 所属岗位
                    this.jobsList=res.data.power.jobs;
                    // 员工列表
                    this.employeesList=res.data.power.employees;
                }
            })
        }
    }
</script>
<style lang='less'>
.power-list-detail .form-group,.el-form{
    width: 100%;
}

</style>
