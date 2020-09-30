---
id: webhooks-guide
title: Webhooks
sidebar_label: Webhooks
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

[Deta Micros](../micros/about.md) make it extremely easy to deploy webhook servers. 

Each Deta Micro has a unique HTTPS endpoint which can be used as the webhook URL. 

You can use your favorite web application framework for your webhook server.

The guide assumes you have already signed up for Deta and have the [Deta CLI](../cli/install.md) installed

<Tabs
    groupId="preferred-language"
    defaultValue="js"
    values={[
        {label: 'JavaScript', value: 'js', },
        {label: 'Python', value: 'py', },
    ]
}>

<TabItem value="js">

We are going to use `express` with our Deta Micro and deploy a simple `nodejs` webhook server.  

1. Create a directory `express-webhook` and change the current directory to it.

    ```shell
    $ mkdir express-webhook && cd express-webhook
    ```

2. Create an empty `index.js` file (we will add the code that handles the logic later).

3. Initialize a `nodejs` project with `npm init`

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
        "name": "express-webhook",
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

    Your micro's `endpoint` will be different from the output shown above. This `endpoint` will be the webhook URL when you set up your webhooks.

6. You can also see that the `http_auth` is `enabled` by default. We will disable the `http_auth` so that webhook events can be sent to the micro. 

    ```shell
    $ deta auth disable
    Successfully disabled http auth
    ```

    :::note
    Usually for security, a secret token is shared between the sender and the receiver and a hmac signature is calculated from the payload and the shared secret. The algorihtm to caclculate the signature varies based on the sender. You should consult the documentation of how the signature is calculated for the system you are receiving events from.
    :::

7. Add a `POST` route to `index.js`. Most webhook callbacks send a `POST` request on the webhook URL with the payload containing information about the event that triggered the webhook. 

    Open `index.js` and add the handler to handle webhook events.

    ```javascript
    const express = require('express');

    const app = express(); 

    // a POST route for our webhook events
    app.post('/', (req, res) => {
        // verify signature if needed
        // add your logic to handle the request
        res.send("ok");
    });

    // you only need to export your app for the deta micro. You don't need to start the server on a port.
    module.exports = app;
    ```

8. Deploy your changes with `deta deploy`.

    ```shell
    $ deta deploy
    Successfully deployed changes
    ```

Your micro will now trigger on `POST` requests to the micro's endpoint. Use your micro's endpoint as the webhook URL when you set up your webhooks elsewhere.

In order to see the logs when the webhook is triggered, you can use `deta visor` to see real-time logs of your application. You can also replay your webhook events from `deta visor` to debug any issues. 

You can open your visor page with the command `deta visor open` from the cli.
</TabItem>

<TabItem value="py">

We are going to use `fastapi` with our Deta Micro and deploy a simple `python` webhook server.  

1. Create a directory `fastapi-webhook` and change the current directory to it.

    ```shell
    $ mkdir fastapi-webhook && cd fastapi-webhook
    ```

2. Create an empty `main.py` file (we will add the code that handles the logic later).

3. Create a `requirements.txt` file and add `fastapi` as a dependecy.
    
    ```
    fastapi
    ```

5. Create a new `python` micro with `deta new`. This will create a new `python` micro for you and automatically install `fastapi` as a dependecy.

    ```shell
    $ deta new
    Successfully created a new micro
    {
        "name": "fastapi-webhook",
        "runtime": "python3.7",
        "endpoint": "https://ma3sst.deta.dev",
        "visor": "enabled",
        "http_auth": "enabled"
    }
    Adding dependencies...
    Collecting fastapi
    ...
    Successfully installed fastapi-0.61.1 pydantic-1.6.1 starlette-0.13.6
    ```

    Your micro's `endpoint` will be different from the output shown above. This `endpoint` will be the webhook URL when you set up your webhooks.

6. You can also see that the `http_auth` is `enabled` by default. We will disable the `http_auth` so that webhook events can be sent to the micro. 

    ```shell
    $ deta auth disable
    Successfully disabled http auth
    ```

    :::note
    Usually for security, a secret token is shared between the sender and the receiver and a hmac signature is calculated from the payload and the shared secret. The algorihtm to caclculate the signature varies based on the sender. You should consult the documentation of how the signature is calculated for the system you are receiving events from.
    :::

7. Add a `POST` route to `index.js`. Most webhook callbacks send a `POST` request on the webhook URL with the payload containing information about the event that triggered the webhook. 

    Open `main.py` and add the handler to handle webhook events.

    ```python
    from fastapi import FastAPI, Request

    app = FastAPI()

    # a POST route for our webhook events
    @app.post("/"):
    def webhook_handler(req: Request):
        # verify signature if needed
        # add logic to handle the request
        return "ok"
    ```

8. Deploy your changes with `deta deploy`.

    ```shell
    $ deta deploy
    Successfully deployed changes
    ```

Your micro will now trigger on `POST` requests to the micro's endpoint. Use your micro's endpoint as the webhook URL when you set up your webhooks elsewhere.

In order to see the logs of when the webhook is triggered, you can use `deta visor` to see real-time logs of your application. You can also replay your webhook events from `deta visor` to debug any issues. 

You can open your visor page with the command `deta visor open` from the cli.

</TabItem>
</Tabs>