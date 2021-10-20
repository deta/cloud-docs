---
id: faqs
title: Frequently Asked Questions
sidebar_label: FAQs
---

### What are all the different 'keys' for?

Deta offers 3 types of secrets / keys / tokens:

1. **Project Keys**: Project keys interact with both your data and your resources inside a project (currently allowing reads and writes for the project's Bases and Drives). A project key will be created for you when you create a project, and you can manage all of a project's keys from the *'Settings'* option in any project's sidebar. If this key is leaked, the data stored in any of the connected project's Bases and Drives can be compromised. 

2. **API Keys**: API Keys are optional keys to protect your Micro HTTP endpoint or to implement client-based rules. Creating API Keys from the Deta CLI is described [here](/docs/cli/commands#deta-auth-create-api-key). Read more about API Keys [here](https://en.wikipedia.org/wiki/Application_programming_interface_key). If this key is leaked, your Micro's http endpoint can be used by unwanted clients.

3. **Access Tokens**: Access tokens are used for authenticating the Deta CLI. Use cases: CI/CD, Gitpod, GitHub Actions. Information on Deta Access Tokens can be found [here](/docs/cli/auth#deta-access-tokens). If this key is leaked, your whole Deta account is compromised.

These types of keys are not unique to Deta; all other cloud providers use some variant of them.
