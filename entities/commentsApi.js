'use strict';

module.exports = class CommentsApi {

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

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    pin(id) {
        return this.client.request.patch(`${this.path}/${id}/pin`);
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    unpin(id) {
        return this.client.request.patch(`${this.path}/${id}/unpin`);
    }

}