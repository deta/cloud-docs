---
id: cron-guide
title: Cron Jobs
sidebar_label: Cron Jobs
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

A Deta Micro can be set to run on a schedule from the `deta cli` using the [deta cron set](../cli/commands#deta-cron-set) command.

In this guide we are going to configure a deta micro to run every five minutes.

The guide assumes you have already signed up for Deta and have the [Deta CLI](../cli/install.md) installed.


<Tabs
  groupId="preferred-language"
  defaultValue="js"
  values={[
    { label: 'JavaScript', value: 'js', },
    { label: 'Python', value: 'py', },
  ]
}>

<TabItem value="js">

1. Create a directory `cron-job` and change the current directory to it.

    ```shell
    $ mkdir cron-job && cd cron-job
    ```

2. In order to set a micro to run on a schedule, the micro's code needs to define a function that will be run on the schedule with the help of our library `deta`, which is pre-installed on a micro and can just be imported directly.

    Create a `index.js` file and define the function that should run on the schedule.

    ```javascript
    // import app from 'deta'
    const { app } = require('deta');

    // use app.lib.cron to define the function that runs on the schedule
    // takes an `event` as an argument
    app.lib.cron(event => {
        console.log("running on a schedule");
    });

    module.exports = app; 
    ```

5. Create a new `nodejs` micro with `deta new`.

    ```shell
    $ deta new
    Successfully created a new micro
    {
        "name": "cron-job",
        "runtime": "nodejs12.x",
        "endpoint": "https://ma3sst.deta.dev",
        "visor": "enabled",
        "http_auth": "enabled"
    }
    ```

    Even though the output shows a HTTP endpoint, you do not need it for cron. 

6. Set the micro to run on a schedule with the [deta cron set](../cli/commands#deta-cron-set) command.

    ```shell
    $ deta cron set "5 minutes"
    Scheduling micro...
    Successfully set micro to schedule for "5 minutes"
    ```

    We have set the micro to run every five minutes. In order to see if a micro is running on a schedule, you can use the `deta details` command. 

    ```shell
    $ deta details
    {
        "name": "cron-job",
        "runtime": "nodejs12.x",
        "endpoint": "https://ma3sst.deta.dev",
        "visor": "enabled",
        "http_auth": "enabled",
        "cron": "5 minutes"
    }
    ```

    The details show that the `cron` has ben set for `5 minutes`


7. In order to see logs of your cron-job, you can use `Deta Visor`, which enables you to see real-time logs of a Deta Micro. Open your micro's visor page with `deta visor open` from the cli or by navigating to your micro's visor page on the browser.

    ```shell
    $ deta visor open
    Opening visor in the browser...
    ```

We have a micro which prints "running on a schedule" every five minutes. You should see the execution logs in your micro's visor page every five minutes.
</TabItem>

<TabItem value="py">

1. Create a directory `cron-job` and change the current directory to it.

    ```shell
    $ mkdir cron-job && cd cron-job
    ```

2. In order to set a micro to run on a schedule, the micro's code needs to define a function that will be run on the schedule with the help of our library `deta`, which is pre-installed on a micro and can just be imported directly. 

    Create a `main.py` file and define the function that should run on the schedule.

    ```python
    from deta import app

    # use app.lib.cron decorator for the function that runs on the schedule
    # the function takes an `event` as an argument
    @app.lib.cron():
    def cron_task(event):
        print("running on a schedule") 
    ```

5. Create a new `python` micro with `deta new`.

    ```shell
    $ deta new
    Successfully created a new micro
    {
        "name": "cron-job",
        "runtime": "python3.7",
        "endpoint": "https://ma3sst.deta.dev",
        "visor": "enabled",
        "http_auth": "enabled"
    }
    ```

    Even though the output shows a HTTP endpoint, you do not need it for cron. 

6. Set the micro to run on a schedule with [deta cron set](../cli/commands#deta-cron-set) command.

    ```shell
    $ deta cron set "5 minutes"
    Scheduling micro...
    Successfully set micro to schedule for "5 minutes"
    ```

    We have set the micro to run every five minutes. In order to see if a micro is running on a schedule, you can use the `deta details` command. 

    ```shell
    $ deta details
    {
        "name": "cron-job"
        "runtime": "python3.7",
        "endpoint": "https://ma3sst.deta.dev",
        "visor": "enabled",
        "http_auth": "enabled",
        "cron": "5 minutes"
    }
    ```

    The details show that the `cron` has ben seet for `5 minutes`


7. In order to see logs of your cron-job, you can use `Deta Visor`, which enables you to see real-time logs of a Deta Micro. Open your micro's visor page with `deta visor open` from the cli or by navigating to your micro's visor page on the browser.

    ```shell
    $ deta visor open
    Opening visor in the browser...
    ```

We have successfully deployed a micro which prints "running on a schedule" every five minutes. You should see the execution logs in your micro's visor page every five minutes.


Full documentation on cron is available [here](https://docs.deta.sh/docs/micros/cron).

</TabItem>
</Tabs>