import BaseAPI from './BaseApi';

class PowerApi extends BaseAPI{

    /**
     * 业务子系统  所有岗位列表
     * @returns {AxiosPromise}
     */
    getAllList(){
        return this._apiGet('/api/subsystem/alllist');
    }

    /**
     * 功能权限父节点
     * @returns {AxiosPromise}
     */
    getParentList(){
        return this._apiGet('/api/power/parentlist');
    }

    /**
     * 功能权限列表
     * @returns {AxiosPromise}
     */
    getPageList(param){
        return this._apiGet('/api/power/pagelist',param);
    }

    /**
     * 添加
     * @returns {AxiosPromise}
     */
    addPower(param){
        return this._apiGet('/api/power/add',param);
    }

    /**
     * 编辑详情
     * @returns {AxiosPromise}
     */
    editPowerDetail(param){
        return this._apiGet('/api/power/edititem',param);
    }

    /**
     * 编辑修改
     * @returns {AxiosPromise}
     */
    powerEdit(param){
        return this._apiGet('/api/power/edit',param);
    }

    /**
     * 功能权限树形列表
     * @returns {AxiosPromise}
     */
    powerTreeList(){
        return this._apiGet('/api/power/treelist');
    }

    /**
     * 删除
     * @param param
     * @returns {AxiosPromise}
     */
    del(param){
        return this._apiGet('/api/power/del',param);
    }

    /**
     * 禁用
     * @param param
     * @returns {AxiosPromise}
     */
    disable(param){
        return this._apiGet('/api/power/disable',param);
    }

    /**
     * 启用
     * @param param
     * @returns {AxiosPromise}
     */
    enable(param){
        return this._apiGet('/api/power/enable',param);
    }

    /**
     * 功能权限详情
     * @param param
     * @returns {AxiosPromise}
     */
    powerDetail(param){
        return this._apiGet('/api/power/detail',param);
    }
}

export default PowerApi;
