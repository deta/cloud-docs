---
id: py_tutorial
title: Python Tutorial
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


## Building a Simple CRUD with Deta Base


### Setup

Two dependencies are needed for this project, `deta` and `flask`:

```shell
pip install deta flask
```


To configure the app, import the dependencies and instantiate your database.

```py
from flask import Flask, request, jsonify
from deta import Deta


deta = Deta('myProjectKey') # configure your Deta project
db = deta.Base('simpleDB')  # access your DB
app = Flask(__name__)
```


### Creating Records

For our database we are going to store records of users under a unique `key`. Users can have three properties:

```py
{
    "name": str,
    "age": int,
    "hometown": str
}

```


We'll expose a function that creates user records to HTTP `POST` requests on the route `/users`.


```py
@app.route('/users', methods=["POST"])
def create_user():
    name = request.json.get("name")
    age = request.json.get("age")
    hometown = request.json.get("hometown")
    
    user = db.put({
        "name": name,
        "age": age,
        "hometown": hometown
    })

    return jsonify(user, 201)
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

To read records, we can simply use `db.get(key)`. 

If we tie a `GET` request to the `/users` path with a param giving a user id (i.e. `/users/dl9e6w6859a9`), we can return a record of the user over HTTP.


```py
@app.route("/users/<key>")
def get_user(key):
    user = db.get(key)
    return user if user else jsonify({"error": "Not found"}, 404)
```

#### Request

Let's try reading the record we just created.

Make a `GET` to the path (for example) `/users/dl9e6w6859a9`.

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

To update records under a given `key`, we can use `db.put()`, which will replace the record under a given key.

We can tie a `PUT` request to the path `/users/{id}` to update a given user record over HTTP.


```py
@app.route("/users/<key>", methods=["PUT"])
def update_user(key):
    user = db.put(request.json, key)
    return user
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
@app.route("/users/<key>", methods=["DELETE"])
def delete_user(key):
    db.delete(key)
    return jsonify({"status": "ok"}, 200)
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
None
```
