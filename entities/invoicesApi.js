'use strict';

const CrudApi = require('./crudApi');

module.exports = class InvoicesApi extends CrudApi {

    constructor(client, path) {
        super(client, path);
        this.client = client;
        this.path = path;
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    send(id, data) {
        return this.client.request.post(`${this.path}/${id}/send`, data);
    }

    /**
     * A collection of methods related to Invoice Line Items.
     *
     * See https://developer.productive.io/#line-items for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CrudApi
     */
    get lineItems() {
        return new CrudApi(this.client, this.client.apiPaths.INVOICE_LINES);
    }

    /**
     * A collection of methods related to Invoice attributions.
     *
     * See https://developer.productive.io/#invoice-attributions for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CrudApi
     */
    get attributions() {
        return new CrudApi(this.client, this.client.apiPaths.INVOICE_ATTRIBUTIONS);
    }

}