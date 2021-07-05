---
id: env
title: Custom Environment Variables
sidebar_lable: Custom Environment Variables
---

## Set/update your Env Vars (Environment Variables)

Store your variables in a file called `.env`.

Example content of `.env`:

```sh
SECRET_KEY=abcd
APP_URL=example.com
```

Then run `deta update -e .env`. This will make sure these env vars are set in your Micro.

Env vars are encrypted. Make sure to not commit your `.env` file into git.

