'use strict';

const CrudApi = require('./crudApi');

module.exports = class BoardApi extends CrudApi {

    constructor(client, path) {
        super(client, path);
        this.client = client;
        this.path = path;
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    approve(id) {
        return this.client.request.patch(`${this.path}/${id}/approve`);
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    unapprove(id) {
        return this.client.request.patch(`${this.path}/${id}/unapprove`);
    }

}