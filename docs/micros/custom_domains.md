---
id: custom_domains
title: Custom Domains
sidebar_label: Custom Domains
---


You can set custom sub-domains and point your own domains to a Deta Micro. Navigate to the `domains` tab in your Micro's dashboard to set domains.

<div style={{textAlign: 'center'}}>
	<img src="/img/domains/custom_domain.png" alt="custom_domain" width="600"/>
</div>

## Sub-domains

Deta provides your Micro a random sub-domain by default under `deta.dev`. You can assign a different sub-domain of your choice to your Micro.
The Micro can be accessed from both the default sub-domain and the sub-domain you assign.


You need to consider the following when assigning a sub-domain:

- You can only assign a single sub-domain for each Micro.
- The sub-domain must be at least `4` characters in length. 
- Only alphanumeric characters, dashes and underscores are allowed. The sub-domain must begin and end with an alphanumeric character.


## Custom Domains

You can assign custom domains to a Micro. 

### Assignment

You need to consider the following when assigning a custom domain:
- You can assign up to `5` custom domains for a single Micro.
- After you have added a custom domain, we provide you with an IP Address. You need to add an `A record` in your DNS settings and point your domain to this IP Address.
- We continously check if your domain is pointing to this IP Address. If it is, we will create an SSL certificate for your domain and serve your Micro from the domain. 
- The time taken for the DNS record changes to take effect depends on your DNS settings and provider. It may take up to 24 hours for your domain to go live.
- If you get an SSL error after the DNS record changes have propagated, please wait until the system has created an SSL certificate for your domain. This is usually fast but sometimes it may take a few hours.
- If you have a [CAA record](#caa-records) set up for you domain, make sure you have set `sectigo.com` as an allowed CA for your domain. 
- If you are adding a custom domain for the `www.` subdomain, **you need to add both `www.` and the main domain** in your dashboard. For eg, if you are setting up a custom domain for `www.example.com`, then add both `example.com` and `www.example.com` as custom domains for your micro.
- If you are adding a custom domain for an apex domain, **you need to add both `www.` and the main domain** in your dashboard. For eg, if you are setting up a custom domain for `example.com`, then add both `example.com` and `www.example.com` as custom domains for your micro.

:::note
If you are using [Cloudflare](https://www.cloudflare.com) as your DNS provider, please make sure to turn the proxy off in your DNS settings when adding the Deta provided IP address.
:::

### Completion

Your domain will be marked as `active` in your dashboard after the process is complete.


### CAA Records

[CAA records](https://en.wikipedia.org/wiki/DNS_Certification_Authority_Authorization) specify which Certificate Authorities are allowed to issue certificates on your behalf. 

If you have a CAA record set up for your domain (check your DNS settings or use a tool to check your CAA records), add the following record so that we can issue certificates for your domain. 

```
example.com. 3600 IN CAA 0 issue "sectigo.com"
```

This record allows us to issue certificates for `example.com` and all subdomains of `example.com`. For your domain, replace `example.com` with your domain.

### Troubleshoot

Check the following if you are experiencing issues in setting up a custom domain: 

1. Make sure you have added an A record in your DNS settings with our IP address. You can use tools like [nslookup](https://linux.die.net/man/1/nslookup) or other online tools to check what IP address your domain is currently being resolved to. 
2. If you are using `Cloudflare`, make sure to turn the proxy off in your DNS settings when adding the Deta provided IP address.
3. If you are adding a custom domain for the `www.` subdomain, **you need to add both `www` and the main domain** in the dashboard. For eg, if you are setting up a custom domain for `www.example.com`, then add both `example.com` and `www.example.com` as custom domains for your micro.
4. If you are adding a custom domain for an apex domain, **you need to add both `www.` and the main domain** in your dashboard. For eg, if you are setting up a custom domain for `example.com`, then add both `example.com` and `www.example.com` as custom domains for your micro.
5. Check if there is a CAA record set up for your domain. If yes, make sure you have [set up the necessary CAA record](#caa-records).

:::warning
If you had to change something from the steps mentioned above, [email us](<mailto:aavash@deta.sh?subject=Re-enable custom domain>) or [let us know in slack](https://deta.hq.slack.com). This is important as our systems eventually stop trying to assign the custom domain on errors. Manual re-enabling of the domain might be required.
:::  

### Unsupported Top Level Domains 

We are not able to support custom domains for the following tlds at the moment:
- `.af`
- `.cu`
- `.er`
- `.gn`
- `.ir`
- `.kp`
- `.lr`
- `.nc.tr`
- `.sd`
- `.sl`
- `.ss`
- `.sy`
- `.zw`