---
id: env_vars 
title: Environment Variables
sidebar_label: Environment Variables
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


### Setting Environment Variables

Environment variables can be set to your Micro through the Deta cli's [update command](../cli/commands.md#deta-update).

You need to create a file where you specify your environment variables with their values. 

:::note
We stronlgy recommend creating a file called `.env` so that this file is skipped by the Deta cli and not deployed with your Micro's code.
:::

You can use the following command to update your enviornment variables:
```sh
deta update -e <env_file_name>
```

The environment variables must be defined in the following format:
```
VAR_NAME=VALUE
```

You should not change the value of the environment variables through your Micro's code, as the change will not persist in following invocations of your Micro. 

#### Example

Suppose you want to make an environment variable `SECRET_TOKEN` with a value of `abcdefgh` accessible to your Micro's code. 

- Create a `.env` file with the following content:

```
SECRET_TOKEN=abcdefg
```

- Update the Micro's environment variables with the `deta update` command:

```sh
deta update -e .env
```


### Pre-Set Environment Variables

Deta pre-sets some environment variables in your Micro's environment which are used by our runtime. 

:::note 
These pre-set variables are specific to your Micro and should not be shared publicly (unless we mention otherwise). These variables can not be updated from the cli.
:::

The following pre-set environment variables could be useful for you: 

- **DETA_PATH**

`DETA_PATH` stores a unique identifier for your Micro. This value is also used as the sub-domain under which your Micro is avaiable through `http`. For example, if your `DETA_PATH` variable contained a value of `sdfgh` then your Micro is accessible at https://sdfgh.deta.dev.

:::note
This value does not store the self assigned sub-domain value at the moment.
:::

- **DETA_RUNTIME**

`DETA_RUNTIME` indicates if your code is running on a Micro, with a string value `"True"`.

In some cases, you might need to run some code exclusively in local development and not in a Micro. For example, if you're running a FastAPI project on your Micro, and you've got an endpoint that dumps debug information like so:

```py
@app.get("/debug_info")
async def debug_info():
   return get_debug_info()
```

If you want this endpoint to be only available locally, you can check the environment variable to selectively execute code: 

```py
import os

@app.get("/debug_info")
async def debug_info():
   if (not os.getenv('DETA_RUNTIME')):
      return get_debug_info()
   raise HTTPException(status_code=404, detail="Not Found")
```

- **DETA_PROJECT_KEY**

`DETA_PROJECT_KEY` is a project key generated for you Micro for authentication with [Deta Base](../base/about.md) and [Deta Drive](../drive/about.md). 

Each micro has its own project key and this **should not be shared publicly**.

While using our SDKs(the latest versions) within a Deta Micro, you can omit specifying the project key when instantiating a service instance.

<Tabs
    groupId="preferred-language"
    defaultValue="js"
    values={[
        {label: 'JavaScript', value:'js', },
        {label: 'Python', value: 'python',},
    ]}
>
<TabItem value="js">

```js
const { Base, Drive } = require 'deta';

const base = Base('base_name');
const drive = Drive('drive_name');
```

</TabItem>

<TabItem value="python">

```python
from deta import Base, Drive

base = Base('base_name')
drive = Drive('drive_name')
```

</TabItem>
</Tabs>

