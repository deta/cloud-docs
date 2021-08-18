---
id: http
title: HTTP API
sidebar_label: HTTP API
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

## General

:::note
You can get your **Project Key** and your **Project ID** from your [Deta dashboard](https://web.deta.sh). You need these to talk with the Deta Drive API.
:::

### Root URL
This URL is the base for all your HTTP requests:

**`https://drive.deta.sh/v1/{project_id}/{drive_name}`**

> The `drive_name` is the name given to your drive. If you already have a **Drive**, then you can go ahead and provide it's name here. Additionally, you could provide any name here when doing any `PUT` or `POST` request and our backend will automatically create a new drive for you if it does not exist. There is no limit on how many "Drives" you can create.

### Auth
A **Project Key** _must_ be provided in the request **headers** as a value for the `X-Api-Key` key for authentication and authorization.

Example `X-Api-Key: a0kjsdfjda_thisIsYourSecretKey`

### File Names And Directories
Each file needs a unique `name` which identifies the file. Directorial hierarchies are represented logically by the `name` of the file itself with the use of backslash `/`. 

For example, if you want to store a file `world.txt` under the directory `hello` , the `name` of the file should be `hello/world.txt`.  

The file name **must not** end with a `/`. This also means that you can not create an empty directory.

A directory ceases to exist if there are no more files in it.
## Endpoints
### Put File
`POST /files?name={name}`

Stores a smaller file in a single request. Use this endpoint if the file size is small enough to be sent in a single request. The file is overwritten if the file with given `name` already exists.

:::note
We do not accept payloads larger than 10 Mb on this endpoint. For larger uploads, use chunked uploads.
:::  

<Tabs
    defaultValue="request"
    values={[
        {label: 'Request', value:'request', },
        {label: 'Response', value: 'response', },
    ]
}>

<TabItem value="request">

| Headers | Required | Description |
| --------|----------|-------------|
|`Content-Type` | No | The content type of the file. If the content type is not specified, the file `name` is used to figure out the content type. Defaults to `application/octet-stream` if the content type can not be figured out.|

|Query Params | Required | Description |
|-----|---|----|
|`name`| Yes | The `name` of the file. More [here](#file-names-and-directories).

</TabItem>
<TabItem value="response">

#### `201 Created`

```js
Content-Type: application/json

{
    "name": "file name",
    "project_id": "deta project id",
    "drive_name": "deta drive_name"
}
```

#### Client Errors

`400 Bad Request`

```js
Content-Type: "application/json"
{
    "errors": [
        // error messages
    ]
}
```

`413 Payload Too Large`

```html
Content-Type: text/html
<h1> 413 - Request Entity Too Large </h1>
```

</TabItem>
</Tabs>

### Initialize Chunked Upload

Initializes a chunked file upload. If the file is larger than 10 MB, use this endpoint to initialize a chunked file upload.

`POST /uploads?name={name}`

<Tabs
    defaultValue="request"
    values={[
        {label: 'Request', value:'request', },
        {label: 'Response', value: 'response', },
    ]
}>

<TabItem value="request">

|Params | Required | Description |
|-----|---|----|
|`name`| Yes | The `name` of the file. More [here](#file-names-and-directories).

</TabItem>
<TabItem value="response">

#### `202 Accepted`

```js
Content-Type: application/json

{
    "name": "file name",
    "upload_id": "a unique upload id"
    "project_id": "deta project id",
    "drive_name": "deta drive name"
}
```

#### Client Errors

`400 Bad Request`

```js
Content-Type: application/json
{
    "errors": [
        // error messages
    ]
}
```
</TabItem>
</Tabs>

### Upload Chunked Part

Uploads a chunked part. 

`POST /uploads/{upload_id}/parts?name={name}&part={part}`

:::note
Each chunk must be at least 5 Mb and at most 10 Mb. The final chunk can be less than 5 Mb.
:::

<Tabs
    defaultValue="request"
    values={[
        {label: 'Request', value:'request', },
        {label: 'Response', value: 'response', },
    ]
}>

<TabItem value="request">

| Params | Required | Description |
|----|---|---|
|`upload_id`| Yes | The `upload_id` received after [initiating a chunked upload](#initialize-chunked-upload) |
|`name`| Yes | The `name` of the file. More [here](#file-names-and-directories). |
|`part`| Yes | The chunk part number, start with `1` |



</TabItem>
<TabItem value="response">

#### `200 Ok`

```js
Content-Type: application/json

{
    "name": "file name",
    "upload_id": "a unique upload id"
    "part": 1, // upload part number
    "project_id": "deta project id",
    "drive_name": "deta drive name"
}
```

#### Client Errors

`400 Bad Request`

```js
Content-Type: application/json
{
    "errors": [
        // error messages
    ]
}
```

`404 Not Found`
```js
Content-Type: application/json
{
    "errors": [
        // error messages
    ]
}
```

`413 Payload Too Large`

```html
Content-Type: text/html
<h1> 413 Request Entity Too Large </h1>
```
</TabItem>
</Tabs>

### End Chunked Upload

End a chunked upload.

`PATCH /uploads/{upload_id}?name={name}`

<Tabs
    defaultValue="request"
    values={[
        {label: 'Request', value:'request', },
        {label: 'Response', value: 'response', },
    ]
}>

<TabItem value="request">

| Params | Required | Description |
|----|---|---|
|`upload_id`| Yes | The `upload_id` received after [initiating a chunked upload](#initialize-chunked-upload) |
|`name`| Yes | The `name` of the file. More [here](#file-names-and-directories). |


</TabItem>
<TabItem value="response">

#### `200 Ok`

```js
Content-Type: application/json

{
    "name": "file name",
    "upload_id": "a unique upload id"
    "project_id": "deta project id",
    "drive_name": "deta drive name"
}
```

#### Client Errors

`400 Bad Request`

```js
Content-Type: application/json
{
    "errors": [
        // error messages
    ]
}
```

`404 Not Found`
```js
Content-Type: application/json
{
    "errors": [
        // error messages
    ]
}
```
</TabItem>
</Tabs>

### Abort Chunked Upload

Aboart a chunked upload.

`DELETE /uploads/{upload_id}?name={name}`

<Tabs
    defaultValue="request"
    values={[
        {label: 'Request', value:'request', },
        {label: 'Response', value: 'response', },
    ]
}>

<TabItem value="request">

| Params | Required | Description |
|----|---|---|
|`upload_id`| Yes | The `upload_id` received after [initiating a chunked upload](#initialize-chunked-upload) |
|`name`| Yes | The `name` of the file. More [here](#file-names-and-directories). |


</TabItem>
<TabItem value="response">

#### `200 Ok`

```js
Content-Type: application/json

{
    "name": "file name",
    "upload_id": "a unique upload id"
    "project_id": "deta project id",
    "drive_name": "deta drive name"
}
```

#### Client Errors

`400 Bad Request`

```js
Content-Type: application/json
{
    "errors": [
        // error messages
    ]
}
```

`404 Not Found`
```js
Content-Type: application/json
{
    "errors": [
        // error messages
    ]
}
```
</TabItem>
</Tabs>

### Download File

Download a file from drive.

` GET /files/download?name={name}`

<Tabs
    defaultValue="request"
    values={[
        {label: 'Request', value:'request', },
        {label: 'Response', value: 'response', },
    ]
}>

<TabItem value="request">

| Params | Required | Description |
|----|---|---|
|`name`| Yes | The `name` of the file. More [here](#file-names-and-directories). |


</TabItem>
<TabItem value="response">

#### `200 Ok`

```
Accept-Ranges: bytes
Content-Type: {content_type}
Content-Length: {content_length}
{Body}
```

#### Client Errors

`400 Bad Request`

```js
Content-Type: application/json
{
    "errors": [
        // error messages
    ]
}
```

`404 Not Found`
```js
Content-Type: application/json
{
    "errors": [
        // error messages
    ]
}
```
</TabItem>
</Tabs>

### List Files

List file names from drive.

`GET /files?limit={limit}&prefix={prefix}&last={last}`

<Tabs
    defaultValue="request"
    values={[
        {label: 'Request', value:'request', },
        {label: 'Response', value: 'response', },
    ]
}>

<TabItem value="request">

| Params | Required | Description |
|----|---|---|
|`limit`| No | The `limit` of number of file names to get, defaults to `1000`|
|`prefix`| No | The `prefix` that each file name must have. |
|`last` | No | The `last` file name seen in a paginated response. |


</TabItem>
<TabItem value="response">

#### `200 Ok`

The response is paginated based on the `limit` provided in the request. By default, maximum `1000` file names are sent.

If the response is paginated, the response contains a `paging` object with `size` and `last` keys; `size` is the number of file
names in the response, and `last` is the last file name seen in the response. The value of `last` should be used in subsequent
requests to continue recieving further pages.

```js
Content-Type: application/json

{
    "paging": {
        "size": 1000, // the number of file names in the response
        "last": "last file name in response"
    },
    "names": ["file1", "file2", ...]
}
```

#### Client Errors

`400 Bad Request`

```js
Content-Type: application/json
{
    "errors": [
        // error messages
    ]
}
```

`404 Not Found`
```js
Content-Type: application/json
{
    "errors": [
        // error messages
    ]
}
```

</TabItem>
</Tabs>

### Delete Files

Delete files from drive.

`DELETE /files`

<Tabs
    defaultValue="request"
    values={[
        {label: 'Request', value:'request', },
        {label: 'Response', value: 'response', },
    ]
}>

<TabItem value="request">

```js
Content-Type: "application/json"
{
    "names": ["file_1", "file_2"]
}
```

| Params | Required | Description |
|----|---|---|
|`names`| Yes | The `names` of the files to delete, maximum `1000` file names|

</TabItem>
<TabItem value="response">

#### `200 Ok`


```js
Content-Type: application/json

{
    "deleted": ["file_1", "file_2", ...] // deleted file names
    "failed": {
        "file_3": "reason why file could not be deleted",
        "file_4": "reason why file could not be deleted",
        //...
    } 
}
```

:::note
File names that did not exist will also be under `deleted`, `failed` will only contain names of files that existed but were not deleted for some reason
:::

</TabItem>
</Tabs>
