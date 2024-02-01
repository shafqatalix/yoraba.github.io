---
title: Create blog with Ghost CMS, SQLite and Github comments
date: 2022-11-15
tags: ["ghost cms"]
published: true
description: Setup block using Ghost CMS, SQLite and Github comments
layout: post
permalink: /ghost-blog-sqlite
---

## Overview

[Ghost](https://ghost.org/) is a very popular publishing and content management platform. There are verity of blogging & content management platforms, but Ghost stands out for many reasons, these include but not limited to:

1.  Ghost is open-source
2.  Built on top of NodeJS which is extremely fast JavaScript runtime for server.
3.  SEO optimized by default
4.  Highly customizable

In this article we are going to spin up new blog using Ghost using [SQLite](https://www.sqlite.org/index.html) as backend database, and add [GitHub issues](https://docs.github.com/en/github/managing-your-work-on-github/about-issues) as commenting system to blog.

## Key Points

- Setup a blog using Ghost contente managment system (CMS).
- Use SQLite as backend databse & setup automated backup.
- Enable comments using Github issues.

## 1. Setup Ghost CMS

The first step is to set up a machine and install an operating system. Ubuntu Server is officially recommended operating system, but I personally prefer [Debian](https://www.debian.org/), mainly because it is more stable and less resource intensive. You can choose either one.

Now the next thing to consider is blog host, where our blog is going to run? Here we have few options:

- [AWS Lightsail (Recommended)](https://aws.amazon.com/lightsail/)
- [Google Cloud Platform](https://console.cloud.google.com/marketplace/product/click-to-deploy-images/ghost)
- [Azure](https://docs.microsoft.com/en-us/azure/virtual-machines/windows/quick-create-portal)
- [Digital Ocean](https://marketplace.digitalocean.com/apps/ghost)

There is an abundance of options for hosting blogs, but the key is to choose the right one. AWS Lightsail is the most economical and easy to scale solution.

For example the minimal setup would cost about $3.5 per month for a single Lightsail instance. If you are starting a new blog this seems to be the ideal choice as you won't have much of the traffic at the beginning, and you can easily scale up as your blog started to attract more users.

Open firewall port '443' and '80' on cloud instance firewall using network settings.

> If you choose Ubuntu as operating system, append sudo in front of installation commands, for Debian run as root for some of the commands as described in bash comments.

### Install updates

```bash
# sudo or root
apt update
apt upgrade -y
```

###Install NodeJS LTS version

```bash
# sudo or root
curl -fsSL https://deb.nodesource.com/setup_16.x | bash -
apt install -y nodejs
```

### Install Nginx

```bash
# sudo or root
apt install nginx
```

> Get the public IP of your cloud machine and create A record in your DNS registrar i.e. Route53 or GoDaddy. It would take a few hours to fully propagate DNS. You need to wait until your domain is publicly available, otherwise you wouldn't be able to configure Letsencrypt SSL certificate for your domain.

To verify if DNS is working correctly, type "yourdomain.com" in the browser and there should be welcome page for Nginx.

### Install Ghost

```bash
# sudo or root
npm install ghost-cli@latest -g
Now install and configure your Ghost CMS website


# Create directory: Change `techflak.com` to whatever you like
sudo mkdir -p /var/www/techflak.com

# Set directory owner: Replace <user> with the name of your user
sudo chown <user>:<user> /var/www/techflak.com

# Set the correct permissions
sudo chmod 775 /var/www/techflak.com

# Then navigate into it
cd /var/www/techflak.com

ghost install --db=sqlite3
```

Installation wizard is going to ask you a bunch of questions during the installation process, choose the answers as yes or no.

At the end it is going to ask if you want to start Ghost at the last step of install, choose "no", at this point. We will start it manually after following configuration.

```bash
# assuming that you are at /var/www/techflak.com
npm install sqlite3 --save

# start ghost instance
ghost start
```

Now your website is up and running, now you can focus of writing your first blog post and polishing your website such as creating logo, social accounts, about, and contact pages etc.

> Tip: Delete all test articles from blog and make it private until you are ready to publish your first blog post.

Database backups or comments are completely detached steps which means you don't ever need to stop or restart ghost instance it in order to configure database backups or comments.

You can do these at your convince as you don't need them until you have at least one article ready to publish.

## 2. Configure Database backups for SQLite

Database backup is an important step in order to keep your data safe in case of disaster. A full database management system such as MySQL has an automated way to making database backups as configured. Since we are using SQLite which is a file-based database and don't have a backup mechanism. One option is copying and pasting the database file at regular intervals, which may end up corrupting the database file.

[Litestream](https://litestream.io/) is an excellent backup and replication tool for SQLite databases. It continuously streams SQLite changes to S3-compatible storage. Quickly recover to the point of failure if your database goes down.

### Install Litestream

Installation is very simple, run the following script.

```bash
wget https://github.com/benbjohnson/litestream/releases/download/v0.3.3/litestream-v0.3.3-linux-amd64.deb

sudo dpkg -i litestream-v0.3.3-linux-amd64.deb
sudo systemctl enable litestream
```

Following are the two examples of configurations for local file system backup and other one is for backup to AWS s3.

You can configure more than one database for backup, using single configuration file.

### Backup to local File system

Open file at "/etc/litestream.yml" and modify the content as following:

```yml
dbs:
  - path: /var/www/techflak.com/content/data/ghost.db
    replicas:
      - path: /backup/db
```

### Backup to AWS S3

```yml
dbs:
  - path: /var/www/techflak.com/content/data/ghost.db
    replicas:
      - url: s3://mybkt.techflak.com/db
        region: us-east1
        access-key-id: AKIAxxxxxxxxxxxxxxxx
        secret-access-key: xxxxxxxxxxxxxxxxxxxxxx
```

Here is the detail documentation for, how to configure databases backup. You can tweak frequency, verification and intervals using various configuration options.

Once you are done with changes to configuration file, start service with the following command. You should see some files created in backup location.

```bash
sudo systemctl start litestream
```

## 3. Enable Comments using GitHub Issues

Comments are very important part of a blog, but unfortunately Ghost don't have built in comments. So we have following options to choose from.

- [Utterances](https://github.com/utterance/utterances) (recommended)
- [ISSO Comment Server](https://github.com/posativ/isso/)
- [Disqus](https://help.disqus.com/en/collections/191671-installation)

We choose to use Utterances to be our choice for comments, simply because it is very easy to configure without running your own comments server. ISSO & Schnack require running your own comments server and Disqs tracks your users data they also serve ads if you are using free version.

Let's configure Utterances, you can find the detailed documentation here, but I summarized into the following steps.

1. First, create public GitHub repo with the name of your blog domain, for example we have "username/yoraba.com" for this blog. Although the same name as blog is not required I would recommend this for marketing/SEO purpose.
2. Install [Utterances App](https://github.com/apps/utterances) on your repo.
3. Go you code injections on you Ghost blog and put this in footer section. Don't forget to update with your GitHub information.

```html
<script
  src="https://utteranc.es/client.js"
  repo="<github-user>/yoraba.com"
  issue-term="pathname"
  theme="github-light"
  crossorigin="anonymous"
  async
></script>
```

This will inject comments at very end of your article, now anyone can add comments to blog article.

Depending upon the theme you use, it might not look good, and you might want to customize the location of comments.

### Customizing Comments Location

Each theme in ghost has a comment "div" element with some class name applied for comments. The default theme it has class "post-full-comments" which can be captured to configured comments. Inject following JavaScript code to the footer of your ghost blog website.

```js
function setup() {
  var commentsEl = document.getElementsByClassName("post-full-comments")[0];
  if (commentsEl) {
    commentsEl.innerHTML = "";
    var scriptTag = document.createElement("script");
    scriptTag.setAttribute("src", "https://utteranc.es/client.js");
    scriptTag.setAttribute("repo", "<github username>/techflak.com");
    scriptTag.setAttribute("issue-term", "pathname");
    scriptTag.setAttribute("theme", "github-light");
    scriptTag.setAttribute("crossorigin", "anonymous");
    scriptTag.setAttribute("async", true);
    commentsEl.prepend(scriptTag);
  }
}
setTimeout(setup, 0);
```

## Conclusion

Ghost is an excellent blogging platform which allows you to publish your blog articles without any hassle. Performance and search engine optimization (SEO) are top features of Ghost CMS, which allow your blog to be easily discoverable by search engines. Ghost don't require a full feature database engine, you can run your blog on Ghost with SQLite as database, which can server thousands of users without a blink.

If you read that far thank you for taking time, leave comments to provide feedback, and also to see if my comments are working :)
