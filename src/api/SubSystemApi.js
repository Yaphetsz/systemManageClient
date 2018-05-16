/**
 * 业务子系统
 * Created by fu_gh on 2018-01-26 11:44
 */

import BaseApi from './BaseApi';

class SubSystemApi extends BaseApi{

    /**
     * 分页列表
     * @param param
     * @returns {AxiosPromise}
     */
    getPageList(param){
        return this._apiGet('/api/subsystem/pagelist',param);
    }

    /**
     * 添加
     * @param param
     * @returns {AxiosPromise}
     */
    add(param){
        return this._apiGet('/api/subsystem/add',param);
    }

    /**
     * 编辑
     * @param param
     * @returns {AxiosPromise}
     */
    edit(param){
        return this._apiGet('/api/subsystem/edit',param);
    }

    /**
     * 删除
     * @param param
     * @returns {AxiosPromise}
     */
    del(param){
        return this._apiGet('/api/subsystem/del',param);
    }
}

export default SubSystemApi;
