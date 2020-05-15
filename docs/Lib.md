---
id: Lib
title: Deta Base Lib
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


The Deta Base library is a package which can be isntalled for both the Python and Node.js runtimes.

Deta's Database is built on top of DynamoDB which means it's very reliable and highly scalable. 

The Deta Base lib offers convenient ways to interact with your database.


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

To use a Base, simply "instantiate" it in your code, providing it with a required name.

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

Put inserts a single item into a Base.

<Tabs
  defaultValue="py"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">


`await db.put(data, key, ttl)`

#### Code
```js
const { Database } = require('detalib');
const db = new Database();

await db.put('a', 'hello');
await db.put('b', null);
await db.put('c', 1213123213);
await db.put('d', 1.4);
await db.put('e', False);
await db.put('f', {});
await db.put('g', [1, 2, 3, 'hello', { nested: [8487637843, 53645] }]);
await db.put(0); // key is auto generated
await db.put(2); // key is auto generated
await db.put({ height: 80 }); // key is auto generated

// Not valid:
// db.put("", "hello") # no empty string as key
// db.put(1, "hello") # no empty non-string type as key -- use "1" instead
// db.put("a", "") # no empty string as value -- use None instead
// db.put("b", NaN) # no NaN as value
```

#### Parameters & Types


|          |          `data`                                  |  `key`                  | `ttl`    |
| -------- | ------------------------------------------------ | ----------------------- | -------- |
| Default  |                      n/a                         | `null` (auto-generated) | `null`   |
| Accepted | `String`, `Number`, `Boolean`, `null`,  `Object` | `String`                | `Number` |


</TabItem>
<TabItem value="py">

`db.put(data, key:str = None, ttl:int = None)`  

#### Code
```py
from deta import Deta
deta = Deta("my key")  
db = deta.Base("my_first_db")

db.put("a", "hello")
db.put("b", None)
db.put("c", 1213123213)
db.put("d", Decimal("1.4"))
db.put("e", False)
db.put("f", {})
db.put("g", [1, 2, 3, "hello", {"nested": [8487637843, 53645]}])
db.put(Decimal(2)) # key is auto-generated
db.put(0) # key is auto-generated
db.put({"height": Decimal(80)}) # key is auto-generated

# Not valid:
# db.put("", "hello") # no empty string as key
# db.put(1, "hello") # no empty non-string type as key -- use "1" instead
# db.put("a", "") # no empty string as value -- use None instead
# db.put("b", 1.4) # no float as value -- use Decimal instead
```

#### Parameters & Types

|          |          `data`                                     |  `key`                  | `ttl`    |
| -------- | --------------------------------------------------- | ----------------------- | -------- |
| Default  |                      n/a                            | `None` (auto-generated) | `None`   |
| Accepted | `str`, `int`, `Decimal`, `boolean`,  `list`, `dict` | `str`                   | `int`    |



</TabItem>
</Tabs>

If a key already exists, then `put` **overwrites the original value**.

Put returns the `data` on a succesful put, and throws an `Error` elsewise.

<br />


### Get

Get retrieves an item from the database.

<Tabs
  defaultValue="py"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

`await db.get(key)`

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

Retrieving an item with a key that does not exist will throw an **`Error`**.


</TabItem>
<TabItem value="py">


`db.get(key)` 

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

Retrieving an item with a key that does not exist will raise a **`KeyError`** exception.

</TabItem>
</Tabs>

#### Parameter Types

Get takes a single parameter: `key`, which is a `string`.

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


`await db.delete(key, strict)` 

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


</TabItem>
<TabItem value="py">

`db.delete(key:str, strict:bool = None)` 


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


`await db.insert(data, key, ttl)`


#### Code
```js
const { Database } = require('detalib');
const db = new Database();

await db.insert('myKey', 'hello');
```

#### Types
|          |          `data`                                  |  `key`                  | `ttl`    |
| -------- | ------------------------------------------------ | ----------------------- | -------- |
| Default  |                      n/a                         | `null` (auto-generated) | `null`   |
| Accepted | `String`, `Number`, `Boolean`, `null`,  `Object` | `String`                | `Number` |

</TabItem>
<TabItem value="py">

`db.insert(data, key:str = None, ttl:int = None)`

#### Code
```py
from deta import Deta
deta = Deta("my key")  
db = deta.Base("my_first_db")

db.insert("hello", "my_key")
```

#### Types

#### Parameters & Types

|          |          `data`                                     |  `key`                  | `ttl`    |
| -------- | --------------------------------------------------- | ----------------------- | -------- |
| Default  |                      n/a                            | `None` (auto-generated) | `None`   |
| Accepted | `str`, `int`, `Decimal`, `boolean`,  `list`, `dict` | `str`                   | `int`    |

</TabItem>
</Tabs>

<br />

### Fetch


`db.fetch(filters, limit=25)` fetches a list of items matching a query, which is composed of [filters](#filters).

- `filters` is a single filter object or a list of filters.
  - In the case of a list, filters are OR'ed in the query.
- `limit` is an integer which specifies the maximum number of records which can be returned.

For the following examples, let's assume we have a database of the following structure:

```json
[
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
]

```


<Tabs
  defaultValue="py"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

##### Code

```js
const filterOne = {"age?lt": 30}
const filterTwo = {"hometown": "Greenville"}
const filterThree = {"age?gt": 45}

const myFirstSet = await db.filter(filterOne);
const mySecondSet = await db.filter([filterOne, filterTwo])
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

##### Code

```py
filter_one = {"age?lt": 30}
filter_two = {"hometown": "Greenville"}
filter_three = {"age?gt": 45}

my_first_set = db.filter(filter_one);
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
