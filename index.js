'use strict';

// Entity APIs
const   GetApi                  = require('./entities/getApi'),
        CrudApi                 = require('./entities/crudApi'),
        BoardsApi               = require('./entities/boardsApi'),
        BookingsApi             = require('./entities/bookingsApi'),
        CommentsApi             = require('./entities/commentsApi'),
        CompaniesApi            = require('./entities/companiesApi'),
        ContractsApi            = require('./entities/contractsApi'),
        CustomFieldsApi         = require('./entities/customFieldsApi'),
        DashboardsApi           = require('./entities/dashboardsApi'),
        DealsApi                = require('./entities/dealsApi'),
        EmailsApi               = require('./entities/emailsApi'),
        ExpensesApi             = require('./entities/expensesApi'),
        ImportsApi              = require('./entities/importsApi'),
        InvoicesApi             = require('./entities/invoicesApi'),
        InvitationsApi          = require('./entities/invitationsApi'),
        NotificationsApi        = require('./entities/notificationsApi'),
        PeopleApi               = require('./entities/peopleApi'),
        ProjectsApi             = require('./entities/projectsApi'),
        ReportsApi              = require('./entities/reportsApi'),
        SalariesApi             = require('./entities/salariesApi'),
        SearchApi               = require('./entities/searchApi'),
        ServicesApi             = require('./entities/servicesApi'),
        TimeEntriesApi          = require('./entities/timeEntriesApi'),
        UsersApi                = require('./entities/usersApi');

const   Request                 = require('./utils/request'),
        apiPaths                = require('./apiPaths');


module.exports = class ProductiveClient {

    /**
     * Productive.io API Wrapper
     *
     * const prodClient = new ProductiveClient({
     *      organizationId: 'ORG_ID_HERE',
     *      token: 'API_TOKEN_HERE',
     *      debug: false,
     *      defaultPageSize: 200
     * });
     *
     * const invoice = prodClient.invoice.get(1234);
     *
     * @class ProductiveClient
     * @param {object} config
     */
    constructor(config) {

        if (!config.organizationId || !config.token) {
            throw new Error("Failed to provide a valid config object when constructing ProductiveClient");
        }

        this.apiPaths = apiPaths;

        config.apiUrl = config.apiUrl ? config.apiUrl : apiPaths.API;

        const request = new Request(config);
        this._request = request;

    }

    /**
     * A collection of methods related to Activities.
     *
     * See https://developer.productive.io/#activities for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new GetApi
     */
    get activities() {
        return new GetApi(this, apiPaths.ACTIVITIES);
    }

    /**
     * A collection of methods related to Attachments.
     *
     * See https://developer.productive.io/#attachments for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Crud} Instance of new CrudApi
     */
    get attachments() {
        return new CrudApi(this, apiPaths.ATTACHMENTS);
    }

    /**
     * A collection of methods related to Boards.
     *
     * See https://developer.productive.io/#boards for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {BoardApi} Instance of new BoardApi
     */
    get boards() {
        return new BoardsApi(this, apiPaths.BOARDS);
    }

    /**
     * A collection of methods related to Bookings.
     *
     * See https://developer.productive.io/#bookings for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns  {BookingsApi} Instance of new BookingsApi
     */
    get bookings() {
        return new BookingsApi(this, apiPaths.BOOKINGS);
    }

    /**
     * A collection of methods related to Comments.
     *
     * See https://developer.productive.io/#comments for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns  {CommentsApi} Instance of new BookingsApi
     */
    get comments() {
        return new CommentsApi(this, apiPaths.COMMENTS);
    }

    /**
     * A collection of methods related to Companies.
     *
     * See https://developer.productive.io/#companies for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns  {CompaniesApi} Instance of new BookingsApi
     */
    get companies() {
        return new CompaniesApi(this, apiPaths.COMPANIES);
    }

    /**
     * A collection of methods related to Contact Entries.
     *
     * See https://developer.productive.io/#contact-entries for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CrudApi
     */
    get contactEntries() {
        return new CrudApi(this, apiPaths.CONTACT_ENTRIES);
    }

    /**
     * A collection of methods related to Contracts.
     *
     * See https://developer.productive.io/#contracts for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new ContractsApi
     */
    get contracts() {
        return new ContractsApi(this, apiPaths.CONTRACTS);
    }

    /**
     * A collection of methods related to Custom fields.
     *
     * See https://developer.productive.io/#custom-fields for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CustomFieldsApi
     */
    get customFields() {
        return new CustomFieldsApi(this, apiPaths.CUSTOM_FIELDS);
    }

    /**
     * A collection of methods related to Dashboards.
     *
     * See https://developer.productive.io/#dashboards for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CustomFieldsApi
     */
    get dashboards() {
        return new DashboardsApi(this, apiPaths.DASHBOARDS);
    }

    /**
     * A collection of methods related to Deals.
     *
     * See https://developer.productive.io/#deal for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new DealsApi
     */
    get deals() {
        return new DealsApi(this, apiPaths.DEALS);
    }

    /**
     * A collection of methods related to Document Types.
     *
     * See https://developer.productive.io/#document-types for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CrudApi
     */
    get documentTypes() {
        return new CrudApi(this, apiPaths.DOCUMENT_TYPES);
    }

    /**
     * A collection of methods related to Emails.
     *
     * See https://developer.productive.io/#emails for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new EmailsApi
     */
    get emails() {
        return new EmailsApi(this, apiPaths.EMAILS);
    }

    /**
     * A collection of methods related to Events.
     *
     * See https://developer.productive.io/#events for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CrudApi
     */
    get events() {
        return new CrudApi(this, apiPaths.EVENTS);
    }

    /**
     * A collection of methods related to Expenses.
     *
     * See https://developer.productive.io/#expenses for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new ExpensesApi
     */
    get expenses() {
        return new ExpensesApi(this, apiPaths.EVENTS);
    }

    /**
     * A collection of methods related to Filters.
     *
     * See https://developer.productive.io/#filters for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CrudApi
     */
    get filters() {
        return new CrudApi(this, apiPaths.FILTERS);
    }

    /**
     * A collection of methods related to Holidays.
     *
     * See https://developer.productive.io/#holidays for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new CrudApi
     */
    get holidays() {
        return new CrudApi(this, apiPaths.HOLIDAYS);
    }

    /**
     * A collection of methods related to Imports.
     *
     * See https://developer.productive.io/#imports for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new ImportsApi
     */
    get imports() {
        return new ImportsApi(this, apiPaths.IMPORTS);
    }

    /**
     * A collection of methods related to Invitations.
     *
     * See https://developer.productive.io/#invitations for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new InvitationsApi
     */
    get invitations() {
        return new InvitationsApi(this, apiPaths.INVOICES);
    }

    /**
     * A collection of methods related to Invoices.
     *
     * See https://developer.productive.io/#invoices for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new InvoiceApi
     */
    get invoices() {
        return new InvoicesApi(this, apiPaths.INVOICES);
    }

    /**
     * A collection of methods related to Notifications.
     *
     * See https://developer.productive.io/#notifications for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new NotificationsApi
     */
    get notifications() {
        return new NotificationsApi(this, apiPaths.NOTIFICATIONS);
    }

    /**
     * A collection of methods related to Overheads.
     *
     * See https://developer.productive.io/#overheads for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {object} Instance of new GetApi
     */
    get overheads() {
        return new GetApi(this, apiPaths.OVERHEADS);
    }

    /**
     * A collection of methods related to Pages.
     *
     * See https://developer.productive.io/#pages for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new CrudApi
     */
    get pages() {
        return new CrudApi(this, apiPaths.PAGES);
    }

    /**
     * A collection of methods related to Payments.
     *
     * See https://developer.productive.io/#payments for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new CrudApi
     */
    get payments() {
        return new CrudApi(this, apiPaths.PAYMENTS);
    }

    /**
     * A collection of methods related to People.
     *
     * See https://developer.productive.io/#people for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new PeopleApi
     */
    get people() {
        return new PeopleApi(this, apiPaths.PEOPLE);
    }

    /**
     * A collection of methods related to Prices.
     *
     * See https://developer.productive.io/#prices for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new CrudApi
     */
    get prices() {
        return new CrudApi(this, apiPaths.PRICES);
    }

    /**
     * A collection of methods related to Projects.
     *
     * See https://developer.productive.io/#projects for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new ProgressReportsApi
     */
    get projects() {
        return new ProjectsApi(this, apiPaths.PROJECTS);
    }

    /**
     * The Productive request object that is used for all API calls. It can also be used for non wrapped API calls directly.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of Productive request object that is used for all API calls
     */
    get request() {
        return this._request;
    }

    /**
     * The Productive request object that is used for all API calls. It can also be used for non wrapped API calls directly.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of Productive request object that is used for all API calls
     */
    get reports() {
        return new ReportsApi(this);
    }

    /**
     * A collection of methods related to Salaries.
     *
     * See https://developer.productive.io/#salaries for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new ProgressReportsApi
     */
    get salaries() {
        return new SalariesApi(this, apiPaths.SALARIES);
    }

    /**
     * A collection of methods related to Search.
     *
     * See https://developer.productive.io/#search for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new SearchApi
     */
    get search() {
        return new SearchApi(this, apiPaths.SEARCH);
    }

    /**
     * A collection of methods related to Services.
     *
     * See https://developer.productive.io/#services for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new ServicesApi
     */
    get services() {
        return new ServicesApi(this, apiPaths.SERVICES);
    }

    /**
     * A collection of methods related to Subsidiaries.
     *
     * See https://developer.productive.io/#subsidiaries for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new CrudApi
     */
    get subsidiaries() {
        return new CrudApi(this, apiPaths.SUBSIDIARIES);
    }

    /**
     * A collection of methods related to Tags.
     *
     * See https://developer.productive.io/#subsidiaries for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new GetApi
     */
    get tags() {
        return new GetApi(this, apiPaths.SUBSIDIARIES);
    }

    /**
     * A collection of methods related to Tasks.
     *
     * See https://developer.productive.io/#tasks for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new CrudApi
     */
    get tasks() {
        return new CrudApi(this, apiPaths.TASKS);
    }

    /**
     * A collection of methods related to Time Entries.
     *
     * See https://developer.productive.io/#time-entries for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new TimeEntriesApi
     */
    get timeEntries() {
        return new TimeEntriesApi(this, apiPaths.TIME_ENTRIES);
    }

    /**
     * A collection of methods related to Todos.
     *
     * See https://developer.productive.io/#todos for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new TodosApi
     */
    get todos() {
        return new CrudApi(this, apiPaths.TODOS);
    }

    /**
     * A collection of methods related to Users.
     *
     * See https://developer.productive.io/#users for params (filter, sort, page) and data structure.
     *
     * @readonly
     * @memberof ProductiveClient
     * @returns {Get} Instance of new UsersApi
     */
    get users() {
        return new UsersApi(this, apiPaths.USERS);
    }

}
