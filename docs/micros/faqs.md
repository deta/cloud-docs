---
id: faqs_micros
title: Frequently Asked Questions
sidebar_label: FAQs
---

 ### Why is my micro returning a 502 Bad Gateway? 

The response comes from our `gateway`, which is a reverse proxy between a client and your micro. If there is a runtime error when invoking a micro, the proxy responds with a `502 Bad Gateway.` 

In order to debug `502` responses, you can use `deta visor` which show you real-time logs of your application. Navigate to your micro's visor page from the UI or use the deta cli command `deta visor open` to view the error logs. If there are no errors in your logs, please contact us.