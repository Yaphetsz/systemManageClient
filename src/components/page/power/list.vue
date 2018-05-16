/**
*  功能权限列表
* Created by fu_gh on 2018-01-09 17:10
*/
<template>
    <div class='power-list'>
        <div class='crumbs'>
            <el-breadcrumb separator-class='el-icon-arrow-right'>
                <el-breadcrumb-item>系统设置</el-breadcrumb-item>
                <el-breadcrumb-item>功能权限</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <el-main class='panel-body page-wrap'>
            <div class="system-list">
                <h3 v-for="(el,index) in systemList" :key="index" @click="chooseSystem(index)" :class="{active:index==elIndex}">
                    {{el.name}}
                </h3>
            </div>
            <div class="" style="width:85%;margin-left: 10px;">
                <div class='search-group page-wrap'>
                    <div class='name-search page-wrap wrap-vcenter'>
                        <p>名称：</p>
                        <el-input class='input-group' v-model='searchName' placeholder='请输入姓名'></el-input>
                    </div>
                    <div class='btn-group'>
                        <el-button type='primary' @click='search'>查询</el-button>
                        <el-button type='primary' @click='add'>添加</el-button>
                    </div>
                </div>
                <div class='table-group'>
                    <el-table
                        :data='tableData'
                        border
                        :default-sort = "{prop: 'create_time', order: 'descending'}"
                        style='width: 100%;margin-top:20px;text-align: center;'>
                        <el-table-column label='名称'>
                            <template slot-scope='scope'>
                                <router-link :to="{ name: 'powerListDetail', params: { id: scope.row.id}}">
                                    <p title='点击可查看详情'>{{scope.row.name}}</p>
                                </router-link>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop='sort'
                            sortable
                            label='排序'>
                        </el-table-column>
                        <el-table-column
                            prop='is_leaf'
                            label='是否叶子节点'>
                        </el-table-column>
                        <el-table-column
                            prop='url'
                            label='URL'>
                        </el-table-column>
                        <el-table-column
                            prop='parent_name'
                            label='父节点名称'>
                        </el-table-column>
                        <el-table-column
                            prop='auth_code'
                            label='授权编码'>
                        </el-table-column>
                        <el-table-column
                            prop='statusDesc'
                            label='状态'>
                        </el-table-column>
                        <el-table-column
                            prop='subsystem_name'
                            label='所属子系统'>
                        </el-table-column>
                        <el-table-column
                            prop='create_time'
                            sortable
                            label='创建时间'
                            width="200">
                        </el-table-column>
                        <el-table-column
                            fixed='right'
                            label='操作'
                            width=''>
                            <template slot-scope='scope' >
                                <div class='' style="text-align:center;">
                                    <el-button type='text' size='small' @click='edit(scope.row)'>编辑</el-button>
                                    <el-button v-if="scope.row.status ==1" type='text' size='small' @click='disable(scope.row)'>禁用</el-button>
                                    <el-button v-if="scope.row.status !=1" type='text' size='small' @click='enable(scope.row)'>启用</el-button>
                                    <el-button  type='text' size='small' @click='del(scope.row)'>删除</el-button>
                                </div>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <el-dialog
                    :title='dialogTitle'
                    :visible.sync='dialogFormAddVisible'
                    :close-on-click-modal='false'
                    :close-on-press-escape='false'
                    @click='open'
                    width='600px'>
                    <span class="el-icon-close close" @click='closeDialog(ruleForm)'></span>
                    <el-form :model='ruleForm' :rules='rules' ref='ruleForm' class='demo-ruleForm'>
                        <el-form-item label='所属子系统:'  :label-width='formLabelWidth'>
                            <p>{{belongSystem}}</p>
                        </el-form-item>
                        <el-form-item label='名称:' prop='name' :label-width='formLabelWidth'>
                            <el-input v-model='ruleForm.name'></el-input>
                        </el-form-item>
                        <el-form-item label='父节点:' prop='parent_id' :label-width='formLabelWidth'>
                            <el-select v-model='ruleForm.parent_id'>
                                <el-option
                                    v-for='item in parentIdOptions'
                                    :key='item.id'
                                    :value='item.id'
                                    :label='item.name'>
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label='排序:' prop='sort' :label-width='formLabelWidth'>
                            <el-input type="number" v-model='ruleForm.sort' min=0></el-input>
                        </el-form-item>
                        <el-form-item label='是否叶子节点:' prop='is_leaf' :label-width='formLabelWidth'>
                            <el-switch
                                style="display: block"
                                v-model="ruleForm.is_leaf"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="change">
                            </el-switch>
                        </el-form-item>
                        <el-form-item  v-if='ruleForm.is_leaf==1' label='url:' prop='url' :label-width='formLabelWidth'>
                            <el-input v-model='ruleForm.url'></el-input>
                        </el-form-item>
                        <el-form-item v-if='ruleForm.is_leaf==1' label='叶子节点类型:' prop='leaf_type' :label-width='formLabelWidth'>
                            <el-select v-model='ruleForm.leaf_type'>
                                <el-option v-for='(item,index) in leafTypeOptions' :key='index' :label='item.label' :value='item.value'></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item v-if='ruleForm.is_leaf==1' label='授权编码:' prop='auth_code' :label-width='formLabelWidth'>
                            <el-input v-model='ruleForm.auth_code'></el-input>
                        </el-form-item>
                        <el-form-item class='page-wrap wrap-end btn-group' style="margin-bottom:0;">
                            <el-button type='primary' @click='addSubmitForm()' v-if="!editShow">确定</el-button>
                            <el-button type='primary' @click='editSubmitForm()' v-if="editShow">确定</el-button>
                            <el-button @click='closeDialog(ruleForm)'>取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-dialog>
                <div class='page-group'>
                    <v-page @sentToParantPageNo='getCurrentPage' :totalNum='totalNum'></v-page>
                </div>
            </div>
        </el-main>
        <!-- <input type="text" name="" value="" v-model="period"> -->
    </div>



</template>

<script>
import PowerApi from '../../../api/PowerApi';
let powerApi = new PowerApi();

function searchList(instance) {
    let param = {
        subsystem_code: sessionStorage.getItem('systemName'),
        page_no: instance.pageNo,
        name: instance.searchName
    };
    // 功能权限列表
    powerApi.getPageList(param).then((res)=>{
        if(res.code==200){
            for(let i=0;i<res.data.list.length;i++){
                res.data.list[i].create_time=new Date(res.data.list[i].create_time).Format("yyyy-MM-dd hh:mm:ss");
                if(res.data.list[i].is_leaf==0){
                    res.data.list[i].is_leaf="否"
                }else if(res.data.list[i].is_leaf==1){
                    res.data.list[i].is_leaf="是"
                }
                if(res.data.list[i].status==1){
                    res.data.list[i].statusDesc="启用"
                }else if(res.data.list[i].status==2){
                    res.data.list[i].statusDesc="禁用"
                }
            }
            instance.tableData=res.data.list;
            instance.totalNum=res.data.count;
        } else {
            instance.$message.error(res.msg);
        }
    });
}
export default {
    name: '',
    data: () => ({
        ruleFormSort: '',
        period: '',
        id: '',
        editShow: false,
        elIndex: 0,
        systemList: [
          // {name:"系统管理",code:'aaa'},
          // {name:"车务中心",code:'bbb'},
          // {name:"车辆中心",code:'ccc'}
        ],       // 左侧系统列表
        radio: '1',
        searchName: '',
        totalNum: 0,
        pageNo: 1,
        pageSize: 10,
        tableData: [],
        dialogFormAddVisible: false,
        ruleForm: {
            name: '',
            parent_id: '',

            is_leaf: 0,  //是否叶子节点  1:是 0：否
            url: '',
            leaf_type: '',
            auth_code: '',
        },
        rules: {
            name: [
                { required: true, message: '名称不能为空', trigger: 'blur' },
                { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
            ],
            parent_id: [
                { required: true, message: '父节点不能为空', trigger: 'blur' },
            ],
            sort: [
                { required: true, message: '排序不能为空', trigger: 'blur' },
            ],
            // is_leaf: [
            //     { required: true, message: '确认密码不能为空', trigger: 'blur' },
            // ],
            url: [
                { required: true, message: 'url不能为空', trigger: 'blur' },
            ],
            leaf_type: [
                { required: true, message: '叶子节点类型不能为空', trigger: 'blur' },
            ],
            auth_code: [
                { required: true, message: '授权编码不能为空', trigger: 'blur' },
            ]
        },
        formLabelWidth: '110px',
        departmentOptions: [
          {value: '1'},{value: '2'},{value: '3'}
        ],
        leafTypeOptions: [
          {value: '功能菜单',id: 1},{value: '功能操作',id: 2}
        ],
        parentIdOptions: [],
        dialogTitle: '',
        id: '',
        belongSystem: '',
    }),
    methods: {
        chooseSystem(index){
            this.elIndex=index;
            for(let i=0;i<this.systemList.length;i++){
                //console.log(index,"index");
                // this.systemName=this.systemList[index].code;
                sessionStorage.setItem('systemName',this.systemList[index].code)
                sessionStorage.setItem('belongSystem',this.systemList[index].name)
            }
            searchList(this);

        },
        handleDelete(index, row) {
            console.log(index, row);
            row.splice(index, 1)
        },
        // dialog methods
        open(id){

        },
        closeDialog(ruleForm){
            this.dialogFormAddVisible=false;
            this.$refs['ruleForm'].resetFields();
        },
        search() {
            searchList(this);

        },
        add() {
            // 所属子系统
            this.belongSystem=sessionStorage.getItem('belongSystem');
            // 父节点
            powerApi.getParentList().then((res)=>{
                console.log(res,"powerParent");
                if(res.code==200){
                    this.parentIdOptions=res.data.list;
                }
            })
            this.dialogFormAddVisible=true;
            this.dialogTitle='功能权限添加';
            this.editShow=false;
        },

        // 功能权限添加
        addSubmitForm(){
            this.$refs['ruleForm'].validate(err => {
                if (err) {
                    if(this.ruleForm.leaf_type=='功能菜单'){
                        this.ruleForm.leaf_type=1;
                    }else if(this.ruleForm.leaf_type=='功能操作'){
                        this.ruleForm.leaf_type=2;
                    }
                    let param = {
                        subsystem_code: sessionStorage.getItem('systemName'),
                        name: this.ruleForm.name,
                        parent_id: this.ruleForm.parent_id,
                        sort: this.ruleForm.sort,
                        is_leaf: '',
                        url: this.ruleForm.url,
                        leaf_type: this.ruleForm.leaf_type,
                        auth_code: this.ruleForm.auth_code,
                    }
                    if(this.ruleForm.is_leaf==true){
                        param.is_leaf=1;
                    }else if(this.ruleForm.is_leaf==false){
                        param.is_leaf=0;
                    }
                    if(this.ruleForm.is_leaf==false){
                        param.url='';
                        param.leaf_type='';
                        param.auth_code='';
                    }
                    console.log("addParam:",param);
                    powerApi.addPower(param).then((res)=>{
                        if(res.code==200){
                            this.ruleForm= {};
                            this.dialogFormAddVisible=false;
                            searchList(this);
                            this.$message.success('添加成功');
                        }else if(res.code==500){
                            this.$message.error('添加失败:'+res.msg);
                        }
                        console.log(res,"addPower")
                    })
                }
            });
        },
        // 功能权限编辑、修改
        editSubmitForm(){
            this.$refs['ruleForm'].validate(err => {
                if (err) {
                    let param = {
                        id: this.id,
                        subsystem_code: sessionStorage.getItem('systemName'),
                        name: this.ruleForm.name,
                        parent_id: this.ruleForm.parent_id,
                        sort: this.ruleForm.sort,
                        is_leaf: '',
                        url: this.ruleForm.url,
                        leaf_type: '',
                        auth_code: this.ruleForm.auth_code,
                    }
                    console.log('editParam:',param);
                    if(this.ruleForm.is_leaf==true){
                        param.is_leaf=1;
                    }else if(this.ruleForm.is_leaf==false){
                        param.is_leaf=0;
                    }
                    if(this.ruleForm.leaf_type=='功能菜单'){
                        param.leaf_type=1;
                    }else if(this.ruleForm.leaf_type=='功能操作'){
                        param.leaf_type=2;
                    }
                    if(this.ruleForm.is_leaf==false){
                        param.url='';
                        param.leaf_type='';
                        param.auth_code='';
                    }
                    console.log("editParam:",param);
                    powerApi.powerEdit(param).then((res)=>{
                        console.log('edit:',res);
                        if(res.code==200){
                            this.ruleForm= {};
                            this.dialogFormAddVisible=false;
                            searchList(this);
                            this.$message.success('编辑成功');
                        }else {
                            this.$message.error('编辑失败:'+res.msg);
                        }
                        console.log(res);
                    })
                }
            });
        },
        // 编辑详情
        edit(row) {
            // 所属子系统
            this.belongSystem=sessionStorage.getItem('belongSystem');
            // 父节点
            powerApi.getParentList().then((res)=>{
                if(res.code==200){
                    this.parentIdOptions=res.data.list;
                }
            })
            let param = {
                id: row.id
            }
            powerApi.editPowerDetail(param).then((res)=>{
                if(res.code==200){
                    this.id=res.data.power.id;
                    this.ruleForm=res.data.power;
                    //this.ruleForm.is_leaf=this.ruleForm.is_leaf.toString();
                    this.ruleForm.is_leaf=res.data.power.is_leaf;
                    if(this.ruleForm.is_leaf==1){
                        this.ruleForm.is_leaf=true;
                    }else if(this.ruleForm.is_leaf==0){
                        this.ruleForm.is_leaf=false;
                    }
                    if(row.leaf_type==1){
                        this.ruleForm.leaf_type="功能菜单"
                    }else if(this.ruleForm.leaf_type==2){
                        this.ruleForm.leaf_type="功能操作"
                    }
                    this.dialogFormAddVisible=true;
                    this.dialogTitle='功能权限编辑';
                    this.editShow=true;
                }
            })
        },
        del(row) {
            this.$confirm('此操作将永久删除该功能权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                powerApi.del({id: row.id})
                    .then(res => {
                        if (res.code == 200) {
                            this.$message.success('删除成功');
                        } else {
                            this.$message.error('删除失败:' + res.msg);
                        }
                        searchList(this);
                    });
            });
        },

        disable(row){
            this.$confirm('此操作将禁用该功能权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                powerApi.disable({id: row.id})
                    .then(res => {
                        if (res.code == 200) {
                            this.$message.success('禁用成功');
                        } else {
                            this.$message.error('禁用失败:' + res.msg);
                        }
                        searchList(this);
                    });
            });
        },

        enable(row){
            this.$confirm('此操作将启用该功能权限, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                powerApi.enable({id: row.id})
                    .then(res => {
                        if (res.code == 200) {
                            this.$message.success('启用成功');
                        } else {
                            this.$message.error('启用失败:' + res.msg);
                        }
                        searchList(this);
                    });
            });
        },

        // 分页
        getCurrentPage(val) {
            this.pageNo = val;
            searchList(this);

        },
        change(index){
            console.log(index);
        }
    },
    mounted() {
        //do something after mounting vue instance
        // 业务子系统
        powerApi.getAllList().then((res)=>{
            //console.log(res.data.list,"业务子系统")
            if(res.code==200){
                this.systemList=res.data.list;
                for(let i=0;i<this.systemList.length;i++){
                    sessionStorage.setItem('systemName',this.systemList[0].code)
                    sessionStorage.setItem('belongSystem',this.systemList[0].name)
                }
                searchList(this);
            }
        })
        // 父节点
        powerApi.getParentList().then((res)=>{
            console.log(res,"powerParent");
            if(res.code==200){
                this.parentIdOptions=res.data.list;
            }
        })
    },
}
</script>
<style scoped>
/*  左侧系统列表 */
.power-list .system-list{
    width: 15%;
    margin-top: 10px;
    background: #e0e1e7;
    text-align: left;
}
.power-list .system-list h3{
    font-weight: normal;
    font-size: 20px;
    line-height: 40px;
    padding-left: 10px;
    cursor:pointer;
}
.power-list .active{
    background:#C0C0C0;
}
.power-list .el-switch{
    margin-top: 8px;
}

</style>
