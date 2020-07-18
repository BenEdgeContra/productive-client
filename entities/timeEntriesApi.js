'use strict';

const CrudApi = require('./crudApi');

module.exports = class TimeEntriesApi extends CrudApi {

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

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    bulkApprove(data) {
        return this.client.request.patch(`${this.path}/bulk_approve`, data);
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    start(id) {
        return this.client.request.post(`${this.path}/${id}/start`);
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    stop(id) {
        return this.client.request.post(`${this.path}/${id}/stop`);
    }

}