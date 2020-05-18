---
id: HTTP
title: HTTP API
sidebar_label: HTTP API
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export let Bubble = ({ item }) => {
    return (
        <div style={{ display: 'flex', fontFamily: 'monospace', borderRadius: '3px', backgroundColor: '#ddd', display: 'inline', padding: '5px' }}>
            {item}
        </div>
    );
}

## General & Auth


:::note
You can get your **Project Key** and your **Project ID** from your [Deta dashboard](#). You need these to talk with the Deta API.
:::

### Root URL
This URL is the base for all your HTTP requests:

**`https://database.deta.sh/v1/{project_id}/{base_name}`**

> The `base_name` is the name for your database. If you already have a **Base**, then you can go ahead and provide it's name here. Additionally, you could provide any name here when doing any `PUT`or `POST` request and our backend will automatically create it. There is no limit on hoe many "Bases" you can create.

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

TODO: fix the payload

| JSON Payload | Required | Type    | Description                              |
|--------------|----------|---------|------------------------------------------|
| `items`      | Yes      | `array` | An array of items `object` to be stored. |

</TabItem>
<TabItem value="response">

`207 Multi-Status`

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
You will get two responses:

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

`200 OK`

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

TODO: fix the payload

| JSON Payload | Required | Type     | Description            |
|--------------|----------|----------|------------------------|
| `item`       | Yes      | `object` | The item to be stored. |


</TabItem>
<TabItem value="response">

`201 Created`

TODO: other responses


</TabItem>
</Tabs>

### List Items

<Bubble item="GET /items?query={query}&limit={limit}&last={last_key}" /> 

<Tabs
  defaultValue="request"
  values={[
    { label: 'Request', value: 'request', },
    { label: 'Response', value: 'response', },
  ]
}>
<TabItem value="request">

| Query Parameter | Required | Type     |
|-----------------|----------|----------|
| `query`         | No       | `list`   |
| `limit`         | No       | `int`    |
| `last_key`      | No       | `string` |


</TabItem>
<TabItem value="response">
TODO


</TabItem>
</Tabs>