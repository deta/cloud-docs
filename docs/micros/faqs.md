---
id: faqs_micros
title: Frequently Asked Questions
sidebar_label: FAQs
---

### How can I request for a timeout or memory increase? 

Please, use the following forms to request for respective limit increases:
- <a href="https://form.deta.dev/timeout">Timeout Limit Increase Request</a>
- <a href="https://form.deta.dev/memory">Memory Limit Increase Request</a>

### Why is my micro returning a 502 Bad Gateway? 

The response comes from a reverse proxy between a client and your micro. If there is a runtime error or a timeout when invoking a micro, the proxy responds with a `502 Bad Gateway.` 

In order to debug `502` responses, you can use `deta visor` which show you real-time logs of your application. Navigate to your micro's visor page from the UI or use the deta cli command `deta visor open` to view the error logs. 

If there are no logs in your visor and your micro's response took roughly 10 seconds, then it's likely because of a timeout. 

If it is not because of a timeout, then please contact us.