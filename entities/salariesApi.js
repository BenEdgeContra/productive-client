'use strict';

const CrudApi = require('./crudApi');


module.exports = class SalariesApi extends CrudApi {

    constructor(client, path) {
        super(client, path);
        this.client = client;
        this.path = path;
    }

    /**
     * A collection of methods related to Dashboard widgets.
     * See https://developer.productive.io/#widgets for params (filter, sort, page) and data structure.
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CrudApi
     */
    get reports() {
        return new CrudApi(this.client, this.client.apiPaths.WIDGETS);
    }

}