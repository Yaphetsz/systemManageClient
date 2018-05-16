import BaseAPI from './BaseApi';

class JobApi extends BaseAPI{

    /**
     * 岗位列表
     * @returns {AxiosPromise}
     */
    allList(param){
        return this._apiGet('/api/job/alllist',param);
    }

    /**
     * 分页列表 api/job/pagelist?page_no=1  分页列表   还有 name 查询条件
     * @returns {AxiosPromise}
     */
    pageList(param){
        return this._apiGet('api/job/pagelist',param);
    }

    /**
     * 岗位添加
     * @returns {AxiosPromise}
     */
    jobAdd(param){
        return this._apiGet('api/job/add',param);
    }

    /**
     * 岗位编辑详情
     * @returns {AxiosPromise}
     */
    editItem(param){
        return this._apiGet('api/job/edititem',param);
    }

    /**
     * 岗位编辑
     * @returns {AxiosPromise}
     */
    jobEdit(param){
        return this._apiGet('api/job/edit',param);
    }

    /**
     * 岗位详情
     * @returns {AxiosPromise}
     */
    jobDetail(param){
        return this._apiGet('api/job/detail',param);
    }

    /**
     * 岗位删除
     * @returns {AxiosPromise}
     */
    del(param){
        return this._apiGet('api/job/del',param);
    }
}

export default JobApi;
