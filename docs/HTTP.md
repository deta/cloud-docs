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

> The `base_name` is the name for your database. If you already have a **Base**, then you can go ahead and provide it's name here. Additionally, you could provide any name here when doing any `PUT`or `POST` request and our backend will automatically create it. There is no limit on how many "Bases" you can create.

### Auth
A **Project Key** _must_ to be provided in the request **headers** `X-API-Key` for authentication. This is how we authorize your requests.

Example `'X-API-Key: a0abcyxz_randomstring'`.

### Content Type

We only accept JSON payloads. Make sure you set the headers correctly: `'Content-Type: application/json'`



## Endpoints

### Put Item

<Bubble item="PUT /items" /> 


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
            "key": {key},//optional
            "field1": "value1",
            // rest of item
        },
        // rest of items
    ]
}

```

</TabItem>
<TabItem value="response">

#### `207 Multi-Status`

```js
{
    "processed": {
        "items": [
            // items which were saved
        ]
    },
    "failed": {
        "items": [
            // items which have failed
        ]
    }
}
```
</TabItem>


</Tabs>

### Get Item

<Bubble item="GET /items/{key}" /> 


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
You will get one of two responses:

#### 1. `200 OK`

```js
{
  "key": {key},
  // the rest of the item
}
```

#### 2. `404 Not Found`

</TabItem>
</Tabs>


### Delete Item

<Bubble item="DELETE /items/{key}" /> 



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

### Post (Insert) Item

<Bubble item="POST /items" /> 

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

You will get one of two responses:

#### 1. `201 Created`

```json
{
    "item": {
        "deta_key": {key}, // auto generated key if key was not provided in the request
        "field1": "value1",
        // the rest of the item
    } 
}
```

#### 2. `409 Conflict` (if key already exists)


</TabItem>
</Tabs>

### List Items

<Bubble item="POST /query" /> 

<Tabs
  defaultValue="request"
  values={[
    { label: 'Request', value: 'request', },
    { label: 'Response', value: 'response', },
  ]
}>
<TabItem value="request">

| JSON Payload    | Required | Type     |
|-----------------|----------|----------|
| `query`         | No       | `list`   |
| `limit`         | No       | `int`    |
| `last_key`      | No       | `string` |


#### Example

```json
{
   "query": [
        //separate objects in the list are ORed
        {"user.hometown": "Berlin"},
        {"user.age?lt": 40}
   ],
   "limit": 5,
   "last": "afsefasd" // last key if applicable
}
```


</TabItem>
<TabItem value="response">

#### `200 OK`

```json
{
    "paging": {
        "size": 5, // size of items
        "last": adfjie // last key seen
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


</TabItem>
</Tabs>

## Contact

`team@deta.sh`