---
id: deploy_to_deta_button
title: Deploy to Deta Button
sidebar_lable: Deploy to Deta Button
---

The `Deploy to Deta` button provides users a quick way to deploy Micros to Deta directly from the browser.

The button can be used in open-source repositories, blog posts, landing pages etc, allowing users to quickly deploy and use your app on Deta.

An example button that deploys a sample Python Micro to Deta:

[![Deploy](/img/deploy_button/button.svg)](https://go.deta.dev/deploy?repo=https://github.com/deta/deploy-to-deta-button-example)

### Repository URL

You must link the button to the following url and optionally, provide your repository url as a query parameter `repo`.

```
https://go.deta.dev/deploy?repo={your_git_repository_url}
```

The repository url **must be a public git repository url.**

:::note
If you provide the repository url without specifying a branch, the default branch of your repository is used. Specify the branch url if you want to use a different branch. 
:::

#### Repo Parameter Requirement

You **do not need** to provide the repository url explicitly **if and only if** the button is added on Github hosted documentation.

In this case, we infer the repository url from the `referer` header.

For all other cases, you must specify the repository url with the `repo` parameter.

### Adding the Button

The button image is hosted in the following url:
```
https://button.deta.dev/1/svg
```

The button can added as Markdown:

```md
[![Deploy](https://button.deta.dev/1/svg)](https://go.deta.dev/deploy?repo=https://example.git.repo)
```

and also as HTML:

```html
<a href="https://go.deta.dev/deploy?repo=https://example.git.repo">
	<img src="https://button.deta.dev/1/svg" alt="Deploy">
</a>
```

### Metadata and Environment Variables 

You can optionally specify metadata and environment variables needed by the Micro in a `deta.json` file. Create this file in the root directory of your application.

The `deta.json` file has the following schema:

```json
{
	"name": "your app name",
	"description": "your app description", 
	"logo": "https://your.app.logo.url",
	"env": [
		{
			"key": "ENV_VAR_KEY",
			"description": "Human friendly description of the env var",
			"value": "Default value of the env var",
			"required": true|false 
		}
	]
}

```

You can test your `deta.json` file by visiting `https://go.deta.dev/deploy?repo={your_repo_url}`