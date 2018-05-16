/**
* 机构管理
* Created by fu_gh on 2018-04-04 15:30
*/

<template>
    <div class='employee-list'>
        <div class='crumbs'>
            <el-breadcrumb separator-class='el-icon-arrow-right'>
                <el-breadcrumb-item>机构管理</el-breadcrumb-item>
                <el-breadcrumb-item>机构列表</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-main class='panel-body'>
            <div class='search-group page-wrap'>
                <div class='name-search page-wrap wrap-vcenter'>
                    <p>名称：</p>
                    <el-input class='input-group' v-model='searchName' placeholder='请输入名称'></el-input>
                </div>
                <div class='btn-group'>
                    <el-button type='primary' @click='searchList'>查询</el-button>
                    <el-button type='primary' @click='addEmployee'>添加</el-button>
                </div>
            </div>
            <div class='table-group'>
                <el-table
                    :data='tableData'
                    border
                    style='width: 100%;text-align: center;'>
                    <el-table-column label='名称' prop="name">
                    </el-table-column>
                    <el-table-column
                        prop='id'
                        label='编码'>
                    </el-table-column>
                    <el-table-column
                        prop='area'
                        label='大区'>
                    </el-table-column>
                    <el-table-column
                        prop='province'
                        label='省'>
                    </el-table-column>
                    <el-table-column
                        prop='city'
                        label='市'>
                    </el-table-column>
                    <el-table-column
                        prop='leader'
                        label='负责人'>
                    </el-table-column>
                    <el-table-column
                        prop='mobile'
                        label='手机'>
                    </el-table-column>
                </el-table>
            </div>
            <div class='page-group'>
                <v-page @sentToParantPageNo='getCurrentPage' :totalNum='totalNum'></v-page>
            </div>
        </el-main>
    </div>
</template>
<script>
    import OrganizationApi from '../../../api/OrganizationApi';
    let organizationApi = new OrganizationApi();
    export default {
        name: '',
        data() {
            return {
                searchName: '',       //查询
                totalNum: 0,
                pageNo: 1,
                pageSize: 10,
                tableData: [],
            }
        },
        methods: {

            //查询
            searchList(){
                let param ={
                    name:this.searchName,
                    page_no: this.pageNo,
                };
                organizationApi.getPageList(param)
                    .then(res=>{
                        if (res.code == 200) {
                            this.tableData = res.data.list;
                            this.totalNum = res.data.count;
                        }
                    });
            },

            //分页
            getCurrentPage(val) {
                this.pageNo = val;
                this.searchList();
            },
        },
        mounted(){
            this.searchList();
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
