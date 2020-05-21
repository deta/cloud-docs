---
id: Tutorial
title: Tutorial
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Building a Simple CRUD


### Setup

Two dependencies are needed for this project, `deta` and `express`:

```shell
npm install deta express
```


To configure the app, import the dependencies and instantiate your database.

```js
const express = require('express');
const Deta = require("deta");

const deta = new Deta('myProjectKey'); // configure your Deta project
const db = deta.Base('simpleDB');  // access your DB


const app = express(); // instantiate express

app.use(express.json()) // for parsing application/json bodies
```


### Creating Records

For our database we are going to store records of users under a unique `key`. Users can have three properties:

```js
{
    "name": "string"
    "age": number
    "hometown": "string"
}

```

We'll create an id generating function `genId` to generate random `id`s and a `createUser` function that will ensure that a new user is input into our database under a unique `key`.

```js
const genId = () => {
    return Math.random().toString(16).substr(2, 6);
}


const createUser = async payload => {
    let insertedItem;
    const { name, age, hometown } = payload;
    const toCreate = {key: genId(), name, age, hometown};
    try {
        insertedItem = await db.insert(toCreate);
        return insertedItem;
    } catch (error) { // catches the edge case where the auto-generated key already exists
        insertedItem = await createUser(payload);
        return insertedItem;
    }
}
```

We'll expose this function to `POST` requests on the route `/users` to allow creation of users over HTTP.

```js
app.post('/users', async (req, res) => {
    const insertedUser = await createUser(req.body);
    res.status(201).json(insertedUser);
});
```

### Reading Records

To read records, we can simply use `Base.get(key)`. 

If we tie a `GET` request to the `/users` path with a query param giving a user id (i.e. `/users?id=78jrji`), we can return a record of the user over HTTP.

```js
app.get('/users', async (req, res) => {
    const userId = req.query.id;
    const user = await db.get(userId);
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({"message": "user not found"});
    }
});
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
