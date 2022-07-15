---
id: install
title: Installing the Deta CLI
sidebar_label: Install the Deta CLI
---

import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Installing & Configuring the Deta CLI


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


This will download the binary which contains the CLI code. It will try to export the `deta` command to your path. If it does not succeed, follow the directions outputted by the install script to export `deta` to your path.

### Logging into Deta via the CLI

Once you have successfully installed the Deta CLI, you'll need to log in to Deta.

From a Terminal, type `deta login`.

This command will open your browser and authenticate your CLI through Deta's web application.

Upon a successful log-in, you are ready to start building [Micros](../micros/about.md).

## Issues

If you run into any issues, consider reporting them in our [Github Discussions](https://github.com/orgs/deta/discussions).
