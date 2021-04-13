---
id: faqs
title: Frequently Asked Questions
sidebar_label: FAQs
---

### Can I use my own custom domain or subdomain?

Custom subdomains are already in alpha. If you need one for your project, please let us know.

### What are all the different 'keys' for?

Deta offers 3 types of secrets / keys / tokens:

1. **Project Keys**: This type of key interacts with both your data and your resources inside a project (currently allowing reads and writes for the project's Bases). A project key will be created for you when you create a project, and you can manage all of a project's keys from the *'Settings'* option in any project's sidebar. If this key is leaked, the data stored in any of the connected project's Bases can be compromised. 

2. **API Keys**: This is an optional key to protect your Micro HTTP endpoint or to implement client-based rules. Creating API Keys from the Deta CLI is described [here](/docs/cli/commands#deta-auth-create-api-key). Read more about API Keys [here](https://en.wikipedia.org/wiki/Application_programming_interface_key). If this key is leaked, your micro endpoint can be used by unwanted clients.

3. **Access Tokens**: This token lets other programs manage (create, modify & delete) your Micros, Projects and Bases on your behalf. It's mainly used to let you have programmatic access to our API. Use cases: CI/CD, Gitpod, GitHub Actions. Information on Deta Access Tokens can be found [here](/docs/cli/auth#deta-access-tokens). If this key is leaked, your whole Deta account is compromised.

These types of keys are not unique to Deta; all other cloud providers use some variant of them.
