---
id: about
title: Introduction to Deta Micros
sidebar_label: Introduction
---

### Summary

Deta Micros (micro servers) are a lightweight but scalable cloud runtime tied to an HTTP endpoint. They are meant to get your apps up and running *blazingly fast*. Focus on writing your code and Deta will take care of everything else. 

### Technical Specifications

- Micros support either Python 3.7 or Node.js 12.x code for now.
- Every Micro you use gets its own sandboxed Linux VM.
- Each Micro has a key and secret keys set in the environment, these are specific to your Micro and not the Deta system. Make sure to not share them to keep your own data safe.
- An execution times out after 10s. Contact us for an increase (up to 20 seconds).
- 128 MB of RAM for *each* execution. Contact us for increase (up to 1 GB/execution).
- Read-only file system. **Only `/tmp` can be written to**. It has a 512 MB storage limit.
- Invocations have an execution processes/threads limit of 1024.
- HTTP Payload size limit is 5.5 MB.

### Important Notes

- Micros automatically respond to your incoming requests and go to sleep when there's nothing to do. You do not have to manage their lifecycle manually.
- You (and only you) have access to the VM, which means there's no SSH access.
- You are supposed to see the VM filesystem, it's not a security vulnerability.
- Deta Micros do not support connecting to MongoDB at the moment. We recommend using Deta Base instead.
- We don't believe that Micros will work well with RDMBS like PostgreSQL and MySQL unless you use a pool manager.
- Micros only support read-only SQLite, which you could deploy with your code.
- The total upload size of your source code and assets is limited to 250 MB.
- Dependencies (pip, npm, etc) also can't exceed a combined size of 250mb.
- For unknown reasons, Google and Firebase packages for Python do not install successfully on Micros.
- Currently, all requests received by Micros do not contain the client IP addresses. This makes most rate-limiting logic and other IP-dependant logic doesn't work on Micros.
- Micros support most micro web frameworks (Node.js: express, fastify, koa, etc && Python: FastAPI, Flask, etc.). Other frameworks are not likely to work.
- Websockets and long-running processes do not work on Micros. (examples: socket.io or Discord bots won't work)

