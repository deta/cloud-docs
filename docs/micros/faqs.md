---
id: faqs_micros
title: Frequently Asked Questions
sidebar_label: FAQs
---

### How can I request for a timeout or memory increase? 

Please, use the following forms to request for respective limit increases:
- <a href="https://form.deta.dev/timeout">Timeout Limit Increase Request</a>
- <a href="https://form.deta.dev/memory">Memory Limit Increase Request</a>

### Can I use my own custom domain or subdomain with a Micro?

Yes, please refer to the [documentation](./micros/custom_domains.md).

### Do Micros support websockets? 

No, Micros do not support websockets and other long-running processes.

### Why can I not write to the filesystem in a Micro? 

Micro's have a read only filesystem. Only `/tmp` can be written to, which is ephemeral and has a storage limit of 512 Mb.   

### Why am I getting a `Request Entity Too Large` error when deploying a Micro? 

Micro's have a maximum deployment size limit of 250 Mb. This limit includes the total size of your code and dependencies.

### Why does my Micro behave different locally and deployed? 

This can be because of a number of reasons. Please check out the [specifications](https://docs.deta.sh/docs/micros/about#technical-specifications) and [notes](https://docs.deta.sh/docs/micros/about#important-notes) for futher information to find a possible reason.

### Why is my Micro returning a 502 Bad Gateway? 

The response comes from a reverse proxy between a client and your micro. If there is a runtime error or a timeout when invoking a micro, the proxy responds with a `502 Bad Gateway.` 

In order to debug `502` responses, you can use `deta visor` which show you real-time logs of your application. Navigate to your micro's visor page from the UI or use the deta cli command `deta visor open` to view the error logs. 

If there are no logs in your visor and your micro's response took roughly 10 seconds, then it's likely because of a timeout. 

If it is not because of a timeout, then please contact us.