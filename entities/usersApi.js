'use strict';

const GetApi = require('./getApi');

module.exports = class UsersApi extends GetApi {

    constructor(client, path) {
        super(client, path);
        this.client = client;
        this.path = path;
    }

    /**
     * @param {(string|number)} id
     * @param {Object} data
     * @returns {Promise} Promise object represents the data
     */
    update(id, data) {
        return this.client.request.patch(`${this.path}/${id}`, data);
    }

}