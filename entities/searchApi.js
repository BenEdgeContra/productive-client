'use strict';

module.exports = class SearchApi {

    constructor(client, path) {
        this.client = client;
        this.path = path;
    }

    /**
     * @param {(object)} data
     * @returns {Promise} Promise object represents the data
     */
    get(data) {
        return this.client.request.get(`${this.path}`, data);
    }

}