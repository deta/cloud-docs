---
id: static-files-guide
title: Deploy Static Files (Including static React, Vue, Svelte apps)
sidebar_label: Static Files
---

You can deploy static React, Vue, Svelte, or just Vanilla JavaScript apps on Deta very easily by wraping it around a simple python snippet.

The guide assumes you have a `build` folder with your static app and have the [Deta CLI](../cli/install.md) installed.
### Setup
Create a directory `static-app` and change the current directory to it.
  ```shell
  $ mkdir static-app && static-app
  ```
Copy your `build` folder into the `static-app` directory.

### Updating code
Create a `main.py` file with the following snippet:

  ```python
  from fastapi import FastAPI
  from fastapi.staticfiles import StaticFiles

  app = FastAPI()
  app.mount("/", StaticFiles(directory="build", html=True), name="static")
  ```

We are mounting the build folder, and serving the files using `FastAPI`.

### Updating dependencies
Now create a `requirements.txt` with the following line:
  ```
  fastapi 
  aiofiles
  ``` 

Here is a look at the folder structure at the end:
  ```
  static-app/
      ├── main.py
      ├── requirements.txt 
      └── build/...
  ```

### Deploying Local Changes
Deploy your application with `deta new`
  ```
  $ deta new
  Successfully created a new micro
  {
          "name": "static-app",
          "runtime": "python3.7",
          "endpoint": "https://{micro_subdomain}.deta.dev",
          "visor": "enabled",
          "http_auth": "enabled"
  }
  Adding dependencies...
  Collecting fastapi
  ...
  Successfully installed fastapi-0.61.1 pydantic-1.6.1 starlette-0.13.6
  ```

### Visiting our endpoint
We now have a static web application running on Deta using a simple FastAPI wrapper.

If you visit the `endpoint` shown in the output (your endpoint will be different from this one) in your browser, you should see your application. 