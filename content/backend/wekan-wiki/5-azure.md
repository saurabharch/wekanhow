---
title: azure
pageTitle: "5-azure"
description: "Learn how to build a GraphQL server with Scala & Sangria and the best practices for filters, authentication and pagination."
question: "What is a Snap?"
answers: ["Protocol", "Library", "Language", "Specification" ]
correctAnswer: 3
---

### Install for example from:
- [Snap](https://github.com/wekan/wekan/wiki/Snap)
- [Docker](https://github.com/wekan/wekan/wiki/Docker)

*Make sure you are running at least **v2.21***

### There are two major steps for configuring Wekan to authenticate to Azure AD via OpenID Connect (OIDC)

1. Register the application with Azure. Make sure you capture the application ID as well as generate a secret key.
2. Configure the environment variables.  This differs slightly by installation type, but make sure you have the following:
* OAUTH2_ENABLED = true
* OAUTH2_CLIENT_ID = xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxx (application GUID captured during app registration)
* OAUTH2_SECRET = xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx (secret key generated during app registration)
* OAUTH2_SERVER_URL = https://login.microsoftonline.com/<tenant GUID specific to your organization>
* OAUTH2_AUTH_ENDPOINT = /oauth2/v2.0/authorize
* OAUTH2_USERINFO_ENDPOINT = https://graph.microsoft.com/oidc/userinfo
* OAUTH2_TOKEN_ENDPOINT = /oauth2/v2.0/token
* OAUTH2_ID_MAP = email (the claim name you want to map to the unique ID field)
* OAUTH2_USERNAME_MAP = email (the claim name you want to map to the username field)
* OAUTH2_FULLNAME_MAP = name (the claim name you want to map to the full name field)
* OAUTH2_EMAIL_MAP = email (the claim name you want to map to the email field)

I also recommend setting DEBUG = true until you have a working configuration.  It helps.

You may also find it useful to look at the following configuration information:
https://login.microsoftonline.com/**the-tenant-name-for-your-organization**/v2.0/.well-known/openid-configuration

Some Azure links also at wiki page about moving from Sandstorm to Docker/Snap , and using Docker Swarm:
- https://github.com/wekan/wekan/wiki/Export-from-Wekan-Sandstorm-grain-.zip-file#azure-links