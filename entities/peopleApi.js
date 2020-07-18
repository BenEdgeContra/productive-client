'use strict';

const GetApi = require('./getApi');

module.exports = class PeopleApi extends GetApi {

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
     * @param {Object} data
     * @returns {Promise} Promise object represents the data
     */
    invite(id, data) {
        return this.client.request.patch(`${this.path}/${id}/invite`, data);
    }

    /**
     * Resend email to person
     *
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    resend(id) {
        return this.client.request.patch(`${this.path}/${id}/resend`);
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    activate(id) {
        return this.client.request.patch(`${this.path}/${id}/activate`);
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    deactivate(id) {
        return this.client.request.patch(`${this.path}/${id}/deactivate`);
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    archive(id) {
        return this.client.request.patch(`${this.path}/${id}/archive`);
    }

    /**
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    restore(id) {
        return this.client.request.patch(`${this.path}/${id}/restore`);
    }

}