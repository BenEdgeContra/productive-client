'use strict';

const axios         = require('axios'),
      qs            = require('qs');


module.exports = class Request {

    constructor(config) {

        if (!config.organizationId || !config.token) {
            throw new Error("Failed to provide a valid config object when constructing ProductiveClient");
        }

        let request = axios.create({
            headers: {
                'Content-Type': 'application/vnd.api+json; ext=bulk',
                'X-Auth-Token': config.token,
                'X-Organization-Id': config.organizationId
            },
            baseURL: config.apiUrl,
            paramsSerializer: (params) => {
                if (!params.defaultPageSize) {
                    params['page[size]'] = config.defaultPageSize || 200;
                }
                return qs.stringify(params, {arrayFormat: 'brackets'});
            }
        });

        if (config.debug) {
            request.interceptors.request.use(this._handleRequest);
        }

        request.interceptors.response.use(this._handleSuccess, this._handleError);
        this.request = request;
    }

    /**
     * @param {request}
     * @returns {request}
     */
    _handleRequest(request) {
        console.debug('Productive API Request:', {
            time: new Date(),
            method: request.method,
            url: `${request.baseURL}${request.url}`,
            params: request.paramsSerializer(request.params),
            data: request.data
        });
        return request;
    }

    /**
     * @param {*} response
     * @returns {JSON} response.data
     */
    _handleSuccess(response) {
        // TODO: Should we handle a different response for things like DELETE where no data is returned?
        return new Data(response.data);
    }

    /**
     * @param {*} error
     * @returns {Promise.reject()} error
     */
    _handleError(error) {
        return Promise.reject(error);
    }

    /**
     * Wrapper for any GET requests
     *
     * @param {string} path
     * @returns {promise} axios request resolving to the response JSON
     */
    get(path, params = {}) {
        return this.request.get(path, { params });
    }

    /**
     * Wrapper for any and all POST requests
     *
     * @param {string} path
     * @param {JSON} [data={}]
     * @param {JSON} [params={}]
     * @returns {promise} axios request resolving to the response JSON
     */
    post(path, data = {}) {
        return this.request.post(path, data);
    }

    /**
     * Wrapper for any and all PATCH requests
     *
     * @param {string} path
     * @param {JSON} [data={}]
     * @returns {promise} axios request resolving to the response JSON
     */
    patch(path, data = {}) {
        return this.request.patch(path, data);
    }

    /**
     * Wrapper for any and all DELETE requests
     *
     * @param {string} path
     * @param {JSON} [data={}]
     * @param {JSON} [params={}]
     * @returns {promise} axios request resolving to the response JSON
     */
    delete(path) {
        return this.request.delete(path)
    }

}

/**
 *
 *
 * @class Data
 */
class Data {

    constructor(data) {
        this.data = data.data;
        this.included = data.included;
        this.links = data.links;
        this.meta = data.meta;
    }

    /**
     * Returns that data for the relationship.
     *
     * @param {number} index of the item in data that you want to find the relationship value for
     * @param {string} key representing the relationship (eg 'service') which can be chained (eg 'service.deal.project')
     * @returns {(Object|Array)}
     * @memberof Data
     */
    getRelation(item, key) {

        const keys = key.split('.');
        let lastNode = item;

        for (var i = 0; i < keys.length; i++) {
            const relationship = lastNode.relationships[keys[i]]
            const id = relationship.data.id;
            const included = this.included.filter(item => item.id == id);
            lastNode = included[0];
        }

        return lastNode;
    }

}
