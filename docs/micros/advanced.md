---
id: advanced
title: Advanced Micro Usage
sidebar_label: Advanced Usage
---

### Summary

Ready to take your Micro usage to the next level? Have a look at the following advanced features offered by Micros:

 * [Pre-set Environment Variables](advanced.md/#pre-set-environment-variables) - learn about the environment variables pre-set in your Micro.
 * [Using API Keys](advanced.md/#using-api-keys) - Learn how to secure your Micro and use an API key to authenticate therewith.
 * [Visor](advanced.md/#visor) - find and use Visor, a troubleshooting and testing tool.

### Pre-set Environment Variables

The `DETA_PATH` and `DETA_RUNTIME` environent variables are set in every Micro's environment. 
 * `DETA_PATH` contains an identifying string for your Micro.
    * If your `DETA_PATH` contaied a value of `sdgfh` then your Micro is accessible at https://sdgfh.deta.dev.
 * `DETA_RUNTIME` is a boolean that tells a script if it's running on a Micro or not.
    * When accessing this variable in a Micro, expect to get a `True` from it. 

### Using API Keys

Want to really lock your Micro down? Here's how!

 1. Run `deta auth enable` from the root of the source code directory you've deployed to your Micro.
    * This enables authentication for every request that is to be processed.
 2. Run `deta auth create-key` to create a new key to be used to authenticate your requests with your Micro.
    * You need to specify a name for this key and we recommend that you give it a description too. 
    * For more info on creating keys, check out the [relevant docs](/docs/cli/commands.md/#deta-auth-create-api-key).
 3. Add this key to the header of every request you'd like the Micro to process! 
    * Use the `X-API-Key` key to do so!
    * An example of this could look like: `deta auth create-api-key --name agent1 --desc "api key for agent 1"`
 5. Profit!
    * 🤑

### Visor

Something not working? Use Visor to see a live view of the result of every request processed! Using Visor, you can also test your endpoints by sending your Micro requests!

Open Visor by going to your Deta console before clicking on the _"Open Visor"_ tab. You could also open the visor by running `deta visor open` in your terminal from the source code root of the project you have deployed to your Micro.

We made a video about it too: https://www.youtube.com/watch?v=kAwV7-bEtb0
