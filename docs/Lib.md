---
id: lib
title: Deta Library
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Deta library is the easiest way to store and retrieve data from your Deta Base. Currently we only support JavaScript (Node + Browser) and Python 3. [Drop us a line](#) if you want us to support your favorite language.

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

```shell
npm install -s deta
```

</TabItem>
<TabItem value="py">

```shell
pip install deta
```

</TabItem>
</Tabs>



## Configuration

To start working with your Base, you need to import the `Deta` and initialize it with your `project_key`. You can get your project key from your [Deta dashboard](#).

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

```js
const Deta = require('deta');

const deta = new Deta("project key")
```
</TabItem>


<TabItem value="py">

```py
from deta import Deta

deta = Deta("project key") 
```

</TabItem>
</Tabs>


## Instantiating & Using a Deta Base

Deta Bases are created for you automatically when you start using them.

To use a Base, simply "instantiate" with a name.

:::note
Note that names for Bases are unique within the scope of a project (key).
:::

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

```js
const books = new deta.Base('books'); 
const authors = new deta.Base('authors');
const db = new deta.Base('simple_db');
```

</TabItem>
<TabItem value="py">

```py
books = deta.Base("books")
authors = deta.Base("authors")
db = deta.Base("simple_db")
```

</TabItem>
</Tabs>


## Methods

Deta's **`Base`** class offers the following methods:
  - [put](#put)
  - [get](#get)
  - [delete](#delete)
  - [insert](#insert)
  - [fetch](#insert)

### Put

`put` is the fastest way to store in item in the database. You can store objects and primitive types (e.g strings).  
In case you do not provide us with a key, we will auto generate a 12 chars long string.

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">


**`put(data, key=null, expires=null)`**

#### Parameters & Types
<!-- TODO: fix expire type and return if not valid. Is return a promise? -->

- **`data`** (required): the data to be stored. 
    - **Types:** `object`, `string`, `number`, `boolean` and `array`.
- **`key`** (optional): the key (aka ID) to store the data under. Will be auto generated if not provided.
    - **Type:** `string`
- **`expires`** (optional): A unix timestamp of when the item should be auto-deleted from the database. A great feature for temporary data. By default all your data is stored for ever!
    - **Type:** `number`

#### Return
TODO(success, errs, exceptions)

#### Code examples

```js
const Deta = require('deta');

const deta = Deta("project key");
const db = new deta.Base("testdb");

// you can store objects
db.put({name: "alex", age: 77})  // A key will be automatically generated
db.put({name: "alex", age: 77}, key="one")  // We will use "one" as a key
db.put({name: "alex", age: 77, key:"one"})  // The key could also be included in the object itself

// or store simple types:
db.put("hello, worlds")
db.put(7)
db.put("success", key="smart_work")
db.put(["a", "b", "c"], key="my_abc")
```
</TabItem>
<TabItem value="py">

**`put(data: typing.Any, key:str = None, expires:int = None):`**

#### Parameters & Types
<!-- TODO: fix expire type and return if not valid.-->

- **`data`** (required): the data to be stored. 
    - **Types:** `dict`, `str`, `int`, `bool` and `list`.
- **`key`** (optional): the key (aka ID) to store the data under. Will be auto generated if not provided.
    - **Type:** `str`
- **`expires`** (optional): A unix timestamp of when the item should be auto-deleted from the database. A great feature for temporary data. By default all your data is stored for ever!
    - **Type:** `int`

#### Return
TODO(success, errs, exceptions)

#### Code examples
```py
from deta import Deta
deta = Deta("project keyret_key")  
db = deta.Base("testdb")

# you can store objects
db.put({"name": "alex", age: 77})  # A key will be automatically generated
db.put({"name": "alex", age: 77}, key="one")  # We will use "one" as a key
db.put({"name": "alex", age: 77, key:"one"})  # The key could also be included in the object itself

# or store simple types:
db.put("hello, worlds")
db.put(7)
db.put("success", key="smart_work")
db.put(["a", "b", "c"], key="my_abc")

```

#### Parameters & Types

TODO
<!-- |          |          `data`                                     |  `key`                  | `ttl`    |
| -------- | --------------------------------------------------- | ----------------------- | -------- |
| Default  |                      n/a                            | `None` (auto-generated) | `None`   |
| Accepted | `str`, `int`, `Decimal`, `boolean`,  `list`, `dict` | `str`                   | `int`    | -->


#### Return
Put returns the **data**, **key** pair on a successful put, and raises an **Error** else wise.

**TO DO need exact shape.**

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

`async function get(key) {...`

Retrieving the item with id **g** from our last example...

#### Code

```js
const my_item = await db.get('g');
```

... will come back with following data:

##### Result

```js
// value of `my_item`
{
    'key': 'g',
    'data': [
        1,
        2,
        3,
        'hello',
        {
            'nested': [Decimal('8487637843'), Decimal('53645')]
        }
    ]
}
```

#### Parameter Types

Get takes a single parameter: **key**, which is a **string**.

#### Return

Get returns the **key**, **data** pair as an object when successful.

**TO DO on exact structure**

Retrieving an item with a key that does not exist will throw an **Error**.


</TabItem>
<TabItem value="py">


`def get(key):` 

Retrieving the item with id **g** from our last example...

#### Code
```py
my_item = db.get("g")
```

... will come back with following data:
##### Result
```py
# value of `my_item`
{
    'key': 'g',
    'data': [
        Decimal('1'),
        Decimal('2'),
        Decimal('3'),
        'hello',
        {
            'nested': [Decimal('8487637843'), Decimal('53645')]
        }
    ]
}
```

#### Parameter Types

Get takes a single parameter: **key**, which is a **str**.

#### Return

Get returns the **key**, **data** pair as a **dict** when successful.

**TO DO on exact structure**

Retrieving an item with a key that does not exist will raise a **KeyError** exception.

</TabItem>
</Tabs>


### Delete
Delete deletes an item provided a key.

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">


`async function delete(key, strict=null){...` 

#### Code

```js
deletedOne = await db.delete("j") // null, but successful deletion
deletedTwo = await db.delete("b", false) // null, succesful deletion
deletedThre = await db.delete("a", true) // true, succesful deletion
deletedFour = await db.delete("a_non_existent_key") // null, key doesn't exist
deletedFive = await db.delete("another_non_existent_key", true) // false, key doesn't exist
```

#### Parameters & Types

|          | `key`    |  `strict`   | 
| -------- | -------- | ----------- | 
| Default  |  n/a     | `null`      | 
| Accepted | `string` | `boolean`   | 


#### Return

If **strict** is set to **null** or **false**, Delete returns **null**.

If **strict** is set to **true**, Delete returns **true** upon a confirmed deletion, elsewise **false**.

Deleting item with a key that does not exist will throw an **Error**. **(TO DO Confirm me)**


</TabItem>
<TabItem value="py">

`def delete(key:str, strict:bool = None):` 


#### Code

```py
deleted_one = db.delete("j") #None, but successful deletion
deleted_two = db.delete("b", False) #None, succesful deletion
deleted_three = db.delete("a", True) #True, succesful deletion
deleted_four = db.delete("a_non_existent_key") #None, key doesn't exist
deleted_five = db.delete("another_non_existent_key", True) #False, key doesn't exist
```

#### Parameters & Types

|          | `key`    |  `strict`   | 
| -------- | -------- | ----------- | 
| Default  |  n/a     | `None`      | 
| Accepted | `str`    | `boolean`   |



#### Return

If **strict** is set to **None** or **False**, Delete returns **None**.

If **strict** is set to **True**, Delete returns **True** upon a confirmed deletion, elsewise **False**.

Deleting item with a key that does not exist will raise a **KeyError** exception. **(TO DO Confirm me)**


</TabItem>
</Tabs>



### Insert

The **insert** method is inserts a single item into a base, but is unique from [**put**](#put) in that it will not overwrite an existing **key**.



<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">


`async function insert(data, key=null, ttl=null){...`


#### Code
```js
db.insert('myKey', 'hello');
```

#### Parameters & Types

|          |          `data`                                  |  `key`                  | `ttl`    |
| -------- | ------------------------------------------------ | ----------------------- | -------- |
| Default  |                      n/a                         | `null` (auto-generated) | `null`   |
| Accepted | `String`, `Number`, `Boolean`, `null`,  `Object` | `String`                | `Number` |


#### Return
Insert returns the **data**, **key** pair on a succesful insert, and throws an **Error** elsewise (including if the key already exists).

</TabItem>
<TabItem value="py">

`def insert(data, key:str = None, ttl:int = None):`

#### Code
```py
db.insert("hello", "my_key")
```


#### Parameters & Types

|          |          `data`                                     |  `key`                  | `ttl`    |
| -------- | --------------------------------------------------- | ----------------------- | -------- |
| Default  |                      n/a                            | `None` (auto-generated) | `None`   |
| Accepted | `str`, `int`, `Decimal`, `boolean`,  `list`, `dict` | `str`                   | `int`    |

#### Return
Insert returns the **data**, **key** pair on a succesful insert, and raises an **Error** elsewise (including if the key already exists).

</TabItem>
</Tabs>


### Fetch

Fetch retrieves a list of items matching a query.

A query is composed a single [filter](#filters) object or a list of [filters](#filters).

In the case of a list, filters are OR'ed in the query.

For the following examples, let's assume we have a Base of the following structure:

```json

{
  "key-1": {
    "name": "Wesley",
    "age": 27,
    "hometown": "San Francisco",
  },
  "key-2": {
    "name": "Beverly",
    "age": 51,
    "hometown": "Copernicus City",
  },
  "key-3": {
    "name": "Kevin Garnett",
    "age": 43,
    "hometown": "Greenville",
  }
} 


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
const filterOne = {"age?lt": 30}
const filterTwo = {"hometown": "Greenville"}
const filterThree = {"age?gt": 45}

const myFirstSet = await db.filter(filterOne);
const mySecondSet = await db.filter([filterOne, filterTwo]);
```

... will come back with following data:

##### `myFirstSet`:

```json
[
  {
    "key": "key-1",
    "data": {
      "name": "Wesley",
      "age": 27,
      "hometown": "San Francisco",
    }
  }
]
```

##### `mySecondSet`:

```json
[
  {
    "key": "key-2",
    "data": {
      "name": "Beverly",
      "age": 51,
      "hometown": "Copernicus City",
    },
  },
  {
    "key": "key-3",
    "data": {
      "name": "Kevin Garnett",
      "age": 43,
      "hometown": "Greenville",
    },
  }
]
```
</TabItem>

<TabItem value="py">

`def filter(query, limit=25):`

#### Code

```py
filter_one = {"age?lt": 30}
filter_two = {"hometown": "Greenville"}
filter_three = {"age?gt": 45}

my_first_set = db.filter(filter_one)
my_second_set = db.filter([filter_one, filter_two])
```

... will come back with following data:

##### `my_first_set`:
```json
[
  {
    "key": "key-1",
    "data": {
      "name": "Wesley",
      "age": 27,
      "hometown": "San Francisco",
    }
  }
]
```

##### `my_second_set`:
```json
[
  {
    "key": "key-2",
    "data": {
      "name": "Beverly",
      "age": 51,
      "hometown": "Copernicus City",
    },
  },
  {
    "key": "key-3",
    "data": {
      "name": "Kevin Garnett",
      "age": 43,
      "hometown": "Greenville",
    },
  }
]
```
</TabItem>
</Tabs>

#### Parameters & Types

`filers`: is a single filter object or list of filters.

`limit`: is an integer which specifies the maximum number of records which can be returned.


#### Return

A list of objects that meet the filter criteria, up to the length of **limit** is returned.




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
