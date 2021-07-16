---
id: deploy_on_deta_button
title: Deploy On Deta Button
sidebar_lable: Deploy On Deta Button
---

The `Deploy on Deta` button provides users a quick way to deploy micros to Deta directly from the browser.

The button can be used in open-source repositories, landing-pages etc, allowing users to quickly deploy and use your app on Deta.

An example button that deploys a sample python micro to Deta:

[![Deploy](/img/deploy_button/button.svg)](https://go.deta.dev/deploy?repo=https://github.com/deta/deploy-on-deta-button-example)



## Repository URL

You must link the button to the following url and provide your repository url as a query param `path`.

```
https://go.deta.dev/deploy?repo={your_git_repository_url}
```

The repository url **must be a public git repository url.**

:::note
If you provide the repository url without speccifying a branch, by default the `main` (`main` not `master`) branch is cloned. Specify the branch url if you want to use a different branch. 
:::

## Adding the button

The button image is hosted in the following url:
```
https://button.deta.dev/1/svg
```

The button can added as Markdown:

```md
[![Deploy](https://button.deta.dev/1/svg)](https://web.deta.sh/deploy?path=https://example.git.repo)
```

and also as HTML:

```html
<a href="https://web.deta.sh/deploy?path=https://example.git.repo">
	<img src="https://button.deta.dev/1/svg" alt="Deploy">
</a>
```

## Specifying metadata and environment variables 

You can optionally specify metadata about the micro and environment variables needed in a `deta.json` file. Create this file in the root directory of your application.

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
			"required": true|false, 
		},
	]
}

```

You can test your `deta.json` file by visiting `https://web.deta.sh/deploy?path={your_repo_url}`