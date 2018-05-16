/**
 *  公告管理
 * Created by fu_gh on 2018-03-09 15:59
 */

import BaseApi from './BaseApi';

class NoticeApi extends BaseApi{

    /**
     * 分页列表
     * @param param
     * @returns {AxiosPromise}
     */
    getPageList(param){
        return this._apiGet('/api/notice/pagelist',param);
    }

    /**
     * 添加
     * @param param
     * @returns {AxiosPromise}
     */
    add(param){
        return this._apiPost('/api/notice/add',param);
    }

    /**
     * 编辑
     * @param param
     * @returns {AxiosPromise}
     */
    edit(param){
        return this._apiPost('/api/notice/edit',param);
    }

    /**
     * 撤回
     * @param param
     * @returns {AxiosPromise}
     */
    withdraw(param){
        return this._apiGet('/api/notice/withdraw',param);
    }

    /**
     * 详情
     * @param param
     * @returns {AxiosPromise}
     */
    getItem(param){
        return this._apiGet('/api/notice/item',param);
    }

    /**
     * 我的公告列表
     * @param param
     * @returns {AxiosPromise}
     */
    getMyPageList(param){
        return  this._apiGet('/api/notice/mypagelist',param);
    }
}

export default  NoticeApi;
