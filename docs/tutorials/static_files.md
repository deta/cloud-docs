---
id: static-files-guide
title: Deploy static files (Including static React, Vue, Svelte apps)
sidebar_label: Static Files
---

You can deploy static React, Vue, Svelte, or just Vanilla JavaScript apps on Deta very easily by wraping it around a simple [FastAPI](https://fastapi.tiangolo.com/) application.

The guide assumes you have a `build` folder with your static app and have the [Deta CLI](../cli/install.md) installed.

1. Create a directory `static-app` and change the current directory to it.
  ```shell
  $ mkdir static-app && static-app
  ```
 2. Copy your `build` folder into the `static-app` directory.
 3. Create a `main.py` file with a simple FastAPI application.
 
  ```python
  from fastapi import FastAPI
  from fastapi.staticfiles import StaticFiles
  from fastapi.responses import FileResponse

  app = FastAPI()

  app.mount("/static", StaticFiles(directory="build"), name="static")

  @app.get("/")
  def root():
    return FileResponse("build/index.html")
  ```
 
4. We are mounting the build folder to `/static` sub-path. Make sure to update your `html/js` files in your `build` folder to include `./static` when importing from other files. For instance here is a simple `index.html` file in my build folder. Learn more about [Static Files](https://fastapi.tiangolo.com/tutorial/static-files/) here.

  **Before**
   ```html
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Hello!</title>

        <!-- stylesheet -->
        <link rel="stylesheet" href="/style.css">

        <!-- javascript file -->
        <script type="module" src="/script.js" defer></script>
      </head>  
      <body>
        <h1>Hi there!</h1>
      </body>
    </html>
   ```
    
  **After**
    
   ```html
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>Hello!</title>

        <!-- stylesheet -->
        <link rel="stylesheet" href="./static/style.css">

        <!-- javascript file -->
        <script type="module" src="./static/script.js" defer></script>
      </head>  
      <body>
        <h1>Hi there!</h1>
      </body>
    </html>
   ```
5. Notice how we changed the src tag from `/script.js` to `./static/script.js`. Now create a `requirements.txt` with the following lines:
  ```
  fastapi
  ``` 
Here is a look at the folder structure at the end:
  ```
  static-app/
      ├── main.py
      ├── requirements.txt 
      └── build/...
  ```
6. Deploy your application with `deta new`
  ```
  $ deta new
  Successfully created a new micro
  {
          "name": "static-app",
          "runtime": "python3.7",
          "endpoint": "https://{micro_name}.deta.dev",
          "visor": "enabled",
          "http_auth": "enabled"
  }
  Adding dependencies...
  Collecting fastapi
  ...
  Successfully installed fastapi-0.61.1 pydantic-1.6.1 starlette-0.13.6
  ```


We now have a static web application running on Deta using a simple FastAPI wrapper.

If you visit the `endpoint` shown in the output (your endpoint will be different from this one) in your browser, you should see your application. 
