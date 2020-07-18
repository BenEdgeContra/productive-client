'use strict';

module.exports = class GetApi {

    constructor(client, path) {
        this.client = client;
        this.path = path;
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    getById(id) {
        return this.client.request.get(`${this.path}/${id}`);
    }

    /**
     * @param {object} [params]
     * @returns {Promise} Promise object represents the data
     */
    get(params) {
        return this.client.request.get(`${this.path}`, params);
    }

}