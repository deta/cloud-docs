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
  defaultValue="js"
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
  defaultValue="js"
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

Bases can have public read access. For read only uses, use your project id:

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

For protected interactions with Bases, configure `Deta` using your secret `key`:

```py
deta = Deta("my key")  # for protected use cases
```
</TabItem>

<TabItem value="public">

Bases can be configured to have public read access. For read only uses, configure the `Deta` using your project id:

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

To use a DB, simply "instantiate" it in your code, providing it with a required name.

Names for Bases must be unique within the scope of a project.


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
```

</TabItem>
<TabItem value="py">

```py
books = deta.Base("books")
authors = deta.Base("authors")
```

</TabItem>
</Tabs>

<br/>

## Using a Deta Base

The `Database` instance offers a few methods:

### Put


<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">


`db.put(key, value)` inserts a single item into the database. 

If the key already exists, then the **original value gets overridden**.

#### Types
| Accepted Types: `key`   | Accepted Types: `value`  |
| ----------------------- | ------------------------ |
| `String` (non-empty)    | `String` (non-empty)     |
|                         | `Number`                 |
|                         | `Boolean`                | 
|                         | `null`                   |
|                         | Serializable `Object`    |


#### Code
```js
const { Database } = require('detalib');
const db = new Database();

await db.put('a', 'hello');
await db.put('b', null);
await db.put('c', 1213123213);
await db.put('d', 2);
await db.put('e', 1.4);
await db.put('f', 0);
await db.put('g', False);
await db.put('h', True);
await db.put('i', {});
await db.put('j', [1, 2, 3, 'hello', { nested: [8487637843, 53645] }]);
await db.put('k', { height: 80 });

// Not valid:
// db.put("", "hello") # no empty string as key
// db.put(1, "hello") # no empty non-string type as key -- use "1" instead
// db.put("a", "") # no empty string as value -- use None instead
// db.put("b", NaN) # no NaN as value


module.exports = app;
```

</TabItem>
<TabItem value="py">

`db.put(key, value)` Inserts a single item into the database. 

If the key already exists, then the **original value gets overridden**.

#### Types

| Accepted Types: `key`   | Accepted Types: `value`    |
| ----------------------- | -------------------------- |
| `String` (non-empty)    | `str` (non-empty)          |
|                         | `int`                      |
|                         | `Decimal`                  |
|                         | `boolean`                  |     
|                         | `None`                     |
|                         | `list` (nesting supported) |
|                         | `dict` (nesting supported) |   



#### Code
```py
from deta.lib import Database
from decimal import Decimal

db =  Database()

db.put("a", "hello")
db.put("b", None)
db.put("c", 1213123213)
db.put("d", Decimal(2))
db.put("e", Decimal("1.4"))
db.put("f", 0)
db.put("g", False)
db.put("h", True)
db.put("i", {})
db.put("j", [1, 2, 3, "hello", {"nested": [8487637843, 53645]}])
db.put("k", {"height": Decimal(80)})

# Not valid:
# db.put("", "hello") # no empty string as key
# db.put(1, "hello") # no empty non-string type as key -- use "1" instead
# db.put("a", "") # no empty string as value -- use None instead
# db.put("b", 1.4) # no float as value -- use Decimal instead
```

</TabItem>
</Tabs>

<br />


### Get

`db.get(key)` retrieves an item from the database based on provided key.

Retrieving the item with id `j` from our last example...

<Tabs
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

##### Code

```js
const my_item = await db.get('j');
```

... will come back with following data:

##### Result

```js
// value of `my_item`
{
    'key': 'j',
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

##### Code

```py
my_item = db.get("j")
```

... will come back with following data:
##### Result
```py
# value of `my_item`
{
    'key': '220te3',
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


<br />

### Delete

`db.delete(key)` deletes an item from the database based on provided key.

Deleting will not raise any errors, even if the key does not exist.


### Insert

`db.all()` returns a list of all items in the database.

### Fetch

`db.all()` returns a list of all items in the database.





#### Delete

`db.delete(key)` deletes an item from the database based on provided key.

Deleting will not raise any errors, even if the key does not exist.

<br />

