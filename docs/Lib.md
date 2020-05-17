---
id: lib
title: Deta Library
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Deta library is the easiest way to store and retrieve data from your Deta Base. Currently we only support JavaScript (Node + Browser) and Python 3. [Drop us a line](#) if you want us to support your favorite language.

<!-- TODO: validation errors for put, put_many, insert and fetch. -->

## Installing the Deta Library

First, install the Deta library in your project's directory.

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">
Using NPM:

```shell
npm install -s deta
```

Using Yarn:
 ```shell
yarn add deta
```

</TabItem>
<TabItem value="py">

```shell
pip install deta
```

</TabItem>
</Tabs>



## Instantiating


To start working with your Base, you need to import the `Deta` class and initialize it with a **Project Key**. Then instantiate a subclass called `Base` with a database name of your choosing.

Deta Bases are created for you automatically when you start using them.

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

```js
const Deta = require('deta'); // import Deta

// Initialize with a Project Key
const deta = new Deta('project key'); 

// This how to connect to or create a database.
const db = new deta.Base('simple_db'); 

// You can create as many as you want without additional charges.
const books = new deta.Base('books'); 
```
</TabItem>


<TabItem value="py">

```py
from deta import Deta  # Import Deta

# Initialize with a Project Key
deta = Deta("project key")

# This how to connect to or create a database.
db = deta.Base("simple_db")

# You can create as many as you want without additional charges.
books = deta.Base("books")

```

</TabItem>
</Tabs>

:::note
A "Deta Base" (or simply database) is like a Key-Value store, a collection or a PostgreSQL/MySQL table. TODO: better wording
:::


## Using

Deta's **`Base`** class offers the following methods to interact  with your Deta Base:

  - [**`put`**](#put) – Stores an item in the database. It will update an item if they key already exists. You would use put to also update an item.
  - [**`insert`**](#insert) – Stores an item in the database but raises an error if the key already exists. `insert`is ~2x slower than `put`.
  - [**`get`**](#get) – Retrieves an item from the database by its key.
  - [**`fetch`**](#insert) – Retrieves multiple items from the database based on the provided (optional) filters. 
  - [**`delete`**](#delete) – Deletes an item from the database.

### Put

`put` is the fastest way to store in item in the database. You can store objects and primitive types (e.g strings).  
In case you do not provide us with a key, we will auto generate a 12 chars long string.

You should also use `put` when you want to update an item in the database.

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">


**`put(data, key=null)`**

#### Parameters

- **`data`** (required) – Accepts: `object`, `string`, `number`, `boolean` and `array`.
    - Description: The data to be stored.
- **`key`** (optional) – Accepts: `string` and `null`
    - Description:  the key (aka ID) to store the data under. Will be auto generated if not provided.

#### Return
TODO(success, errs, exceptions)

#### Code examples

```js
const Deta = require('deta');

const deta = Deta("project key");
const db = new deta.Base("simple_db");

// you can store objects
db.put({name: "alex", age: 77})  // A key will be automatically generated
db.put({name: "alex", age: 77}, "one")  // We will use "one" as a key
db.put({name: "alex", age: 77, key:"one"})  // The key could also be included in the object itself

// or store simple types:
db.put("hello, worlds")
db.put(7)
db.put("success", "smart_work") // "success" is the value and "smart_work" is the key.
db.put(["a", "b", "c"], "my_abc")
```
</TabItem>
<TabItem value="py">

**`put(data: typing.Union[dict, list, str, int, float, bool], key:str = None):`**

#### Parameters

- **`data`** (required) – Accepts: `dict`, `str`, `int`, `float`, `bool` and `list`.
    - Description: The data to be stored.
- **`key`** (optional) – Accepts: `str` and `None`
    - Description:  the key (aka ID) to store the data under. Will be auto generated if not provided.

#### Return
TODO(success, errs, exceptions)

#### Code examples
```py
from deta import Deta
deta = Deta("project key")  
db = deta.Base("simple_db")

# you can store objects
db.put({"name": "alex", age: 77})  # A key will be automatically generated
db.put({"name": "alex", age: 77}, "one")  # We will use "one" as a key
db.put({"name": "alex", age: 77, key:"one"})  # The key could also be included in the object itself

# or store simple types:
db.put("hello, worlds")
db.put(7)
db.put("success", "smart_work")  # "success" is the value and "smart_work" is the key.
db.put(["a", "b", "c"], "my_abc")

```

</TabItem>
</Tabs>


### Get

`get` retrieves an item from the database by it's `key`.

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

**`get(key)`**

#### Parameter Types

- **`key`** (required) – Accepts: `string`
    - Description: the key of which item is to be retrieved.

#### Example code

```js
const item = await db.get('one'); // retrieving item it key "one"
```


#### Response

If found:
```js
{
  name: 'alex', age: 77, key: 'one'
}
```
If not found, the function will return `null`.

</TabItem>
<TabItem value="py">


**`get(key: str)`**

#### Parameter Types

- **`key`** (required) – Accepts: `str`
    - Description: the key of which item is to be retrieved.

#### Code
```py
item = db.get("one")
```

#### Response
```py
{
  "name": "alex", "age": 77, "key": "one"
} 
```

If not found, the function will return `None`.

</TabItem>
</Tabs>


### Delete
Delete deletes an item form the database provided a key.

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">


**`delete(key)`**

- **`key`** (required) – Accepts: `string`
    - Description: the key of which item is to be deleted.

#### Code example

```js
const res = await db.delete("one")
```



#### Response

Always returns `null`, even if the key does not exist.


</TabItem>
<TabItem value="py">

**`delete(key: str)`**

- **`key`** (required) – Accepts: `str`
    - Description: the key of which item is to be deleted.

#### Code example

```py
res = db.delete("one")
```

#### Response

Always returns `None`, even if the key does not exist.


</TabItem>
</Tabs>



### Insert

The `insert` method is inserts a single item into a base, but is unique from [`put`](#put) in that it will raise an error of the `key` already exists in the database. `insert` is also ~2x slower than `put`. We recommend using `put`.


<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

**`insert(data, key=null)`**

#### Parameters

- **`data`** (required) – Accepts: `object`, `string`, `number`, `boolean` and `array`.
    - Description: The data to be stored.
- **`key`** (optional) – Accepts: `string` and `null`
    - Description:  the key (aka ID) to store the data under. Will be auto generated if not provided.


#### Code
```js
// will succeed, a key will be auto-generated
const res1 = await db.insert('hello, world');

// will succeed.
const res2 = await db.insert({message: 'hello, world'}, 'greeting1');

// will raise an error as key "greeting1" already existed.
const res3 = await db.insert({message: 'hello, there'}, 'greeting1');
```

#### Response

Returns the item on a successful insert, and throws an error if the key already exists.

</TabItem>
<TabItem value="py">

**`insert(data: typing.Union[dict, list, str, int, float, bool], key:str = None):`**

- **`data`** (required) – Accepts: `dict`, `str`, `int`, `float`, `bool` and `list`.
    - Description: The data to be stored.
- **`key`** (optional) – Accepts: `str` and `None`
    - Description:  the key (aka ID) to store the data under. Will be auto generated if not provided.


#### Code
```py
# will succeed, a key will be auto-generated
res1 = db.insert("hello, world")

# will succeed.
res2 = db.insert({"message": "hello, world"}, "greeting1")

# will raise an error as key "greeting1" already existed.
res3 = db.insert({"message": "hello, there"}, "greeting1")
```

#### Response

Returns the item on a successful insert, and throws an error if the key already exists.

</TabItem>
</Tabs>


### Fetch

**`fetch(query=null, limit=null)`**

Fetch retrieves a list of items matching a query. It will retrieve everything of no query is provided.

A query is composed a single [filter](#filters) object or a list of [filters](#filters).

In the case of a list, filters are OR'ed in the query.

For the following examples, let's assume we have a **Base** of the following structure:

```json

[
  {
    "key": "key-1",
    "name": "Wesley",
    "age": 27,
    "hometown": "San Francisco",
  },
  {
    "key": "key-2",
    "name": "Beverly",
    "age": 51,
    "hometown": "Copernicus City",
  },
  {
    "key": "key-3",
    "name": "Kevin Garnett",
    "age": 43,
    "hometown": "Greenville",
  }
]

```


<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

`async function filter (query, limit=25) {...`

#### Code

```js
// const filterOne = {"age?lt": 30}
// const filterTwo = {"hometown": "Greenville"}
// const filterThree = {"age?gt": 45}

const myFirstSet = await db.filter({"age?lt": 30});
const mySecondSet = await db.filter([
  { "age?lt": 30 },
  { "hometown": "Greenville" }
]);
```

... will come back with following data:

##### `myFirstSet`:

```json
[
  {
    "key": "key-1",
    "name": "Wesley",
    "age": 27,
    "hometown": "San Francisco",
  }
]
```

##### `mySecondSet`:

```json
[
  {
    "key": "key-2",
    "name": "Beverly",
    "age": 51,
    "hometown": "Copernicus City",
  },
  {
    "key": "key-3",
    "name": "Kevin Garnett",
    "age": 43,
    "hometown": "Greenville",
  },
]
```
</TabItem>

<TabItem value="py">

`def filter(query=None, limit=None):`

#### Code

```py
my_first_set = db.filter({"age?lt": 30})
my_second_set = db.filter([{"age?lt": 30}, {"hometown": "Greenville"}])
```

... will come back with following data:

##### `my_first_set`:
```json
[
  {
    "key": "key-1",
    "name": "Wesley",
    "age": 27,
    "hometown": "San Francisco",
  }
]
```

##### `my_second_set`:
```json
[
  {
    "key": "key-2",
    "name": "Beverly",
    "age": 51,
    "hometown": "Copernicus City",
  },
  {
    "key": "key-3",
    "name": "Kevin Garnett",
    "age": 43,
    "hometown": "Greenville",
  },
]
```
</TabItem>
</Tabs>

#### Parameters & Types

`query`: is a single filter object or list of filters.

`limit`: is an integer which specifies the maximum number of records which can be returned.


#### Return

A generator of objects that meet the `query` criteria. TODO: mention pagination, maybe rename limit.

#### Filters

Filters are regular json objects with conventions for different operations.


##### Equal

```python
f = {"age": 22, "name": "Aavash"}
## hierarchical
f = {"user.prof.age": 22, "user.prof.name": "Aavash"}
```

##### Not Equal

```python
f = {"user.profile.age?ne": 22}
```

##### Less Than

```python
f = {"user.profile.age?lt": 22}
```

##### Greater Than

```python
f = {"user.profile.age?gt": 22}
```

##### Less Than or Equal

```python
f = {"user.profile.age?lte": 22}
```

##### Greater Than or Equal

```python
f = {"user.profile.age?gte": 22}
```

##### Prefix

```python
f = {"user.id?pfx": "afdk"}
```

#### Range

```python
f = {"user.age?r": [22, 30]}
```
