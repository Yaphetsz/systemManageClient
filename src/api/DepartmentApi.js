import BaseAPI from './BaseApi';

class DepartmentApi extends BaseAPI{
    /**
     * 所有机构列表  （公司）
     * @returns {AxiosPromise}
     */
    allCompanys(){
        return this._apiGet('/api/department/allcompanys');
    }

    /**
     * 所有组织架构列表  (父部门)
     * @returns {AxiosPromise}
     */
    departmentList(){
        return this._apiGet('/api/department/list');
    }

    /**
     * 组织架构树形的列表
     * @returns {AxiosPromise}
     */
    departmentTreelist(){
        return this._apiGet('/api/department/treelist');
    }

    /**
     * 组织架构 详情
     * @returns {AxiosPromise}
     */
    departmentDetail(param){
        return this._apiGet('/api/department/detail',param);
    }

    /**
     * 组织架构 添加
     * @returns {AxiosPromise}
     */
    departmentAdd(param){
        return this._apiGet('/api/department/add',param);
    }

    /**
     * 组织架构 编辑详情
     * @returns {AxiosPromise}
     */
    departmentEdititem(param){
        return this._apiGet('/api/department/edititem',param);
    }

    /**
     * 组织架构编辑 添加
     * @returns {AxiosPromise}
     */
    departmentEdit(param){
        return this._apiGet('/api/department/edit',param);
    }


    /**
     * 组织架构部门删除
     * @returns {AxiosPromise}
     */
    departmentDel(param){
        return this._apiGet('/api/department/del',param);
    }

}

export default DepartmentApi;
