---
id: static-files-guide
title: Deploy Static Files (Including static React, Vue, Svelte apps)
sidebar_label: Static Files
---

You can deploy static React, Vue, Svelte, or just Vanilla JavaScript apps on Deta very easily by wraping it around a simple python snippet.

The guide assumes you have a `build` folder with your static app and have the [Deta CLI](../cli/install.md) installed.

### Introdution

Most front end frameworks will have a `src` directory which contains your code and output directory – usually called `build` – which contains the compiled code. Only the `build` directory is the one we need to deploy to a Deta Micro as it contains everything we need.

### Setup
We will use a small Python framework called Starlette to serve the files for us. We do not recommend using a Node.js framweork.
Next to the `src` directory, create a `main.py` file with the following snippet:

  ```python
from starlette.applications import Starlette
from starlette.routing import Mount
from starlette.staticfiles import StaticFiles


routes = [
    Mount('', app=StaticFiles(directory='build', html=True), name="static"),
]

app = Starlette(routes=routes)
```


Then create another file called `requirements.txt` with the following lines:
```
starlette
``` 

Here is a look at the folder structure at the end:
```
myfrontend/
    ├── src/
    ├── build/ 
    ├── main.py
    └── requirements.txt
```

### Build your app

Build your front end app. Usually with the command `npm run build` or `yarn build`. Make sure to check the docs of the framework you are using.

### Deploying your frontend

Deploy your application with `deta new`
  ```
  $ deta new
  Successfully created a new micro
  {
          "name": "myfrontend",
          "runtime": "python3.7",
          "endpoint": "https://{micro_subdomain}.deta.dev",
          "visor": "enabled",
          "http_auth": "disabled"
  }
  Adding dependencies...
    Downloading aiofiles-0.6.0-py3-none-any.whl (11 kB)
  Collecting starlette
    Downloading starlette-0.14.2-py3-none-any.whl (60 kB)
  Installing collected packages: starlette, aiofiles
  Successfully installed aiofiles-0.6.0 starlette-0.14.2
  ```

That's it. Open the `endpoint` URL and enjoy. To re deploy the changes, you need to re build your app before running `deta deploy`

### Speed up your app

1. Disable the built in interactive deugger (VISOR): `deta visor disable`
2. Connect a custom domain and use Cloudflare to cache your frontend.

### Additional feature: protect your frontend

You could protect your app so only you can see it by turning on Deta Access: `deta auth enable`.
Now, you need to login with __your__ Deta credential to access the app. You can make it public again by running `deta auth disable`.
