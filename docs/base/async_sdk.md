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
pip install deta[async]==1.1.0a2
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

```py
put(
	data: typing.Union[dict, list, str, int, float, bool], 
	key: str = None,
	*,
	expire_in: int = None,
	expire_at: typing.Union[int, float, datetime.datetime]
)
```

- **data** (required): The data to be stored.
- **key** (optional): The key to store the data under. It will be auto-generated if not provided.
- **expire_in** (optional) - Accepts: `int` and `None` 
    - Description: seconds after which the item will expire in, see also [expiring items](#./expiring_items)
- **expire_at** (optional) - Accepts: `int`, `float`, `datetime.datetime` and `None`
    - Description: time at which the item will expire in, can provide the timestamp directly(`int` or `float`) or a [datetime.datetime](https://docs.python.org/3/library/datetime.html) object, see also [expiring items](./expiring_items)


#### Example

```py
import asyncio
from deta import Deta

async_db = Deta("project_key").AsyncBase("base_name")

async def put_item():
	item = {"msg": "hello"}
	await async_db.put(item, "test")
	print("put item:", item)

	# put expiring items
	# expire item in 300 seconds
	await async_db.put(item, expire_in=300)

	# with expire at
	expire_at = datetime.datetime.fromisoformat("2023-01-01T00:00:00")
	await async_db.put({"name": "max", "age": 28}, "max28", expire_at=expire_at)

	# close connection
	await async_db.close()

loop = asyncio.get_event_loop()
loop.run_until_complete(put_item())
```

### Get

```py
get(key: str)
```

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

```py
delete(key: str)
```

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

```py
insert(
	data: typing.Union[dict, list, str, int, float, bool], 
	key: str = None,
	*,
	expire_in: int = None,
	expire_at: typing.Union[int, float, datetime.datetime] = None
)
```

- **data** (required): The data to be stored.
- **key** (optional): The key to store the data under, will be auto generated if not provided.
- **expire_in** (optional) - Accepts: `int` and `None` 
    - Description: seconds after which the item will expire in, see also [expiring items](./expiring_items)
- **expire_at** (optional) - Accepts: `int`, `float`, `datetime.datetime` and `None`
    - Description: time at which the item will expire in, can provide the timestamp directly(`int` or `float`) or a [datetime.datetime](https://docs.python.org/3/library/datetime.html) object, see also [expiring items](./expiring_items)


#### Example

```py
import asyncio
from deta import Deta

async_db = Deta("project_key").AsyncBase("base_name")

async def insert_item():
	item = {"msg": "hello"}
	await async_db.insert(item, "test")
	print("inserted item:", item)

	# put expiring items
    # expire item in 300 seconds
    await async_db.insert(item, expire_in=300)

    # with expire at
    expire_at = datetime.datetime.fromisoformat("2023-01-01T00:00:00")
    await async_db.insert({"name": "max", "age": 28}, "max28", expire_at=expire_at)

	# close connection
	await async_db.close()

loop = asyncio.get_event_loop()
loop.run_until_complete(insert_item())
```

### Put Many

```py
put_many(
	items: typing.List[typing.Union[dict, list, str, int, bool]],
	*, 
	expire_in: int = None,
	expire_at: typing.Union[int, float, datetime.datetime] = None
)
```

- **items** (required): list of items to be stored.
- **expire_in** (optional) - Accepts: `int` and `None` 
    - Description: seconds after which the item will expire in, see also [expiring items](./expiring_items)
- **expire_at** (optional) - Accepts: `int`, `float`, `datetime.datetime` and `None`
    - Description: time at which the item will expire in, can provide the timestamp directly(`int` or `float`) or a [datetime.datetime](https://docs.python.org/3/library/datetime.html) object, see also [expiring items](./expiring_items)

#### Example

```py
import asyncio
from deta import Deta

async_db = Deta("project_key").AsyncBase("base_name")

async def put_items():
	items = [{"key": "one", "value": 1}, {"key": "two", "value": 2}]
	await async_db.put_many(items)
	print("put items:", items)

	# put with expiring items
	# expire in 300 seconds
	await async_db.put_many(items, expire_in=300)

	# with expire at
    expire_at = datetime.datetime.fromisoformat("2023-01-01T00:00:00")
    await async_db.put_many(items, expire_at=expire_at)

	# close connection
	await async_db.close()

loop = asyncio.get_event_loop()
loop.run_until_complete(put_items())
```

### Update

```py
update(
	updates:dict, 
	key:str,
	*,
	expire_in: int = None,
	expire_at: typing.Union[int, float, datetime.datetime] = None
)
```

- **updates** (required): A dict describing the updates on the item, refer to [updates](/docs/base/sdk#update) for more details.
- **key** (required): The key of the item to update.
- **expire_in** (optional) - Accepts: `int` and `None` 
    - Description: seconds after which the item will expire in, see also [expiring items](./expiring_items)
- **expire_at** (optional) - Accepts: `int`, `float`, `datetime.datetime` and `None`
    - Description: time at which the item will expire in, can provide the timestamp directly(`int` or `float`) or a [datetime.datetime](https://docs.python.org/3/library/datetime.html) object, see also [expiring items](./expiring_items)

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

- **query** : a [query or a list of queries](https://docs.deta.sh/docs/base/sdk/queries/) 
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

## Issues

If you run into any issues, consider reporting them in our [Github Discussions](https://github.com/orgs/deta/discussions). We also appreciate any feedback.

