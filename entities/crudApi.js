'use strict';

const GetApi = require('./getApi');

module.exports = class CrudApi extends GetApi {

    constructor(client, path) {
        super(client, path);
        this.client = client;
        this.path = path;
    }

    /**
     * @param {Object} data
     * @returns {Promise} Promise object represents the data
     */
    create(data) {
        return this.client.request.post(`${this.path}`, data);
    }

    /**
     * @param {(string|number)} id
     * @param {Object} data
     * @returns {Promise} Promise object represents the data
     */
    update(id, data) {
        return this.client.request.patch(`${this.path}/${id}`, data);
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    remove(id) {
        return this.client.request.delete(`${this.path}/${id}`);
    }

}