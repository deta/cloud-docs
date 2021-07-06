---
id: deploy
title: Deploy your app or API on Deta Micros
sidebar_lable: Deploy your app or API on Deta Micros
---

A Deta Micro is a micro server where you can deploy you Python or Node web app without worrying about ops.

## Python

Most Python micro frameworks are supported, like FastAPI & Flask. Deta should run both pure WSGI & ASGI apps wihtout any issue.
Full frameworks like Django are not fully supported yet, as they require various other commands.

For Deta to be able to run you code, you need to call your app instance `app` and it has to be in a file called `main.py`, which is the only required file for a Python Micro. Of course you could add more files and folders.

No need to use a server like `uvicorn`, Deta has it's own global server.
Make sure you have the framework in your `requirements.txt`.

Example code

### FastAPI

```py
from fastapi import FastAPI

app = FastAPI()  # notice that the app instance is called `app`, this is very important.

@app.get("/")
async def read_root():
    return {"Hello": "World"}

```

### Flask

```py
from flask import Flask

app = Flask(__name__)  # notice that the app instance is called `app`, this is very important.

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"
```

### Starlette

```python
from starlette.applications import Starlette
from starlette.responses import JSONResponse
from starlette.routing import Route


async def homepage(request):
    return JSONResponse({'hello': 'world'})


# notice that the app instance is called `app`, this is very important.
app = Starlette(debug=True, routes=[
    Route('/', homepage),
])
```

## Node.js

Most Node.js micro frameworks are supported, like Express & Koa, etc.

For Deta to be able to run you code, you need to call your app instance `app` and it has to be in a file called `index.js`, which is the only required file for a Node Micro. You also need to export `app`. Of course you could add more files and folders.

Make sure you have the framwwork in your `package.json`

Example code

### Express.js

```js
const express = require('express')
const app = express() // notice that the app instance is called `app`, this is very important.

app.get('/', (req, res) => {
  res.send('Hello World!')
})

// no need for `app.listen()` on Deta, we run the app automatically.
module.exports = app; // make sure to export your `app` instance.
```

### Koa.js

```js
onst Koa = require('koa');
const app = new Koa();

app.use(async ctx => {
  ctx.body = 'Hello World';
});

// no need for `app.listen()` on Deta, we run the app automatically.
module.exports = app; // make sure to export your `app` instance.
```

### Fastify.js

```js
const app = require('fastify')()

// Declare a route
app.get('/', async (request, reply) => {
  return { hello: 'world' }
})

// no need for `app.listen()` on Deta, we run the app automatically.
module.exports = app; // make sure to export your `app` instance.
```