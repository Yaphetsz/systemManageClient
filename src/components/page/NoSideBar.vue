/**
*
* Created by fu_gh on 2018-03-12 16:36
*/

<template>
    <div class="no-side-bar">
        <el-container style="height:100%;">
            <el-header>
                <v-header></v-header>
            </el-header>
            <el-container class='content-page'>
                <el-main>
                    <router-view style="margin-left:5px;" class='content-part'></router-view>
                    <el-footer>
                        <v-footer></v-footer>
                    </el-footer>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<style>
    .no-side-bar .el-footer{
        left: 0px;
    }
    .no-side-bar .el-footer .copyright{
        padding-right: 0;
    }
</style>
