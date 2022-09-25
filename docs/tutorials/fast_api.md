---
id: fast-api-guide
title: FastAPI
sidebar_label: FastAPI
---

You can deploy a [FastAPI](https://fastapi.tiangolo.com/) application on Deta very easily in a few steps.

The guide assumes you have already signed up for Deta and have the [Deta CLI](../cli/install.md) installed.

1. Create a directory `fastapi-app` and change the current directory to it.

    ```shell
    $ mkdir fastapi-app && cd fastapi-app
    ```

2. Create a `main.py` file with a simple fastapi application.

    ```python
    from fastapi import FastAPI
    app = FastAPI()

    @app.get("/")
    async def root():    
    	return "Hello World!"
    ```

3. Create a `requirements.txt` file specifying `fastapi` as a dependecy.

    ```
    fastapi
    ```

4. Deploy your application with `deta new`.

    ```shell
    $ deta new
    Successfully created a new micro
    {
            "name": "fastapi-app",
            "runtime": "python3.7",
            "endpoint": "https://{micro_name}.deta.dev",
            "visor": "enabled",
            "http_auth": "enabled"
    }
    Adding dependencies...
    Collecting fastapi
    ...
    Successfully installed anyio-3.6.1 fastapi-0.85.0 idna-3.4 pydantic-1.10.2 sniffio-1.3.0 starlette-0.20.4 typing-extensions-4.3.0
    ```

We now have a FastAPI application deployed. 

If you visit the `endpoint` shown in the output (your endpoint will be different from this one) in your browser, you should see a `Hello World!` response.
