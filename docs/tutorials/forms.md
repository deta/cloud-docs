---
id: form-endpoints-guide
title: Form Endpoints
sidebar_label: Form Endpoints
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Deta Micros](../micros/about.md) can be used to easily deploy form endpoints and the form data can be stored easily with [Deta Base](../base/about.md).

In this guide, we are going to deploy a Deta Micro that offers a form endpoint for a simple contact form and stores the information in Deta Base. 

The guide assumes you have already signed up for Deta and have the [Deta CLI](../cli/install.md) installed.

The contact form will store a `name`, `email` and a `message`.

```json
{
    "name": str,
    "email": str,
    "message": str
}
```

<Tabs
    groupId="preferred-language"
    defaultValue="js"
    values={[
        {label: 'JavaScript', value: 'js', },
        {label: 'Python', value: 'py', },
    ]
}>

<TabItem value="js">

We are going to deploy an `express` app for the form endpoint. 

1. Create a directory `express-form` and change the current directory to it.

    ```shell
    $ mkdir express-form && cd express-form
    ```

2. Create an empty `index.js` file (we will add the code that handles the logic later).

3. Initialize a `nodejs` project with `npm init`.

    ```shell
    $ npm init -y
    ```

    You can skip the `-y` flag, if you want to fill the details about the pacakge interactively through npm's wizard.

4. Install `express` locally for your project.

    ```shell
    $ npm install express
    ```

5. Create a new `nodejs` micro with `deta new`. This will create a new `nodejs` micro for you and automatically install `express` as a dependecy.

    ```shell
    $ deta new
    Successfully created a new micro
    {
        "name": "express-form",
        "runtime": "nodejs12.x",
        "endpoint": "https://ma3sst.deta.dev",
        "visor": "enabled",
        "http_auth": "enabled"
    }
    Adding dependencies...

    + express@4.17.1
    added 50 packages from 37 contributors and audited 50 packages in 1.967s
    found 0 vulnerabilities
    ```

    Your micro's `endpoint` will be different from the output shown above. This `endpoint` will be the form endpoint.

6. You can also see that the `http_auth` is `enabled` by default. We will disable the `http_auth` so that form data can be sent to the micro. 

    ```shell
    $ deta auth disable
    Successfully disabled http auth
    ```

    This is only for the tutorial, we recommended that you protect your endpoint with some authentication.

5. Open `index.js` and add a `POST` endpoint for the form using `express`.

    ```javascript
    const express = require('express');

    // express app
    const app = express();
    
    // parse application/x-www-form-urlencoded 
    app.use(express.urlencoded());

    app.post("/", (req, res)=>{
        const body = req.body;

        // validate input
        if (!body.name || !body.email || !body.message){
            return res.status(400).send('Bad request: missing some required values');
        }

        // TODO: save the data
        return res.send('ok');
    });

6. Update `index.js` to add logic to save the form data to a Deta Base. 

    ```javascript
    const express = require('express');
    const { Deta } = require('deta');

    // express app
    const app = express();

    // contact form base
    const formDB = Deta().Base("contact-form");
    
    // parse application/x-www-form-urlencoded 
    app.use(express.urlencoded());

    app.post("/", (req, res)=>{
        const body = req.body;

        // validate input
        if (!body.name || !body.email || !body.message){
            return res.status(400).send('Bad request: missing some required values')
        }

        // save form data
        formDB.put({
            name: body.name,
            email: body.email,
            message: body.message
        });
        
        return res.status(201).send('ok');
    }); 
    ```

7. Deploy the changes with `deta deploy`

    ```shell
    $ deta deploy
    Successfully deployed changes
    ```

Your endpoint will now accept form `POST` data and save it to a database. 

You can use [Deta Base's UI](../base/base_ui) to easily see what data has been stored in the database. Navigate to your `project` and click on your base name under `bases` in your browser to use the Base UI.

Here's an example view of the UI.

<img src="/img/quickstart/contact_form.png" width="1000"/>
</TabItem>

<TabItem value="py">

We are going to deploy a `flask` app for the form endpoint. 

1. Create a directory `flask-form` and change the current directory to it.

    ```shell
    $ mkdir flask-from && cd flask-form
    ```

2. Create an empty `main.py` file (we will add the code that handles the logic later).

4. Create a `requirements.txt` file and add `flask` as a dependency for your project.

    ```
    flask
    ```

5. Create a new `python` micro with `deta new`. This will create a new `python` micro for you and automatically install `flask` as a dependecy.

    ```shell
    $ deta new
    Successfully created a new micro
    {
        "name": "flask-form",
        "runtime": "python3.7",
        "endpoint": "https://ma3sst.deta.dev",
        "visor": "enabled",
        "http_auth": "enabled"
    }
    Adding dependencies...
    Collecting flask
    ...
    Installing collected packages: Werkzeug, itsdangerous, MarkupSafe, Jinja2, click, flask
    ```

    Your micro's `endpoint` will be different from the output shown above. This `endpoint` will be the form endpoint.

6. You can also see that the `http_auth` is `enabled` by default. We will disable the `http_auth` so that form data can be sent to the micro. 

    ```shell
    $ deta auth disable
    Successfully disabled http auth
    ```

    This is only for the tutorial, we recommended that you protect your endpoint with some authentication.

5. Open `main.py` and add a `POST` endpoint for the form using `flask`.

    ```python
    from flask import Flask, request

    #flas app
    app = Flask(__name__)

    @app.route("/", methods=["POST"])
    def save_form_data():
        # TODO: save data
        return "ok"
    ```

6. Update `main.py` to add logic to save the form data to a Deta Base. 

    ```python
    from flask import Flask, request
    from deta import Deta

    # flask app
    app = Flask(__name__)

    # contact form base
    form_db = Deta().Base("contact-form")

    @app.route("/", methods=["POST"])
    def save_form_data():
        form_db.put({
            # flask sends a 400 automatically if there is a KeyError 
            "name": request.form["name"],
            "email": request.form["email"],
            "message": request.form["message"]
        })
        return "ok", 201
    ```

7. Deploy the changes with `deta deploy`.

    ```shell
    $ deta deploy
    Successfully deployed changes
    ```

Your endpoint will now accept form `POST` data and save it to a database. 

You can use [Deta Base's UI](../base/base_ui) to easily see what data has been stored in the database. Navigate to your `project` and click on your base name under `bases` in your browser to use the Base UI.

Here's an example view of the UI.

<img src="/img/quickstart/contact_form.png" width="1000"/>

</TabItem>
</Tabs>