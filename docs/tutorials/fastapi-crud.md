---
id: fast-api-crud
title: FastAPI CRUD Guide
sidebar_label: FastAPI CRUD
---

In this guide we are going to learn how to create a simple CRUD (Creat, Retrieve, Update, Delete) APi using FastAPI and Deta Base as a database. We will also deploy the API to Deta Micros.

If you want to get directly to the code, we oput it on GitHub: https://github.com/abdelhai/fastapi-crud

## Setup

In this example, we will deploy directly to Deta for a better debugging experience.
To get our code deployed on running on a Deta micro, we need to follow these steps.

### Creating project
Create a directory with the name of our projects, in this case we will call it `fastapi-crud`.

```sh
mkdir fastapi-crud
```

Inside `fastapi-crud`, lets create a `requirements.txt`and add `fastapi`to it.

```txt title="requirements.txt"
fastapi
```

And then add a `manin.py` file with soem placeholder code:

```py title="main.py"
from fastapi import FastAPI


app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "There"}
```

### Deploy

Make sure to install amdf setup the Deta CLI first if you didn't already.

Now, you are ready to deploy.

Inside `fastapi-crud`, run:

```sh
deta new
```

Within a few seconds, your app will be live on the internet.
Watch the logs for the API URL. It might look like this:

```json
{
  "name": "efastapi-crud",
  "runtime": "python",
  "endpoint": "https://wqql72.deta.dev/",
  "http_auth": "disabled"
}
```

Visit the URL in your browser and make sure you get this response:

```json
{"Hello": "There"}
```

### View Logs

To view your logs and interact with your API, run the following in your terminal:

```sh
deta visor open
```

### Database set up

Import the Deta client and init a database by adding these lines at the top of `main.py`:

```py title="main.py"
#... sinp
from deta import Deta  # Import Deta client


# init Deta client (if you want to run outside a Micro, make sure to provide a project key)
deta = Deta()
users = deta.Base("fastapi-crud-users")  # init your db
```

Now, we are ready to store and retrieve data from our Base.

TODO: make sure to run deta deploy or deta watch


## Coding the API

### Create (POST)

First we need to define a request payload model, this will give us data validation for free.

```py title="main.py"
from pydantic import BaseModel

class User(BaseModel):
    name: str
    age: int
    hometown: str

```

And now we can define the route:

```py title="main.py"
# a post requests
@app.post("/users", status_code=201)
def create_user(user: User):
    u = users.put(user.dict())  # convert the payload to `dict` and store it in Base (our db)
    return u  # return the – from Base – returned item
```


### Retrieve – List all (GET)

```py title="main.py"
@app.get("/users")
def list_users():
    # fetch the db – it resturns a generator, so we need to "unpack it " with next
    return next(users.fetch())
```

### Retrieve – Get one (GET)

```python title="main.py"
@app.get("/users/{uid}")
def get_user(uid: str):
    user = users.get(uid)
    if user:
        return user
    return JSONResponse({"message": "user not found"}, status_code=404)
```

### Update (PATCH)

```py title="main.py"

@app.patch("/users/{uid}")
def update_user(uid: str, uu: UserUpdate):
    updates = {k:v for k,v in uu.dict().items() if v is not None}
    try:
        users.update(updates, uid)
        return users.get(uid)
    except Exception:
        return JSONResponse({"message": "user not found"}, status_code=404)
```

### Delete (DELETE)

```py title="main.py"
@app.delete("/users/{uid}")
def delete_user(uid: str):
    users.delete(uid)
    return
```

If you have any question, drop us a lline on Slack.