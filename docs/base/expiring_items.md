---
id: expiring_items
title: Expiring Items
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

Deta Base supports storing items with an expiration timestamp. Items with an expired timestamp will be automatically deleted from your Base.

## Storing 

Items specify the expiration timestamp value in a field name `__expires` in the item itself. The value is a [Unix time](https://en.wikipedia.org/wiki/Unix_time), a number.

For e.g.
```json
{
  "key": "item_key",
  "msg": "this will be deleted",
  "__expires": 1672531200
}
```

The item above will be deleted automatically on `2023-01-01 00:00:00 GMT` (the equivalent date of the timestamp above).

You can use the [Base SDK](./sdk.md) to [`put`](./sdk#put), [`put_many`](./sdk#put_many) or [`insert`](./sdk#insert) items with an expiration timestamp (or the [HTTP API](./HTTP.md) directly).

:::warning
Storing an item with an already expired timestamp will not fail but the item will be immediately deleted.
:::

:::info
Base SDKs might offer higher level methods with easier APIs to specify the expiration timestamp. If they do so, they still store the timestamp in the item itself as mentioned above.
:::

### Examples

<Tabs
  groupId="lang"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', }, 
    { label: 'Go', value: 'go', },
    { label: 'HTTP', value: 'http', },
  ]}
>

<TabItem value="js">

```js
const Deta = require('deta');
const db = Deta("project_key").Base('examples');

const item = {'value': 'temp'};

// expire in 300 seconds
await db.put(item, 'temp_key', {expireIn:300})

// expire at date
await db.put(item, 'temp_key', {expireAt: new Date('2023-01-01T00:00:00')})
```
</TabItem>

<TabItem value="py">

```py
import datetime
from deta import Deta

db = Deta("project_key").Base("examples")

item = {"key": "temp_key", "value": "temp"}

# expire in 300 seconds
db.put(item, expire_in=300)

# expire at date
expire_at = datetime.datetime.fromisoformat("2023-01-01T00:00:00")
db.put(item, expire_at=expire_at)
```

</TabItem>

<TabItem value="go">

```go
import (
  "log"
  "time"
  
  "github.com/deta/deta-go/deta"
  "github.com/deta/deta-go/service/base"
)

type TmpData struct {
  Key string `json: "key"`
  Value string `json:"value"`
  // json struct tag `__expires` for expiration timestamp
  // 'omitempty' to prevent default 0 value
  Expires int64 `json:"__expires,omitempty"`
}

func main() {
  // errors ignored for brevity
  d, _ := deta.New(deta.WithProjectKey("project_key"))
  db, _ := base.New(d, "examples")

  tmp := &TmpData{
    Key: "temp_key",
    Value: "temp",
    Expires: time.Date(2023, 1, 1, 0, 0, 0, 0, time.UTC).Unix(),
  }
  _, err := db.Put(tmp)
  if err != nil {
    log.Fatal("failed to put item:", err) 
  }
}
```

</TabItem>

<TabItem value="http">

```shell
curl -X PUT "https://database.deta.sh/v1/test_project_id/examples/items" \
    -H "Content-Type: application/json" \
    -H "X-Api-Key: test_project_key" \
    -d {"items":[{"key": "temp_key", "value": "temp", "__expires": 1672531200}]}
```

</TabItem>

</Tabs>

## Retrieving

When you retrieve items with an expiration timestamp, the timestamp value will be present in the `__expires` field. The value is a [Unix time](https://en.wikipedia.org/wiki/Unix_time).

`Get` and `Query` operations will not retrieve already expired items.

### Examples

<Tabs
  groupId="lang"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', }, 
    { label: 'Go', value: 'go', },
    { label: 'HTTP', value: 'http', },
  ]}
>

<TabItem value="js">

```js
const { __expires } = await db.get("temp_key");
```

</TabItem>

<TabItem value="py">

```py
expires = db.get("temp_key").get("__expires")
```
</TabItem>

<TabItem value="go">

```go
dest := struct{
  Key     string `json:"key"`
  Expires int64  `json:"__expires,omitempty"`
}{}

if err := db.Get("temp_key", &dest); err != nil {
  log.Fatal("failed to get item:", err)
}

expires := dest.Expires
```

</TabItem>

<TabItem value="http">

```shell
curl "https://database.deta.sh/v1/test_project_id/examples/items/temp_key" \
    -H "X-Api-Key: test_project_key"

{"key": "temp_key", "value": "temp", "__expires": 1672531200}
```

</TabItem>

</Tabs>


## Updating

You can update the expiration timestamp with a new timestamp by updating the value of the `__expires` as long as the item has not already expired.

Updating other fields of the item **does not** update (or renew) the expiration timestamp. You **must** update the value of `__expires` field.

You can use the [Base SDK](./sdk.md) to [`update`](./sdk#update) the expiration timestamp (or the [HTTP API](./HTTP.md) directly).

### Examples

<Tabs
  groupId="lang"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', }, 
    { label: 'Go', value: 'go', },
    { label: 'HTTP', value: 'http', },
  ]}
>

<TabItem value="js">

```js
// update item to expire in 300 seconds from now 
await db.update(null, "temp_key", {expireIn: 300})

// update item to expire at date
await db.update(null, "temp_key", {expireAt: new Date('2023-01-01T00:00:00')})
```
</TabItem>

<TabItem value="py">

```py
# update item to expire in 300 seconds from now
db.update(None, "temp_key", expire_in=300)

# update item to expire at date
expire_at = datetime.datetime.fromisoformat("2023-01-01T00:00:00")
db.update(None, "temp_key", expire_at=expire_at)
```

</TabItem>

<TabItem value="go">

```go
updates := base.Updates{
  "__expires": 1672531200,
}
if err := db.Update("temp_key", updates); err != nil {
  log.Fatal("failed to update item:", err)
}
```

</TabItem>

<TabItem value="http">

```shell
curl -X PATCH "https://database.data.sh/v1/test_project_id/examples/items/temp_key" \
    -H "Content-Type: application/json" \
    -H "X-Api-Key: test_project_key" \
    -d {"set": {"__expires": 1672531200}}
```

</TabItem>

</Tabs>

## Issues

If you run into any issues, consider reporting them in our [Github Discussions](https://github.com/orgs/deta/discussions).
