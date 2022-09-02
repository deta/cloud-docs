---
id: about
title: Introduction to Deta Micros
sidebar_label: Introduction
---

### Summary

Deta Micros (micro servers) are a lightweight but scalable cloud runtime tied to an HTTP endpoint. They are meant to get your apps up and running *blazingly fast*. Focus on writing your code and Deta will take care of everything else. 

### Technical Specifications

1. Micros support the following runtimes:  
	a. Python: **3.7**, **3.8**, **3.9**  
	b. Nodejs: **12.x**, **14.x**  

	New micros will use `Python 3.9` or `Nodejs 14.x` by default. If you want to select a different runtime or update the runtime of your micro, please refer to [deta new](https://docs.deta.sh/docs/cli/commands#deta-new) and [deta update](https://docs.deta.sh/docs/cli/commands#deta-update).
2. Every Micro you use gets its own sandboxed Linux VM.
3. Each Micro has a key and secret keys set in the environment, these are specific to your Micro and not the Deta system. Make sure to not share them to keep your own data safe.
4. An execution times out after 10s. <a href="https://form.deta.dev/timeout">Request an increase.</a>
5. 512 MB of RAM for *each* execution. <a href="https://form.deta.dev/memory">Request an increase.</a>
6. Read-only file system. **Only `/tmp` can be written to**. It has a 512 MB storage limit.
7. Invocations have an execution processes/threads limit of 1024.
8. HTTP Payload size limit is 5.5 MB.

### Important Notes

1. Micros automatically respond to your incoming requests and go to sleep when there's nothing to do. You do not have to manage their lifecycle manually.
2. You (and only you) have access to the VM, which means there's no SSH access.
3. You are supposed to see the VM filesystem, it's not a security vulnerability.
4. Deta Micros do not support connecting to MongoDB at the moment. We recommend using Deta Base instead.
5. We don't believe that Micros will work well with RDMBS like PostgreSQL and MySQL unless you use a pool manager.
6. Micros only support read-only SQLite, which you could deploy with your code.
7. The total upload size of your source code and assets is limited to 250 MB.
8. Dependencies (pip, npm, etc) also can't exceed a combined size of 250mb.
9. For unknown reasons, Google and Firebase packages for Python do not install successfully on Micros.
10. Currently, all requests received by Micros do not contain the client IP addresses. This makes most rate-limiting logic and other IP-dependant logic not work on Micros.
11. Micros support most micro web frameworks (Node.js: express, fastify, koa, etc && Python: FastAPI, Flask, etc.). Other frameworks are not likely to work.
12. Websockets and long-running processes do not work on Micros. (examples: socket.io or Discord bots won't work).
13. Features like [Background Tasks](https://www.starlette.io/background/) and [Startup/Shutdown Events](https://www.starlette.io/events/) will currently not work as expected on Micros.
