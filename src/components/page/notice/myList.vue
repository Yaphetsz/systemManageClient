/**
*
* Created by fu_gh on 2018-03-12 16:46
*/
<template>
    <div class="my-list">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>我的消息</el-breadcrumb-item>
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
                    <p style="width:60px;">状态：</p>
                    <el-select v-model="searchStatus" placeholder="请选择" >
                        <el-option
                            v-for="item in statusOptions"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value">
                        </el-option>
                    </el-select>
                </div>
                <div class="btn-group">
                    <el-button type="primary" @click="searchList">查询</el-button>
                </div>
            </div>
            <div class="table-group">
                <el-table :data="tableData" border>
                    <el-table-column prop="title" width="400px" label="标题"></el-table-column>
                    <el-table-column prop="statusDesc" label="状态"></el-table-column>
                    <el-table-column prop="create_name" label="创建人"></el-table-column>
                    <el-table-column prop="create_time" label="创建时间"></el-table-column>
                    <el-table-column prop="read_time" label="查看时间"></el-table-column>
                    <el-table-column fixed="right" label="操作">
                        <template slot-scope="scope">
                            <el-button type="text" size="small" @click="see(scope.row)">查看</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="page-group">
                <v-page @sentToParantPageNo="pageSearch" :totalNum="totalNum"></v-page>
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
                searchTime:[],
                searchStatus:1,
                tableData:[],
                totalNum:0,
                pageNo:1,
                pageSize:10,
                statusOptions:[{
                    value:null,
                    label:'全部'
                },{
                    value:1,
                    label:'未读'
                },{
                    value:2,
                    label:'已读'
                }]
            }
        },
        methods:{
            searchList(){
                let param = {
                    page_no:this.pageNo,
                };
                if(this.searchTime.length){
                    param.start = this.searchTime[0].Format("yyyy-MM-dd");
                    param.end = this.searchTime[1].Format("yyyy-MM-dd");
                }
                if(this.searchStatus){
                    param.status = this.searchStatus;
                }
                noticeApi.getMyPageList(param)
                    .then((res)=>{
                        if(res.code == 200){
                            this.totalNum = res.data.count;
                            res.data.list.forEach(item=>{
                                item.create_time=new Date(item.create_time).Format("yyyy-MM-dd hh:mm:ss");
                                item.statusDesc = '已读';
                                if(item.status == 1){
                                    item.statusDesc = '未读';
                                }
                                if(item.read_time){
                                    item.read_time=new Date(item.read_time).Format("yyyy-MM-dd hh:mm:ss");
                                }
                            });
                            this.tableData = res.data.list;
                        }
                    });
            },
            //预览
            see(item){
                let url = 'http://'+ window.location.host+'/#/mynotice/detail/'+item.notice_id+'/see?refresh';
                window.location = url;
            },
            pageSearch(pageNo){
                this.pageNo = pageNo;
                this.searchList();
            }
        },
        mounted(){
            let url = location.href;
            if(url.indexOf('?refresh') >0){
                location = url.split('?')[0];
                location.reload();
            }
            this.searchList();
        }
    }
</script>
<style>
    .my-list .search-group .el-input{
        width: 100%!important;
    }

</style>
