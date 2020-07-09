---
id: run
title: Run
sidebar_lable: Run
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Deta Cron

A Deta Micro can be set to run on a schedule from the `deta cli`.

In order to set a micro to run on a schedule, the micro's code needs to define a function that will be run on the schedule with the help of our library `deta`.

The `deta` library is pre-installed on a micro and can just be imported directly.

### Set Cron

Use `deta cron set` to schedule the micro.

You can set the cron in two ways:
- [rate](#Rate)
- [cron expressions](#Cron-expressions)

#### Rate
You can define the `rate` at which a micro should run. It is comprised of a `value` and `unit`.

- `value`: is a non-zero positive integer
- `unit`: unit of time, can be `minute, minutes, hour, hours, day, days`. If the `value` is `1` the unit must be `minute`, `hour` or `day`.

**Examples**

- `deta cron set "1 minute"` : Run every minute
- `deta cron set "2 hours"` : Run every two hours
- `deta cron set "5 days"` : Run every five days

#### Cron expressions

Cron expressions allow you more flexibility and precision when setting a cron job. Cron expressions have six required fields, which are separated by white space.

| Field        | Values            | Wildcards |
|--------------|-------------------|-----------|
| Minutes      | 0-59              |  ,-*/     |
| Hours        | 0-23              |  ,-*/     |
| Day-of-month | 1-31              |  ,-*?/LW  |
| Month        | 1-12 or JAN-DEC   |  ,-*/     |
| Day-of-week  | 1-7 or SUN-SAT    |  ,-*?L#   |
| Year         | 1970-2199         |  ,-*/     |

**Wildcards**

- The , (comma) wildcard includes additional values. In the Month field, JAN,FEB,MAR would include January, February, and March.

- The - (dash) wildcard specifies ranges. In the Day field, 1-15 would include days 1 through 15 of the specified month.

- The * (asterisk) wildcard includes all values in the field. In the Hours field, * would include every hour. You cannot use * in both the Day-of-month and Day-of-week fields. If you use it in one, you must use ? in the other.

- The / (forward slash) wildcard specifies increments. In the Minutes field, you could enter 1/10 to specify every tenth minute, starting from the first minute of the hour (for example, the 11th, 21st, and 31st minute, and so on).

- The ? (question mark) wildcard specifies one or another. In the Day-of-month field you could enter 7 and if you didn't care what day of the week the 7th was, you could enter ? in the Day-of-week field.

- The L wildcard in the Day-of-month or Day-of-week fields specifies the last day of the month or week.

- The W wildcard in the Day-of-month field specifies a weekday. In the Day-of-month field, 3W specifies the weekday closest to the third day of the month.

- The # wildcard in the Day-of-week field specifies a certain instance of the specified day of the week within a month. For example, 3#2 would be the second Tuesday of the month: the 3 refers to Tuesday because it is the third day of each week, and the 2 refers to the second day of that type within the month.

**Limits**

- You can't specify the Day-of-month and Day-of-week fields in the same cron expression. If you specify a value (or a *) in one of the fields, you must use a ? (question mark) in the other.

- Cron expressions that lead to rates faster than 1 minute are not supported.

**Examples**

- `deta cron set "0 10 * * ? *"` : Run at 10:00 am(UTC) every day
- `deta cron set "15 12 * * ? *"` : Run at 12:15 pm(UTC) every day
- `deta cron set "0 18 ? * MON-FRI *"` : Run at 6:00 pm(UTC) every Monday through Friday
- `deta cron set "0 8 1 * ? *"` : Run at 8:00 am(UTC) every 1st day of the month
- `deta cron set "0/15 * * * ? *"` : Run every 15 minutes
- `deta cron set "0/5 8-17 ? * MON-FRI *"` : Run every 5 minutes Monday through Friday between 8:00 am and 5:55 pm(UTC)

### Code

<Tabs
    defaultValue="js"
    values={[
        {label: 'JavaScript', value:'js', },
        {label: 'Python', value: 'python',},
    ]}
>
<TabItem value="js">

```js
const { app } = require('deta');

// define a function to run on a schedule 
// the function must take an event as an argument
app.lib.cron(event => "running on a schedule")

module.exports = app
```
</TabItem>

<TabItem value="python">

```python
from deta import app

# define a function to run on a schedule
# the function must take an event as an argument
@app.lib.cron()
def cron_job():
    return "running on a schedule"
```
</TabItem>
</Tabs>

With this code deployed on a deta micro, the `deta cron set` commands will execute the function based on the cron rate or expression. For example

```shell
$ deta cron set "10 minutes"
```

will set the function to run every 10 minutes. In order to see the execution logs, you can use the [visor](visor.md)

#### Events

A function that is triggered from the cron must take an `event` as the only argument. The `event` will have the following attribute.

- `event.type`: `string` type of an event, will be `cron` when triggered by a cron event

### Cron and HTTP

You can combine both run and and HTTP triggers in the same deta micro. For this you need to instantiate your app using the `deta` library that is pre-installed on a micro.   

<Tabs
    defaultValue="js"
    values={[
        {label: 'JavaScript', value:'js', },
        {label: 'Python', value: 'python',},
    ]}
>
<TabItem value="js">

```js
const { App } = require('deta');
const express = require('express');

const app = App(express());

app.get('/', async(req, res) => {
    res.send('Hello deta, i am running with HTTP')
});

app.lib.cron(event => {
    return 'Hello deta, i am cron job';
});
```
</TabItem>

<TabItem value="python">

```python
from deta import App
from fastapi import FastAPI

app = App(FastAPI())

@app.get("/")
def http():
    return "Hello deta, i am running with HTTP"

@app.lib.cron()
def cron_job(event):
    return "Hello deta, i am a cron job'
```
</TabItem>
</Tabs>

### Cron and Run

You can use both run and [cron](#cron.md) triggers in the same deta micro. You can also stack run and cron triggers for the same function.

<Tabs
    defaultValue="js"
    values={[
        {label: 'JavaScript', value:'js', },
        {label: 'Python', value: 'python',},
    ]}
>
<TabItem value="js">

```js
const { app } = require('deta');

const sayHello = event => 'hello deta'
const printTime = event => `it is ${(new Data).toTimeString()}`

app.lib.run(sayHello)

// stacking run and cron
app.lib.run(printTime, 'time') // action 'time'
app.lib.cron(printTime)
```
</TabItem>

<TabItem value="python">

```python
from deta import app
from datetime import datetime

@app.lib.run()
def say_hello(event):
    return "hello deta"

# stacking run and cron
@app.lib.run(action='time') # action 'time'
@app.lib.cron():
def print_time(event):
    return f"it is {datetime.now()}" 
```
</TabItem>
</Tabs>