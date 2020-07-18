'use strict';

const GetApi = require('./getApi'),
      CustomFieldsOptionsApi = require('./customFieldsOptionsApi');

module.exports = class CustomFieldsApi extends GetApi {

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
     * A collection of methods related to Custom field options.
     * See https://developer.productive.io/#custom-field-options for params (filter, sort, page) and data structure.
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CrudApi
     */
    get options() {
        return new CustomFieldsOptionsApi(this.client, this.client.apiPaths.CUSTOM_FIELD_OPTIONS);
    }

}