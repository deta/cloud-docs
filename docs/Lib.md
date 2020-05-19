---
id: lib
title: Deta Library
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Deta library is the easiest way to store and retrieve data from your Deta Base. Currently we support JavaScript (Node + Browser) and Python 3. [Drop us a line](#contact) if you want us to support your favorite language.


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
npm install deta
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
const deta = Deta('project key'); 

// This how to connect to or create a database.
const db = deta.Base('simple_db'); 

// You can create as many as you want without additional charges.
const books = deta.Base('books'); 
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
A "Deta Base" instance is a collection of data not unlike a Key-Value store, a MongoDB collection or a PostgreSQL/MySQL table. It will will grow with your app's needs.
:::


## Using

Deta's **`Base`** class offers the following methods to interact with your Deta Base:

  - [**`put`**](#put) – Stores an item in the database. It will update an item if they key already exists. You would use put to also update an item.
  - [**`insert`**](#insert) – Stores an item in the database but raises an error if the key already exists. `insert`is ~2x slower than `put`.
  - [**`get`**](#get) – Retrieves an item from the database by its key.
  - [**`fetch`**](#insert) – Retrieves multiple items from the database based on the provided (optional) filters. 
  - [**`delete`**](#delete) – Deletes an item from the database.

### Put

`put` is the fastest way to store in item in the database. You can store objects and primitive types (e.g strings).  

In the case you do not provide us with a key, we will auto generate a 12 char long string as a key.

You should also use `put` when you want to update an item in the database.

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">


**`async put(data, key=null)`**

#### Parameters

- **`data`** (required) – Accepts: `object`, `string`, `number`, `boolean` and `array`.
    - Description: The data to be stored.
- **`key`** (optional) – Accepts: `string` and `null`
    - Description:  the key (aka ID) to store the data under. Will be auto generated if not provided.


#### Code Example

```js
const Deta = require('deta');

const deta = Deta("project key");
const db = deta.Base("simple_db");

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

#### Returns

`put` returns the item on a successful put, otherwise it raises an error.

</TabItem>
<TabItem value="py">

**`put(data: typing.Union[dict, list, str, int, float, bool], key:str = None):`**

#### Parameters

- **`data`** (required) – Accepts: `dict`, `str`, `int`, `float`, `bool` and `list`.
    - Description: The data to be stored.
- **`key`** (optional) – Accepts: `str` and `None`
    - Description:  the key (aka ID) to store the data under. Will be auto generated if not provided.


#### Code Example
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

#### Returns

`put` returns the item on a successful put, otherwise it raises and error.

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

**`async get(key)`**

#### Parameters

- **`key`** (required) – Accepts: `string`
    - Description: the key of which item is to be retrieved.

#### Code Example

```js
const item = await db.get('one'); // retrieving item with key "one"
```


#### Returns

If the record is found:
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

#### Code Example
```py
item = db.get("one")  # retrieving item with key "one"
```

#### Returns

If the record is found:
```py
{
  "name": "alex", "age": 77, "key": "one"
} 
```

If not found, the function will return `None`.

</TabItem>
</Tabs>


### Delete

`delete` deletes an item form the database provided a key.

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">


**`async delete(key)`**

#### Parameters
- **`key`** (required) – Accepts: `string`
    - Description: the key of which item is to be deleted.

#### Code Example

```js
const res = await db.delete("one")
```



#### Returns

Always returns `null`, even if the key does not exist.


</TabItem>
<TabItem value="py">

**`delete(key: str)`**

#### Parameters
- **`key`** (required) – Accepts: `str`
    - Description: the key of which item is to be deleted.

#### Code Example

```py
res = db.delete("one")
```

#### Returns

Always returns `None`, even if the key does not exist.


</TabItem>
</Tabs>



### Insert

The `insert` method inserts a single item into a **Base**, but is unique from [`put`](#put) in that it will raise an error of the `key` already exists in the database. 

`insert` is roughly 2x slower than [`put`](#put). 



<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

**`async insert(data, key=null)`**

#### Parameters

- **`data`** (required) – Accepts: `object`, `string`, `number`, `boolean` and `array`.
    - Description: The data to be stored.
- **`key`** (optional) – Accepts: `string` and `null`
    - Description:  the key (aka ID) to store the data under. Will be auto generated if not provided.


#### Code Example
```js
// will succeed, a key will be auto-generated
const res1 = await db.insert('hello, world');

// will succeed.
const res2 = await db.insert({message: 'hello, world'}, 'greeting1');

// will raise an error as key "greeting1" already existed.
const res3 = await db.insert({message: 'hello, there'}, 'greeting1');
```

#### Returns

Returns the item on a successful insert, and throws an error if the key already exists.

</TabItem>
<TabItem value="py">

**`insert(data: typing.Union[dict, list, str, int, float, bool], key:str = None):`**

#### Parameters

- **`data`** (required) – Accepts: `dict`, `str`, `int`, `float`, `bool` and `list`.
    - Description: The data to be stored.
- **`key`** (optional) – Accepts: `str` and `None`
    - Description:  the key (aka ID) to store the data under. Will be auto generated if not provided.


#### Code Example
```py
# will succeed, a key will be auto-generated
res1 = db.insert("hello, world")

# will succeed.
res2 = db.insert({"message": "hello, world"}, "greeting1")

# will raise an error as key "greeting1" already existed.
res3 = db.insert({"message": "hello, there"}, "greeting1")
```

#### Returns

Returns the item on a successful insert, and throws an error if the key already exists.

</TabItem>
</Tabs>


### Fetch


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

**`async fetch(query, buffer=null, limit=null)`**

#### Parameters

- `query`: is a single [query object](#queries) or array of queries. If omitted, you will get all the items in the database (up to 1mb).
- `buffer`: the number of items which will be returned for each iteration (aka "page") on the return iterable. This is useful when your query is returning more 1mb od data, so you could buffer the results in smaller chunks.
- `limit`: is the maximum number of items which can be returned.

#### Code Example

```js
const myFirstSet = await db.fetch({"age?lt": 30});
const mySecondSet = await db.fetch([
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
#### Returns

A generator of objects that meet the `query` criteria.

the total number of items will not exceed the defined `limit`.

Iterating through the generator yields arrays containing objects, each array of max length `buffer`.


#### Example using buffer, limit

```js
const foo = async () => {
  items = await db.fetch(query, 10, 100) // items is up to the limit length, 100

  
  for (const page of items) {
    // each "page" is up to the buffer length, 10
    console.log(page)
  }

}
```
</TabItem>

<TabItem value="py">

**`fetch(query=None, buffer=None, limit=None):`**

#### Parameters

- `query`: is a single [query object (`dict`)](#queries) or list of queries. If omitted, you will get all the items in the database (up to 1mb).
- `buffer`: the number of items which will be returned for each iteration (aka "page") on the return iterable. This is useful when your query is returning more 1mb od data, so you could buffer the results in smaller chunks.
- `limit`: is the maximum number of items which can be returned.

#### Code Example

```py
my_first_set = db.fetch({"age?lt": 30})
my_second_set = db.fetch([{"age?lt": 30}, {"hometown": "Greenville"}])
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

#### Returns

A generator of items that meet the `query` criteria.

The total number of items will not exceed the defined `limit`.

Iterating through the generator yields lists containing items, each list of max length `buffer`.



#### Example using buffer, limit

```py
items = db.fetch(my_query, buffer=10, limit=100) # items is up to the limit length, 100

for sub_list in items: # each sub_list is up to the buffer length, 10
    print(sub_list)
```

</TabItem>
</Tabs>



#### Queries

Queries are regular json objects/Python dicts with conventions for different operations.


##### Equal

```json
{"age": 22, "name": "Aavash"}
```

```json
{"user.prof.age": 22, "user.prof.name": "Aavash"}
```

```json
{"fav_numbers": [2, 4, 8]}
```

```json
{"time": {"day": "Tuesday", "hour": "08:00"}}
```

##### Not Equal

```json
{"user.profile.age?ne": 22}
```

##### Less Than

```json
{"user.profile.age?lt": 22}
```

##### Greater Than

```json
{"user.profile.age?gt": 22}
```

##### Less Than or Equal

```json
{"user.profile.age?lte": 22}
```

##### Greater Than or Equal

```json
{"user.profile.age?gte": 22}
```

##### Prefix

```json
{"user.id?pfx": "afdk"}
```

#### Range

```json
{"user.age?r": [22, 30]}
```

## Contact

`team@deta.sh`
