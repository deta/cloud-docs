---
id: CLI
title: Deta CLI Reference
sidebar_label: Deta CLI
---

## Summary

**deta** is a CLI for managing [Deta Micros](about).

To install the CLI, check out [Getting Started](getting_started).


#### Commands

[`deta login`](#deta-login)	 - Trigger the login process for the Deta CLI.

[`deta new`](#deta-new)	 - Create a new Deta Micro

[`deta deploy`](#deta-deploy)	 - Deploy new code to a Deta micro

[`deta details`](#deta-details)	 - Get detailed information about a Deta Micro

[`deta auth`](#deta-auth)	 - Change auth settings for a Deta Micro (public access, api keys)

[`deta pull`](#deta-pull)	 - Pull the live code from a Deta Micro onto your local machine

[`deta update`](#deta-update)	 - Update a Deta Micro

[`deta visor`](#deta-visor)	 - Change the Visor settings for a Deta Micro

[`deta version`](#deta-version)	 - Print the Deta version

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
  -n, --node             create a micro with node runtime
      --project string   project to create the micro under
  -p, --python           create a micro with python runtime
```

#### Notes

`deta new` will first check the current directory for a `main.py` or `index.js` file. If one is found, `deta new` will bootstrap the Micro runtime based on the local file.


If the current directory is not empty, a `[path]` must be provided.

## deta deploy

Deploy your local code (and dependencies) to your Deta Micro.

#### Command

```
deta deploy [flags]
```

#### Flags

```
  -h, --help   help for deploy
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




## deta auth

Change auth settings for a deta micro

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
deta auth disable [value] [flags]
```

#### Options

```
  -h, --help   help for disable
```



### deta auth enable

Enable Deta's *Http Auth* for a Deta Micro (a Micro's endpoint will require authenticated access from within Deta or via a valid api key).

#### Command

```
deta auth enable [flags]
```

#### Options

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
  -n, --name string      api-key name
  -o, --outfile string   file to save the api-key
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
  -n, --name string   api-key name
```


## deta pull

Pull the code from a Deta Micro to your local machine.

#### Command


```
deta pull [path_to_pull_to] [flags]
```

#### Flags

```
  -h, --help   help for pull
```

#### Notes



## deta update

Update a deta micro

#### Command

Update a Deta Micro's name or environment variables.

```
deta update [flags]
```

#### Options

```
  -e, --env string    path to env file
  -h, --help          help for update
  -n, --name string   new name of the micro
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
  enable, disable
```

#### Flags

```
  -h, --help   help for visor
```


### deta visor enable

Enable the Visor for a Deta Micro


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


## deta version

Print the Deta version

#### Command

```
deta version [flags]
```

#### Flags

```
  -h, --help   help for version
```