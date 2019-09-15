---
title: Introduction
pageTitle: Learn GraphQL Fundamentals with Fullstack Tutorial
description: "Learn all about GraphQL and why it is an API technology that's superior to REST. It is not only for React & Javascript developers but can be used for any API."
question: Which of these statements is true?
answers: ["GraphQL is a database technology", "GraphQL can only be used together with SQL", "GraphQL was invented by Facebook", "GraphQL was developed by Netflix and Coursera"]
correctAnswer: 2
videoId: oCT4HOJsUZQ
duration: 5
---

## [Attachment file size](https://github.com/wekan/wekan/issues/2103#issuecomment-455014303)

[Meteor.js on Ubuntu 14.04 with nginx](https://www.digitalocean.com/community/tutorials/how-to-deploy-a-meteor-js-application-on-ubuntu-14-04-with-nginx)

[List of Let's Encrypt implementations](https://community.letsencrypt.org/t/list-of-client-implementations/2103)

[Certbot: Let's Encrypt SSL for Nginx](https://certbot.eff.org)

Below config is tested with Debian 9, it did receive A+ rating at ssllabs.com test.

## Nginx webserver configs

If you use Wekan at sub url, change / to /wekan .

### /etc/nginx/conf.d/example.com.conf or /etc/nginx/sites-available/example.com.conf:

```
# this section is needed to proxy web-socket connections
map $http_upgrade $connection_upgrade {
    default upgrade;
    ''      close;
}

# HTTP
server {
    listen 80; # if this is not a default server, remove "default_server"
    listen [::]:80 ipv6only=on;

    server_name example.com;

    # redirect non-SSL to SSL
    location / {
        rewrite     ^ https://example.com$request_uri? permanent;
    }
}

# HTTPS server
server {
    listen 443 ssl http2; # we enable HTTP/2 here (previously SPDY)
    server_name example.com; # this domain must match Common Name (CN) in the SSL certificate

    ssl_certificate /etc/letsencrypt/live/example.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/example.com/privkey.pem;

    # If your application is not compatible with IE <= 10, this will redirect visitors to a page advising a browser update
    # This works because IE 11 does not present itself as MSIE anymore
    if ($http_user_agent ~ "MSIE" ) {
        return 303 https://browser-update.org/update.html;
    }

    # Pass requests to Wekan.
    # If you have Wekan at https://example.com/wekan , change location to:
    # location /wekan {
    location / {
        # proxy_pass http://127.0.0.1:3001/wekan;
        proxy_pass http://127.0.0.1:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade; # allow websockets
        proxy_set_header Connection $connection_upgrade;
        proxy_set_header X-Forwarded-For $remote_addr; # preserve client IP

        # this setting allows the browser to cache the application in a way compatible with Meteor
        # on every applicaiton update the name of CSS and JS file is different, so they can be cache infinitely (here: 30 days)
        # the root path (/) MUST NOT be cached
        #if ($uri != '/wekan') {
        #    expires 30d;
        #}
    }
}
```

### /etc/nginx/nginx.conf

```
user www-data;
worker_processes auto;
pid /run/nginx.pid;
include /etc/nginx/modules-enabled/*.conf;

events {
	worker_connections 768;
	# multi_accept on;
}

http {

	##
	# Basic Settings
	##

        ## Max attachment size that can be uploaded to Wekan:
        client_max_body_size 100M;
	sendfile on;
	tcp_nopush on;
	tcp_nodelay on;
	types_hash_max_size 2048;
	server_tokens off;
        set_real_ip_from 0.0.0.0/32; # All addresses get a real IP.
        real_ip_header X-Forwarded-For;
        limit_conn_zone $binary_remote_addr zone=arbeit:10m;
        client_body_timeout 60;
        client_header_timeout 60;
        keepalive_timeout 10 10;
        send_timeout 60;
        reset_timedout_connection on;

	# server_names_hash_bucket_size 64;
	# server_name_in_redirect off;

	include /etc/nginx/mime.types;
	default_type application/octet-stream;

	##
	# SSL Settings
	##

	ssl_protocols TLSv1.2 TLSv1.1 TLSv1; # Dropping SSLv3, ref: POODLE
	ssl_prefer_server_ciphers on;
        ssl_session_cache shared:SSL:30m;
        ssl_session_timeout 1d;
        ssl_ciphers ECDH+aRSA+AESGCM:ECDH+aRSA+SHA384:ECDH+aRSA+SHA256:ECDH:EDH+CAMELLIA:EDH+aRSA:+CAMELLIA256:+AES256:+CAMELLIA128:+AES128:+SSLv3:!aNULL:!eNULL:!LOW:!3DES:!MD5:!EXP:!PSK:!SRP:!DSS:!RC4:!SEED:!ECDSA:CAMELLIA256-SHA:AES256-SHA:CAMELLIA128-SHA:AES128-SHA;
        ssl_dhparam /etc/ssl/dh_param.pem;
        ssl_ecdh_curve secp384r1;
        ssl_stapling on;
        ssl_stapling_verify on;
        add_header X-XSS-Protection '1; mode=block';
        add_header X-Frame-Options SAMEORIGIN;
        add_header Strict-Transport-Security 'max-age=31536000';
        add_header X-Content-Options nosniff;
        add_header X-Micro-Cache $upstream_cache_status;

	##
	# Logging Settings
	##

	access_log /var/log/nginx/access.log;
	error_log /var/log/nginx/error.log;

	##
	# Gzip Settings
	##

	gzip on;
	gzip_disable "msie6";
        gzip_buffers 16 8k;
        gzip_comp_level 1;
        gzip_http_version 1.1;
        gzip_min_length 10;
        gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript image/x-icon application/vnd.ms-fontobject font/opentype application/x-font-ttf;
        gzip_vary on;
        gzip_proxied any; # Compression for all requests.

	##
	# Virtual Host Configs
	##

	include /etc/nginx/conf.d/*.conf;
	include /etc/nginx/sites-enabled/*;
}
```

# Installing

If you have example.com.conf at /etc/nginx/sites-available/example.com.conf, make symlink to sites-available:

Nginx

```
sudo apt install nginx
sudo systemctl start nginx
sudo systemctl enable nginx    # service
```

Nginx configs

```
sudo su
cd /etc/nginx/sites-enabled
ln -s ../sites-available/example.com.conf example.com.conf
```

:heavy_exclamation_mark: Check if the user "www-data" exist on your system, if no, you can set "nginx" user in /etc/nginx/nginx.conf

Test nginx config for errors:

```
sudo nginx -t
```

If config is OK, take it into use:

```
sudo systemctl reload nginx    (or: sudo service nginx reload)
```

Wekan Snap

```
sudo apt install snapd
sudo snap install wekan
sudo snap set wekan root-url="https://example.com/wekan"
sudo snap set wekan port="3001"
sudo systemctl restart snap.wekan.mongodb
sudo systemctl restart snap.wekan.wekan
```

More info about backups etc at https://github.com/wekan/wekan-snap/wiki
