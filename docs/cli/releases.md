---
id: releases
title: CLI Releases
sidebar_label: Releases
---

## v1.1.0 Beta

`deta run`: Run a micro from the the CLI.  Docs at https://docs.deta.sh/docs/micros/run

`deta cron`: Set a micro to run on a schedule. Docs at https://docs.deta.sh/docs/micros/cron

In order to use the new features, please upgrade the CLI to the latest new version.

On linux/macOS platforms: 

```
curl -fsSL https://get.deta.dev/cli.sh | sh
```

On windows: 
```
iwr https://get.deta.dev/cli.ps1 -useb | iex
```

The CLI has updates for the new features as well as some other updates.

### New Commands

`deta clone`:  Clone an existing micro

`deta cron`:  Set a micro to run on a schedule

`deta run`:  Run a micro from the CLI

`deta version upgrade`:  Upgrade Deta version

`deta visor open`:  Open the Visor page for a micro

### Updates

`deta pull`: Pull only pulls latest code of an existing micro from the micro's root directory, add `--force` flag

`deta deploy`: Checks for latest available version on successful deployments

### Fixes

`deta pull`: Fix deta pull creating an empty directory even if pull fails

`deta deploy`: Fix issues with deploying binary files (edited)

`deta details`: Fix issue with displaying wrong values of visor and http_auth

The docs for the CLI commands:  https://docs.deta.sh/docs/cli/commands