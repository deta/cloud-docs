---
id: sdk
title: SDK
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Deta library is the easiest way to store and retrieve data from your Deta Base. Currently, we support JavaScript (Node + Browser), Python 3 and Go. [Drop us a line](#contact) if you want us to support your favorite language.

:::note
A "Deta Base" instance is a collection of data, not unlike a Key-Value store, a MongoDB collection or a PostgreSQL/MySQL table. It will grow with your app's needs.
:::

:::info
We have an alpha version of the Python Base Async SDK. [Check the documentation here](/docs/base/async_sdk).
:::

<!-- TODO: validation errors for put, put_many, insert and fetch. -->

## Installing

<br />
<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
    { label: 'Go', value: 'go', },
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

<TabItem value="go">

```shell
go get github.com/deta/deta-go
```
</TabItem>
</Tabs>

:::note
  If you are using the Deta SDK within a [Deta Micro](/docs/micros/about), you must include `deta` in your dependencies file (`package.json` or `requirements.txt`) to install the latest sdk version.
:::


## Instantiating


To start working with your Base, you need to import the `Deta` class and initialize it with a **Project Key**. Then instantiate a subclass called `Base` with a database name of your choosing.

Deta Bases are created for you automatically when you start using them.

<br />
<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
    { label: 'Go', value: 'go', },
  ]
}>
<TabItem value="js">

```js
const { Deta } = require('deta'); // import Deta

// Initialize with a Project Key
const deta = Deta('project key'); 

// This how to connect to or create a database.
const db = deta.Base('simple_db'); 

// You can create as many as you want without additional charges.
const books = deta.Base('books'); 
```

:::note
  If you are using Deta Base within a [Deta Micro](/docs/micros/about), the **Deta SDK** comes pre-installed and a valid project key is pre-set in the Micro's environment. There is no need to install the SDK or pass a key in the initialization step.

  ```js
  const { Deta } = require('deta');

  const deta = Deta(); 
```
:::

:::note
  If you are using the `deta` npm package of `0.0.6` or below, `Deta` is the single default export and should be imported as such.

  ```js
  const Deta = require('deta');
```
:::

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

:::note
  If you are using Deta Base within a [Deta Micro](/docs/micros/about), the **Deta SDK** comes pre-installed and a valid project key is pre-set in the Micro's environment. There is no need to install the SDK or pass a key in the the initialization step.

  ```py
  from deta import Deta

  deta = Deta()
```
:::

</TabItem>

<TabItem value="go">
<Tabs
  groupId="go-version"
  defaultValue="new"
  values={[
    { label: 'version < 1.0.0', value: 'legacy', },
    { label: 'version >= 1.0.0', value: 'new', },
  ]
}>
<TabItem value="legacy">


```go
import (
  "fmt"
  "github.com/deta/deta-go"
)

func main(){
  // initialize with project key
  // returns ErrBadProjectKey if project key is invalid
  d, err := deta.New("project_key")
  if err != nil {
    fmt.Println("failed to init new Deta instance:", err)
    return
  }

  // initialize with base name
  // returns ErrBadBaseName if base name is invalid
  db, err := d.NewBase("base_name")
  if err != nil {
    fmt.Println("failed to init new Base instance:", err)
    return
  }
}
```

</TabItem>
<TabItem value="new">

```go
import (
	"fmt"

	"github.com/deta/deta-go/deta"
	"github.com/deta/deta-go/service/base"
)

func main() {

	// initialize with project key
	// returns ErrBadProjectKey if project key is invalid
	d, err := deta.New(deta.WithProjectKey("project_key"))
	if err != nil {
		fmt.Println("failed to init new Deta instance:", err)
		return
	}

	// initialize with base name
	// returns ErrBadBaseName if base name is invalid
	db, err := base.New(d, "base_name")
	if err != nil {
		fmt.Println("failed to init new Base instance:", err)
		return
	}
}
```
</TabItem>
</Tabs>
</TabItem>
</Tabs>

:::warning
Your project key is confidential and meant to be used by you. Anyone who has your project key can access your database. Please, do not share it or commit it in your code.
:::


## Using

Deta's **`Base`** class offers the following methods to interact with your Deta Base:

[**`put`**](#put) – Stores an item in the database. It will update an item if the key already exists.

[**`insert`**](#insert) – Stores an item in the database but raises an error if the key already exists. (2x slower than `put`).

[**`get`**](#get) – Retrieves an item from the database by its key.

[**`fetch`**](#fetch) – Retrieves multiple items from the database based on the provided (optional) filters. 

[**`delete`**](#delete) – Deletes an item from the database.

[**`update`**](#update) – Updates an item in the database.


#### Storing Numbers

:::info
Base currently supports **maximum 16 digit numbers** (integers and floating points), please store larger numbers as a string.
:::

### Put

`put` is the fastest way to store an item in the database.

If an item already exists under a given key, put will replace this item.

In the case you do not provide us with a key, we will auto generate a 12 char long string as a key.

<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
    { label: 'Go', value: 'go', },
  ]
}>
<TabItem value="js">


**`async put(data, key = null, options = null)`**

#### Parameters

- **data** (required) – Accepts: `object` (serializable), `string`, [`number`](#storing-numbers), `boolean` and `array`.
    - Description: The data to be stored.
- **key** (optional) – Accepts: `string`, `null` or `undefined`
    - Description:  the key (aka ID) to store the data under. Will be auto generated if not provided.
- **options** (optional) - Accepts: `object`, `null` or `undefined`
  ```json
  {
    expireIn: number,
    expireAt: Date
  }
  ```
    - Description: Optional parameters.
      - **expireIn** : item will expire in `expireIn` seconds after a successfull put operation, see also [expiring items](./expiring_items).
      - **expireAt** : item will expire at `expireAt` date, see also [expiring items](./expiring_items).

#### Code Example

```js
const Deta = require('deta');

const deta = Deta("project key");
const db = deta.Base("simple_db");

// store objects
// a key will be automatically generated 
await db.put({name: "alex", age: 77}) 
// we will use "one" as a key
await db.put({name: "alex", age: 77}, "one")  
// the key could also be included in the object itself
await db.put({name: "alex", age: 77, key:"one"})  

// store simple types
await db.put("hello, worlds")
await db.put(7)
// "success" is the value and "smart_work" is the key. 
await db.put("success", "smart_work")
await db.put(["a", "b", "c"], "my_abc")

// put expiring items
// expire item in 300 seconds
await db.put({"name": "alex", age: 21}, "alex21", {expireIn: 300}) 
// expire item at expire date
await db.put({"name": "max", age:28}, "max28", {expireAt: new Date('2023-01-01T00:00:00')}) 
```

#### Returns

`put` returns a promise which resolves to the item on a successful put, otherwise it throws an Error.

</TabItem>
<TabItem value="py">

```py
put(
  data: typing.Union[dict, list, str, int, float, bool], 
  key: str = None,
  *,
  expire_in: int = None,
  expire_at: typing.Union[int, float, datetime.datetime] = None
)
```

#### Parameters

- **data** (required) – Accepts: `dict`, `str`, [`int`](#storing-numbers), [`float`](#storing-numbers), `bool` and `list`.
    - Description: The data to be stored.
- **key** (optional) – Accepts: `str` and `None`
    - Description:  the key (aka ID) to store the data under. Will be auto generated if not provided.
- **expire_in** (optional) - Accepts: `int` and `None` 
    - Description: seconds after which the item will expire in, see also [expiring items](./expiring_items)
- **expire_at** (optional) - Accepts: `int`, `float`, `datetime.datetime` and `None`
    - Description: time at which the item will expire in, can provide the timestamp directly(`int` or `float`) or a [datetime.datetime](https://docs.python.org/3/library/datetime.html) object, see also [expiring items](./expiring_items)


#### Code Example
```py
from deta import Deta
deta = Deta("project key")  
db = deta.Base("simple_db")

# store objects
# a key will be automatically generated
db.put({"name": "alex", "age": 77})  
# we will use "one" as a key
db.put({"name": "alex", "age": 77}, "one")  
# the key could also be included in the object itself  
db.put({"name": "alex", "age": 77, "key": "one"})

# simple types
db.put("hello, worlds")
db.put(7)
# "success" is the value and "smart_work" is the key.
db.put("success", "smart_work")  
db.put(["a", "b", "c"], "my_abc")

# expiring items
# expire item in 300 seconds
db.put({"name": "alex", "age": 23}, "alex23", expire_in=300)
# expire item at date
expire_at = datetime.datetime.fromisoformat("2023-01-01T00:00:00")
db.put({"name": "max", "age": 28}, "max28", expire_at=expire_at)
```

#### Returns

`put` returns the item on a successful put, otherwise it raises an error.

</TabItem>

<TabItem value='go'>
<Tabs
  groupId="go-version"
  defaultValue="new"
  values={[
    { label: 'version < 1.0.0', value: 'legacy', },
    { label: 'version >= 1.0.0', value: 'new', },
  ]
}>

<TabItem value="legacy">

**`Put(item interface{}) (string, error)`**

#### Parameters

- **item** : The item to be stored, should be a `struct` or a `map`. If the item is a `struct` provide the field keys for the data with json struct tags. The key of the item must have a json struct tag of `key`. For storing expiring items, the field name `__expires` should be used with a [Unix Time](https://pkg.go.dev/time#Time.Unix) value, see also [expiring items](./expiring_items).

[Note for storing numbers](#storing-numbers)

#### Code Example
```go
import (
    "log"
    "time"
    "github.com/deta/deta-go"
)

// User represents a user
type User struct{
    // json struct tag 'key' used to denote the key
    Key      string `json:"key"` 
    Username string `json:"username"`
    Active   bool `json:"active"`
    Age      int `json:"age"`
    Likes    []string `json:"likes"`
    // json struct tag '__expires' for expiration timestamp, 
    // tag has 'omitempty' for ommission of default 0 values
    Expires  int64 `json:"__expires,omitempty"` 
}

func main(){
    // error ignored for brevity
    d, _ := deta.New("project key")
    db, _ := d.NewBase("users")

    // a user
    u := &User{
        Key: "kasdlj1",
        Username: "jimmy",
        Active: true,
        Age: 20,
        Likes: []string{"ramen"},
    }

    // put item in the database
    key, err := db.Put(u)
    if err != nil {
        log.Fatal("failed to put item:", err)
    }
    log.Println("put item with key:", key)

    // can also use a map
    um := map[string]interface{}{
      "key": "kasdlj1",
      "username": "jimmy",
      "active": true,
      "age": 20,
      "likes": []string{"ramen"},
    }

    key, err = db.Put(um)
    if err != nil {
        log.Fatal("failed to put item:", err)
    }
    log.Println("put item with key:", key)

    // expiring items
    u = &User {
      Key: "will_be_deleted",  
      Username: "test_user",
      Expires: time.Date(2023, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
    }
    key, err = db.Put(u)
    if err != nil {
        log.Fatal("failed to put item:", err)
    }
    log.Println("put item with key:", key)

    // maps with expiration timestamp
    um = map[string]interface{}{
      "key": "will_be_deleted",
      "test": true,
      "__expires": time.Date(2023, 1, 1, 0, 0, 0, 0, time.UTC).Unix(), 
    }

    key, err = db.Put(um)
    if err != nil {
        log.Fatal("failed to put item:", err)
    }
    log.Println("put item with key:", key)
}
```

</TabItem>

<TabItem value="new">

**`Put(item interface{}) (string, error)`**

#### Parameters

- **item** : The item to be stored, should be a `struct` or a `map`. If the item is a `struct` provide the field keys for the data with json struct tags. The key of the item must have a json struct tag of `key`. For storing expiring items, the field name `__expires` should be used with a [Unix Time](https://pkg.go.dev/time#Time.Unix) value, see also [expiring items](./expiring_items).

[Note for storing numbers](#storing-numbers)

#### Code Example
```go

import (
	"log"
  "time"

	"github.com/deta/deta-go/deta"
	"github.com/deta/deta-go/service/base"
)

type User struct {
  // json struct tag 'key' used to denote the key
	Key      string   `json:"key"` 
	Username string   `json:"username"`
	Active   bool     `json:"active"`
	Age      int      `json:"age"`
	Likes    []string `json:"likes"`
  // json struct tag '__expires' for expiration timestamp
  // 'omitempty' for omission of default 0 value
  Expires  int64 `json:"__expires,omitempty"`
}

func main() {
  // errors ignored for brevity
	d, _ := deta.New(deta.WithProjectKey("project_key"))
	db, _ := base.New(d, "users")

	u := &User{
		Key:      "kasdlj1",
		Username: "jimmy",
		Active:   true,
		Age:      20,
		Likes:    []string{"ramen"},
	}
	key, err := db.Put(u)
	if err != nil {
    log.Fatal("failed to put item:", err)
	}
	log.Println("successfully put item with key", key)

	// can also use a map
	um := map[string]interface{}{
		"key":      "kasdlj1",
		"username": "jimmy",
		"active":   true,
		"age":      20,
		"likes":    []string{"ramen"},
	}
	key, err = db.Put(um)
	if err != nil {
    log.Fatal("failed to put item:", err)
	}
	log.Println("Successfully put item with key:", key)

  // put with expires
  u := &User{
    Key: "will_be_deleted",
    Username: "test_user",
    Expires: time.Date(2023, 1, 1, 0, 0, 0, 0, 0, time.UTC).Unix(),
  }
  key, err = db.Put(u)
  if err != nil {
    log.Fatal("failed to put item:", err)
  }
  log.Println("put item with key:", key)

  // put map with expires
  um = map[string]interface{}{
    "key": "will_be_deleted",
    "test": true,
    "__expires": time.Data(2023, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
  }
  key, err = db.Put(um)
  if err != nil {
    log.Fatal("failed to put item:", err)
  }
  log.Println("put item with key:", key)
}
```
</TabItem>
</Tabs>

#### Returns

Returns the `key` of the item stored and an `error`. Possible error values:

- `ErrBadItem` : bad item, item is of unexpected type
- `ErrBadRequest`: item caused a bad request response from the server 
- `ErrUnauthorized`: unuathorized
- `ErrInternalServerError`: internal server error

</TabItem>

</Tabs>

:::info
Empty keys in objects/dictionaries/structs, like `{"": "value"}` are invalid and will fail to be added during the backend processing stage.
:::

### Get

`get` retrieves an item from the database by it's `key`.

<br />
<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
    { label: 'Go', value: 'go', },
  ]
}>
<TabItem value="js">

**`async get(key)`**

#### Parameters

- **key** (required) – Accepts: `string`
    - Description: the key of which item is to be retrieved.

#### Code Example

```js
const item = await db.get('one'); // retrieving item with key "one"
```


#### Returns

If the record is found, the promise resolves to:
```js
{
  name: 'alex', age: 77, key: 'one'
}
```
If not found, the promise will resolve to `null`.

</TabItem>
<TabItem value="py">


```py
get(key: str)
```

#### Parameter Types

- **key** (required) – Accepts: `str`
    - Description: the key of which item is to be retrieved.

#### Code Example
```py
item = db.get("one") # retrieving item with key "one"
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

<TabItem value='go'>

<Tabs
  groupId="go-version"
  defaultValue="new"
  values={[
    { label: 'version < 1.0.0', value: 'legacy', },
    { label: 'version >= 1.0.0', value: 'new', },
  ]
}>
<TabItem value="legacy">

**`Get(key string, dest interface{}) error`**

#### Parameters
- **key**: the key of the item to be retrieved
- **dest**: the result will be stored into the value pointed by `dest` 

#### Code Example

```go

import (
    "fmt"
    "github.com/deta/deta-go"
)

type User struct{
    Key string `json:"key"` // json struct tag 'key' used to denote the key
    Username string `json:"username"`
    Active bool `json:"active"`
    Age int `json:"age"`
    Likes []string `json:"likes"`
}

func main(){
    // error ignored for brevity
    d, _ := deta.New("project key")
    db, _ := d.NewBase("users")

    // a variable to store the result 
    var u User 
    
    // get item
    // returns ErrNotFound if no item was found
    err := db.Get("kasdlj1", &u)
    if err != nil{
        fmt.Println("failed to get item:", err)
    }
}
```
</TabItem>

<TabItem value="new">

**`Get(key string, dest interface{}) error`**

#### Parameters
- **key**: the key of the item to be retrieved
- **dest**: the result will be stored into the value pointed by `dest` 

#### Code Example

```go
import (
	"fmt"

	"github.com/deta/deta-go/deta"
	"github.com/deta/deta-go/service/base"
)

type User struct {
	Key      string   `json:"key"` // json struct tag 'key' used to denote the key
	Username string   `json:"username"`
	Active   bool     `json:"active"`
	Age      int      `json:"age"`
	Likes    []string `json:"likes"`
}

func main() {
	d, err := deta.New(deta.WithProjectKey("project_key"))
	if err != nil {
		fmt.Println("failed to init new Deta instance:", err)
		return
	}

	db, err := base.New(d, "users")
	if err != nil {
		fmt.Println("failed to init new Base instance:", err)
	}

	// a variable to store the result
	var u User

	// get item
	// returns ErrNotFound if no item was found
	err = db.Get("kasdlj1", &u)
	if err != nil {
		fmt.Println("failed to get item:", err)
	}
}
```
</TabItem>
</Tabs>

#### Returns

Returns an `error`. Possible error values:

- `ErrNotFound`: no item with such key was found
- `ErrBadDestination`: bad destination, result could not be stored onto `dest`
- `ErrUnauthorized`: unauthorized 
- `ErrInternalServerError`: internal server error

</TabItem>

</Tabs>


### Delete
`delete` deletes an item from the database that matches the key provided.

<br />
<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
    { label: 'Go', value:'go', },
  ]
}>
<TabItem value="js">


**`async delete(key)`**

#### Parameters
- **key** (required) – Accepts: `string`
    - Description: the key of which item is to be deleted.

#### Code Example

```js
const res = await db.delete("one")
```



#### Returns

Always returns a promise which resolves to `null`, even if the key does not exist.


</TabItem>
<TabItem value="py">

```py
delete(key: str)
```

#### Parameters
- **key** (required) – Accepts: `str`
    - Description: the key of the item that is to be deleted.

#### Code Example

```py
res = db.delete("one")
```

#### Returns

Always returns `None`, even if the key does not exist.


</TabItem>

<TabItem value='go'>

**`Delete(key string) error`**

#### Parameters
- **key**: the key of the item to be deleted
#### Code Example
```go
// delete item
// returns a nil error if item was not found
err := db.Delete("dakjkfa")
if err != nil {
  fmt.Println("failed to delete item:", err)
}
```
#### Returns

Returns an `error`. A `nil` error is returned if no item was found with provided `key`. Possible error values:

- `ErrUnauthorized`: unauthorized
- `ErrInternalServerError`: internal server error

</TabItem>

</Tabs>


### Insert

The `insert` method inserts a single item into a **Base**, but is unique from [`put`](#put) in that it will raise an error of the `key` already exists in the database.

`insert` is roughly 2x slower than [`put`](#put). 

<br />
<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
    { label: 'Go', value: 'go', },
  ]
}>
<TabItem value="js">

**`async insert(data, key = null, options = null)`**

#### Parameters

- **data** (required) – Accepts: `object` (serializable), `string`, [`number`](#storing-numbers), `boolean` and `array`.
    - Description: The data to be stored.
- **key** (optional) – Accepts: `string` and `null`
    - Description:  the key (aka ID) to store the data under. Will be auto generated if not provided.
- **options** (optional) - Accepts: `object`, `null` or `undefined`
  ```json
  {
    expireIn: number,
    expireAt: Date
  }
  ```
    - Description: Optional parameters.
      - **expireIn** : item will expire in `expireIn` seconds after a successfull insert operation, see also [expiring items](./expiring_items).
      - **expireAt** : item will expire at `expireAt` date, see also [expiring items](./expiring_items).


#### Code Example
```js
// will succeed, a key will be auto-generated
const res1 = await db.insert('hello, world');

// will succeed.
const res2 = await db.insert({message: 'hello, world'}, 'greeting1');

// will raise an error as key "greeting1" already existed.
const res3 = await db.insert({message: 'hello, there'}, 'greeting1');

// expire item in 300 seconds
await db.insert({message: 'will be deleted'}, 'temp_key', {expireIn: 300})

// expire at date
await db.insert({message: 'will be deleted'}, 'temp_key_2', {expireAt: new Date('2023-01-01T00:00:00')})
```

#### Returns

Returns a promise which resolves to the item on a successful insert, and throws an error if the key already exists.

</TabItem>
<TabItem value="py">

```py
insert(
  data: typing.Union[dict, list, str, int, float, bool], 
  key: str = None,
  *,
  expire_in: int = None,
  expire_at: typing.Union[int, float, datetime.datetime] = None 
)
```

#### Parameters

- **data** (required) – Accepts: `dict`, `str`, [`int`](#storing-numbers), [`float`](#storing-numbers), `bool` and `list`.
    - Description: The data to be stored.
- **key** (optional) – Accepts: `str` and `None`
    - Description:  the key (aka ID) to store the data under. Will be auto generated if not provided.
- **expire_in** (optional) - Accepts: `int` and `None` 
    - Description: seconds after which the item will expire in, see also [expiring items](./expiring_items)
- **expire_at** (optional) - Accepts: `int`, `float`, `datetime.datetime` and `None`
    - Description: time at which the item will expire in, can provide the timestamp directly(`int` or `float`) or a [datetime.datetime](https://docs.python.org/3/library/datetime.html) object, see also [expiring items](./expiring_items)

#### Code Example
```py
# will succeed, a key will be auto-generated
db.insert("hello, world")

# will succeed.
db.insert({"message": "hello, world"}, "greeting1")

# will raise an error as key "greeting1" already existed.
db.insert({"message": "hello, there"}, "greeting1")

# expiring items
# expire in 300 seconds
db.insert({"message": "will be deleted"}, "temp_greeting", expire_in=300)

# expire at date
expire_at = datetime.datetime.fromisoformat("2023-01-01T00:00:00")
db.insert({"message": "will_be_deleted"}, "temp_greeting2", expire_at=expire_at)
```

#### Returns

Returns the item on a successful insert, and throws an error if the key already exists.

</TabItem>

<TabItem value='go'>
<Tabs
  groupId="go-version"
  defaultValue="new"
  values={[
    { label: 'version < 1.0.0', value: 'legacy', },
    { label: 'version >= 1.0.0', value: 'new', },
  ]
}>
<TabItem value="legacy">

**`Insert(item interface{}) (string, error)`**

#### Parameters
- **item** : similar to `item` parameter to [`Put`](#put)


#### Code Example

```go

import (
    "fmt"
    "github.com/deta/deta-go"
)

type User struct{
    Key string `json:"key"` // json struct tag 'key' used to denote the key
    Username string `json:"username"`
    Active bool `json:"active"`
    Age int `json:"age"`
    Likes []string `json:"likes"`
}

func main(){
    // error ignored for brevity
    d, _ := deta.New("project key")
    db, _ := d.NewBase("users")

    // a user
    u := &User{
        Key: "kasdlj1",
        Username: "jimmy",
        Active: true,
        Age: 20,
        Likes: []string{"ramen"},
    }

    // insert item in the database
    key, err := db.Insert(u)
    if err != nil {
        fmt.Println("failed to insert item:", err)
        return
    }
    fmt.Println("Successfully inserted item with key:", key)
}
```
</TabItem>
<TabItem value="new">

**`Insert(item interface{}) (string, error)`**

#### Parameters
- **item** : similar to `item` parameter to [`Put`](#put)

#### Code Example

```go

import (
	"fmt"

	"github.com/deta/deta-go/deta"
	"github.com/deta/deta-go/service/base"
)

type User struct {
	Key      string   `json:"key"` // json struct tag 'key' used to denote the key
	Username string   `json:"username"`
	Active   bool     `json:"active"`
	Age      int      `json:"age"`
	Likes    []string `json:"likes"`
}

func main() {
	d, err := deta.New(deta.WithProjectKey("project_key"))
	if err != nil {
		fmt.Println("failed to init new Deta instance:", err)
		return
	}

	db, err := base.New(d, "users")
	if err != nil {
		fmt.Println("failed to init new Base instance:", err)
	}

	u := &User{
		Key:      "kasdlj1",
		Username: "jimmy",
		Active:   true,
		Age:      20,
		Likes:    []string{"ramen"},
	}

	// insert item in the database
	key, err := db.Insert(u)
	if err != nil {
		fmt.Println("failed to insert item:", err)
		return
	}
	fmt.Println("Successfully inserted item with key:", key)
}
```
</TabItem>
</Tabs>

#### Returns
Returns the `key` of the item inserted and an `error`. Possible error values:

- `ErrConflict` : if item with provided `key` already exists
- `ErrBadItem`: bad item, if item is of unexpected type
- `ErrBadRequest`: item caused a bad request response from the server
- `ErrUnauthorized`: unauthorized
- `ErrInternalServerError`: internal server error

</TabItem>
</Tabs>

### Put Many

The Put Many method puts up to 25 items into a Base at once on a single call.

<br />
<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
    { label: 'Go', value: 'go', },
  ]
}>
<TabItem value="js">

**`async putMany(items, options)`**

#### Parameters

- **items** (required) – Accepts: `Array` of items, where each "item" can be an `object` (serializable), `string`, [`number`](#storing-numbers), `boolean` or `array`.
    - Description: The list of items to be stored.
- **options** (optional) - Accepts: `object`, `null` or `undefined`
  ```json
  {
    expireIn: number,
    expireAt: Date
  }
  ```
  - Description: Optional parameters.
    - **expireIn** : item will expire in `expireIn` seconds after a successfull put operation, see also [expiring items](./expiring_items).
    - **expireAt** : item will expire at `expireAt` date, see also [expiring items](./expiring_items).

#### Code Example
```js

await db.putMany([
  {"name": "Beverly", "hometown": "Copernicus City", "key": "one"}, // key provided
  "dude", // key auto-generated 
  ["Namaskāra", "marhabaan", "hello", "yeoboseyo"] // key auto-generated 
]);

// putMany with expire in 300 seconds
await db.putMany(
  [
    {"key": "temp-1", "name": "test-1"},
    {"key": "temp-2", "name": "test-2"},
  ],
  {expireIn: 300}
);

// putMany with expire at
await db.putMany(
  [
    {"key": "temp-1", "name": "test-1"},
    {"key": "temp-2", "name": "test-2"},
  ],
  {expireAt: new Date('2023-01-01T00:00:00')}
);

```

#### Returns

Returns a promise which resolves to the put items on a successful insert, and throws an error if you attempt to put more than 25 items.

```json
{
    "processed": {
        "items": [
            {
                "hometown": "Copernicus City",
                "key": "one",
                "name": "Beverly"
            },
            {
                "key": "jyesxxlrezo0",
                "value": "dude"
            },
            {
                "key": "5feqybn7lb05",
                "value": [
                    "Namaskāra",
                    "hello",
                    "marhabaan",
                    "yeoboseyo"
                ]
            }
        ]
    }
}
```

</TabItem>
<TabItem value="py">

```py
put_many(
  items: list,
  *,
  expire_in: int = None,
  expire_at: typing.Union[int, float, datetime.datetime] = None,
)
```

#### Parameters

- **items** (required) – Accepts: `list` of items, where each "item" can be an `dict` (JSON serializable), `str`, [`int`](#storing-numbers), `bool`, [`float`](#storing-numbers) or `list`.
    - Description: The list of items to be stored.
- **expire_in** (optional) - Accepts: `int` and `None` 
    - Description: seconds after which the item will expire in, see also [expiring items](./expiring_items)
- **expire_at** (optional) - Accepts: `int`, `float`, `datetime.datetime` and `None`
    - Description: time at which the item will expire in, can provide the timestamp directly(`int` or `float`) or a [datetime.datetime](https://docs.python.org/3/library/datetime.html) object, see also [expiring items](./expiring_items)


  
#### Code Example
```py
db.put_many([
  {"name": "Beverly", "hometown": "Copernicus City", "key": "one"}, // key provided
  "dude", // key auto-generated 
  ["Namaskāra", "marhabaan", "hello", "yeoboseyo"] // key auto-generated 
])

# put many to expire in 300 seconds
db.put_many(
  [{"key": "tmp-1", "value": "test-1"}, {"key": "tmp-2", "value": "test-2"}],
  expire_in=300,
)

# put many with expire at
expire_at = datetime.datetime.fromisoformat("2023-01-01T00:00:00")
db.put_many(
  [{"key": "tmp-1", "value": "test-1"}, {"key": "tmp-2", "value": "test-2"}],
  expire_at=expire_at,
)
```

#### Returns

Returns a dict with `processed` and `failed`(if any) items .

```json
{
    "processed": {
        "items": [
            {
                "hometown": "Copernicus City",
                "key": "one",
                "name": "Beverly"
            },
            {
                "key": "jyesxxlrezo0",
                "value": "dude"
            },
            {
                "key": "5feqybn7lb05",
                "value": [
                    "Namaskāra",
                    "hello",
                    "marhabaan",
                    "yeoboseyo"
                ]
            }
        ]
    }
}
```

</TabItem>

<TabItem value='go'>

<Tabs
  groupId="go-version"
  defaultValue="new"
  values={[
    { label: 'version < 1.0.0', value: 'legacy', },
    { label: 'version >= 1.0.0', value: 'new', },
  ]
}>
<TabItem value="legacy">

**`PutMany(items interface{}) ([]string, error)`**

#### Parameters:
- **items**: a slice of items, each item in the slice similar to the `item` parameter in [`Put`](#put)


#### Code Example:
```go

import (
    "fmt"
    "github.com/deta/deta-go"
)

type User struct{
    Key string `json:"key"` // json struct tag 'key' used to denote the key
    Username string `json:"username"`
    Active bool `json:"active"`
    Age int `json:"age"`
    Likes []string `json:"likes"`
}

func main(){
    // error ignored for brevity
    d, _ := deta.New("project key")
    db, _ := d.NewBase("users")

    // users
    u1 := &User{
        Key: "kasdlj1",
        Username: "jimmy",
        Active: true,
        Age: 20,
        Likes: []string{"ramen"},
    }
    u2 := &User{
      Key: "askdjf",
      Username: "joel",
      Active: true,
      Age: 23,
      Likes: []string{"coffee"},
    }
    users := []*User{u1, u2}

    // put items in the database
    keys, err := db.PutMany(users)
    if err != nil {
        fmt.Println("failed to put items:", err)
        return
    }
    fmt.Println("Successfully put item with keys:", keys)
}
```

</TabItem>

<TabItem value="new">

**`PutMany(items interface{}) ([]string, error)`**

#### Parameters:
- **items**: a slice of items, each item in the slice similar to the `item` parameter in [`Put`](#put)

#### Code Example:
```go
import (
	"fmt"

	"github.com/deta/deta-go/deta"
	"github.com/deta/deta-go/service/base"
)

type User struct {
	Key      string   `json:"key"` // json struct tag 'key' used to denote the key
	Username string   `json:"username"`
	Active   bool     `json:"active"`
	Age      int      `json:"age"`
	Likes    []string `json:"likes"`
}

func main() {
	d, err := deta.New(deta.WithProjectKey("project_key"))
	if err != nil {
		fmt.Println("failed to init new Deta instance:", err)
		return
	}

	db, err := base.New(d, "users")
	if err != nil {
		fmt.Println("failed to init new Base instance:", err)
	}

	// users
	u1 := &User{
		Key:      "kasdlj1",
		Username: "jimmy",
		Active:   true,
		Age:      20,
		Likes:    []string{"ramen"},
	}
	u2 := &User{
		Key:      "askdjf",
		Username: "joel",
		Active:   true,
		Age:      23,
		Likes:    []string{"coffee"},
	}
	users := []*User{u1, u2}

	// put items in the database
	keys, err := db.PutMany(users)
	if err != nil {
		fmt.Println("failed to put items:", err)
		return
	}
	fmt.Println("Successfully put item with keys:", keys)
}
```
</TabItem>
</Tabs>

#### Returns
Returns the list of keys of the items stored and an `error`. In case of an error, none of the items are stored. Possible error values:

- `ErrTooManyItems`: if there are more than 25 items
- `ErrBadItem`: bad item/items, one or more item of unexpected type
- `ErrBadRequest`: one or more item caused a bad request response from the server 
- `ErrUnauthorized`: unauthorized
- `ErrInternalServerError`: internal server error

</TabItem>
</Tabs>

### Update

`update` updates an existing item from the database.

<br />
<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
    { label: 'Go', value: 'go', },
  ]
}>
<TabItem value="js">

**`async update(updates, key, options)`**

#### Parameters

- **updates** (required) - Accepts: `object` (JSON serializable)
    - Description: a json object describing the updates on the item 
- **key** (required) – Accepts: `string`
    - Description: the key of the item to be updated.
- **options** (optional) - Accepts: `object` 
  ```json
  {
    expireIn: number,
    expireAt: Date
  }
  ```
    - Description: Optional parameters.
      - **expireIn** : item will expire in `expireIn` seconds after a successfull update operation, see also [expiring items](./expiring_items).
      - **expireAt** : item will expire at `expireAt` date, see also [expiring items](./expiring_items).

[Note for storing numbers](#storing-numbers) 

##### Update operations
- **Set** : `Set` is practiced through normal key-value pairs. The operation changes the values of the attributes provided in the `set` object if the attribute already exists. If not, it adds the attribute to the item with the corresponding value.

- **Increment**: `Increment` increments the value of an attribute. The attribute's value *must be a number*. The util `base.util.increment(value)` should be used to increment the value. The *default value is 1* if not provided and it can also be negative.

- **Append**: `Append` appends to a list. The util `base.util.append(value)` should be used to append the value. The value can be a `primitive type` or an `array`.

- **Prepend**: `Prepend` prepends to a list. The util `base.util.prepend(value)` should be used to prepend the value. The value can be a `primitive type` or an `array`.

- **Trim**: `Trim` removes an attribute from the item, the util `base.util.trim()` should be used as the value of an attribute.

#### Code Example

Consider we have the following item in a base `const users = deta.Base('users')`:

```json
{
  "key": "user-a",
  "username": "jimmy",
  "profile": {
    "age": 32,
    "active": false,
    "hometown": "pittsburgh" 
  },
  "on_mobile": true,
  "likes": ["anime"],
  "purchases": 1
}
```

Then the following update operation :

```js
const updates = {
  "profile.age": 33, // set profile.age to 33
  "profile.active": true, // set profile.active to true
  "profile.email": "jimmy@deta.sh", // create a new attribute 'profile.email'
  "profile.hometown": users.util.trim(), // remove 'profile.hometown'
  "on_mobile": users.util.trim(), // remove 'on_mobile'
  "purchases": users.util.increment(2), // increment 'purchases' by 2, default value is 1
  "likes": users.util.append("ramen") // append 'ramen' to 'likes', also accepts an array 
}

const res = await db.update(updates, "user-a");
```

Results in the following item in the base:

```json
{
  "key": "user-a",
  "username": "jimmy",
  "profile": {
    "age": 33,
    "active": true,
    "email": "jimmy@deta.sh"
  },
  "likes": ["anime", "ramen"],
  "purchases": 3
}
```

#### Returns

If the item is updated, the promise resolves to `null`. Otherwise, an error is raised.

</TabItem>
<TabItem value="py">

```py
update(
  updates: dict, 
  key: str, 
  *, 
  expire_in: int = None, 
  expire_at: typing.Union [int, float, datetime.datetime] = None
)
```

#### Parameters

- **updates** (required) - Accepts: `dict` (JSON serializable)
    - Description: a dict describing the updates on the item 
- **key** (required) – Accepts: `string`
    - Description: the key of the item to be updated.
- **expire_in** (optional) - Accepts: `int` and `None` 
    - Description: seconds after which the item will expire in, see also [expiring items](./expiring_items)
- **expire_at** (optional) - Accepts: `int`, `float`, `datetime.datetime` and `None`
    - Description: time at which the item will expire in, can provide the timestamp directly(`int` or `float`) or a [datetime.datetime](https://docs.python.org/3/library/datetime.html) object, see also [expiring items](./expiring_items)

[Note for storing numbers](#storing-numbers) 

##### Update operations
- **Set** : `Set` is practiced through normal key-value pairs. The operation changes the values of the attributes provided in the `set` dict if the attribute already exists. If not, it adds the attribute to the item with the corresponding value.

- **Increment**: `Increment` increments the value of an attribute. The attribute's value *must be a number*. The util `base.util.increment(value)` should be used to increment the value. The *default value is 1* if not provided and it can also be negative.

- **Append**: `Append` appends to a list. The util `base.util.append(value)` should be used to append the value. The value can be a `primitive type` or a `list`.

- **Prepend**: `Prepend` prepends to a list. The util `base.util.prepend(value)` should be used to prepend the value. The value can be a `primitive type` or a `list`.

- **Trim**: `Trim` removes an attribute from the item, the util `base.util.trim()` should be used as the value of an attribute.

#### Code Example

Consider we have the following item in a base `users = deta.Base('users')`:

```json
{
  "key": "user-a",
  "username": "jimmy",
  "profile": {
    "age": 32,
    "active": false,
    "hometown": "pittsburgh" 
  },
  "on_mobile": true,
  "likes": ["anime"],
  "purchases": 1 
}
```

Then the following update operation:

```py
updates = {
  "profile.age": 33,  # set profile.age to 33
  "profile.active": True, # set profile.active to true
  "profile.email": "jimmy@deta.sh", # create a new attribute 'profile.email'
  "profile.hometown": users.util.trim(), # remove 'profile.hometown'
  "on_mobile": users.util.trim(), # remove 'on_mobile'
  "purchases": users.util.increment(2), # increment by 2, default value is 1
  "likes": users.util.append("ramen") # append 'ramen' to 'likes', also accepts a list 
}

db.update(updates, "user-a")
```

Results in the following item in the base:

```json
{
  "key": "user-a",
  "username": "jimmy",
  "profile": {
    "age": 33,
    "active": true,
    "email": "jimmy@deta.sh"
  },
  "likes":["anime", "ramen"],
  "purchases": 3
}
```

#### Returns

If the item is updated, returns `None`. Otherwise, an exception is raised.

</TabItem>

<TabItem value="go">
<Tabs
  groupId="go-version"
  defaultValue="new"
  values={[
    { label: 'version < 1.0.0', value: 'legacy', },
    { label: 'version >= 1.0.0', value: 'new', },
  ]
}>
<TabItem value="legacy">

**`Update(key string, updates Updates) error`**

#### Parameters

- **key**: the key of the item to update
- **updates** : updates applied to the item, is of type `deta.Updates` which is a `map[string]interface{}`

[Note for storing numbers](#storing-numbers) 

##### Update operations
- **Set** : `Set` is practiced through normal key-value pairs. The operation changes the values of the attributes provided if the attribute already exists. If not, it adds the attribute to the item with the corresponding value.

- **Increment**: `Increment` increments the value of an attribute. The attribute's value *must be a number*. The util `Base.Util.Increment(value interface{})` should be used to increment the value. The value can also be negative.

- **Append**: `Append` appends to a list. The util `Base.Util.Append(value interface{})` should be used to append the value. The value can be a slice.

- **Prepend**: `Prepend` prepends to a list. The util `Base.Util.Prepend(value interface{})` should be used to prepend the value. The value can be a slice.

- **Trim**: `Trim` removes an attribute from the item, the util `Base.Util.Trim()` should be used as the value of an attribute.

#### Code Example

Consider we have the following item in a base `users`:

```json
{
  "key": "user-a",
  "username": "jimmy",
  "profile": {
    "age": 32,
    "active": false,
    "hometown": "pittsburgh" 
  },
  "on_mobile": true,
  "likes": ["anime"],
  "purchases": 1
}
```

Then the following update operation :

```go
// define the updates
updates := deta.Updates{
  "profile.age": 33, // set profile.age to 33
  "profile.active": true, // set profile.active to true
  "profile.email": "jimmy@deta.sh", // create a new attribute 'profile.email'
  "profile.hometown": users.Util.Trim(), // remove 'profile.hometown'
  "on_mobile": users.Util.Trim(), // remove 'on_mobile'
  "purchases": users.Util.Increment(2), // increment 'purchases' by 2 
  "likes": users.Util.Append("ramen") // append 'ramen' to 'likes', also accepts a slice 
}

// update
err := users.Util.Update("user-a", updates);
```

Results in the following item in the base:

```json
{
  "key": "user-a",
  "username": "jimmy",
  "profile": {
    "age": 33,
    "active": true,
    "email": "jimmy@deta.sh"
  },
  "likes": ["anime", "ramen"],
  "purchases": 3
}
```
</TabItem>
<TabItem value="new">

**`Update(key string, updates Updates) error`**

#### Parameters

- **key**: the key of the item to update
- **updates** : updates applied to the item, is of type `base.Updates` which is a `map[string]interface{}`

[Note for storing numbers](#storing-numbers)

##### Update operations
- **Set** : `Set` is practiced through normal key-value pairs. The operation changes the values of the attributes provided if the attribute already exists. If not, it adds the attribute to the item with the corresponding value.

- **Increment**: `Increment` increments the value of an attribute. The attribute's value *must be a number*. The util `Base.Util.Increment(value interface{})` should be used to increment the value. The value can also be negative.

- **Append**: `Append` appends to a list. The util `Base.Util.Append(value interface{})` should be used to append the value. The value can be a slice.

- **Prepend**: `Prepend` prepends to a list. The util `Base.Util.Prepend(value interface{})` should be used to prepend the value. The value can be a slice.

- **Trim**: `Trim` removes an attribute from the item, the util `Base.Util.Trim()` should be used as the value of an attribute.

#### Code Example

Consider we have the following item in a base `users`:

```json
{
  "key": "user-a",
  "username": "jimmy",
  "profile": {
    "age": 32,
    "active": false,
    "hometown": "pittsburgh" 
  },
  "likes": ["anime"],
  "purchases": 1
}
```

Then the following update operation :

```go
import (
	"fmt"

	"github.com/deta/deta-go/deta"
	"github.com/deta/deta-go/service/base"
)

type Profile struct {
	Active   bool   `json:"active"`
	Age      int    `json:"age"`
	Hometown string `json:"hometown"`
}

type User struct {
	Key       string   `json:"key"` // json struct tag 'key' used to denote the key
	Username  string   `json:"username"`
	Profile   *Profile `json:"profile"`
	Purchases int      `json:"purchases"`
	Likes     []string `json:"likes"`
}

func main() {
	d, err := deta.New(deta.WithProjectKey("project_key"))
	if err != nil {
		fmt.Println("failed to init new Deta instance:", err)
		return
	}

	db, err := base.New(d, "users")
	if err != nil {
		fmt.Println("failed to init new Base instance:", err)
	}

	// define the updates
	updates := base.Updates{
		"profile.age": 33, // set profile.age to 33
		"profile.active": true, // set profile.active to true
		"profile.hometown": db.Util.Trim(), // remove 'profile.hometown'
		"purchases": db.Util.Increment(2), // increment 'purchases' by 2 
		"likes": db.Util.Append("ramen"), // append 'ramen' to 'likes', also accepts a slice 
	}
	// update
	err = db.Update("user-a", updates)
	if err != nil {
		fmt.Println("failed to update")
		return
	}
}
```

Results in the following item in the base:

```json
{
  "key": "user-a",
  "username": "jimmy",
  "profile": {
    "age": 33,
    "active": true,
  },
  "likes": ["anime", "ramen"],
  "purchases": 3
}
```
</TabItem>
</Tabs>

#### Returns

Returns an `error`. Possible error values:

- `ErrBadRequest`: the update operation caused a bad request response from the server
- `ErrUnauthorized`: unauthorized
- `ErrInternalServerError`: internal server error

</TabItem>
</Tabs>


### Fetch


Fetch retrieves a list of items matching a query. It will retrieve everything if no query is provided.

A query is composed of a single [query](https://docs.deta.sh/docs/base/queries/) object or a list of [queries](https://docs.deta.sh/docs/base/queries/).

In the case of a list, the indvidual queries are OR'ed.


<br />
<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
    { label: 'Go', value: 'go', },
  ]
}>
<TabItem value="js">

<Tabs
  groupId="js-version"
  defaultValue="new"
  values={[
    { label: 'version < 1.0.0', value: 'legacy', },
    { label: 'version >= 1.0.0', value: 'new', },
  ]
}>

<TabItem value="legacy">

**`async fetch(query, pages=10, buffer=null)`**

#### Parameters

- **query**: is a single [query object](https://docs.deta.sh/docs/base/queries/) or list of queries. If omitted, you will get all the items in the database (up to 1mb).
- **pages**: how many pages of items should be returned.
- **buffer**: the number of items which will be returned for each iteration (aka "page") on the return iterable. This is useful when your query is returning more than 1mb of data, so you could buffer the results in smaller chunks.

#### Code Example

For the examples, let's assume we have a **Base** with the following data:

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

```js
const {value: myFirstSet} = await db.fetch({"age?lt": 30}).next();
const {value: mySecondSet} = await db.fetch([
  { "age?gt": 50 },
  { "hometown": "Greenville" }
]).next();
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

A promise which resolves to a generator of objects that meet the `query` criteria.

The total number of items will not exceed the defined using `buffer` and `pages. Max. number of items

Iterating through the generator yields arrays containing objects, each array of max length `buffer`.


#### Example using buffer, pages

```js
const foo = async (myQuery, bar) => {

  items = db.fetch(myQuery, 10, 20) // items is up to the limit length (10*20)

  for await (const subArray of items) // each subArray is up to the buffer length, 20
    bar(subArray)
}
```
</TabItem>

<TabItem value="new">

**`async fetch(query, options)`**

#### Parameters

- **query**: is a single [query object (`dict`)](https://docs.deta.sh/docs/base/queries/) or list of queries. If omitted, you will get all the items in the database (up to 1mb).
- **options**: optional params:
  - `limit`: the limit of the number of items you want to retreive, min value `1` if used.
  - `last`: the last key seen in a previous paginated response, provide this in a subsequent call to fetch further items.

:::note
Upto 1 MB of data is retrieved before filtering with the query. Thus, in some cases you might get an empty list of items but still the `last` key evaluated in the response. 

To apply the query through all the items in your base, you have to call fetch until `last` is empty.
:::

#### Returns

A promise which resolves to an object with the following attributes:

- `count` : The number of items in the response.

- `last`: The last key seen in the fetch response. If `last` is not `undefined` further items are to be retreived.

- `items`: The list of items retreived.


#### Example

For the examples, let's assume we have a **Base** with the following data:

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

```js
const { items: myFirstSet } = await db.fetch({"age?lt": 30});
const { items: mySecondSet } = await db.fetch([
  { "age?gt": 50 },
  { "hometown": "Greenville" }
])
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

#### Fetch All Items

```js
let res = await db.fetch();
let allItems = res.items;

// continue fetching until last is not seen
while (res.last){
  res = await db.fetch({}, {last: res.last});
  allItems = allItems.concat(res.items);
}
```

</TabItem>
</Tabs>
</TabItem>

<TabItem value="py">

<Tabs
  groupId="py-version"
  defaultValue="new"
  values={[
    { label: 'version < 1.0.0', value: 'legacy', },
    { label: 'version >= 1.0.0', value: 'new', },
  ]
}>

<TabItem value="legacy">

**`fetch(query=None, buffer=None, pages=10):`**

#### Parameters

- **query**: is a single [query object (`dict`)](https://docs.deta.sh/docs/base/queries/) or list of queries. If omitted, you will get all the items in the database (up to 1mb).
- **pages**: how many pages of items should be returned.
- **buffer**: the number of items which will be returned for each iteration (aka "page") on the return iterable. This is useful when your query is returning more 1mb of data, so you could buffer the results in smaller chunks.

#### Code Example

For the examples, let's assume we have a **Base** with the following data:

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

```py
my_first_set = next(db.fetch({"age?lt": 30}))
my_second_set = next(db.fetch([{"age?gt": 50}, {"hometown": "Greenville"}]))
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

A generator of objects that meet the `query` criteria.

The total number of items will not exceed the defined using `buffer` and `pages. Max. number of items

Iterating through the generator yields lists containing objects, each list of max length `buffer`.


#### Example using buffer, pages

```py
def foo(my_query, bar):
  items = db.fetch(my_query, pages=10, buffer=20) # items is up to the limit length (10*20)

  for sub_list in items: # each sub_list is up to the buffer length, 10
    bar(sub_list)
```
</TabItem>

<TabItem value="new">

**`fetch(query=None, limit=1000, last=None):`**

#### Parameters

- **query**: is a single [query object (`dict`)](https://docs.deta.sh/docs/base/queries/) or list of queries. If omitted, you will get all the items in the database (up to 1mb or max 1000 items).
- **limit**: the limit of the number of items you want to retreive, min value `1` if used
- **last**: the last key seen in a previous paginated response

:::note
Upto 1 MB of data is retrieved before filtering with the query. Thus, in some cases you might get an empty list of items but still the `last` key evaluated in the response. 

To apply the query through all the items in your base, you have to call fetch until `last` is empty.
:::

#### Returns

Returns an instance of a `FetchResponse` class which has the following properties.

- `count` : The number of items in the response.

- `last`: The last key seen in the fetch response. If `last` is not `None` further items are to be retreived

- `items`: The list of items retreived.

#### Code Example

For the examples, let's assume we have a **Base** with the following data:

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

```py
first_fetch_res = db.fetch({"age?lt": 30})
second_fetch_res = db.fetch([{"age?gt": 50}, {"hometown": "Greenville"}])
```

... will come back with following data:

##### `first_fetch_res.items`:
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

##### `second_fetch_res.items`:
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


#### Fetch All Items

```py
res = db.fetch()
all_items = res.items

# fetch until last is 'None'
while res.last:
  res = db.fetch(last=res.last)
  all_items += res.items
```

</TabItem>



</Tabs>
</TabItem>

<TabItem value='go'>
<Tabs
  groupId="go-version"
  defaultValue="new"
  values={[
    { label: 'version < 1.0.0', value: 'legacy', },
    { label: 'version >= 1.0.0', value: 'new', },
  ]
}>
<TabItem value='legacy'>

**`Fetch(i *FetchInput) error`**

#### Parameters

- **i**: is a pointer to a `FetchInput`

  ```go
  // FetchInput input to Fetch operation
  type FetchInput struct {
    // filters to apply to items
    // A nil value applies no queries and fetches all items
    Q Query
    // the destination to store the results
    Dest interface{}
    // the maximum number of items to fetch
    // value of 0 or less applies no limit
    Limit int
    // the last key evaluated in a paginated response
    // leave empty if not a subsequent fetch request
    LastKey string
  }  
  ```
  - `Q`: fetch query, is of type `deta.Query` which is a `[]map[string]interface{}`
  - `Dest`: the results will be stored into the value pointed by `Dest`
  - `Limit`: the maximum number of items to fetch, value of `0` or less applies no limit
  - `LastKey`: the last key evaluated in a paginated response, leave empty if not a subsequent fetch request 

#### Code Example

```go
import (
    "github.com/deta/deta-go"
)

type User struct {
    Key string `json:"key"`
    Name string `json:"name"`
    Age int `json:"age"`
    Hometown string `json:"hometown"`
}

func main(){
    // errors ignored for brevity
    d, _ := deta.New("project key")
    db, _ := deta.NewBase("users")

    // query to get users with age less than 30
    query := deta.Query{
      {"age?lt": 50},
    }
    
    // variabe to store the results
    var results []*User

    // fetch items
    _, err := db.Fetch(&deta.FetchInput{
      Q: query,
      Dest: &results,
    })
    if err != nil {
        fmt.Println("failed to fetch items:", err) 
    }
}
```

... `results` will have the following data:

```json
[
  {
    "key": "key-1",
    "name": "Wesley",
    "age": 27,
    "hometown": "San Francisco",
  },
  {
    "key": "key-3",
    "name": "Kevin Garnett",
    "age": 43,
    "hometown": "Greenville",
  },
]
```

#### Paginated example

```go
import (
    "github.com/deta/deta-go"
)

type User struct {
    Key string `json:"key"`
    Name string `json:"name"`
    Age int `json:"age"`
    Hometown string `json:"hometown"`
}

func main(){
    // errors ignored for brevity
    d, _ := deta.New("project key")
    db, _ := deta.NewBase("users")

    // query to get users with age less than 30
    query := deta.Query{
      {"age?lt": 50},
    }
    
    // variabe to store the results
    var results []*User

    // variable to store the page
    var page []*User

    // fetch input 
    i := &deta.FetchInput{
      Q: query,      
      Dest: &page,
      Limit: 1, // limit provided so each page will only have one item
    } 
    
    // fetch items
    lastKey, err := db.Fetch(i)
    if err != nil {
        fmt.Println("failed to fetch items:", err) 
        return
    }

    // append page items to results
    results = append(allResults, page...)

    // get all pages
    for lastKey != ""{
      // provide the last key in the fetch input
      i.LastKey = lastKey

      // fetch
      lastKey, err := db.Fetch(i)
      if err != nil {
          fmt.Println("failed to fetch items:", err)
          return
      }

      // append page items to all results
      results = append(allResults, page...)
    }
}
```
</TabItem>
<TabItem value='new'>

**`Fetch(i *FetchInput) error`**

#### Parameters

- **i**: is a pointer to a `FetchInput`

  ```go
  // FetchInput input to Fetch operation
  type FetchInput struct {
    // filters to apply to items
    // A nil value applies no queries and fetches all items
    Q Query
    // the destination to store the results
    Dest interface{}
    // the maximum number of items to fetch
    // value of 0 or less applies no limit
    Limit int
    // the last key evaluated in a paginated response
    // leave empty if not a subsequent fetch request
    LastKey string
  }  
  ```
  - `Q`: fetch query, is of type `deta.Query` which is a `[]map[string]interface{}`
  - `Dest`: the results will be stored into the value pointed by `Dest`
  - `Limit`: the maximum number of items to fetch, value of `0` or less applies no limit
  - `LastKey`: the last key evaluated in a paginated response, leave empty if not a subsequent fetch request 

#### Code Example

```go
import (
	"fmt"

	"github.com/deta/deta-go/deta"
	"github.com/deta/deta-go/service/base"
)

type User struct {
  Key string `json:"key"`
  Name string `json:"name"`
  Age int `json:"age"`
  Hometown string `json:"hometown"`
}

func main() {
	d, err := deta.New(deta.WithProjectKey("project_key"))
	if err != nil {
		fmt.Println("failed to init new Deta instance:", err)
		return
	}

	db, err := base.New(d, "users")
	if err != nil {
		fmt.Println("failed to init new Base instance:", err)
	}

	// query to get users with age less than 30
	query := base.Query{
		{"age?lt": 50},
	}

	// variabe to store the results
	var results []*User

	// fetch items
	_, err = db.Fetch(&base.FetchInput{
		Q:    query,
		Dest: &results,
	})
	if err != nil {
		fmt.Println("failed to fetch items:", err)
	}
}
```

... `results` will have the following data:

```json
[
  {
    "key": "key-1",
    "name": "Wesley",
    "age": 27,
    "hometown": "San Francisco",
  },
  {
    "key": "key-3",
    "name": "Kevin Garnett",
    "age": 43,
    "hometown": "Greenville",
  },
]
```

#### Paginated example

```go
import (
	"fmt"

	"github.com/deta/deta-go/deta"
	"github.com/deta/deta-go/service/base"
)

type User struct {
	Key      string   `json:"key"` // json struct tag 'key' used to denote the key
	Username string   `json:"username"`
	Active   bool     `json:"active"`
	Age      int      `json:"age"`
	Likes    []string `json:"likes"`
}

func main() {
	d, err := deta.New(deta.WithProjectKey("project_key"))
	if err != nil {
		fmt.Println("failed to init new Deta instance:", err)
		return
	}

	db, err := base.New(d, "users")
	if err != nil {
		fmt.Println("failed to init new Base instance:", err)
	}

	// query to get users with age less than 30
	query := base.Query{
		{"age?lt": 50},
	}

	// variabe to store the results
	var results []*User

	// variable to store the page
	var page []*User

	// fetch input
	i := &base.FetchInput{
		Q:     query,
		Dest:  &page,
		Limit: 1, // limit provided so each page will only have one item
	}

	// fetch items
	lastKey, err := db.Fetch(i)
	if err != nil {
		fmt.Println("failed to fetch items:", err)
		return
	}

	// append page items to results
	results = append(results, page...)

	// get all pages
	for lastKey != "" {
		// provide the last key in the fetch input
		i.LastKey = lastKey

		// fetch
		lastKey, err = db.Fetch(i)
		if err != nil {
			fmt.Println("failed to fetch items:", err)
			return
		}

		// append page items to all results
		results = append(results, page...)
	}
}
```
</TabItem>
</Tabs>

#### Returns

Returns an `error`. Possible error values:

- `ErrBadDestination`: bad destination, results could not be stored onto `dest`
- `ErrBadRequest`: the fetch request caused a bad request response from the server
- `ErrUnauthorized`: unauthorized
- `ErrInternalServerError`: internal server error

</TabItem>

</Tabs>

## Issues

If you run into any issues, consider reporting them in our [Github Discussions](https://github.com/orgs/deta/discussions).