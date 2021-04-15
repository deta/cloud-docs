---
id: details
title: Technical Details
sidebar_label: Technical Details
---

### Pre-set Environment Variables

The `DETA_PATH` and `DETA_RUNTIME` environent variables are set in every Micro's environment. 
 * `DETA_PATH` contains an identifying string for your Micro.
    * If your `DETA_PATH` contaied a value of `sdgfh` then your Micro is accessible at https://sdgfh.deta.dev.
 * `DETA_RUNTIME` is a boolean that tells a script if it's running on a Micro or not.
    * When accessing this variable in a Micro, expect to get a `True` from it. 
