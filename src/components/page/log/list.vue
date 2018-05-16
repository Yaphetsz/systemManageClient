/**
* 日志列表
* Created by fu_gh on 2018-01-09 17:12
*/

<template>
    <div class="employee-list">
        <div class="crumbs">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item>日志管理</el-breadcrumb-item>
                <el-breadcrumb-item>日志列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-main class="panel-body">
            <div class="search-group page-wrap">
                <div class="name-search page-wrap wrap-vcenter">
                    <p>日期：</p>
                    <el-date-picker
                        v-model="searchTime"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                </div>
                <div class="mobile-search page-wrap wrap-vcenter">
                <p>操作人：</p>
                <el-input class="input-group" v-model="searchUser"  placeholder="请输入操作人"></el-input>
            </div>
                <div class="mobile-search page-wrap wrap-vcenter">
                    <p>标题：</p>
                    <el-input class="input-group" v-model="searchTitle"  placeholder="请输入标题"></el-input>
                </div>
                <div class="btn-group">
                    <el-button type="primary" @click="search">查询</el-button>
                </div>
            </div>
            <div class="table-group">
                <el-table :data="tableData" border>
                    <el-table-column prop="create_time" label="日期"></el-table-column>
                    <el-table-column prop="create_by" label="操作人"></el-table-column>
                    <el-table-column prop="type" label="类型"></el-table-column>
                    <el-table-column prop="subSystemName" label="归属子系统"></el-table-column>
                    <el-table-column prop="title" label="标题"></el-table-column>
                    <el-table-column prop="detail" label="详情"></el-table-column>
                </el-table>
            </div>
            <div class="page-group">
                <v-page @sentToParantPageNo="pageSearch" :totalNum="totalNum"></v-page>
            </div>
        </el-main>
    </div>
</template>

<script>
    import LogApi  from '../../../api/LogApi';
    let logApi = new LogApi();
    function searchList(instance) {
        let searchParam = {
            user:instance.searchUser,
            title:instance.searchTitle,
            page_no:instance.pageNo
        };
        if(instance.searchTime && instance.searchTime.length){
            searchParam.start = instance.searchTime[0].Format("yyyy-MM-dd");
            searchParam.end = instance.searchTime[1].Format("yyyy-MM-dd");
        }
        logApi.getPageList(searchParam)
            .then(res=>{
                if(res.code == 200){
                    instance.totalNum = res.data.count;
                    res.data.list.forEach(item=>{
                        item.create_time=new Date(item.create_time).Format("yyyy-MM-dd hh:mm:ss");
                        if(item.type == 1){
                            item.type = '操作';
                        } else {
                            item.type ='系统异常';
                        }
                    });
                    instance.tableData = res.data.list;
                }
            });
    }

    export default {
        data(){
            return {
                searchUser:'',
                searchTitle:'',
                searchTime:[new Date(new Date().getTime() - 7* 24 * 60 *60*1000),new Date()],
                tableData:[],
                totalNum:0,
                pageNo:1,
                pageSize:10,
            }
        },
        methods:{
            search(){
                searchList(this);
            },
            pageSearch(pageNo){
                this.pageNo = pageNo;
                searchList(this);
            }
        },
        mounted(){
            searchList(this);
        }
    }
</script>
