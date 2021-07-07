---
id: node_tutorial
title: Node.js Tutorial
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Building a Simple CRUD with Deta Base


### Setup

Two dependencies are needed for this project, `deta` and `express`:

```shell
npm install deta express
```


To configure the app, import the dependencies and instantiate your database.

```js
const express = require('express');
const { Deta } = require('deta');

const deta = Deta('myProjectKey'); // configure your Deta project
const db = deta.Base('simpleDB');  // access your DB


const app = express(); // instantiate express

app.use(express.json()) // for parsing application/json bodies
```


### Creating Records

For our database we are going to store records of users under a unique `key`. Users can have three properties:

```js
{
    "name": "string",
    "age": number,
    "hometown": "string"
}

```


We'll expose a function that creates user records to HTTP `POST` requests on the route `/users`.

```js
app.post('/users', async (req, res) => {
    const { name, age, hometown } = req.body;
    const toCreate = { name, age, hometown};
    const insertedUser = await db.put(toCreate); // put() will autogenerate a key for us
    res.status(201).json(insertedUser);
});
```

#### Request

`POST` a payload to the endpoint:

```json
{
    "name": "Beverly",
    "age": 44,
    "hometown": "Copernicus City"
}
```

#### Response

Our server should respond with a status of `201` and a body of:

```json
{
    "key": "dl9e6w6859a9",
    "name": "Beverly",
    "age": 44,
    "hometown": "Copernicus City"
}
```

### Reading Records

To read records, we can simply use `Base.get(key)`. 

If we tie a `GET` request to the `/users` path with a path param giving a user id (i.e. `/users/dl9e6w6859a9`), we can return a record of the user over HTTP.

```js
app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const user = await db.get(id);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({"message": "user not found"});
    }
});
```

Another option would to use `Base.fetch(query)` to search for records to return, like so:

<Tabs
  groupId="js-version"
  defaultValue="new"
  values={[
    { label: 'version < 1.0.0', value: 'legacy', },
    { label: 'version >= 1.0.0', value: 'new', },
  ]
}>

<TabItem value="legacy">

```js
app.get('/search-by-age/:age, async (req, res) => {
    const { age } = req.params;
    return (await db.fetch({'age': age}).next()).value;
});
```

</TabItem>

<TabItem value="new">

```js
app.get('/search-by-age/:age, async (req, res) => {
    const { age } = req.params;
    const { items } = await db.fetch({'age': age});
    return items;
});
```

</TabItem>
</Tabs>

#### Request

Let's try reading the record we just created.

Make a `GET` to the path `/users/dl9e6w6859a9`.

#### Response

The server should return the same record:

```json
{
    "key": "dl9e6w6859a9",
    "name": "Beverly",
    "age": 44,
    "hometown": "Copernicus City"
}
```

### Updating Records

To update records under a given `key`, we can use `Base.put()`, which will replace the record under a given key.

We can tie a `PUT` request to the path `/users/{id}` to update a given user record over HTTP.

```js
app.put('/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, age, hometown } = req.body;
    const toPut = { key: id, name, age, hometown };
    const newItem = await db.put(toPut);
    return res.json(newItem)
});
```

#### Request

We can update the record by passing a `PUT` to the path `/users/dl9e6w6859a9` with the following payload:

```json
{
    "name": "Wesley",
    "age": 24,
    "hometown": "San Francisco"
}
```

#### Response

Our server should respond with the new body of:

```json
{
    "key": "dl9e6w6859a9",
    "name": "Wesley",
    "age": 24,
    "hometown": "San Francisco"
}
```


### Deleting Records

To delete records under a given `key`, we can use `Base.delete(key)`, which will remove the record under a given key.

We can tie a `DELETE` request to the path `/users/{id}` to delete a given user record over HTTP.

```js
app.delete('/users/:id', async (req, res) => {
    const { id } = req.params;
    await db.delete(id);
    res.json({"message": "deleted"})
});
```

#### Request

We can delete the record by passing a `DELETE` to the path `/users/dl9e6w6859a9`.

```json
{
    "name": "Wesley",
    "age": 24,
    "hometown": "San Francisco"
}
```

#### Response

Our server should respond with:

```json
{
    "message": "deleted"
}
```
