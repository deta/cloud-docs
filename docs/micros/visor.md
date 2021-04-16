---
id: visor
title: Using Visor
sidebar_label: Visor
---
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

### Visor

Something not working? Use Visor to see a live view of the result of every request processed! Using Visor, you can also test your endpoints by sending your Micro requests!

### Opening Visor
<Tabs 
    defaultValue="browser" 
    values={[
    { label: 'Browser', value: 'browser' },
    { label: 'Terminal', value: 'terminal' },
    ]
}>
<TabItem value="browser">

Start off by logging into your console at [deta.sh](https://deta.sh). You should be redirected to the following screen:

<img src="/img/visor/visor_1.png" alt="visor_1" width="800"/>

Once that's done, choose a micro to view by clicking on its name (under the _"Micros"_ tab).

<img src="/img/visor/visor_2.png" alt="visor_2" width="800"/>

Now click on _"Visor"_

<img src="/img/visor/visor_3.png" alt="visor_3" width="800"/>

</TabItem>
<TabItem value="terminal">

Start your terminal in the root directory of your deployed Deta project.

Run `deta visor open`.

</TabItem>
</Tabs>

### Using Visor
When viewing the Visor page, you'll see a link to your Micro in the top right, a button named _"HTTP Client"_ in the bottom left and a list of handled events by your Micro!

<img src="/img/visor/visor_4.png" alt="visor_4" width="800"/>

#### The Event List
Every event has the returned status code, the path, the protocol, the method and the time logged above it. Under this information are three  tabs, letting you view the response given by the Micro, the Request sent to the Micro and logs (normally displaying errors if they were to occur).

<img src="/img/visor/visor_9.png" alt="visor_9" width="800"/>
<img src="/img/visor/visor_10.png" alt="visor_10" width="800"/>
<img src="/img/visor/visor_11.png" alt="visor_11" width="800"/>
<img src="/img/visor/visor_12.png" alt="visor_12" width="800"/>

On the top right of every event are two icons, the first of which lets you edit the request before re-sending it to your micro and the second of which lets you send the same request again.

#### The HTTP Client
After clicking on the _"HTTP Client"_ button, a new window will appear, that lets you create an HTTP request that can be sent to your Micro!

<img src="/img/visor/visor_6.png" alt="visor_6" width="600"/>
<img src="/img/visor/visor_7.png" alt="visor_7" width="600"/>
<img src="/img/visor/visor_8.png" alt="visor_8" width="600"/>

Simply specify the request method, path, headers and body and hit _Send_ to send it off! The content-type can be changed from JSON to Text too, using the selection box on the bottom left of this window.

We made a video about it too: https://www.youtube.com/watch?v=kAwV7-bEtb0
