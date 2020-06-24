---
id: getting_started
title: Getting Started
sidebar_label: Getting Started
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Configuring & Installing the Deta CLI


<Tabs
  defaultValue="mac"
  values={[
    { label: 'Mac', value: 'mac', },
    { label: 'Linux', value: 'linux', },
    { label: 'Windows', value: 'win', },
  ]
}>
<TabItem value="mac">

To install the Deta CLI, open a Terminal and enter:

```shell
curl -fsSL https://get.deta.dev/cli.sh | sh
```


</TabItem>
<TabItem value="linux">

To install the Deta CLI, open a Terminal and enter:

```shell
curl -fsSL https://get.deta.dev/cli.sh | sh
```

</TabItem>
<TabItem value="win">

To install the Deta CLI, open PowerShell and enter:

```shell
iwr https://get.deta.dev/cli.ps1 -useb | iex
```

</TabItem>
</Tabs>


This will download the binary which conatins the CLI code. It will try to export the `deta` command to your path. If it does not succeed, follow the directions output by the install script to export `deta` to your path.

### Logging in to Deta via the CLI

Once you have successfully installed the Deta CLI, you need to login to Deta.

From a Terminal, type `deta login`.

This command will open your browser and authenticate your CLI through Deta's web application.

Upon a successful login, you are ready to start building [Micros](about).

### Creating Your First Micro

To create a micro, navigate in your Terminal to a parent directory for your first micro and type:

<Tabs
  defaultValue="py"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

```shell
deta new --node first_micro
```

This will create a new Node.js Micro in the 'cloud' as well as a local copy inside a directory called `first_micro` which will contain an `index.js` file.

The CLI should respond:

```json
{
	"name": "first_micro",
	"runtime": "nodejs12.x",
	"endpoint": "https://<path>.deta.dev",
	"visor": "enabled",
	"http_auth": "enabled"
}
```

</TabItem>
<TabItem value="py">

```shell
deta new --python first_micro
```

This will create a new Python Micro in the 'cloud' as well as a local copy inside a directory called `first_micro` which will contain a `main.py` file.


The CLI should respond:

```json
{
	"name": "first_micro",
	"runtime": "python3.7",
	"endpoint": "https://<path>.deta.dev",
	"visor": "enabled",
	"http_auth": "enabled"
}
```

</TabItem>
</Tabs>

Save this endpoint URL somewhere, as we will be visiting it shortly.

### Updating your Micro: Dependencies and Code

<Tabs
  defaultValue="py"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

#### Setup and Dependencies

Within the directory `first_micro`, run the shell command:

```shell
npm init -y
``` 

This will initialize a Node.js project in your current directory with npm's wizard.

What is important is that the **main** file is `index.js`.

After following the npm wizard, let's add a dependency by running:

```shell
npm install express
```

#### Updating Code Locally
Let's also edit and save the `index.js` file locally so that your Micro responds to `HTTP GET` requests with *Hello World*.

```js
const express = require('express');

const app = express(); 

app.get('/', async (req, res) => {
  res.send('Hello World')
});

module.exports = app;
```

#### Deploying Local Changes
After you have updated your dependencies (documented in a `package.json` file) and / or your code locally, use a `deta deploy` command to update your Micro.

```shell
deta deploy
```
The Deta CLI will notify you if your code has updated as well as if the dependcies were installed

```shell
Deploying...
Successfully deployed changes
Updating dependencies...

+ express@4.17.1
added 50 packages from 37 contributors and audited 50 packages in 1.967s
found 0 vulnerabilities
```

</TabItem>
<TabItem value="py">

#### Setup and Dependencies
Within the directory `first_micro`, create a file, `requirements.txt`,  which tells Deta which dependencies to install.

Let's add *flask* to `requirements.txt` and save this file locally.

```text
flask
```

#### Updating Code Locally
Let's also edit the `main.py` file so that your Micro responds to `HTTP GET` requests with *Hello World*. 
```py
from flask import Flask

app = Flask(__name__)

@app.route('/', methods=["GET"])
def hello_world():
    return "Hello World"
```



#### Deploying Local Changes

After you have updated your `requirements.txt` and / or your code locally, use a `deta deploy` command to update your Micro.

```shell
deta deploy
```
The Deta CLI will notify you if your code has updated as well as if the dependcies were installed

```shell
Deploying...
Successfully deployed changes
Updating dependencies...
Collecting flask
  Downloading https://files.pythonhosted.org/packages/f2/28/2a03252dfb9ebf377f40fba6a7841b47083260bf8bd8e737b0c6952df83f/Flask-1.1.2-py2.py3-none-any.whl (94kB)
Collecting Werkzeug>=0.15 (from flask)
  Downloading https://files.pythonhosted.org/packages/cc/94/5f7079a0e00bd6863ef8f1da638721e9da21e5bacee597595b318f71d62e/Werkzeug-1.0.1-py2.py3-none-any.whl (298kB)
Collecting itsdangerous>=0.24 (from flask)
  Downloading https://files.pythonhosted.org/packages/76/ae/44b03b253d6fade317f32c24d100b3b35c2239807046a4c953c7b89fa49e/itsdangerous-1.1.0-py2.py3-none-any.whl
Collecting Jinja2>=2.10.1 (from flask)
  Downloading https://files.pythonhosted.org/packages/30/9e/f663a2aa66a09d838042ae1a2c5659828bb9b41ea3a6efa20a20fd92b121/Jinja2-2.11.2-py2.py3-none-any.whl (125kB)
Collecting click>=5.1 (from flask)
  Downloading https://files.pythonhosted.org/packages/d2/3d/fa76db83bf75c4f8d338c2fd15c8d33fdd7ad23a9b5e57eb6c5de26b430e/click-7.1.2-py2.py3-none-any.whl (82kB)
Collecting MarkupSafe>=0.23 (from Jinja2>=2.10.1->flask)
  Downloading https://files.pythonhosted.org/packages/98/7b/ff284bd8c80654e471b769062a9b43cc5d03e7a615048d96f4619df8d420/MarkupSafe-1.1.1-cp37-cp37m-manylinux1_x86_64.whl
Installing collected packages: Werkzeug, itsdangerous, MarkupSafe, Jinja2, click, flask
```
</TabItem>
</Tabs>

#### Visiting our Endpoint
Let's visit the endpoint the endpoint we saved earlier.  

(If you didn't save it, simply type `deta details` into the CLI, which will give you the endpoint alongside other information about your Micro).

Open up your endpoint in a browser. You might be prompted to log in to your deta account on visiting your endpoint for the first time.

You should see **Hello, World**

If you're accessing the endpoint from not in a browser (like from curl) or if you have disabled cookies in your browser, the response will be:
```json
{
    "errors":["Unauthorized"]
}
```

This is because *Deta Auth* is protecting the endpoint from unauthorized access. 


### Opening Your Micro To the Public

Let's use one last command to open up the endpoint to the public:

```shell
deta auth disable
```

The CLI should respond:

```shell
Successfully disabled http auth
```

Congratulations, you have just deployed and published your first Micro!