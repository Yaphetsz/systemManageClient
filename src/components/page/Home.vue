<template>
  <div class='home'>
    <!-- 面包屑 -->
    <div class='crumbs'>
      <el-breadcrumb separator='/'>
          <el-breadcrumb-item>首页</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class='panel-body'>
      <h3>欢迎进入运营管理系统-基础管理</h3>
    </div>
  </div>
</template>
<script>
import AuthUser from '../../api/AuthUserApi'
  export default {
      data(){
          return {
              userName: ''
          }
      },
      mounted() {

        //do something after mounting vue instance
        let self = this;
        let authUser = new AuthUser()
        authUser.getUser()
            .then((res)=>{
               console.log('user:',res);
               self.userName=res.data.name
            });
      }
  }
</script>
<style>

</style>
