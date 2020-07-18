'use strict';

const CrudApi = require("./crudApi"),
      apiPaths = require("../apiPaths");

module.exports = class ReportsApi {

    constructor(client, path) {
        this.client = client;
        this.path = path;
        this.apiPaths = apiPaths;
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    booking(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_BOOKINGS}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    budget(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_BUDGET}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    categories() {
        return new CrudApi(this.client, this.apiPaths.REPORT_CATEGORIES);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    company(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_COMPANY}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    deal(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_DEAL}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    expenses(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_EXPENSES}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    financialItem(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_FINANCIAL_ITEM}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    invoice(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_INVOICE}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    payment(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_PAYMENT}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    person(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_PERSON}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    profitability(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_PROFITABILITY}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    progress(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_PROGRESS}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    salary(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_SALARY}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    sales(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_SALES}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    project(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_PROJECT}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    service(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_SERVICE}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    task(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_TASK}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    timeEntry(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_TIME_ENTRY}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    time(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_TIME}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    timeCompany(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_TIME_COMPANY}`, param);
    }

    /**
     * @param {object} Params
     * @returns {Promise} Promise object represents the data
     */
    timeSheet(param) {
        return this.client.request.get(`${this.apiPaths.REPORTS_TIMESHEET}`, param);
    }

}