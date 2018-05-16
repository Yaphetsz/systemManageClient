<template>
    <div class="el-aside">
        <h4 class="system-title">{{sysName}}</h4>
        <el-menu
            :default-active="path"
            class="el-menu-vertical-demo"
            unique-opened
            router
            height="100%"
            @open="handleOpen"
            style="border-right:none"
            >
            <template v-for="(item,index) in menus">
               <template v-if="!item.isLeaf">
                   <el-submenu :index="item.id">
                       <template slot="title">
                           {{ item.name}}
                       </template>
                       <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.url"
                                     v-if="subItem.isLeaf">
                           {{ subItem.name}}
                       </el-menu-item>
                       <el-submenu v-if="!subItem.isLeaf" v-for="(subItem,i) in item.subs" :key="i" :index="subItem.id" >
                           <template slot="title">{{ subItem.name}}</template>
                           <el-menu-item v-for="(data,n) in subItem.subs" :key="data.id"
                                         :index="data.url">
                               {{data.name}}
                           </el-menu-item>
                       </el-submenu>
                   </el-submenu>
               </template>
               <template v-else>
                   <el-menu-item :index="item.url" >
                       {{ item.name}}
                   </el-menu-item>
               </template>
           </template>
        </el-menu>

    </div>
</template>

<script>
    import AuthUser from '../../api/AuthUserApi';
    export default {
    data() {
        return {
            sysName:'',
            menus:[],
        }
    },
    computed: {
        path(){
            console.log(this.$route.path,"------------------");
            return this.$route.path;
        },
    },
    mounted(){
        this.userObj = JSON.parse(localStorage.getItem('userObj'))
    },
    methods:{
//      退出登录
        userLogout(){
            this.$message({
                message: '已成功退出',
                type: 'success'
            });
        },
    	   handleOpen(key, keyPath) {
           localStorage.setItem("id",keyPath)
         },
    },
    created() {
        let self = this;
        let authUser = new AuthUser();
        authUser.getMenus()
            .then((res)=>{
               if(res.code==200){
                   self.menus = res.data.menus;
                   self.sysName = res.data.sysName;
               }
            });
    }
}
</script>

<style>
    .el-aside{
        position: fixed;
        height: 100%;
        background: #fff;
    }
    .el-aside li{
        box-sizing: border-box;
    }
    .el-aside h4{
        width: 100%;
        height: 40px;
        line-height: 40px;
        padding-left: 20px;
    }
</style>
