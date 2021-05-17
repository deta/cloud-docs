---
id: api_keys
title: API Keys
sidebar_label: API Keys
---

API keys are a great way to protect your APIs, which is why Deta has them built into Micros. API keys will work with any framework that runs on the Micros – no coding required from your end! 


### 1. Enable Deta Access
To use API keys with your Micro, first you need to enable __Deta Access__ by running the following command from the root directory of your Micro's source code.  

```
deta auth enable
```

Now your API is protected by __Deta Access__ and only _accessible_ by you. Next, you need to create an API key to authenticate your requests.


### 2. Create an API key

To create a new API key, run the following command, make sure to provide at least the `name` argument.

> For more info, refer to the [`deta auth create-key`](../cli/commands.md/#deta-auth-create-api-key) docs.


```
deta auth create-api-key --name first_key --desc "api key for agent 1"
```
This will send a response similar to this:

```json
{
	"name": "first_key",
	"description": "api key for agent 1",
	"prefix": "randomprefix",
	"api_key": "randomprefix.supersecretrandomstring",
	"created": "2021-04-22T11:50:08Z"
}
```

In this example, the API key would be `randomprefix.supersecretrandomstring`.

The key will only be shown to you once, make sure to save it in a secure place.

:::note API keys are passwords
Anyone with this API key can access your Micro, make sure to treat it as a password and save it in a secure place like a password manager.
:::


### 3. Using API keys

Simply add this key to the header of every request you make to your Micro. 

For example, suppose your Micro has an endpoint `/tut` that responds with a simple string `Hello`. You can set the value of `X-API-Key` header along with your request like the following:
```json
curl --request GET \
  --url https://2kzkof.deta.dev/tut \
  --header 'Content-Type: application/json' \
  --header 'X-API-Key: awEGbjqg.D1sETRFJKHWtcxSRSmofY2-akZjqFPh7j'
```

That is all you need to protect your APIs!

