---
id: common_issues
title: Common Issues
---

### Adding/Updating Dependencies Fails With No Output

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