<p align="center">
  <img height="80" src="https://raw.githubusercontent.com/jdrouet/jolimail/main/resources/logo.svg">
</p>

**Jolimail** is an open source alternative to all the transactionnal email solutions.

[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![Build Status](https://travis-ci.com/jdrouet/jolimail.svg?branch=main)](https://travis-ci.com/jdrouet/jolimail)
[![codecov](https://codecov.io/gh/jdrouet/jolimail/branch/mmain/graph/badge.svg)](https://codecov.io/gh/jdrouet/jolimail)

![Docker Pulls](https://img.shields.io/docker/pulls/jdrouet/jolimail)
[![Docker Image Size (latest by date)](https://img.shields.io/docker/image-size/jdrouet/jolimail?sort=date)](https://hub.docker.com/r/jdrouet/jolimail)

## Why did we build jolimail?

Catapulte comes from the frustration of using several email providers.
We used to work with products like [sendgrid](https://sendgrid.com/),
[mailgun](https://www.mailgun.com/), [mailchimp](https://mailchimp.com/), [sendinblue](https://www.sendinblue.com/), etc.

But they have many disadvantages :

- Most of them are not really transactionnal oriented, and users complain that their login emails take a long time to arrive.
- You cannot host it nor use it on premise
- It's American, with the patriot act, they are able to access your users data.
- They usually don't have templating tools for our non tech coworkers that ask us to change a wording every 2 days.
  And when they do, the editors are like html online editors, so it ends up being our job to make the template anyway.

## How to use it?

Jolimail is a simple application that allows you to create your email templates directly in the browser and have a preview.

You can start it in different ways but we recommend using Docker if you are on a amd64, i386 or arm64 architecture.
By doing the following, you'll be able to have a running jolimail server that will provide your email tempalte, a [catapulte](https://github.com/jdrouet/catapulte) instance and a [fake smtp server](https://github.com/ReachFive/fake-smtp-server).

```bash
git clone https://github.com/jdrouet/jolimail.git
cd jolimail
docker-compose -f docker-compose.example.yml up
```

Then you should be able to reach jolimail [here](http://localhost:8080) and the smtp server [here](http://localhost:1080).

If you want to use it in a production environment, you can will just need a postgres instance where the templates will be stored.

You can also deploy it on Heroku with the following button

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/jdrouet/jolimail)

## Should you use it?

If, like us, you didn't find any good way of doing transactionnal emails, then Yes!

## Why you should use it :

- You work in a startup

  - You don't have shit loads of money to spend on the mailing tools, so use something opensource, send your emails from your own SMTP (or from Amazon SES, it's cheap)
  - You don't have time to change the email template everyday, so let your Product Owner do it
  - You wanna be able to add this little feature, just do a pull request...

- You work in a big company

  - You cannot use those external services because you're not allowed to put your user's data on an external service.
  - You cannot access external services because it's blocked by the proxy
  - You want to customise the way you authenticate to your SMTP
  - You want something user friendly enough that your manager can write the emails

## Thank you!

<a href="https://www.buymeacoffee.com/jdrouet" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-blue.png" alt="Buy Me A Coffee" style="height: 60px !important;width: 217px !important;" ></a>
