'use strict';

const CrudApi = require('./crudApi');


module.exports = class DealsApi extends CrudApi {

    constructor(client, path) {
        super(client, path);
        this.client = client;
        this.path = path;
    }

    /**
     * A collection of methods related to Deal statuses widgets.
     *
     * See https://developer.productive.io/#deal-statuses for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CrudApi
     */
    get statuses() {
        return new CrudApi(this.client, this.client.apiPaths.DEAL_STATUSES);
    }

    /**
     * A collection of methods related to Deal Lost Reasons widgets.
     *
     * See https://developer.productive.io/#lost-reasons for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CrudApi
     */
    get lostReasons() {
        return new CrudApi(this.client, this.client.apiPaths.DEAL_LOST_REASONS);
    }

}