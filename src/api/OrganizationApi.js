/**
 * 机构管理
 * Created by fu_gh on 2018-04-04 15:47
 */
import BaseApi from './BaseApi';

class OrganizationApi extends BaseApi{

    /**
     * 分页查询列表
     * @param param
     * @returns {AxiosPromise}
     */
    getPageList(param){
        return this._apiGet('/api/organization/pagelist',param);
    }
}

export default  OrganizationApi;
