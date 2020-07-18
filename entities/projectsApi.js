'use strict';

const CrudApi = require('./crudApi');

module.exports = class ProjectsApi extends CrudApi {

    constructor(client, path) {
        super(client, path);
        this.client = client;
        this.path = path;
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
     * @param {(string|number)} id
     * @returns {Promise} Promise object represents the data
     */
    copy(id) {
        return this.client.request.post(`${this.path}/${id}/copy`);
    }

    /**
     * A collection of methods related to Project Assignements.
     *
     * See https://developer.productive.io/#project-assignments for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CrudApi
     */
    get assignments() {
        return new CrudApi(this.client, this.client.apiPaths.PROJECT_ASSIGNMENTS);
    }

}