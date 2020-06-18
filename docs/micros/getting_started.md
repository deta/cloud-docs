---
id: getting_started
title: Getting Started
sidebar_label: Getting Started
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Configuring & Installing the Deta CLI

To install the Deta CLI, open a Terminal and enter:

```

```

This will download the binary which conatins the CLI code to `...` and add the `deta` system command to `~/usr/local/bin/`.

### Logging in to Deta via the CLI

Once you have successfully installed the Deta CLI, you need to login to Deta.

From a Terminal, type `deta login`.

This command will open your browser and authenticate your CLI through Deta's web application.

Upon a successful login, you are ready to start building [Micros](about).

### Creating Your First Micro

To create a micro, navigate in your Terminal to a parent directory for your first micro and type
<Tabs
  defaultValue="py"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>
<TabItem value="js">

```shell
deta new first_micro --js
```

This will create a new Node.js Micro in the 'cloud' as well as a local copy inside a directory called `/first_micro` which will contain an `index.js` file.

</TabItem>
<TabItem value="py">

```shell
deta new first_micro --python
```

This will create a new Python Micro in the 'cloud' as well as a local copy inside a directory called `/first_micro` which will contain a `main.py` file.

</TabItem>
</Tabs>

### Adding Dependencies to Your Micro

### Deploying Code to Your Micro

### Opening Your Micro To the Public