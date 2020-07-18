'use strict';

module.exports = class InvitationsApi {

    constructor(client, path) {
        this.client = client;
        this.path = path;
    }

    /**
     * @param {Object} data
     * @returns {Promise} Promise object represents the data
     */
    getById(id) {
        return this.client.request.get(`${this.path}/${id}`);
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

}