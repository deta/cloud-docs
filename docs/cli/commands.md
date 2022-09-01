---
id: commands
title: Deta CLI Reference
sidebar_label: Command Reference
---

## Summary

**deta** is a CLI for managing [Deta Micros](/docs/micros/about).

To install the CLI, check out [Installing the CLI](/docs/cli/install).


#### Commands

[`deta login`](#deta-login)	 - Trigger the login process for the Deta CLI.

[`deta version`](#deta-version)	 - Print the Deta version

[`deta projects`](#deta-projects) - List Deta projects

[`deta new`](#deta-new)	 - Create a new Deta Micro

[`deta deploy`](#deta-deploy)	 - Deploy new code to a Deta micro

[`deta details`](#deta-details)	 - Get detailed information about a Deta Micro

[`deta watch`](#deta-watch)	 - Auto-deploy local changes in real time to your Micro

[`deta auth`](#deta-auth)	 - Change auth settings for a Deta Micro (public access, api keys)

[`deta pull`](#deta-pull)	 - Pull the live code from a Deta Micro onto your local machine

[`deta clone`](#deta-clone)	 - Clone a Deta Micro onto your local machine

[`deta update`](#deta-update)	 - Update a Deta Micro

[`deta visor`](#deta-visor)	 - Change the Visor settings for a Deta Micro

[`deta cron`](#deta-cron) - Change cron settings for a Deta Micro


## deta login

Login to deta via the CLI. This is necessary before using any other commands.

#### Command

```
deta login [flags]
```

#### Flags

```
  -h, --help   help for login
```

## deta version

Print the Deta version

#### Command

```
deta version [flags] 
deta version [command]
```

#### Flags

```
  -h, --help   help for version
```

#### Version commands

```
  upgrade
```

### deta version upgrade

Upgrade deta cli version

#### Command
```
  deta version upgrade [--version <version>]
```

#### Flags 

```
  -h, --help             help for upgrade
  -v, --version string   version number
```
#### Examples

```
1. deta version upgrade

Upgrade cli to latest version.

2. deta version upgrade --version v1.0.0

Upgrade cli to version 'v1.0.0'.
```

## deta projects

List deta projects

#### Command

```
deta projects [flags]
```

#### Flags

```
  -h, --help   help for projects
```

## deta new

`deta new` creates a new Micro(server) from the Deta cli

#### Command

```
deta new [flags] [path]
```

#### Flags

```
  -h, --help             help for new
      --name string      name of the new micro
  -n, --node             create a micro with node (node14.x) runtime
      --project string   project to create the micro under
  -p, --python           create a micro with python (python 3.9) runtime
      --runtime string   create a micro with the specified runtime
                         Python: python3.7, python3.9
                         Node: node12, node14
```

#### Examples

```
1. deta new

Create a new deta micro from the current directory with an entrypoint file (either 'main.py' or 'index.js') already present in the directory.

2. deta new --runtime python3.7

Create a new python deta micro from the current directory with an entrypoint file ('main.py') already present in the directory and runtime python3.7.

3. deta new my-micro

Create a new deta micro from './my-micro' directory with an entrypoint file (either 'main.py' or 'index.js') already present in the directory.

4. deta new --node my-node-micro

Create a new deta micro with the node runtime in the directory './my-node-micro'.
'./my-node-micro' must not contain a python entrypoint file ('main.py') if directory is already present. 

5. deta new --python --name my-github-webhook webhooks/github-deta

Create a new deta micro with the python runtime, name 'my-github-webhook' and in directory 'webhooks/github-deta'. 
'./my-node-micro' must not contain a node entrypoint file ('index.js') if directory is already present. 
```

#### Notes

- The `path` defaults to the current working directory if not provided.

- `deta new` will first check `path` for a `main.py` or `index.js` file. If one is found, `deta new` will bootstrap the Micro runtime based on the local file. If `path` is an empty directory, a runtime (with `--node` or `--python` or `--runtime`) must be provided and `deta` will create a starter app in `path`. 

- If `path` is not an empty directory and does not have an entrypoint file (either `main.py` or `index.js`) a `name` must be provided, under which `deta` will create a micro with a starter app.

## deta deploy

Deploy your local code (and dependencies) to your Deta Micro.

#### Command

```
deta deploy [flags] [path]
```

#### Flags

```
  -h, --help   help for deploy
```

#### Examples

```
1. deta deploy

Deploy a deta micro rooted in the current directory.

2. deta deploy micros/my-micro-1

Deploy a deta micro rooted in 'micros/my-micro-1' directory.
```

#### Notes

`deta deploy` will ignore the following files and folders by default when deploying a micro:

  - all files and folders with names starting with a `.` (both in unix and windows systems) 
  - vim swap files
  - `node_modules` directory for `node` runtime  
  - `__pycache__` directory for `python` runtime
  - `env` and `venv` directories for `python` runtime
  - `.pyc` and `.rst` files for `python` runtimes 

#### Deta Ignore

`deta deploy` respects a `.detaignore` file. You can specify paths additional to the default ignore paths in this file. 

For eg, a `.detaignore` file with the following content will ignore the `test` and `docs` paths when deploying your micro.
```
test
docs
```

You can also use the `!` character to include paths that are ignored by default by the cli. 

For eg, a `.detaignore` file with the following content will not ignore the `.env` file when deploying your micro.

```
!.env
```

## deta details

Get detailed information about a specific Deta micro.

#### Command

```
deta details [flags] [path]
```

#### Flags

```
  -h, --help   help for details
```


## deta watch

Auto-deploy locally saved changes in real time to your Deta micro.

#### Command

```
deta watch [path] [flags]
```

#### Flags

```
  -h, --help   help for watch
```

## deta auth

Change auth settings for a Deta Micro

#### Command

```
deta auth [auth_command] [flags]
```

#### Auth Commands

```
  disable, enable, create-api-key, delete-api-key
```

#### Flags

```
  -h, --help   help for auth
```

### deta auth disable

Disable Deta's *Http Auth* for a Deta Micro (this makes the HTTP endpoint publicly accesible).

#### Command

```
deta auth disable [flags]
```

#### Flags

```
  -h, --help   help for disable
```

### deta auth enable

Enable Deta's *Http Auth* for a Deta Micro (a Micro's endpoint will require authenticated access or via a valid api key).

#### Command

```
deta auth enable [flags]
```

#### Flags

```
  -h, --help   help for enable
```

### deta auth create-api-key

Create an API key for a Deta Micro

#### Command

```
deta auth create-api-key [flags]
```

#### Flags

```
  -d, --desc string      api-key description
  -h, --help             help for create-api-key
  -n, --name string      api-key name, required
  -o, --outfile string   file to save the api-key
```

#### Examples

```
1. deta auth create-api-key --name agent1 --desc "api key for agent 1"

Create an api key with name 'agent1' and description 'api key for agent 1'

2. deta auth create-api-key --name agent1 --outfile agent_1_key.txt

Create an api key with name 'agent1' and save it to file 'agent_1_key.txt'
```

### deta auth delete-api-key

Delete an API key for a Deta Micro

#### Command

```
deta auth delete-api-key [flags]
```

#### Flags

```
  -d, --desc string   api-key description
  -h, --help          help for delete-api-key
  -n, --name string   api-key name, required
```

#### Examples

```
1. deta auth delete-api-key --name agent1

Delete api key with name 'agent1'
```

## deta pull

Pull the latest deployed code of a Deta Micro to your local machine.

#### Command

```
deta pull [flags]
```

#### Flags

```
  -f, --force   force overwrite of existing files
  -h, --help    help for pull
```

#### Examples

```
1. deta pull

Pull latest changes of deta micro present in the current directory. 
Asks for approval before overwriting the files in the current directory.

2. deta pull --force

Force pull latest changes of deta micro present in the current directory.
Overwrites the files present in the current directory.
```

## deta clone

Clone a deta micro

#### Command

```
deta clone [path] [flags]
```

#### Flags

```
  -h, --help             help for clone
      --name string      deta micro name
      --project string   deta project
```

#### Examples

```
1. deta clone --name my-micro

Clone latest deployment of micro 'my-micro' from 'default' project to directory './my-micro'.

2. deta clone --name my-micro --project my-project micros/my-micro-dir

Clone latest deployment of micro 'my-micro' from project 'my-project' to directory './micros/my-micro-dir'.
'./micros/my-micro-dir' must be an empty directory if it already exists. 
```

## deta update

Update a deta micro

#### Command

Update a Deta Micro's name or environment variables.

```
deta update [flags]
```

#### Flags

```
  -e, --env string     path to env file
  -h, --help           help for update
  -n, --name string    new name of the micro
  -r, --runtime string new runtime of the micro
```

#### Examples

```
1. deta update --name a-new-name

Update the name of a deta micro with a new name "a-new-name".

2. deta update --env env-file

Update the enviroment variables of a deta micro from the file 'env-file'. 
File 'env-file' must have env vars of format 'key=value'.

3. deta update --runtime nodejs14

Update the runtime of the micro to nodejs14.x.
```

## deta visor

Change the Visor settings for a Deta Micro. 

If *Deta Visor* is enabled, Deta will log all incoming requests to and responses from a Deta Micro, letting you inspect, edit, and replay these request / response pairs.

To access a Micro's visor, navigate to:

`https://web.deta.sh/home/:username/:projectName/micros/:microName/visor`

#### Command

Change visor settings for a deta micro

```
deta visor [visor_command] [flags]
```

#### Visor Commands

```
  open, enable, disable
```

#### Flags

```
  -h, --help   help for visor
```

### deta visor open

Open Micro's visor page in the browser.

#### Command
```
deta visor open [flags]
```

#### Flags
```
  -h, --help help for open
```

### deta visor enable

Enable Visor for a Deta Micro


#### Command
```
deta visor enable [flags]
```

#### Flags

```
  -h, --help   help for enable
```

### deta visor disable

Disable Visor for a deta micro

#### Command

```
deta visor disable [flags]
```

#### Flags

```
  -h, --help   help for disable
```

## deta cron

Change cron settings for a deta micro

#### Command

```
deta cron [cron_command] [flags]
```

#### Cron Commands
```
  set, remove
```

#### Flags

```
  -h, --help   help for cron
```

### deta cron set

Set deta micro to run on a schedule

#### Command
```
deta cron set [path] <expression> [flags]
```

#### Flags
```
  -h, --help   help for set
```

#### Examples
```
Rate:

1. deta cron set "1 minute" : run every minute
2. deta cron set "5 hours" : run every five hours

Cron expressions:

1. deta cron set "0 10 * * ? *" : run at 10:00 am(UTC) every day
2. deta cron set "30 18 ? * MON-FRI *" : run at 6:00 pm(UTC) Monday through Friday
3. deta cron set "0/5 8-17 ? * MON-FRI *" : run every 5 minutes Monday through Friday between 8:00 am and 5:55 pm(UTC)
```

### deta cron remove

Remove a schedule from a deta micro

#### Command
```
deta cron remove [path] [flags]
```

#### Flags

```
  -h, --help   help for remove
```

## Issues

If you run into any issues, consider reporting them in our [Github Discussions](https://github.com/orgs/deta/discussions).
