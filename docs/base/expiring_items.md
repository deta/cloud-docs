---
id: expiring_items
title: Expiring Items
---

Deta Base supports storing items with an expiration timestamp. Items with an expired timestamp will be automatically deleted from your Base.

## Storing 

Items must specify the expiration timestamp value in a field name `__expires` in the item itself. The value is a [Unix time](https://en.wikipedia.org/wiki/Unix_time), a number.

For e.g.
```json
{
  "key": "item_key",
  "msg": "this will be deleted",
  "__expires": 1672531200
}
```

The item above will be deleted automatically on `2023-01-01 00:00:00 GMT` (the equivalent date of the timestamp above).

You can use the [Base SDK](./sdk.md) to `put`, `put_many` or `insert` items with an expiration timestamp (or the [HTTP API](./HTTP.md) directly).

:::info
Base SDKs might offer higher level methods with easier APIs to specify the expiration timestamp. If they do so, they still store the timestamp in the item itself as mentioned above.
:::

:::warning
Storing an item with an already expired timestamp will not fail but the item will be immediately deleted.
:::

## Retrieving

When you retrieve items with an expiration timestamp, the timestamp value will be present in the `__expires` field. The value is a [Unix time](https://en.wikipedia.org/wiki/Unix_time).

`Get` and `Query` operations will not retrieve already expired items.

## Updating

You can update the expiration timestamp with a new timestamp as long as the item has not already expired, by updating the value in the `__expires` field.

You can use the [Base SDK](./sdk.md) to `update` the expiration timestamp (or the [HTTP API](./HTTP.md) directly).