---
id: auth
title: Authentication
sidebar_label: Authentication
---

The deta cli authenticates in two ways:

### Login From The Browser

Use deta command `deta login` to login from the web browser. It will open the login page in a web browser. 

:::note
If the login page could not be opened automatically for some reason, the cli will display the login url. Open the link in a browser for the login to complete.
:::

### Deta Access Tokens

The deta cli also authenticates with deta access tokens. You can create an access token under the `Settings` view at `https://web.deta.sh/home/:your_username/` (also accessible by clicking the blue left caret `<` from the nav bar in a project's view). The access tokens are **valid for a year**.

:::note
The access token can only be retreived once after creation. Please, store it in a safe place after the token has been created.
:::

#### Token Provider Chain

The access token (called *Access Token* when you create the token from the UI) can be set up to be used by the cli in the following ways in order of preference:
- `DETA_ACCESS_TOKEN` environment variable: 
    - provide the access token through the cli's environment under the environment variable `DETA_ACCESS_TOKEN`
- `$HOME/.deta/tokens` file:
    - create a file called `tokens` in `$HOME/.deta/`
    - provide the token in the field `deta_access_token` in the file as *json* :

    ```json
    {
        "deta_access_token": "your_access_token"
    }
    ```

#### Using Deta in GitPod with Access Tokens

To use the Deta CLI in GitPod, first install the Deta CLI to your GitPod terminal:

```shell
curl -fsSL https://get.deta.dev/cli.sh | sh
```

Then add the `deta` command to the path of the Gitpod environment:

```shell
source ~/.bashrc
```

Finally, add your authentication token to the GitPod environment, which will authenticate the Deta CLI commands against our backend:

```shell
export DETA_ACCESS_TOKEN=<access_token_here>
```

You are now free to use the `deta` command within GitPod!

#### Using Deta in GitHub Actions with Access Tokens

Use this ready-to-use [GitHub action](https://github.com/marketplace/actions/deploy-to-deta) to deploy your app to Deta.

## Issues

If you run into any issues, consider reporting them in our [Github Discussions](https://github.com/orgs/deta/discussions).
