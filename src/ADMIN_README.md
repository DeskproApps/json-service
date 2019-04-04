# JSON Service

Renders the response values from a JSON web service using a custom template.

[![Build Status](https://travis-ci.org/DeskproApps/json-service.svg?branch=master)](https://travis-ci.org/DeskproApps/json-service)


## How it works

This app allows admins to fetch and display values from a remote API using an HTML template. The remote API, represented by the `Service URL` configuration must respond with a well formatted JSON string.

```
[
  {
    "id": 1,
    "title": "Lorem ipsum",
    "body": "Proin a congue."
  },
  {
    "id": 2,
    "title": "Lorem ipsum",
    "body": "Proin a congue."
  }
]
```      

The response, stored in the variable `resp`, is displayed using an admin created template. 

The `tab` data ([visit reference](https://github.com/DeskproApps/json-service/blob/master/docs/tabdata.md "Tab data reference - CTRL+click to open in new tab")) and
`me` ([visit reference](https://github.com/DeskproApps/json-service/blob/master/docs/me.md "Me data reference - CTRL+click to open in new tab")) values may be rendered in the template
using [Handlebars expressions](http://handlebarsjs.com/expressions.html "Handlebars expressions - CTRL+click to open in new tab"). If you want to access `tab` or `me` from inside a `{{#each}}` block you'll have to prefix it with `../` to get the parent context [(See more)](http://handlebarsjs.com/#paths)


```
{{#each resp}}
  <div class="entry">
    <h1>{{title}}</h1>
    <p>{{../tab.agent.name}}</p>
  </div>
{{/each}}
{{ tab.id }}
```

The example above uses [https://jsonplaceholder.typicode.com/todos/1](https://jsonplaceholder.typicode.com/todos/1) as the remote service
