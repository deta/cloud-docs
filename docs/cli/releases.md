---
id: releases
title: CLI Releases
sidebar_label: Releases
---

## v1.3.3-beta

### Updates
- The CLI no longer checks the `Hidden File Attribute` in Windows systems

### Fixes
- Fix overwriting files on `deta new` in Windows 

## v1.3.2-beta

### Fixes
- Fix bad file path bug for hidden file check in windows

## v1.3.1-beta

### Updates
- `deta details`: show cron time in output if cron is set for Micro
- `deta clone`: save `state` after cloning

## v1.3.0-beta

### New
- `deta deploy purge-dependencies`:  remove all installed dependencies from your micro

### Updates
- `deta new`: support new runtime `python3.8`
- `deta update`: support new runtime `python3.8`
- `deta deploy`: purge all installed dependencies instead of uninstalling individual dependencies, if all of them are removed at the same time; use standard http lib to detect binary files and remove third party lib dependency
- `deta new`, `deta pull`, `deta clone`: use new api to download micro code

### Fixes
- Fix installation order bug when upgrading packages
- Fix removal of `$HOME/.deta` folder bug on some cases in `deta new`

## v1.2.0-beta

### New
- `deta new` : add `--runtime` flag, choose runtime when creating a new micro
- `deta update`: add `--runtime` flag, update micro's runtime
- `deta logs`: add `--follow` flag, follow logs 

### Updates
- `deta details`: add id, project and region to details output

### Fixes
- Fix bad state file path in windows
- Fix `deta version upgrade` in windows
- Fix `.detaignore` issues in windows

## v1.1.4-beta

### Fixes
- fix file parsing bug with end of line sequence on windows

## v1.1.3-beta

### Updates 
- add support for `.detaignore` file
- always show login url when logging in with `deta login`
- confirm a new version is not a pre-release version on new version check

### Fixes
- fix parsing of environment variables with double quotes
- fix issues with intermittent discrepancy of local and server state of a micros' details

## v1.1.2-beta

### Updates
- add access token authentication
- `deta watch` does an initial deployment
- show login page url if failed to open login page in browser
- suppress usage messages on errors

### Fixes
- fix cases of corrupted deployments on `deta watch`
- fix parsing environment key value pairs

## v1.1.1-beta

### Fixes
- `deta new`: Fix issues with incomplete/failed deployment if application code already exists in the root directory
- recognize `.mo` files as binary files

## v1.1.0-beta

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