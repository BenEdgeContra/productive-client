'use strict';

const CrudApi = require('./crudApi');


module.exports = class ServicesApi extends CrudApi {

    constructor(client, path) {
        super(client, path);
        this.client = client;
        this.path = path;
    }

    /**
     * A collection of methods related to Service Types.
     * See https://developer.productive.io/#service-types for params (filter, sort, page) and data structure.
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CrudApi
     */
    get types() {
        return new CrudApi(this.client, this.client.apiPaths.SERVICE_TYPES);
    }

}