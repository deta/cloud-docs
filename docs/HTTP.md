---
id: HTTP
title: HTTP API
sidebar_label: HTTP API
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export let Bubble = ({ item }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center',
        borderRadius: '0.5rem', color: '#f5f6f7', backgroundColor: '#3884ff',
        width: '120px', padding: '2' }}>
            HTTP {item}
        </div>
    );
}

## General & Auth

Root url: **`https://database.deta.sh/v1/{project_key}/{base_name}`**

The `project_key` **must** to be provided in the header `X-API-Key` for authentication.



## Endpoints

### Put Item

<Bubble item="PUT" /> 


**`/{project_id}/{base_name}/items`**

<Tabs
  defaultValue="request"
  values={[
    { label: 'Request', value: 'request', },
    { label: 'Response', value: 'response', },
  ]
}>
<TabItem value="request">

| Path Parameter   | Required | Type     |
|------------------|----------|----------|
| `project_id`     | Yes      | `string` |
| `base_name`      | Yes      | `string` |


| Payload | Required | Type    | Description                              |
|---------|----------|---------|------------------------------------------|
| `items` | Yes      | `array` | An array of items `object` to be stored. |

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

<Bubble item="GET" /> 

**`/{project_id}/{base_name}/{key}`**

<Tabs
  defaultValue="request"
  values={[
    { label: 'Request', value: 'request', },
    { label: 'Response', value: 'response', },
  ]
}>
<TabItem value="request">

| Path Parameter   | Required | Type     |Description
|------------------|----------|----------|
| `project_id`     | Yes      | `string` |
| `base_name`      | Yes      | `string` |
| `key`            | Yes      | `string` |



</TabItem>
<TabItem value="response">



</TabItem>
</Tabs>


### Delete Item

<Bubble item="DELETE" /> 


<br />


**`/{project_id}/{base_name}/items/{key}?strict={strict}`**

<Tabs
  defaultValue="request"
  values={[
    { label: 'Request', value: 'request', },
    { label: 'Response', value: 'response', },
  ]
}>
<TabItem value="request">

| Path Parameter   | Required | Type      |
|------------------|----------|-----------|
| `project_id`     | Yes      | `string`  |
| `base_name`      | Yes      | `string`  |
| `key`            | Yes      | `string`  |

| Query Parameter   | Required | Type      |
|-------------------|----------|-----------|
| `strict`          | No       | `boolean` |




</TabItem>
<TabItem value="response">



</TabItem>
</Tabs>

### Post (Insert) Item

<Bubble item="POST" /> 


<br />


**`/{project_id}/{base_name}/items`**

<Tabs
  defaultValue="request"
  values={[
    { label: 'Request', value: 'request', },
    { label: 'Response', value: 'response', },
  ]
}>
<TabItem value="request">

| Path Parameter   | Required | Type      |
|------------------|----------|-----------|
| `project_id`     | Yes      | `string`  |
| `base_name`      | Yes      | `string`  |



</TabItem>
<TabItem value="response">



</TabItem>
</Tabs>

### List Items

<Bubble item="GET" /> 


<br />


**`/{project_id}/{base_name}/items?query={query}&limit={limit}&last={last_key}`**

<Tabs
  defaultValue="request"
  values={[
    { label: 'Request', value: 'request', },
    { label: 'Response', value: 'response', },
  ]
}>
<TabItem value="request">

| Path Parameter   | Required | Type     |
|------------------|----------|----------|
| `project_id`     | Yes      | `string` |
| `base_name`      | Yes      | `string` |

| Query Parameter   | Required | Type     |
|-------------------|----------|----------|
| `query`      | No     | `list` |
| `limit`       | No     | `int` |
| `last_key`       | No     | `string` |


</TabItem>
<TabItem value="response">



</TabItem>
</Tabs>

### Post Query