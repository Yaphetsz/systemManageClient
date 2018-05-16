/**
*
* Created by fu_gh on 2018-03-12 17:06
*/

<template>
    <div class="detail-list">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item >
                    <router-link to="/mynotice/list">我的消息</router-link>
                </el-breadcrumb-item>
                <el-breadcrumb-item>详情</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-main class="panel-body" style="height:100%;">
             <div style="text-align: center;margin-top: 20px;">
                 <h2><strong>{{title}}</strong></h2>
                 <div style="margin-top: 10px;">
                     创建人: <span>{{create_by}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                     创建时间: <span>{{create_time}}</span>
                 </div>
             </div>
            <div class="ql-editor-box">
               <div class="ql-editor" v-html="content">
                </div>
             </div>
        </el-main>
    </div>
</template>

<script>

    import NoticeApi  from '../../../api/NoticeApi';
    let noticeApi = new NoticeApi();
    export default {
        components: {},
        data(){
            return {
                title:'',
                content:'',
                create_by:'',
                create_time:''
            }
        },
        methods:{
        },
        mounted(){
            let url = location.href;
            if(url.indexOf('?refresh') >0){
                location = url.split('?')[0];
                location.reload();
            }
            let param= {
                id: this.$route.params.id,
                type:this.$route.params.type
            };
            noticeApi.getItem(param)
                .then(res=>{
                    if(res.code == 200){
                        this.title = res.data.notice.title;
                        this.content = res.data.notice.content;
                        this.create_by = res.data.notice.create_name;
                        this.create_time = new Date(res.data.notice.create_time).Format("yyyy-MM-dd hh:mm:ss");
                    }else {
                        this.$message({
                            type: 'info',
                            message: '取公告详情失败：' + res.msg,
                        });
                    }
                });
        }
    }
</script>

<style lang="less">
    .detail-list .ql-editor{
            width: 1000px;
            margin: 0 auto;
    }
</style>
