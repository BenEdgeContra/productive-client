'use strict';

const GetApi = require('./getApi'),
      CrudApi = require('./crudApi'),
      apiPaths = require('../apiPaths');

module.exports = class BoardsApi extends GetApi {

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

    /**
     * A collection of methods related to Task Lists.
     *
     * See https://developer.productive.io/#task-lists for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new CrudApi
     */
    get taskLists() {
        return new CrudApi(this, apiPaths.TASK_LISTS);
    }

}