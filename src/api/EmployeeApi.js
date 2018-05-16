import BaseAPI from './BaseApi';

class EmployeeApi extends BaseAPI{

    /**
     * 员工查询列表
     * @returns {AxiosPromise}
     */
    employeeList(param){
        return this._apiGet('/api/employee/pagelist',param);
    }

    /**
     * 员工添加
     * @returns {AxiosPromise}
     */
    employeeAdd(param){
        return this._apiGet('/api/employee/add',param);
    }

    /**
     * 员工编辑详情
     * @returns {AxiosPromise}
     */
    employeeEdititem(param){
        return this._apiGet('/api/employee/edititem',param);
    }

    /**
     * 员工编辑修改
     * @returns {AxiosPromise}
     */
    employeeEdit(param){
        return this._apiGet('/api/employee/edit',param);
    }

    /**
     * 员工详情
     * @returns {AxiosPromise}
     */
    employeeDetail(param){
        return this._apiGet('/api/employee/detail',param);
    }

    /**
     * 员工重置密码
     * @returns {AxiosPromise}
     */
    employeeReset(param){
        return this._apiGet('/api/employee/resetpwd',param);
    }

    /**
     * 离职
     * @param param
     * @returns {AxiosPromise}
     */
    dimission(param){
        return this._apiGet('/api/employee/dimission',param);
    }

    /**
     * 机构自定义
     * @param param
     * @returns {AxiosPromise}
     */
    definePost(param){
        return this._apiGet('/api/employee/customcompany',param);
    }
    /**
     * 机构自定义详情 http://127.0.0.1:3100/api/employee/customcompanydetail?id=1515998263032
     * @param param
     * @returns {AxiosPromise}
     */
    definePostDetail(param){
        return this._apiGet('/api/employee/customcompanydetail',param);
    }
}

export default EmployeeApi;
