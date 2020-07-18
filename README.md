# Productive.io API Client
A client wrapper for the Productive v2 API at https://developer.productive.io.

Maintained by [Contra Agency](https://www.contra.agency).

## Installation
```
$ yarn add productive-client
```
or
```
$ npm install --save productive-client
```

## Contents
- [Instantiate client](#Instantiate-client)
- [Example (async get)](#example-async-get)
- [Example (async create)](#Example-async-create)
- [Example (async update)](#Example-async-update)
- [Other examples (promise, filtering, sorting,)](#Other-examples)
- [Response object](#Response-object)
  - [Relationships](#Relationships)
- [Entity API's](#Entity-APIs)



## Instantiate client
```
const ProductiveClient = require('productive-client');

const productive = new ProductiveClient({
    organizationId: 'YOUR_ORG_ID',
    token: 'YOUR_API_TOKEN'
});
```
The full config object contains some additional optional properties:
```
const config = {
    organizationId: 'YOUR_ORG_ID',
    token: 'YOUR_API_TOKEN',
    debug: false,
    defaultPageSize: 200
}
```
When `debug` is set to `true` the API request will be printed to the console.

## Example (async get)
```
try {
    const invoice = await productive.invoices.getById(1234);
    const invoiceLines = await productive.invoices.lines.getById(invoice.data.id);
} catch (err) {
    console.log(err);
    throw(err);
}
```

## Example (async create)
```
try {
    // Create new service
    const serviceParams = {
        "name": "My new service"
        "pricing_type_id": 1
        "unit_id": 2
        "deal_id": 1718
    }
    const service = {
        "data": {
            "type": "services",
            "attributes": {
                "service_type_id": 1241,
                "name": "My new service",
                "pricing_type_id": 1,
                "unit_id": 2,
                "price": 100000,
                "quantity": "1.0"
            },
            "relationships": {
                "deal": {
                    "data": {
                        "type": "deals",
                        "id": "1718"
                    }
                }
            }
        }
    }
    const newService = await productive.services.create(serviceParams, service);
} catch (err) {
    console.log(err);
    throw err;
}
```
## Example (async update)
```
try {
    // Update task
    const task = {
        "data": {
            "type": "tasks",
            "attributes": {
                "title": "new title",
                "tag_list": [
                    "bug",
                    "ux"
                ],
                "closed": true
            },
            "relationships": {
                "subscribers": {
                    "data": [
                    {
                        "type": "people",
                        "id": "15899"
                    },
                    {
                        "type": "people",
                        "id": "15900"
                    }
                    ]
                }
            }
        }
    }
    const updatedTask = await productive.tasks.update(1234, task);
} catch (err) {
    console.log(err);
    throw err;
}
```
## Other examples

### Promise based
Each API returns a promise so you can use promises if you prefer.
```
const invoice = productive.invoices.getyId(1234)
    .then(data => {
        return data;
    })
    .catch(err => {
        console.log(err);
    });
```
### Pagination
The Productive API Client returns up to 200 results in each API request (which is the limit set by Productive). This can be reduced as a default or on an individual request level.
https://developer.productive.io/#header-pagination
```
// Set max to 50 for all requests
const productive = new ProductiveClient({
    organizationId: '1234',
    token: 'YOUR_API_TOKEN',
    defaultPageSize: 50
});

// Set max to 20 for this request and get page 2
const deals = await productive.deals.get({
    "page[number]": 2,
    "page[size]": 20
});
```

### Filtering
If you would like to add filtration to your query, you can do that by setting the supported filter parameters in the following way:
```
const deals = await productive.deals.get({
    "type": 1,
    "sales_status_id": 1
});
```

### Sorting
To sort query results, you can use sort parameter, passing available sort params for the resource:
```
const deals = await productive.deals.get({
    "type": 1,
    "sales_status_id": 1,
    "sort": "total_budget_total"
});
```
---
## Response object
The Productive API returns data in a consistent format. The key properties for an entity are stored within `data[i].attributes`.
```
{
    data: [
        id: "1",
        type: "someType",
        attributes: {
            ...
        },
        relationships: {
            ...
        }
    ],
    included: [
        ...
    ],
    links: {
        ...
    },
    meta: {
        ...
    }

}
```
### Relationships
A powerful feature of the API is that it returns an object containing the agrogated relationships of the items stored in `data`, meaning that if a number of items in `data` relate to a given entity, then that given entity is only returned once in the response object.
- `data[i].relationships` contains all the types and ids of the relations for `data[i]`
- `included` aggregates these relations and contains the full data of each relation contained within `data`

To make it simple to access this related data, the Productive API Client exposes a simple method on each API response called `getRelation()` allowing you to get the first or a chained relation from any item within the data array.

#### `getRelation(index)` full example
```
        // get the time entries for person 1234
        const today = moment().format('YYYY-MM-DD');
        const timeEntries = await prod.timeEntries.get({
            'filter[person_id]': 1234,
            'filter[after]': today,
            'filter[before]': today,
            'include': 'approver,rejecter,person,service.deal.company,service.deal.project.company,service.deal.project.project_manager.company,service.deal.project.project_manager.subsidiary,service.deal.contract,service.service_type,task.project.company,task.project.project_manager.company,task.project.project_manager.subsidiary,updater'
        });

        // loop over each one and add to an array
        const entries = []
        for (var i = 0; i < timeEntries.data.length; i++) {
            const item = timeEntries.data[i];
            const service = timeEntries.getRelation(item, 'service');
            const project = timeEntries.getRelation(item, 'service.deal.project');
            const minutes = parseInt(item.attributes.time);
            entries.push ({
                service,
                project,
                minutes
            });
        }
```

### Errors
Refer to: https://developer.productive.io/#header-errors

---
## Entity API's
Each endpoint in Productive's API is wrapped in an API allowing you to opperate on each endpoint in a simple and consistent fashion.

### `activities`
See https://developer.productive.io/#activities for params (filter, sort, page) and data structure.
```
productive.activities.getById(id);
productive.activities.get(uriParams);

```
### `attachments`
See https://developer.productive.io/#attachments for params (filter, sort, page) and data structure.
```
productive.attachments.getById(id);
productive.attachments.get(uriParams);
productive.attachments.create(data);
productive.attachments.update(id, uriParams);
productive.attachments.remove(id);
```
### `boards`
See https://developer.productive.io/#boards for params (filter, sort, page) and data structure.
```
productive.boards.getById(id);
productive.boards.get(uriParams);
productive.boards.create(data);
productive.boards.update(id, uriParams);
productive.boards.archive(id);
productive.boards.restore(id);
```
### `boards.tasksLists`
See https://developer.productive.io/#task-lists for params (filter, sort, page) and data structure.
```
productive.boards.taskLists.getById(id);
productive.boards.taskLists.get(uriParams);
productive.boards.taskLists.create(data);
productive.boards.taskLists.update(id, data);
productive.boards.taskLists.remove(id);
```
### `bookings`
See https://developer.productive.io/#bookings for params (filter, sort, page) and data structure.
```
productive.bookings.getById(id);
productive.bookings.get(uriParams);
productive.bookings.create(data);
productive.bookings.update(id, uriParams);
productive.bookings.remove(id);
productive.bookings.approve(id);
productive.bookings.unapprove(id);
```
### `comments`
See https://developer.productive.io/#comments for params (filter, sort, page) and data structure.
```
productive.comments.getById(id);
productive.comments.create(data);
productive.comments.update(id, uriParams);
productive.comments.remove(id);
productive.comments.pin(id);
productive.comments.unpin(id);
```
### `companies`
See https://developer.productive.io/#companies for params (filter, sort, page) and data structure.
```
productive.companies.getById(id);
productive.companies.get(uriParams);
productive.companies.create(data);
productive.companies.update(id, uriParams);
productive.companies.archive(id);
productive.companies.restore(id);
```
### `contactEntries`
See https://developer.productive.io/#contact-entries for params (filter, sort, page) and data structure.
```
productive.contactEntries.getById(id);
productive.contactEntries.get(uriParams);
productive.contactEntries.create(data);
productive.contactEntries.update(id, data);
productive.contactEntries.remove(id);
```
### `contracts`
See https://developer.productive.io/#contracts for params (filter, sort, page) and data structure.
```
productive.contracts.getById(id);
productive.contracts.get(uriParams);
productive.contracts.create(data);
productive.contracts.update(id, data);
```
### `customFields`
See https://developer.productive.io/#custom-fields for params (filter, sort, page) and data structure.
```
productive.customFields.getById(id);
productive.customFields.get(uriParams);
productive.customFields.create(data);
productive.customFields.update(id, data);
productive.customFields.archive(id);
```
### `customFields.options`
See https://developer.productive.io/#custom-field-options for params (filter, sort, page) and data structure.
```
productive.customFields.options.getById(id);
productive.customFields.options.get(uriParams);
productive.customFields.options.create(data);
productive.customFields.options.update(id, data);
productive.customFields.options.archive(id);
```

### `dashboards`
See https://developer.productive.io/#dashboards for params (filter, sort, page) and data structure.
```
productive.dashboards.getById(id);
productive.dashboards.get(uriParams);
productive.dashboards.create(data);
productive.dashboards.update(id, data);
productive.dashboards.remove(id);
```

### `dashboards.widgets`
See https://developer.productive.io/#widgets for params (filter, sort, page) and data structure.
```
productive.dashboards.widgets.getById(id);
productive.dashboards.widgets.get(uriParams);
productive.dashboards.widgets.create(data);
productive.dashboards.widgets.update(id, data);
productive.dashboards.widgets.remove(id);
```

### `deals`
See https://developer.productive.io/#deals for params (filter, sort, page) and data structure.
```
productive.dashboards.widgets.getById(id);
productive.dashboards.widgets.get(uriParams);
productive.dashboards.widgets.create(data);
productive.dashboards.widgets.update(id, data);
productive.dashboards.widgets.remove(id);
```

### `deals.statuses`
See https://developer.productive.io/#deal-statuses for params (filter, sort, page) and data structure.
```
productive.deals.statuses.getById(id);
productive.deals.statuses.get(uriParams);
productive.deals.statuses.create(data);
productive.deals.statuses.update(id, data);
productive.deals.statuses.remove(id);
```
### `deals.lostReasons`
See https://developer.productive.io/#lost-reasons for params (filter, sort, page) and data structure.
```
productive.deals.lostReasons.getById(id);
productive.deals.lostReasons.get(uriParams);
productive.deals.lostReasons.create(data);
productive.deals.lostReasons.update(id, data);
productive.deals.lostReasons.remove(id);
```

### `documentTypes`
See https://developer.productive.io/#document-types for params (filter, sort, page) and data structure.
```
productive.documentTypes.getById(id);
productive.documentTypes.get(uriParams);
productive.documentTypes.create(data);
productive.documentTypes.update(id, data);
productive.documentTypes.remove(id);

```
### `emails`
See https://developer.productive.io/#emails for params (filter, sort, page) and data structure.
```
productive.emails.getById(id);
productive.emails.get(uriParams);
productive.emails.attach(id, data);
productive.emails.dismiss(id);
productive.emails.remove(id);

```
### `events`
See https://developer.productive.io/#events for params (filter, sort, page) and data structure.
```
productive.events.getById(id);
productive.events.get(uriParams);
productive.events.create(data);
productive.events.update(id, data);
productive.events.remove(id);
```
### `expenses`
See https://developer.productive.io/#expenses for params (filter, sort, page) and data structure.
```
productive.expenses.getById(id);
productive.expenses.get(uriParams);
productive.expenses.create(data);
productive.expenses.update(id, data);
productive.expenses.remove(id);
productive.expenses.approve(id);
productive.expenses.unapprove(id);
```

### `filters`
See https://developer.productive.io/#filters for params (filter, sort, page) and data structure.
```
productive.filters.getById(id);
productive.filters.get(uriParams);
productive.filters.create(data);
productive.filters.update(id, data);
productive.filters.remove(id);
```

### `holidays`
See https://developer.productive.io/#holidays for params (filter, sort, page) and data structure.
```
productive.holidays.getById(id);
productive.holidays.get(uriParams);
productive.holidays.create(data);
productive.holidays.update(id, data);
productive.holidays.remove(id);
```
### `imports`
See https://developer.productive.io/#imports for params (filter, sort, page) and data structure.
```
productive.imports.getById(id);
productive.imports.get(uriParams);
productive.imports.create(data);
productive.imports.update(id, data);
productive.imports.import(id);
productive.imports.revert(id);
```
### `integrations` (no coverage)

### `invitations`
See https://developer.productive.io/#invitations for params (filter, sort, page) and data structure.
```
productive.invitations.getById(id);
productive.invitations.create(data);
productive.invitations.update(id, data);
```
### `invoices`
See https://developer.productive.io/#invoices for params (filter, sort, page) and data structure.
```
productive.invoices.getById(id);
productive.invoices.get(uriParams);
productive.invoices.create(data);
productive.invoices.update(id, data);
productive.invoices.remove(id);
productive.invoices.send(id, data);
```

### `invoices.lines`
See https://developer.productive.io/#invoices-lines for params (filter, sort, page) and data structure.
```
productive.invoices.lines.getById(id);
productive.invoices.lines.get(uriParams);
productive.invoices.lines.create(data);
productive.invoices.lines.update(id, data);
productive.invoices.lines.remove(id);
```

### `invoices.attributions`
See https://developer.productive.io/#invoices-attributes for params (filter, sort, page) and data structure.
```
productive.invoices.attributions.getById(id);
productive.invoices.attributions.get(uriParams);
productive.invoices.attributions.create(data);
productive.invoices.attributions.update(id, data);
productive.invoices.attributions.remove(id);
```
### `notifications`
See https://developer.productive.io/#notifications for params (filter, sort, page) and data structure.
```
productive.notifications.getById(id);
productive.notifications.show(id);
productive.notifications.read(id,);
productive.notifications.dismiss(id);
productive.notifications.undismiss(id);
```
### `organizations.memberships` (no coverage)

### `organization.subscriptions` (no coverage)

### `Organizations` (no coverage)

### `overheads`
See https://developer.productive.io/#overheads for params (filter, sort, page) and data structure.
```
productive.overheads.getById(id);
productive.overheads.get(uriParams);
```

### `pages`
See https://developer.productive.io/#pages for params (filter, sort, page) and data structure.
```
productive.pages.getById(id);
productive.pages.get(uriParams);
productive.pages.create(data);
productive.pages.update(id, data);
productive.pages.remove(id);
```
### `passwords` (no coverage)

### `payments`
See https://developer.productive.io/#payments for params (filter, sort, page) and data structure.
```
productive.payments.getById(id);
productive.payments.get(uriParams);
productive.payments.create(data);
productive.payments.update(id, data);
productive.payments.remove(id);
```
### `people`
See https://developer.productive.io/#people for params (filter, sort, page) and data structure.
```
productive.people.getById(id);
productive.people.get(uriParams);
productive.people.create(data);
productive.people.update(id, data);
productive.people.invite(id), data;
productive.people.resendEmail(id);
productive.people.deactivate(id);
productive.people.activate(id);
productive.people.archive(id);
productive.people.restore(id);
```

### `prices`
See https://developer.productive.io/#prices for params (filter, sort, page) and data structure.
```
productive.prices.getById(id);
productive.prices.get(uriParams);
productive.prices.create(data);
productive.prices.update(id, data);
productive.prices.remove(id);
```

### `projects`
See https://developer.productive.io/#projects for params (filter, sort, page) and data structure.
```
productive.projects.getById(id);
productive.projects.get(uriParams);
productive.projects.create(data);
productive.projects.update(id, data);
productive.projects.archive(id);
productive.projects.restore(id);
productive.projects.copy(id, data);
```
### `projects.assignments`
See https://developer.productive.io/#project-assignments for params (filter, sort, page) and data structure.
```
productive.projects.assignments.getById(id);
productive.projects.assignments.get(uriParams);
productive.projects.assignments.create(data);
productive.projects.assignments.update(id, data);
productive.projects.assignments.remove(id);
```
### `reports`
See https://developer.productive.io/#reports for params (filter, sort, page) and data structure.
```
productive.reports.booking();
productive.reports.budget();
productive.reports.company();
productive.reports.deal();
productive.reports.expenses();
productive.reports.financialItem();
productive.reports.invoice();
productive.reports.payment();
productive.reports.person();
productive.reports.profitability();
productive.reports.progress();
productive.reports.salary();
productive.reports.sales();
productive.reports.project();
productive.reports.service();
productive.reports.task();
productive.reports.timeEntry();
productive.reports.time();
productive.reports.timeCompany();
productive.reports.timeSheet();
```

### `reports.categories`
See https://developer.productive.io/#report-categories for params (filter, sort, page) and data structure.
```
productive.reports.categories.getById(id);
productive.reports.categories.get(uriParams);
productive.reports.categories.create(data);
productive.reports.categories.update(id, data);
productive.reports.categories.remove(id);
```

### `salaries`
See https://developer.productive.io/#salaries for params (filter, sort, page) and data structure.
```
productive.salaries.getById(id);
productive.salaries.get(uriParams);
productive.salaries.create(data);
productive.salaries.update(id, data);
productive.salaries.remove(id);
```
### `search`
See https://developer.productive.io/#search for params (filter, sort, page) and data structure.
```
productive.search.get(uriParams);
```

### `services`
See https://developer.productive.io/#services for params (filter, sort, page) and data structure.
```
productive.search.getById(id);
productive.search.get(uriParams);
productive.search.create(data);
productive.search.update(id, data);
productive.search.remove(id);
```

### `services.types`
See https://developer.productive.io/#service-types for params (filter, sort, page) and data structure.
```
productive.services.types.getById(id);
productive.services.types.get(uriParams);
productive.services.types.create(data);
productive.services.types.update(id, data);
productive.services.types.remove(id);
```
### `sessions` (no coverage)

### `subsidiaries`
See https://developer.productive.io/#subsidiaries for params (filter, sort, page) and data structure.
```
productive.subsidiaries.get(uriParams);
```

### `tags`
See https://developer.productive.io/#tags for params (filter, sort, page) and data structure.
```
productive.tags.getById(id);
productive.tags.get(uriParams);
```

### `tasks`
See https://developer.productive.io/#tasks for params (filter, sort, page) and data structure.
```
productive.tasks.getById(id);
productive.tasks.get(uriParams);
productive.tasks.create(data);
productive.tasks.update(id, data);
productive.tasks.archive(id);
productive.tasks.restore(id);
```
### `timeEntries`
See https://developer.productive.io/#time-entries for params (filter, sort, page) and data structure.
```
productive.timeEntries.getById(id);
productive.timeEntries.get(uriParams);
productive.timeEntries.create(data);
productive.timeEntries.update(id, data);
productive.timeEntries.remove(id);
```

### `todos`
See https://developer.productive.io/#todos for params (filter, sort, page) and data structure.
```
productive.todos.getById(id);
productive.todos.get(uriParams);
productive.todos.create(data);
productive.todos.update(id, data);
productive.todos.remove(id);
```
### `users`
See https://developer.productive.io/#users for params (filter, sort, page) and data structure.
```
productive.users.getById(id); // TODO check 
productive.users.get(); // Note this returns the user for the API key.  Run a person report to get all the users.
productive.users.create(data);
productive.users.update(id, data);
productive.users.remove(id);
```
---
## Non wrapped endpoint(s) ##
It is possible to access the ProductiveClient request method directly, it could be handy if there is not API implementation for an endpoint yet. Using the exposed request method will benefit from the auth and request parsing already in place.
```
productive.get();
productive.post();
productive.patch();
productive.delete();
```
### Example
```
const ProductiveClient = require('productive-client');

const productive = new ProductiveClient({
    organizationId: '1234',
    token: 'YOUR_API_TOKEN'
});

try {
    const invoice = await productive.get(`${productive.apiPaths.INVOICES}/${id}`);
} catch (err) {
    console.log(err);
    throw err;
}
```
---
## Authors and Contributors

Maintained by [Contra Agency](https://www.contra.agency). Please feel free to submit pull requests to add new functionality.

---
## License
[MIT](https://github.com/axios/axios/blob/HEAD/LICENSE)
