---
id: queries
title: Queries
---

Deta Base supports queries for fetching data that match certain conditions. Queries are regular objects/dicts/maps with conventions for different operators for specifying the conditions.

## Operators

Queries support the following operators:

### Equal

```json
{"age": 22, "name": "Beverly"}

// hierarchical
{"user.profile.age": 22, "user.profile.name": "Beverly"}
```

```json
{"fav_numbers": [2, 4, 8]}
```

```json
{"time": {"day": "Tuesday", "hour": "08:00"}}
```

### Not Equal

```json
{"user.profile.age?ne": 22}
```

### Less Than

```json
{"user.profile.age?lt": 22}
```

### Greater Than

```json
{"user.profile.age?gt": 22}
```

### Less Than or Equal

```json
{"user.profile.age?lte": 22}
```

### Greater Than or Equal

```json
{"user.profile.age?gte": 22}
```

### Prefix

```json
{"user.id?pfx": "afdk"}
```

### Range

```json
{"user.age?r": [22, 30]}
```

### Contains

```json
{
  // if user email contains the substring @deta.sh
  "user.email?contains": "@deta.sh" 
}
```

```json
{
  // if berlin is in a list of places lived 
  "user.places_lived_list?contains": "berlin"
}
```

### Not Contains

```json
{
  // if user email does not contain @deta.sh
  "user.email?not_contains": "@deta.sh" // 'user.email?!contains' also valid
}
```

```json
{
  // if berlin is not in a list of places lived
  "user.places_lived_list?not_contains": "berlin" // 'user.places_lived_list?!contains' also valid
}
```

:::note
`?contains` and `?not_contains` only works for a list of strings if checking for membership in a list; it does not apply to list of other data types. You can store your lists always as a list of strings if you want to check for membership.
:::

## Logical Operators

### AND

The entries in a single query object are `AND` ed together. For e.g. the query:

```json
{
    "active": true, 
    "age?gte": 22 
}
``` 

will retrieve items where `active` is `true` **and** `age` is greater than or equal to `22`.

The query above would translate to `SQL` as:

```SQL
SELECT * FROM base WHERE active=1 AND age>=22;
```


### OR

Multiple query objects in a list are `OR` ed together. For eg. the queries:

```json
[{"age?lte": 30}, {"age?gte": 40}]
```

will retrieve items where `age` is less than equal to `30` **or** `age` is greater than equal to `40`.

The query above would translate to `SQL` as:

```SQL
SELECT * FROM base WHERE age<=30 OR age>=40;
```


## Hierarchy

You can use the period character `.` to query for hierarchical fields within the data. For instance if you have the following item in the base:

```json
{
    "key": "user-key",
    "profile": {
        "age": 22, 
        "active": true 
    }
}
```

Then you can query for the `active` and `age` within `profile` directly:

```json
{
    "profile.age": 22,
    "profile.active": true
}
```

## Querying Keys

You need to consider the following when querying on keys:

- The keys must be strings hence the operation values **must** also be strings. 
- The [contains](#contains) and [not-contains](#not-contains) operators **are not supported**.
- The [`AND`](#and) and [`OR`](#or) operations for different query values **are not supported**.
    For e.g. **the following queries are invalid**:
    ```json
    {
        // different AND key queries (invalid query)
        "key": "a",
        "key?pfx": "b"
    }
    ```

    ```json
    {
        // different OR key queries (invalid query)
        [{"key?pfx":"a"}, {"key?pfx": "b"}]
    }
    ```

## Issues

If you run into any issues, consider reporting them in our [Github Discussions](https://github.com/orgs/deta/discussions).