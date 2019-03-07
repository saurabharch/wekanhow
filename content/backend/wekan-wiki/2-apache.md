---
title: apache
pageTitle: "2-apache"
description: "Learn how to build a GraphQL server with Scala & Sangria and the best practices for filters, authentication and pagination."
question: "What is a Snap?"
answers: ["Protocol", "Library", "Language", "Specification" ]
correctAnswer: 3
---
## 1) Enable Mod_Proxy

```
sudo a2enmod proxy proxy_http proxy_wstunnel
```

[Apache Mod_Proxy documentation](http://httpd.apache.org/docs/current/mod/mod_proxy.html)

## 2) Restart Apache

Systemd:
```
sudo systemctl restart apache2
```
Init.d:
```
sudo service apache2 restart
```

## 3) Enable SSL in Apache config
```
Listen 443

NameVirtualHost *:443
```
## 4) Set Apache proxy

### a) Main URL

SSL with [Certbot](https://certbot.eff.org).

Config at `/etc/apache2/sites-available/example.com.conf`:

```ApacheConf
<VirtualHost *:443>

    ServerName example.com

    SSLEngine On
    SSLCertificateFile      /etc/letsencrypt/live/example.com/fullchain.pem
    SSLCertificateKeyFile   /etc/letsencrypt/live/example.com/privkey.pem
    Include /etc/letsencrypt/options-ssl-apache.conf
    ServerSignature Off

    <Location />
     require all granted
    </Location>

    ProxyPassMatch   "^/(sockjs\/.*\/websocket)$" "ws://127.0.0.1:3001/$1"
    ProxyPass        "/" "http://127.0.0.1:3001/"
    ProxyPassReverse "/" "http://127.0.0.1:3001/"

</VirtualHost>
```

### b) Sub URL

Config at `/etc/apache2/sites-available/example.com.conf`:

```ApacheConf
<VirtualHost *:443>

    ServerName example.com/wekan

    SSLEngine On
    SSLCertificateFile      /etc/letsencrypt/live/example.com/fullchain.pem
    SSLCertificateKeyFile   /etc/letsencrypt/live/example.com/privkey.pem
    Include /etc/letsencrypt/options-ssl-apache.conf
    ServerSignature Off

    ProxyPassMatch   "^/(sockjs\/.*\/websocket)$" "ws://127.0.0.1:3001/wekan/$1""                                                                                                                           
    ProxyPass        "/wekan" "http://127.0.0.1:3001/wekan"                                                                                                                                    
    ProxyPassReverse "/wekan" "http://127.0.0.1:3001/wekan"

</VirtualHost>
```
To run as default site:
```ApacheConf
<VirtualHost _default_:443>
```

## 5) Enable your site

```
sudo a2ensite example.com
```
Or, add symlink manually:
```
sudo su

cd /etc/apache2/sites-enabled

ln -s ../sites-available/example.com.conf example.com.conf
```
On some distros Apache config is at different path:
```
cd /etc/httpd/conf.d
```

## 6) Reload Apache

Systemd:
```
sudo systemctl restart apache2
```
Init.d:
```
sudo service apache2 restart
```

## 7) Snap settings

### a) Main URL
```
sudo snap set wekan port='3001'

sudo snap set wekan root-url='https://example.com'
```
### b) Sub URL
```
snap set wekan port='3001'

snap set wekan root-url='https://example.com/wekan'
```

[All snap settings](https://github.com/wekan/wekan-snap/wiki/Supported-settings-keys)