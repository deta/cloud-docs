---
id: api_keys
title: API Keys
sidebar_label: API Keys
---

### Using API Keys

Want to really lock your Micro down? Here's how!

 1. Run `deta auth enable` from the root of the source code directory you've deployed to your Micro.
    * This enables authentication for every request that is to be processed.
 2. Run `deta auth create-key` to create a new key to be used to authenticate your requests with your Micro.
    * You need to specify a name for this key and we recommend that you give it a description too. 
    * For more info on creating keys, check out the [relevant docs](../cli/commands.md/#deta-auth-create-api-key).
 3. Add this key to the header of every request you'd like the Micro to process! 
    * Use the `X-API-Key` key to do so!
    * An example of this could look like: `deta auth create-api-key --name agent1 --desc "api key for agent 1"`
 5. Profit!
    * 🤑