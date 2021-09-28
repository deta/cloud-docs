---
id: async_sdk
title: Deta Base Python Async SDK
---

The Deta Base Python Async SDK can be used for reading and writing data asynchronously with Deta Base in Python.

:::warning
These are docs for an alpha version of the Python Deta Base Async SDK. The SDK API may change in a stable release.
:::

## Installing

```
pip install deta[async]==1.1.0a1
```

## Instantiating

```py
from deta import Deta

# initialize with a project key
# you can also init without specfying the project key explicitly
# the sdk looks for the DETA_PROJECT_KEY env var in that case
deta = Deta("project_key")

# create an async base client
async_db = deta.AsyncBase("base_name")
```

## Methods 

The **`AsyncBase`** class offers the same API to interact with your Base as the **`Base`** class:

### Put

**`put(data: typing.Union[dict, list, str, int, float, bool], key:str=None):`**

- **data** (required): The data to be stored.
- **key** (optional): The key to store the data under. It will be auto-generated if not provided.

#### Example

```py
import asyncio
from deta import Deta

async_db = Deta("project_key").AsyncBase("base_name")

async def put_item():
	item = {"msg": "hello"}
	await async_db.put(item, "test")
	print("put item:", item)

	# close connection
	await async_db.close()

loop = asyncio.get_event_loop()
loop.run_until_complete(put_item())
```

### Get

**`get(key: str)`**

- **key** (required): The key of the item to be retrieved.

#### Example

```py
import asyncio
from deta import Deta

async_db = Deta("project_key").AsyncBase("base_name")

async def get_item():
	item = await async_db.get("my_key")
	print("got item:", item)

	# close connection
	await async_db.close()

loop = asyncio.get_event_loop()
loop.run_until_complete(get_item())
```

### Delete

**`delete(key: str)`**

- **key** (required): The key of the item to delete.

#### Example

```py
import asyncio
from deta import Deta

async_db = Deta("project_key").AsyncBase("base_name")

async def del_item():
	await async_db.delete("my-key")
	print("Deleted item")
	
	# close connection
	await async_db.close()

loop = asyncio.get_event_loop()
loop.run_until_complete(del_item())
```

### Insert 

`insert` is unique from `put` in that it will raise an error if the `key` already exists in the database, whereas `put` overwrites the item.

**`insert(data: typing.Union[dict, list, str, int, float, bool], key:str=None)`**

- **data** (required): The data to be stored.
- **key** (optional): The key to store the data under, will be auto generated if not provided.

#### Example

```py
import asyncio
from deta import Deta

async_db = Deta("project_key").AsyncBase("base_name")

async def insert_item():
	item = {"msg": "hello"}
	await async_db.insert(item, "test")
	print("inserted item:", item)

	# close connection
	await async_db.close()

loop = asyncio.get_event_loop()
loop.run_until_complete(insert_item())
```

### Put Many

**`put_many(items: typing.List[typing.Union[dict, list, str, int, bool]])`**

- **items** (required): list of items to be stored.

#### Example

```py
import asyncio
from deta import Deta

async_db = Deta("project_key").AsyncBase("base_name")

async def put_items():
	items = [{"key": "one", "value": 1}, {"key": "two", "value": 2}]
	await async_db.put_many(items)
	print("put items:", items)

	# close connection
	await async_db.close()

loop = asyncio.get_event_loop()
loop.run_until_complete(put_items())
```

### Update

**`update(updates:dict, key:str)`**

- **updates** (required): A dict describing the updates on the item, refer to [updates](./sdk#update) for more details.
- **key** (required): The key of the item to update.

#### Example

```py
import asyncio
from deta import Deta

async_db = Deta("project_key").AsyncBase("base_name")

async def update_item():
	updates = {"profile.age": 20, "likes": async_db.util.append("ramen")}
	await async_db.update(updates, "jimmy")
	print("updated user jimmy")

	# close connection
	await async_db.close()

loop = asyncio.get_event_loop()
loop.run_until_complete(update_item())
```

### Fetch

**`fetch(query=None, limit=1000, last=None)`**

- **query** : a [query or a list of queries](./sdk#queries), refer to [fetch](./sdk#fetch) for more details.
- **limit** : the limit of the number of items you want to recieve, min value `1` if used.
- **last**: the last key seen in a previous paginated response.

#### Example

```py
import asyncio
from deta import Deta

async_db = Deta("project_key").AsyncBase("base_name")

async def fetch_items():
	query = {"profile.age?gt": 20}
	res = await async_db.fetch(query)
	print("fetched items": res.items)

	# close connection
	await async_db.close()

loop = asyncio.get_event_loop()
loop.run_until_complete(fetch_items())
```

## Feedback

Please provide us with feedback and bug reports on slack, [github](https://github.com/deta/deta-python) or send us an email at *team@deta.sh*. We appreciate any feedback.