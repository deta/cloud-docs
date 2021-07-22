---
id: deploy_to_deta_button
title: Deploy to Deta Button
sidebar_lable: Deploy to Deta Button
---

The __Deploy to Deta button__ provides users a quick way to deploy a public Git repo to a Deta Micro directly from the browser.

It's an easy way to share your creations with the developer community.

You can use the "Deploy To Deta Button" in open-source repositories, blog posts, landing pages etc, allowing other developers to quickly deploy and use your app on Deta.

An example button that deploys a sample Python Micro to Deta:

[![Deploy](/img/deploy_button/button.svg)](https://go.deta.dev/deploy?repo=https://github.com/deta/deploy-to-deta-button-example)

### Usage with GitHub, etc

You can let users deploy your __GitHub__ repo quickly by adding the following markup:

```md
[![Deploy](https://button.deta.dev/1/svg)](https://go.deta.dev/deploy)
```

The button link will automatically identify the repo and prompt the user with the Deploy to Deta prompt.

In case you are using your README __outside of GitHub__, for repos hosted on other __Git providers (like GitLab, Bitbucket, etc)__, or you just want to make sure you always linking to the correct repo, please provide `repo` parameter, folowing this format:

```md
[![Deploy](https://button.deta.dev/1/svg)](https://go.deta.dev/deploy?repo=your-repo-url)
```


:::note
Specify the __exact__ branch url if you want to use a different branch for deplyment. If you provide the repository url without specifying a branch, the default branch will be used.

The repository **must be a public git repository url.**
::: -->


### Usage with HTML/JavaScript

The button image is hosted in the following url:
```
https://button.deta.dev/1/svg
```

and can be easily added to HTML pages or JavaScript applications. Exampel usage:

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


### Get discovered

Make sure to add the `deta` tag to you repo for it to show up in our [GitHub topic](https://github.com/topics/deta).

<img src="/img/deploy_button/deta-topic.png" alt="Deta Tpoic on GitHub"/>
