/**
 * 日志管理
 * Created by fu_gh on 2018-02-02 15:27
 */

import BaseApi  from './BaseApi';

class LogApi extends BaseApi{

    /**
     * 日志分页列表
     * @returns {AxiosPromise}
     */
    getPageList(param){
        return this._apiGet('/api/log/pagelist',param);
    }
}

export default LogApi;
