---
id: http
title: HTTP API
sidebar_label: HTTP API
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export let Bubble = ({ item }) => {
    return (
        <div>
            <div style={{ display: 'flex', fontFamily: 'monospace', borderRadius: '3px', backgroundColor: '#ddd', display: 'inline', padding: '5px'}}>
                {item}
            </div>
            <div className="twentypx"/>
        </div>
    );
}

## General & Auth

:::note
You can get your **Project Key** and your **Project ID** from your [Deta dashboard](https://web.deta.sh). You need these to talk with the Deta API.
:::

:::info
Base currently supports **maximum 16 digit numbers** (integers and floating points), please store larger numbers as a string.
::: 

### Root URL
This URL is the base for all your HTTP requests:

**`https://database.deta.sh/v1/{project_id}/{base_name}`**

> The `base_name` is the name given to your database. If you already have a **Base**, then you can go ahead and provide it's name here. Additionally, you could provide any name here when doing any `PUT` or `POST` request and our backend will automatically create a new base for you if it does not exist. There is no limit on how many "Bases" you can create.

### Auth
A **Project Key** _must_ to be provided in the request **headers** as a value for the `X-API-Key` key for authentication. This is how we authorize your requests.

Example `'X-API-Key: a0abcyxz_aSecretValue'`.

### Content Type

We only accept JSON payloads. Make sure you set the headers correctly: `'Content-Type: application/json'`

## Endpoints

### Put Items

**`PUT /items`**

Stores multiple items in a single request. This request overwrites an item if the key already exists.

<Tabs
  defaultValue="request"
  values={[
    { label: 'Request', value: 'request', },
    { label: 'Response', value: 'response', },
  ]
}>
<TabItem value="request">


| JSON Payload | Required | Type    | Description                              |
|--------------|----------|---------|------------------------------------------|
| `items`      | Yes      | `array` | An array of items `object` to be stored. |



#### Example

```json
{
   // array of items to put
   "items": [
        {
            "key": {key}, // optional, a random key is generated if not provided
            "field1": "value1",
            // rest of item
        },
        // rest of items
    ]
}
```

</TabItem>
<TabItem value="response">

#### `207 Multi Status`

```js
{
    "processed": {
        "items": [
            // items which were stored 
        ]
    },
    "failed": {
       "items": [
           // items failed because of internal processing
       ]
    }
}
```

#### Client errors

In case of client errors, **no items** in the request are stored.

#### `400 Bad Request`

```js
{
    "errors" : [
       // error messages
    ] 
}
```

Bad requests occur in the following cases: 
- if an item has a non-string key
- if the number of items in the requests exceeds 25
- if total request size exceeds 16 MB
- if any individual item exceeds 400KB
- if there are two items with identical keys

:::info
Empty keys in objects/dictionaries/structs, like `{"": "value"}` are invalid and will fail to be added during the backend processing stage.
:::

</TabItem>
</Tabs>

### Get Item

**`GET /items/{key}`**

Get a stored item.

:::note
If the *key* contains url unsafe or reserved characters, make sure to url-encode the *key*. Otherwise, it will lead to unexpected behavior.
:::

<Tabs
  defaultValue="request"
  values={[
    { label: 'Request', value: 'request', },
    { label: 'Response', value: 'response', },
  ]
}>
<TabItem value="request">

| URL Parameter | Required | Type     | Description                                        |
|---------------|----------|----------|----------------------------------------------------|
| `key`         | Yes      | `string` | The key (aka. ID) of the item you want to retrieve |



</TabItem>
<TabItem value="response">

#### `200 OK`

```js
{
  "key": {key},
  // the rest of the item
}
```

#### `404 Not Found`
```js
{
  "key": {key}
}
```

</TabItem>
</Tabs>


### Delete Item

**`DELETE /items/{key}`**

Delete a stored item.

:::note
If the *key* contains url unsafe or reserved characters, make sure to url-encode the *key*. Otherwise, it will lead to unexpected behavior.
:::

<Tabs
  defaultValue="request"
  values={[
    { label: 'Request', value: 'request', },
    { label: 'Response', value: 'response', },
  ]
}>
<TabItem value="request">

| URL Parameter | Required | Type     | Description                                       |
|---------------|----------|----------|---------------------------------------------------|
| `key`         | Yes      | `string` | The key (aka. ID) of the item you want to delete. |

</TabItem>
<TabItem value="response">

The server will always return `200` regardless if an item with that `key` existed or not.

#### `200 OK`

```json
{
  "key": {key}
}
```

</TabItem>
</Tabs>

### Insert Item

**`POST /items`**

Creates a new item only if no item with the same `key` exists. 

<Tabs
  defaultValue="request"
  values={[
    { label: 'Request', value: 'request', },
    { label: 'Response', value: 'response', },
  ]
}>
<TabItem value="request">


| JSON Payload | Required | Type     | Description            |
|--------------|----------|----------|------------------------|
| `item`       | Yes      | `object` | The item to be stored. |

#### Example

```json
{
    "item": {
        "key": {key}, // optional
        // rest of item
    }
}
```

</TabItem>
<TabItem value="response">

#### `201 Created`

```json
{
  "key": {key}, // auto generated key if key was not provided in the request
  "field1": "value1",
  // the rest of the item
}
```

#### Client errors  

#### `409 Conflict` (if key already exists)

```json
{
  "errors": ["Key already exists"] 
}
```

#### `400 Bad Request`

```json
{
  "errors": [
     // error messages
  ]
}
```

Bad requests occur in the following cases: 
- if the item has a non-string key
- if size of the item exceeds 400KB

</TabItem>
</Tabs>

### Update Item

**`PATCH /items/{key}`**

Updates an item only if an item with `key` exists. 

:::note
If the *key* contains url unsafe or reserved characters, make sure to url-encode the *key*. Otherwise, it will lead to unexpected behavior.
:::

<Tabs
  defaultValue="request"
  values={[
    { label: 'Request', value: 'request', },
    { label: 'Response', value: 'response', },
  ]
}>
<TabItem value="request">


| JSON Payload | Required | Type              | Description                                                          |
|--------------|----------|-------------------|----------------------------------------------------------------------|
| `set`        | no       | `object`          | The attributes to be updated or created.                             |
| `increment`  | no       | `object`          | The attributes to be incremented. Increment value can be negative.   |
| `append`     | no       | `object`          | The attributes to append a value to. Appended value must be a list.  |
| `prepend`    | no       | `object`          | The attributes to prepend a value to. Prepended value must be a list.|
| `delete`     | no       | `string array`    | The attributes to be deleted.                                        |

#### Example

If the following item exists in the database

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

Then the request

```json
{
   "set" : {
     // change ages to 33
     "profile.age": 33, 
     // change active to true
     "profile.active": true, 
     // add a new attribute `profile.email`
     "profile.email": "jimmy@deta.sh"
   },

   "increment" :{
     // increment purchases by 2
     "purchases": 2
   },

   "append": {
     // append to 'likes' 
     "likes": ["ramen"]
   },

   // remove attributes 'profile.hometown' and 'on_mobile'
   "delete": ["profile.hometown", "on_mobile"]
}
```

results in the following item in the database:

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
<TabItem value="response">

#### `200 OK`

```json
{
   "key": {key},
   "set": {
     // identical to the request
   },
   "delete": ["field1", ..] // identical to the request 
}
```

#### Client errors  

#### `404 Not Found` (if key does not exist)

```json
{
  "errors": ["Key not found"] 
}
```

#### `400 Bad Request`

```json
{
  "errors": [
     // error messages
  ]
}
```

Bad requests occur in the following cases: 
- if you're updating or deleting the `key`  
- if `set` and `delete` have conflicting attributes 
- if you're setting a hierarchical attribute but an upper level attribute does not exist, for eg. `{"set": {"user.age": 22}}` but `user` is not an attribute of the item.

</TabItem>
</Tabs>


### Query Items

**`POST /query`**

List items that match a [query](https://docs.deta.sh/docs/base/queries/).

<Tabs
  defaultValue="request"
  values={[
    { label: 'Request', value: 'request', },
    { label: 'Response', value: 'response', },
  ]
}>
<TabItem value="request">

| JSON Payload    | Required | Type     | Description                                    |
|-----------------|----------|----------|------------------------------------------------|
| `query`         | No       | `list`   | list of a [query](https://docs.deta.sh/docs/base/queries/)|
| `limit`         | No       | `int`    | no of items to return. min value 1 if used     |
| `last`          | No       | `string` | last key seen in a previous paginated response |


#### Example

```json
{
   "query": [
        // separate objects in the list are ORed
        // query evaluates to list all users whose hometown is Berlin and is active OR all users who age less than 40
        {"user.hometown": "Berlin", "user.active": true},
        {"user.age?lt": 40}
   ],
   "limit": 5,
   "last": "afsefasd" // last key if applicable
}
```

</TabItem>
<TabItem value="response">

The response is paginated if data process size exceeds 1 MB (before the query is applied) or the total number of items matching the `query` exceeds the `limit` provided in the request.

For paginated responses, `last` will return the last key seen in the response. You must use this `key` in the following request to continue retreival of items. If the response does not have the `last` key, then no further items are to be retreived.

:::note
Upto 1 MB of data is retrieved before filtering with the query. Thus, in some cases you might get an empty list of items but still the `last` key evaluated in the response.

To apply the query through all the items in your base, you have to call fetch until `last` is empty.
:::

#### `200 OK`

```json
{
    "paging": {
        "size": 5, // size of items returned
        "last": "adfjie" // last key seen if paginated, provide this key in the following request
    },
    "items": [
       {
         "key": {key},
         // rest of the item
       },
       // rest of the items
   ]
}
```

#### Client Errors 

#### `400 Bad Request`

```json
{
  "errors": [
    // error messages
  ]
}
```

Bad requests occur in the following cases:
- if a query is made on the `key`
- if a query is not of the right format
- if `limit` is provided in the request and is less than 1

</TabItem>
</Tabs>

## Issues

If you run into any issues, consider reporting them in our [Github Discussions](https://github.com/orgs/deta/discussions).