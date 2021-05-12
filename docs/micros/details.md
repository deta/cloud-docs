---
id: details
title: Pre-set Environment Variables
sidebar_label: Pre-set Environment Variables
---


### What are they?
Pre-set environment variables are essentially just pieces of information about your Micro and project, permanently stored in your Micro's environment. 

:::warning
These env vars are required for your Micro to work and can't be changed by you. You should also treat them as secrets, so never expose them to your users. 
:::

In some cases, pre-set environment variables can be useful in your code. This guide will help you learn more about some of these variables and their use cases. 
### Path

`DETA_PATH` is one of the pre-set environment variables that contains an identifying string for your Micro. For example, if your `DETA_PATH` variable contained a value of `sdfgh` then your Micro is accessible at https://sdfgh.deta.dev.


#### Use cases
##### Absolute link
In some cases, your resource may need to respond with an absolute link to some of the content it is hosting, along with the relative resource link. This can be done with the following code:

```py
import os
# Get and store hostname for later use
path = os.environ.get('DETA_PATH')
hostname = ""
if (path == None):
   hostname = "localhost"
else:
   hostname = f"{path}.deta.dev"


@app.get("/resource_location/{resource_id}")
async def get_resource_location(resource_id):
   return { 
      "rel_path": f"/resource/{resource_id}",
      "abs_path": f"https://{hostname}/resource/{resource_id}"
       }
```

### Runtime
`DETA_RUNTIME` contains a boolean value that indicates if your script is running on a Micro. When accessing this variable in a Micro, expect to get a `True` from it. 
#### Use cases
##### Check if a script is running on Micro
In some cases, you might need to run some code exclusively in local development or in a Micro. For example, if you're running a FastAPI project on your Micro, and you've got an endpoint that dumps very sensitive debug information like so:

```py
@app.get("/debug_info")
async def debug_info():
   return get_debug_info()
```

This would be alright for local testing, but would mean that anyone would be able to access this sensitive information.

A solution to this could be to check the environment variable to see if this is running on Micro or not. 
```py
import os

@app.get("/debug_info")
async def debug_info():
   if (os.getenv('DETA_RUNTIME', False)):
      return get_debug_info()
   raise HTTPException(status_code=403, detail="Forbidden")
```