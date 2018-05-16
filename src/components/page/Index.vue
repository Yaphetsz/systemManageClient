<template>
    <el-container style="height:100%;">
        <el-header>
            <v-header></v-header>
        </el-header>
        <el-container class='content-page'>
            <v-sidebar></v-sidebar>
            <el-main>
                <router-view class='content-part'></router-view>
                <el-footer>
                    <v-footer></v-footer>
                </el-footer>
            </el-main>
        </el-container>
    </el-container>
</template>
