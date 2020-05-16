---
id: lib
title: Library
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


The Deta Library provides methods which make it very simple to interact with any [Base you create]().

The Deta Library can be installed for both the Python and Node.js runtimes.


## Installing the Deta Library

First, install the Deta library in your project's directory.

<Tabs
  defaultValue="py"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

```shell
npm install deta
```

</TabItem>
<TabItem value="py">

```shell
pip install deta
```

</TabItem>
</Tabs>

<br />


## Configuration

<Tabs
  defaultValue="py"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

To configure Deta, import the `Deta` class from `deta`, in your code:


```js
const { Deta } = require('deta');
```

Then, depending on your use, follow one of the following two steps.

<!--- Start Nested Tabs JS --->

<Tabs
  defaultValue="protected"
  values={[
    { label: 'Protected Uses', value: 'protected', },
    { label: 'Public Uses', value: 'public', },
  ]
}>

<TabItem value="protected">

For protected interactions with Bases, use your secret `key`:

```js
const deta = Deta("my key")  // for protected use cases
```
</TabItem>

<TabItem value="public">

Bases can have public read access. 

For read only uses, use your `project id`:

```js
const deta = Deta("my id")  // for public read access use cases
```
</TabItem>
</Tabs>

<!--- End Nested Tabs JS --->

</TabItem>
<TabItem value="py">

To configure Deta, import the `Deta` class from `deta`, in your code:


```py
from deta import Deta
```

Then, depending on your use, follow one of the following two steps.

<!--- Start Nested Tabs --->

<Tabs
  defaultValue="protected"
  values={[
    { label: 'Protected Uses', value: 'protected', },
    { label: 'Public Uses', value: 'public', },
  ]
}>

<TabItem value="protected">

For protected interactions with Bases, use your secret `key`:

```py
deta = Deta("my key")  # for protected use cases
```
</TabItem>

<TabItem value="public">

Bases can have public read access. 

For read only uses, use your `project id`:

```py
deta = Deta(project_id="my id")  # for public read access use cases
```
</TabItem>
</Tabs>

<!--- End Nested Tabs --->

</TabItem>
</Tabs>

<br />

## Instantiating & Using a Deta Base
With Deta, Bases are created for you automatically when you start using them.

To use a Base, simply "instantiate" it in your code, providing it with a required `name`.

Names for Bases must be unique within the scope of a project.


<Tabs
  defaultValue="py"
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
db = deta.Base("simple_db");
```

</TabItem>
</Tabs>

<br/>

## Using a Deta Base

Deta's `Base` instance offers the following methods:

### Put

Put inserts a single item into a Base under a `key`; if a key already exists, then `put` **overwrites the original data**.

<Tabs
  defaultValue="py"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">


`async function put(data, key=null, ttl=null) { ...`

#### Code
```js
const { Deta } = require('deta');
const deta = Deta("secret key");
const db = new deta.Base("myFirstDb");

await db.put('a', 'hello');
await db.put('b', null);
await db.put('c', 1213123213); // data will live for 86400 seconds, or 24 hours
await db.put('d', 1.4);
await db.put('e', False);
await db.put('f', {});
await db.put('g', [1, 2, 3, 'hello', { nested: [8487637843, 53645] }]);
await db.put(0); // key is auto generated
await db.put(2); // key is auto generated
await db.put({ height: 80 }); // key is auto generated

```

#### Parameters & Types


|          |          `data`                                  |  `key`                  | `ttl`    |
| -------- | ------------------------------------------------ | ----------------------- | -------- |
| Default  |                      n/a                         | `null` (auto-generated) | `null`   |
| Accepted | `String`, `Number`, `Boolean`, `null`,  `Object` | `String`                | `Number` |

#### Return
Put returns the `data`, `key` pair on a succesful put, and throws an `Error` elsewise.

**TO DO need exact shape.**

</TabItem>
<TabItem value="py">

`def put(data, key:str = None, ttl:int = None):`  

#### Code
```py
from deta import Deta
deta = Deta("my_secret_key")  
db = deta.Base("my_first_db")

db.put("a", "hello")
db.put("b", None)
db.put("c", 1213123213, 86400) # data will live for 86400 seconds, or 24 hours
db.put("d", Decimal("1.4"))
db.put("e", False)
db.put("f", {})
db.put("g", [1, 2, 3, "hello", {"nested": [8487637843, 53645]}])
db.put(Decimal(2)) # key is auto-generated
db.put(0) # key is auto-generated
db.put({"height": Decimal(80)}) # key is auto-generated

```

#### Parameters & Types

|          |          `data`                                     |  `key`                  | `ttl`    |
| -------- | --------------------------------------------------- | ----------------------- | -------- |
| Default  |                      n/a                            | `None` (auto-generated) | `None`   |
| Accepted | `str`, `int`, `Decimal`, `boolean`,  `list`, `dict` | `str`                   | `int`    |


#### Return
Put returns the `data`, `key` pair on a succesful put, and raises an `Error` elsewise.

**TO DO need exact shape.**

</TabItem>
</Tabs>



<br />


### Get

Get retrieves an item from the database stored under a `key`.

<Tabs
  defaultValue="py"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

`async function get(key) {...`

Retrieving the item with id `g` from our last example...

##### Code

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

Get takes a single parameter: `key`, which is a `string`.

#### Return

Get returns the `key`, `data` pair as an object when successful.

Retrieving an item with a key that does not exist will throw an **`Error`**.


</TabItem>
<TabItem value="py">


`def get(key):` 

Retrieving the item with id `g` from our last example...

##### Code
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

Get takes a single parameter: `key`, which is a `str`.

#### Return

Get returns the `key`, `data` pair as a `dict` when successful.

Retrieving an item with a key that does not exist will raise a **`KeyError`** exception.

</TabItem>
</Tabs>

<br />

### Delete
Delete deletes an item provided a key.

<Tabs
  defaultValue="py"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">


`async function delete(key, strict=null){...` 

##### Code

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

Delete returns `null` if `strict` is set to `null` or `false`.

If `strict` is set to `true`, Delete returns `true` upon a confirmed deletion, elsewise `false`.

Deleting item with a key that does not exist will throw an **`Error`**. **(TO DO Confirm me)**


</TabItem>
<TabItem value="py">

`def delete(key:str, strict:bool = None):` 


##### Code

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

Delete returns `None` if `strict` is set to `None` or `False`.

If `strict` is set to `True`, Delete returns `True` upon a confirmed deletion, elsewise `False`.

Deleting item with a key that does not exist will raise a **`KeyError`** exception. **(TO DO Confirm me)**


</TabItem>
</Tabs>


<br />


### Insert

The `insert` method is inserts a single item into a base, but is unique from [`put`](#put) in that it will not overwrite an existing `key`.



<Tabs
  defaultValue="py"
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
Insert returns the `data`, `key` pair on a succesful insert, and throws an `Error` elsewise (including if the key already exists).

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
Insert returns the `data`, `key` pair on a succesful insert, and raises an `Error` elsewise (including if the key already exists).

</TabItem>
</Tabs>

<br />

### Fetch & Queries

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
  defaultValue="py"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

`async function filter (query, limit=25) {...`

##### Code

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

##### Code

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

`filers` is a single filter object or list of filters.

`limit` is an integer which specifies the maximum number of records which can be returned.


#### Return

A list of objects that meet the filter criteria, up to the length of `limit` is returned.


<br />


### Filters

Filters are regular json objects with conventions for different operations.


#### Equal

```python
f = {"age": 22, "name": "Aavash"}
## hierarchical
f = {"user.prof.age": 22, "user.prof.name": "Aavash"}
```

#### Not Equal

```python
f = {"user.profile.age?ne": 22}
```

#### Less Than

```python
f = {"user.profile.age?lt": 22}
```

#### Greater Than

```python
f = {"user.profile.age?gt": 22}
```

#### Less Than or Equal

```python
f = {"user.profile.age?lte": 22}
```

#### Greater Than or Equal

```python
f = {"user.profile.age?gte": 22}
```

#### Prefix

```python
f = {"user.id?pfx": "afdk"}
```

#### Range

```python
f = {"user.age?r": [22, 30]}
```
