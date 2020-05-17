---
id: HTTP
title: HTTP API
sidebar_label: HTTP API
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

export let Bubble = ({ item }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', borderRadius: '0.5rem', color: '#f5f6f7', backgroundColor: '#3884ff', width: '120px', padding: '5px' }}>
            HTTP {item}
        </div>
    );
}

## General

Root url:

**`database.deta.sh/v1`**

An api key must be included in the header for all requests.




## Endpoints

### Put Item

<Bubble item="PUT" /> 

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

| Path Parameter   | Required | Type     |
|------------------|----------|----------|
| `project_id`     | Yes      | `string` |
| `base_name`      | Yes      | `string` |



</TabItem>
<TabItem value="response">



</TabItem>
</Tabs>

### Get Item

<Bubble item="GET" /> 


<br />


**`/{project_id}/{base_name}/{key}`**

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