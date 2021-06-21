---
id: custom_domains
title: Custom Domains
sidebar_label: Custom Domains
---


You can set custom sub-domains and point your own domains to a deta micro. Navigate to the `domains` tab in your micro's dashboard to set domains.

<div style={{textAlign: 'center'}}>
	<img src="/img/domains/custom_domain.png" alt="custom_domain" width="600"/>
</div>

### Sub-domains

Deta provides your micro a random sub-domain by default under `deta.dev`. You can assign a different sub-domain of your choice to your micro.
The micro can be accessed from both the default sub-domain and the sub-domain you assign.


You need to consider the following when assigning a sub-domain:

- You can only assign a single sub-domain for each micro.
- The sub-domain must be at least `4` characters in length. 
- Only alphanumeric characters, dashes and underscores are allowed. The sub-domain must begin and end with an alphanumeric character.


### Custom Domains

You can assign custom domains to a micro. 

You need to consider the following when assigning a custom domain:
- You can assign upto `5` custom domains for a single micro.
- After you have added a custom domain, we provide you with an IP Address. You need to add an `A record` in your DNS settings and point your domain to this IP Address.
- We continously check if your domain is pointing to this IP Address. If it is, we will create an SSL certificate for your domain and serve your micro from the domain. 
- The time taken for the DNS record changes to take effect depends on your DNS settings and provider. It may take up to 24 hours for your domain to go live.
- If you get an SSL error after the DNS record changes have propagated, please wait until the system has created an SSL certificate for your domain. This is usually fast but sometimes it may take a few hours.

Your domain will be marked as `active` in your dashboard after the process is complete.

:::note
If you are using [Cloudflare](https://www.cloudflare.com) as your DNS provider, please make sure to turn the proxy off in your DNS settings when adding the Deta provided IP address.
:::