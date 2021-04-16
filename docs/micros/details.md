---
id: details
title: Technical Details
sidebar_label: Technical Details
---

### Pre-set Environment Variables

The `DETA_PATH` and `DETA_RUNTIME` environent variables are set in every Micro's environment. 
 * `DETA_PATH` contains an identifying string for your Micro.
    * If your `DETA_PATH` contaied a value of `sdgfh` then your Micro is accessible at https://sdgfh.deta.dev.
 * `DETA_RUNTIME` is a boolean that tells a script if it's running on a Micro or not.
    * When accessing this variable in a Micro, expect to get a `True` from it. 

#### Why would I want these?
Let's run through a few examples. 

##### DETA_PATH
Let's say you're building a resource that needs to respond with an absolute link to some of the content it is hosting, along with the relative resource link. This can be done with the following code:

```py
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

##### DETA_RUNTIME
Let's say you're running a `fastapi` project on your Micro and that you've got an endpoint that dumps very sensitive debug informaton like so:

```py
@app.get("/debug_info")
async def debug_info():
   return get_debug_info()
```

This would be alright for local testing, but would mean that anyone would be able to access this sensitive information.

A solution to this could be to check the environment variable (using `os.getenv` from the `os` import) to see if this is running on Deta or not.

```py
@app.get("/debug_info")
async def debug_info():
   if (os.getenv('DETA_RUNTIME', False)):
      return get_debug_info()
   raise HTTPException(status_code=403, detail="Forbidden")
```