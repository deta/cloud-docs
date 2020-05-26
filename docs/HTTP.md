---
id: HTTP
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

### Root URL
This URL is the base for all your HTTP requests:

**`https://database.deta.sh/v1/{project_id}/{base_name}`**

> The `base_name` is the name for your database. If you already have a **Base**, then you can go ahead and provide it's name here. Additionally, you could provide any name here when doing any `PUT` or `POST` request and our backend will automatically create a new base for you if it does not exist. There is no limit on how many "Bases" you can create.

### Auth
A **Project Key** _must_ to be provided in the request **headers** `X-API-Key` for authentication. This is how we authorize your requests.

Example `'X-API-Key: a0abcyxz_aSecretValue'`.

### Content Type

We only accept JSON payloads. Make sure you set the headers correctly: `'Content-Type: application/json'`

### Naming Constraints

- All user provided **keys** in an item can only contain alphanumeric(`a-z,A-Z,0-9`), underscore(`_`), dot(`.`), dash(`-`) and tilde (`~`) characters. For instance a `random key$` is not a valid key because it contains a space and a `$`. 

- Object attributes cannot contain the question mark character(`?`). For eg an object like `{"val?ue": 1}` can not be stored in the detabase.


## Endpoints

### Put Item

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

### Client errors

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
- if any item does not follow the [naming constraints](#naming-constraints)

</TabItem>
</Tabs>

### Get Item

**`GET /items/{key}`**

Get a stored item.

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
    "item": {
        "deta_key": {key}, // auto generated key if key was not provided in the request
        "field1": "value1",
        // the rest of the item
    } 
}
```

### Client errors  

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
- if the item does not follow the [naming constraints](#naming-constraints)

</TabItem>
</Tabs>

### Query Items

**`POST /query`**

List items that match a [query](./lib#queries).

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
| `query`         | No       | `list`   | a [query](./lib#queries)                       |
| `limit`         | No       | `int`    | no of items to return. min value 1 if used     |
| `last`          | No       | `string` | last key seen in a previous paginated response |


#### Example

```json
{
   "query": [
        // separate objects in the list are ORed
        // query evaluetes to list all users whose hometown is Berlin and is active OR all users who age less than 40
        {"user.hometown": "Berlin", "user.active": true},
        {"user.age?lt": 40}
   ],
   "limit": 5,
   "last": "afsefasd" // last key if applicable
}
```

</TabItem>
<TabItem value="response">

The response is paginated if the reponse size exceeds 1 MB or the total number of items matching the `query` exceeds the `limit` provided in the request.

For paginated responses, `last` will return the last key seen in the response. You must use this `key` in the following request to continue retreival of items. If the response does not have the `last` key, then no further items are to be retreived.

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

### Client Errors 

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

## Contact

`team@deta.sh`