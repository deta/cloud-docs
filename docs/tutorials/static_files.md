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
import os
from starlette.applications import Starlette
from starlette.routing import Mount
from starlette.staticfiles import StaticFiles
from starlette.types import Receive, Scope, Send
class CustomStatic(StaticFiles):
    async def __call__(self, scope: Scope, receive: Receive, send: Send) -> None:
        """
        The ASGI entry point.
        """
        assert scope["type"] == "http"
        if not self.config_checked:
            await self.check_config()
            self.config_checked = True
        path = self.get_path(scope)
        response = await self.get_response(path, scope)
        await response(scope, receive, send)
routes = [
    Mount('/', app=CustomStatic(directory='build', html=True), name="static"),
]
app = Starlette(routes=routes)
  ```

We are mounting the build folder, and serving the files using `Starlette`.

### Updating dependencies
Now create a `requirements.txt` with the following lines:
  ```
starlette
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
    Downloading aiofiles-0.6.0-py3-none-any.whl (11 kB)
  Collecting starlette
    Downloading starlette-0.14.2-py3-none-any.whl (60 kB)
  Installing collected packages: starlette, aiofiles
  Successfully installed aiofiles-0.6.0 starlette-0.14.2
  ```

### Visiting our endpoint
We now have a static web application running on Deta using a simple python snippet.

If you visit the `endpoint` shown in the output (your endpoint will be different from this one) in your browser, you should see your application. 
