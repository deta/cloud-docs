---
id: common_issues
title: Common Issues
---

### Adding/Updating dependencies fails with no output

On windows, if adding or updating dependencies fails with the following or similar error message but there is no further output: 

```
Error: failed to update dependencies: error on one or more dependencies, 
no dependencies were added, see output for details.
```

Then, please make sure the requirements file encoding is `UTF-8`. 

:::note
If you have used the command `pip freeze > requirements.txt` in `powershell` on Windows,
the file created is not encoded in `UTF-8`. Please change the encoding or create a new file with the right encoding. 
:::

### Nodejs Micros cannot serve binary files

Serving some binary files (images, fonts etc) fails on nodejs micros currently because of a bug. We are sorry for this and will push a fix as soon as we can. 

As a workaround, please add the environment variable `BINARY_CONTENT_TYPES={file_mime_type}` in the micro's environment to serve the file. The `file_mime_type` can accept wildcards (`*`)
and comma separated values. 

For instance, if you want to serve images and fonts from your nodejs micro, setting

```
BINARY_CONTENT_TYPES=image/*,font/*
```

will let the micro serve these files. 

Please, use the [`deta update -e [env_file_name]`](https://docs.deta.sh/docs/cli/commands#deta-update) command to update the environment variables of the Micro.

### Cannot login from the web browser after `deta login`

Logging in with `deta login` from the [Brave Browser](https://brave.com/) does not work at the moment. Please use a different browser to login (you can copy the link in a different browser after the login page opens up), or use [deta access tokens](https://docs.deta.sh/docs/cli/auth#deta-access-tokens) instead.

### Account is unconfirmed but I did not receive a confirmation email

Please check your spam folder as well for the confirmation email. If you have not received one, please send us an email at team@deta.sh for activating your account with the email address you used at sign up. 