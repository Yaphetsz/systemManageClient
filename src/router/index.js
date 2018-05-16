import Vue from 'vue';
import Router from 'vue-router';

import Index from '../components/page/Index.vue';
import Home from '../components/page/Home.vue';
import EmployeeList from '../components/page/employee/list.vue';
import JobList from '../components/page/job/list.vue';
import Invalid from '../components/page/Invalid.vue';
import EmployeeDetail from '../components/page/employee/ListDetail.vue';
import JobDetail from '../components/page/job/ListDetail.vue';
import Department from '../components/page/department/Index.vue';
import PowerList from '../components/page/power/List.vue';
import PowerDetail from '../components/page/power/PowerListDetail.vue';
import SubSystemList from '../components/page/subsystem/list.vue';
import LogList from '../components/page/log/List.vue';
import NoticeList from '../components/page/notice/list.vue';
import NoSideBar from '../components/page/NoSideBar.vue';
import MyNoticeList from '../components/page/notice/myList.vue';
import NoticeDetail from '../components/page/notice/detail.vue';
import OrganizationList from '../components/page/organization/list.vue';

Vue.use(Router);
const router =  new Router({
    routes: [
        {
            path: '/',
            redirect: '/home'
        },
        {
            path: '/index',
            component: Index,
            children: [
                //首页面
                {
                    path: '/home',
                    component: Home
                },
                //会话失效
                {
                    path: '/invalid',
                    component: Invalid
                },
                // 员工列表
                {
                    path: '/employee/list',
                    component: EmployeeList
                },
                {
                    name: 'employeeDetail',
                    path: '/employeeDetail/:id/:status',
                    component: EmployeeDetail
                },
                // 岗位列表
                {
                    path: '/job/list',
                    component:JobList
                },
                {
                    name: 'jobDetail',
                    path: '/jobDetail/:id',
                    component: JobDetail
                },
                // 组织架构
                {
                    path: '/sysset/department',
                    component: Department
                },
                // 功能权限
                {
                    path: '/sysset/power',
                    component: PowerList
                },
                {
                    name: 'powerListDetail',
                    path: '/powerListDetail/:id',
                    component: PowerDetail
                },
                // 业务子系统
                {
                    path: '/sysset/subsystem',
                    component: SubSystemList
                },
                // 日志列表
                {
                    path: '/log/list',
                    component: LogList
                },
                //公告列表
                {
                    path:'/notice/list',
                    component:NoticeList
                },
                {
                    path:'/organization/list',
                    component:OrganizationList,
                }
            ]
        },
        {
            path:'/nosidebar',
            component:NoSideBar,
            children:[
                {
                    path:'/mynotice/list',
                    component:MyNoticeList
                },
                {
                    name:'/mynotice/detail',
                    path:'/mynotice/detail/:id/:type',
                    component:NoticeDetail
                }
            ]
        },
    ]
})
export default router;
