---
id: sdk
title: Deta Drive SDK
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

The Deta library is the easiest way to store and retrieve files from your Deta Drive. Currently, we support JavaScript, Typescript and Python 3. [Drop us a line](#contact) if you want us to support your favorite language.


## Installing

<br />
<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
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
</Tabs>


## Instantiating

To start working with your Drive, you need to import the `Deta` class and initialize it with a **Project Key**. Then instantiate a subclass called `Drive` with a database name of your choosing.

<br />
<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

```js
const { Deta } = require('deta'); // import Deta

// this also works
import { Deta } from 'deta';

// Initialize with a Project Key
const deta = Deta('project key'); 

// You can create as many as you want 
const photos = deta.Drive('photos'); 
const docs = deta.Drive('docs'); 
```

:::note
  If you are using Deta Drive within a [Deta Micro](/docs/micros/about), a valid project key is pre-set in the Micro's environment. There is no need to pass a key in the initialization step.

  ```js
  const { Drive } = require('deta');
  const drive = Drive('simple_drive'); 
  ```
:::

:::note
  If you are using the `deta` npm package of `0.0.6` or below, `Deta` is the sinlge default export and should be imported as such.

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
drive = deta.Drive("simple_drive")

# You can create as many as you want 
photos = deta.Drive("photos")
docs = deta.Drive("docs")

```

:::note
  If you are using Deta Drive within a [Deta Micro](/docs/micros/about), a valid project key is pre-set in the Micro's environment. There is no need to pass a key in the the initialization step.

  ```py
  from deta import Drive 

  drive = Drive("simple_drive")
```
:::

</TabItem>
</Tabs>

:::warning
Your project key is confidential and meant to be used by you. Anyone who has your project key can access your database. Please, do not share it or commit it in your code.
:::

## Using

Deta's **`Drive`** offres the following methods to interact with your Deta Drive:

[**`put`**](#put) - Stores a file to drive. It will overwrite the file if the file already exists.

[**`get`**](#get) - Retreives a file from drive by the file name.

[**`delete`**](#delete) - Deletes a file from drive.

[**`list`**](#list) - Lists the file names in a drive.

### Put

`Put` uploads and stores a file in a drive with a given `name`. It will overwrite the file if the file name already exists.

<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    {label:'JavaScript', value: 'js', },
    {label:'Python', value: 'py', }
  ]}
>

<TabItem value="js">

**`async put(name, options)`**

#### Parameters
- **name** (required) - `string`
  - Description: The name of the file.
- **options** (required) - `{data : string | Buffer, path: string, contentType: string}`
  - Description: An object with three optional parameters.
    - **data** - `string` or `Buffer`
      - Description: Either the data string or a buffer.
    - **path** - `string`
      - Description: The path of the file to be uploaded to drive.
    - **contentType** - `string`
      - Description: The content type of the file to be uploaded to drive. If the content type is not provided, `drive` tries to figure out the content type from the `name` provided. It defaults to `application/octet-stream` if the content type can not be figured out from the file name.
  
  `options` must have at least and at most one of two properties `data` or `path` defined.

#### Returns

Returns a promise which resolves to the name of the item on a successful `put`, otherwise, it throws an `Error` on error.

#### Example
```js
drive.put('hello.txt', {data: "Hello world"});
drive.put('hello.txt', {data: "Hello world", contentType: 'text/plain'});

drive.put('hello.txt', {data: Buffer.from('Hello World'), contentType: 'text/plain'});
drive.put('hello.txt', {path: './my/file/path/file.txt'});
drive.put('hello.txt', {path: './my/file/path/file.txt', contentType: 'text/plain'}});
```

</TabItem>
<TabItem value="py">

**`put(name, data, *, path, content_type)`**

#### Parameters

- **name** (required) - `string`
  - Description: The name of the file.
- **data** - `string | bytes | io.TextIOBase | io.BufferedIOBase | io.RawIOBase` 
  - Description: The data content of the file.
- **path** - `string` 
  - Description: The local path of the file to be uploaded to drive.
- **content_type** - `string`
  - Description: The content type of the file to be uploaded to drive. If the content type is not provided, `drive` tries to figure out the content type from the `name` provided. It defaults to `application/octet-stream` if the content type can not be figured out from the file name.

  At least and at most one of two args `data` or `path` must be provided. `path` and `content_type` must be provided with the key words.

#### Returns
Returns the name of the file on a successful `put`, otherwise, raises an `Exception` on error.

#### Example
```py
drive.put('hello.txt', 'Hello world')
drive.put(b'hello.txt', 'Hello world')
drive.put('hello.txt', content_type='text/plain')

import io
drive.put('hello.txt', io.StringIO('hello world'))
drive.put('hello.txt', io.BytesIO(b'hello world'))

f = open('./hello.txt', 'r')
drive.put('hello.txt', f)
f.close()

drive.put('hello.txt', path='./hello.txt')
```

</TabItem>

</Tabs>

### Get

`Get` retreives a file from a drive by its name.

<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    {label:'JavaScript', value: 'js', },
    {label:'Python', value: 'py', }
  ]}
>

<TabItem value="js">

**`async get(name)`**

#### Parameters
- **name** (required) - `string`
  - Description: The `name` of the file to get.

#### Returns
Returns a promise that resolves to a `Buffer` of data if found, else `null`. 
Throws an `Error` on errors.

#### Example
```js
const buf = await drive.get('hello.txt');
```
</TabItem>

<TabItem value="py">

**`get(name)`**

#### Parameters
- **name** (required) - `string`
  - Description: The `name` of the file to get.

#### Returns
Returns a instance of a `DriveStreamingBody` class which has the following methods/properties.

- `read(size=None)` : Reads all or up to the next `size` bytes. Calling `read` after all the content has been read will return empty bytes.

- `iter_chunks(chunk_size:int=1024)` : Returns an iterator that yields chunks of bytes of `chunk_size` at a time.

- `iter_lines(chunk_size:int=1024)` : Returns an iterator that yields lines from the stream. Bytes of `chunk_size` at a time is read from the raw stream and lines are yielded from there. The line delimieter is always `b'\n'`.

- `close()` : Closes the stream.

- `closed` : Returns `True` if the stream has been closed.

#### Example
```py
hello = drive.get('hello.txt')
content = hello.read()
hello.close()

# larger files
# iterate chunks of size 4096 and save to disk
large_file = drive.get('large_file.txt')
with open("large_file.txt", "wb+") as f:
  for chunk in large_file.iter_chunks(4096):
      f.write(chunk)
  large_file.close()
```
</TabItem>
</Tabs>

### Delete

`Delete` deletes a file from drive.

<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    {label:'JavaScript', value: 'js', },
    {label:'Python', value: 'py', }
  ]}
>
<TabItem value="js">

**`async delete(name)`**

#### Parameters

- **name** (required) - `string`
  - Description: The name of the file to delete 

#### Returns
Returns a promise that resolves to the `name` of the deleted file on successfull deletions, otherwise raises an `Error`

:::note
If the file did not exist, the file is still returned as deleted.
:::

#### Example
```js
const deletedFile = await drive.delete("hello.txt");
```

</TabItem>

<TabItem value="py">

**`delete(name)`**

#### Parameters

- **name** (required) - `string`
  - Description: The name of the file to delete 

#### Returns
Returns the `name` of the deleted file on successful deletions, otherwise raises an `Exception`

:::note
If the file did not exist, the file is still returned as deleted.
:::

#### Example
```py
deleted_file = drive.delete("hello.txt") 
```

</TabItem>
</Tabs>

### Delete Many

Deletes multiple files (up to 1000) from a drive.

<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    {label:'JavaScript', value: 'js', },
    {label:'Python', value: 'py', }
  ]}
>

<TabItem value="js">

**`async deleteMany(names)`**

#### Parameters
- **names** (required) - `Array of string`
  - description: The names of the files to be deleted.

#### Returns
Returns a promise which resolves to an object with `deleted` and `failed` keys indicating deleted and failed file names.

```js
{
  deleted : ["file1.txt", "file2.txt", ...],
  failed: {
    "file_3.txt": "reason for failure",
  } 
}
```
:::note
If a file did not exist, the file is still returned as deleted.
:::

#### Example
```js
const result = await drive.DeleteMany(["file1.txt", "file2.txt"]);
console.log("deleted:", result.deleted)
console.log("failed:", result.failed)
```

</TabItem>

<TabItem value="py">

**`delete_many(names)`**

#### Parameters
- **names** (required): `string`
  - Description: The names of the files to be deleted.

#### Returns
Returns a `dict` with `deleted` and `failed` keys indicating deleted and failed file names.

```py
{
  "deleted" : ["file1.txt", "file2.txt", ...],
  "failed": {
    "file_3.txt": "reason for failure"
  } 
}
```
:::note
If a file did not exist, the file is still returned as deleted.
:::

#### Example
```py
result = drive.delete_many(["file1.txt", "file2.txt"]);
print("deleted:", result.get("deleted"))
print("failed:", result.get("failed"))
```

</TabItem>
</Tabs>

### List

`List` files in your drive.

<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    {label:'JavaScript', value: 'js', },
    {label:'Python', value: 'py', }
  ]}
>

<TabItem value="js">

**`async list(options)`**

#### Parameters
- **options** (required) : `{prefix: string, limit: number, last: string}`
  - Description: An object with three optional parameters.
    - **prefix**: `string`
      - Description: The prefix that file names must have. 
    - **limit**: `number`
      - Description: The maximum number of files names to be returned, defaults to `1000`
    - **last**: `string`
      - Description: The `last` name seen in a previous paginated result. Provide `last` to fetch further pages.

#### Returns
Returns a promise which resolves to an `object` with `paging` and `names` keys.
```js
{
  names: ["file1.txt", "file2.txt", ...],
  paging: {
    size: 2,
    last: "file_2.txt"
  }
}
```

- `names`: The names of the files
- `paging`: Contains paging information. 
  - `size` : The number of files returned.
  - `last` : The last name seen in the paginated response. Provide this value in subsequent api calls to fetch further pages. For the last page, `last` is not present in the response.

#### Example

```js
// get all files
let result = await drive.list();
let allFiles = result.names;
let last = result.paging.last;

while (last){
  // provide last from previus call
  result = await drive.list({last:result.paging.last});

  allFiles = allFiles.concat(result.names) 

  // update last
  last = result.paging.last
}
console.log("all files:", allFiles)

const resultWithPrefix = await drive.list({prefix: "blog/"})
const resultWithLimit = await drive.list({limit: 100})
const resultWIthLimitAndPrefix = await drive.list({limit: 100, prefix:"blog/"})
```

</TabItem>

<TabItem value="py">

**`list(limit, prefix, last)`**

#### Parameters
- **limit**: `int`
  - Description: The maximum number of files names to be returned, defaults to `1000`
- **prefix**: `string`
  - Description: The prefix that file names must have. 
- **last**: `string`
  - Description: The `last` name seen in a previous paginated result. Provide `last` from previous response to fetch further pages.

#### Returns
Returns a `dict` with `paging` and `names` keys.
```py
{
  "names": ["file1.txt", "file2.txt", ...],
  "paging": {
    "size": 2,
    "last": "file_2.txt"
  }
}
```

- `names`: The names of the files
- `paging`: Contains paging information. 
  - `size` : The number of files returned.
  - `last` : The last name seen in the paginated response. Provide this value in subsequent api calls to fetch further pages. For the last page, `last` is not present in the response.

#### Example

```py
# get all files
result = drive.list()
all_files = result.get("names")
last = result.get("paging").get("last")

while (last){
  # provide last from previous call
  result = drive.list(last=last)

  allFiles = allFiles.concat(result.names) 

  # update last
  last = result.paging.last
}
print("all files:", allFiles)

res_with_prefix = drive.list(prefix="/blog")
res_with_limit = drive.list(limit=100)
res_with_prefix_limit = drive.list(prefix="/blog", limit=100)
```

</TabItem>
</Tabs>