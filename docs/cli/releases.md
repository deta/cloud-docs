---
id: releases
title: CLI Releases
sidebar_label: Releases
---

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