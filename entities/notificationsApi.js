'use strict';

module.exports = class NotificationsApi {

    constructor(client, path) {
        this.client = client;
        this.path = path;
    }

    /**
     * @param {Object} data
     * @returns {Promise} Promise object represents the data
     */
    get(data) {
        return this.client.request.get(`${this.path}`, data);
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    show(id) {
        return this.client.request.post(`${this.path}/${id}`);
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    read(id) {
        return this.client.request.post(`${this.path}/${id}/read`);
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    dismiss(id) {
        return this.client.request.patch(`${this.path}/${id}/dismiss`);
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    undismiss(id) {
        return this.client.request.patch(`${this.path}/${id}/undismiss`);
    }

}