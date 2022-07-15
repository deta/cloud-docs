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

### Usage

You can let users deploy your GitHub, Gitlab BitBucket (Git) repo quickly by adding the following markup:

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
<a href="https://go.deta.dev/deploy?repo=your-repo-url">
	<img src="https://button.deta.dev/1/svg" alt="Deploy">
</a>
```

### Metadata, Environment Variables And Cron

You can optionally specify metadata, environment variables and a cron expression needed by the Micro in a `deta.json` file. Create this file in the root directory of your application.

The `deta.json` file has the following schema:

```json
{
	"name": "your app name",
	"description": "your app description", 
	"runtime": "micro's runtime",
	"env": [
		{
			"key": "ENV_VAR_KEY",
			"description": "Human friendly description of the env var",
			"value": "Default value of the env var",
			"required": true|false 
		}
	],
	"cron": "default cron expression (for eg. 3 minutes)"
}

```

#### Fields

- `name`: the application name, we will use the repositry name by default if this is not provided, users can change this value during deployment
- `description`: the application description which will be shown to users on the deployment page
- `runtime`: the micro's runtime, the default runtime (`python3.9` or `nodejs14.x`) will be used unless this value is set, supported values:
	- `Python`: `python3.7`, `python3.8`, `python3.9`
	- `Nodejs`: `nodejs12.x`, `nodejs14.x`

- `env`: the environment variables your app uses 
	- `key`: the environment variable key, users cannot change this value
	- `description`: the description of the environment variable so users know what it is used for
	- `value`: the default value of this variable, users can change this value
	- `required`: if the value of this variable _must be set_ by the user 
- `cron`: the default cron expression for the micro, if this is provided the deployed micro will have a cron job set with the provided value by default, users can change the value during deployment 

You can test your `deta.json` file by visiting `https://go.deta.dev/deploy?repo=your-repo-url`


### Get discovered

Make sure to add the `deta` tag to your repo for it to show up in our [GitHub topic](https://github.com/topics/deta).

<img src="/img/deploy_button/deta-topic.png" alt="Deta Tpoic on GitHub"/>

## Issues

If you run into any issues, consider reporting them in our [Github Discussions](https://github.com/orgs/deta/discussions).