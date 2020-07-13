---
id: run
title: Run
sidebar_lable: Run
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Run from the CLI 

A Deta Micro can be run directly from the `deta cli` using the command [deta run](../cli/commands#deta-run) with an input.

In order to run a micro from the cli directly, the micro's code needs to define functions that will be run from the cli with the help of our library `deta`.

The `deta` library is pre-installed on a micro and can just be imported directly.

<Tabs
    groupId="preferred-language"
    defaultValue="js"
    values={[
        {label: 'JavaScript', value:'js', },
        {label: 'Python', value: 'python',},
    ]}
>
<TabItem value="js">

```js
const { app } = require('deta');

// define a function to run from the cli
// the function must take an event as an argument
app.lib.run(event => "Welcome to Deta!");

module.exports = app;
```
</TabItem>

<TabItem value="python">

```python
from deta import app

# define a function to run from the cli
# the function must take an event as an argument
@app.lib.run()
def welcome(event):
    return "Welcome to Deta!"
```
</TabItem>
</Tabs>

With this code deployed on a micro, you can simply run 

```shell
$ deta run
```

And see the following output:
```
Response:
    "Welcome to Deta!"
```

### Events

A function that is triggered from the cli must take an `event` as the only argument.

You can provide an input from the cli to the function which will be passed on as an `event`. It has four attributes:

- `event.json`: `object` provides the JSON payload
- `event.body`: `string` provides the raw JSON payload 
- `event.type`: `string` type of an event, `run` when running from the cli
- `event.action`: `string` the [action](#Actions) provided from the cli, defaults to an empty string   


<Tabs
    groupId="preferred-language"
    defaultValue="js"
    values={[
        {label: 'JavaScript', value:'js', },
        {label: 'Python', value: 'python',},
    ]}
>
<TabItem value="js">

```js
const { app } = require('deta');

app.lib.run(event => {
    return {
        // access input to your function with event.json
        message: `hello ${event.json.name}!`}
    };
});

module.exports = app;
```
</TabItem>

<TabItem value="python">

```python
from deta import app

@app.lib.run()
def welcome(event):
    return {
        # access input to your function with event.json
        "message": f"hello {event.json.get('name')}!"
    }
```
</TabItem>
</Tabs>

With this code deployed on a micro, you can run

```shell
$ deta run -- --name deta
```

And should see the following output.

```json
Response:
    {
        "message": "hello deta!"
    }
```

### Input

The input to your function on a micro can be provided through the `deta cli` and accessed in the code from the `event` object. The input is a JSON object created from the arguments provided to the cli. 

An *important* consideration is that the values in key-value pairs in the input are always either *strings*, *list of strings* or *booleans*. 

Boolean flags are provided with a single dash, string arguments with double dash and if multiple values are provided for the same key, a list of strings will be provided. 

For instance:

```shell
$ deta run -- --name jimmy --age 33 --emails jimmy@deta.sh --emails jim@deta.sh -active
```

will provide the micro with the following input:

```json
{
    "name": "jimmy",
    "age": "33", // notice '33' here is a string not an int
    "emails": ["jimmy@deta.sh", "jim@deta.sh"],
    "active": true
}
```

You need to explicitly convert the string values to other types in your code if needed.

### Actions

Actions help you run different functions based on an `action` that you define for the function.

The `action` defaults to an empty string if not provided.

<Tabs
    groupId="preferred-language"
    defaultValue="js"
    values={[
        {label: 'JavaScript', value:'js', },
        {label: 'Python', value: 'python',},
    ]}
>
<TabItem value="js">

```js
const { app } = require('deta');

app.lib.run(event => {
    return {
        message: `hello ${event.json.name}!`
    };
    // action 'hello'
}, "hello");

app.lib.run(event => {
    return {
        message: `good morning ${event.json.name}!`
    };
    // action 'greet'
}, "greet");

module.exports = app;
```
</TabItem>

<TabItem value="python">

```python
from deta import app

# action 'hello'
# the action does not need to have the same name as the function
@app.lib.run(action="hello")
def welcome(event):
    return {
        "message": f"hello {event.json.get('name')}!"
    }

# action 'greet'
@app.lib.run(action="greet")
def greet(event):
    return {
        "message": f"good morning {event.json.get('name')}!"
    }
```
</TabItem>
</Tabs>

With this code deployed on a deta micro, if you run

```shell
$ deta run hello -- --name deta
```

where you tell the cli to run action `hello` with `"name": "deta"` as input. You should see the following output:

```json
Response:
    {
        "message": "hello deta!" 
    }
```

And if you do `deta run` with action `greet` 

```shell
$ deta run greet -- --name deta
```

you should see the following output:

```json
Response:
    {
        "message": "good morning deta!" 
    }
```

### Run and HTTP

You can combine both run and HTTP triggers in the same deta micro. For this you need to instantiate your app using the `deta` library that is pre-installed on a micro.   

<Tabs
    groupId="preferred-language"
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

// triggered with an HTTP request
app.get('/', async(req, res) => {
    res.send('Hello deta, i am running with HTTP');
});

// triggered from the cli
app.lib.run(event => {
    return 'Hello deta, i am running from the cli';
});
```
</TabItem>

<TabItem value="python">

```python
from deta import App
from fastapi import FastAPI

app = App(FastAPI())

# triggered with an HTTP request
@app.get("/")
def http():
    return "Hello deta, i am running with HTTP"

# triggered from the cli
@app.lib.run()
def run(event):
    return "Hello deta, i am running from the cli'
```
</TabItem>
</Tabs>

### Run and Cron

You can use both run and [cron](./cron) triggers in the same deta micro. You can also stack run and cron triggers for the same function.

<Tabs
    groupId="preferred-language"
    defaultValue="js"
    values={[
        {label: 'JavaScript', value:'js', },
        {label: 'Python', value: 'python',},
    ]}
>
<TabItem value="js">

```js
const { app } = require('deta');

const sayHello = event => 'hello deta';
const printTime = event => `it is ${(new Data).toTimeString()}`;

app.lib.run(sayHello);

// stacking run and cron
app.lib.run(printTime, 'time'); // action 'time'
app.lib.cron(printTime);
```
</TabItem>

<TabItem value="python">

```python
from deta import app
from datetime import datetime

# only run
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