# Vue Storefront Enterprise Theme

### Stay connected

[![GitHub Repo stars](https://img.shields.io/github/stars/vuestorefront/vue-storefront?style=social)](https://github.com/vuestorefront/vue-storefront)
[![Twitter Follow](https://img.shields.io/twitter/follow/vuestorefront?style=social)](https://twitter.com/vuestorefront)
[![YouTube Channel Subscribers](https://img.shields.io/youtube/channel/subscribers/UCkm1F3Cglty3CE1QwKQUhhg?style=social)](https://www.youtube.com/c/VueStorefront)
[![Discord](https://img.shields.io/discord/770285988244750366?label=join%20discord&logo=Discord&logoColor=white)](https://discord.vuestorefront.io)

### Generate new project for commercetools

- check the config for all dependencies
- setup preferred cms credentials in .env file

Run command:

```bash
npm run generate
## or with yarn
yarn generate
```

You will be asked few questions about services you want to setup your commercetools project with:

- CMS
- Payment
- Search

Also here you can decide if generated project should be based on `Click&Collect` theme. Script will take regular Enterprise Theme setup and add everything that is located inside `click-and-collect` directory. In this case, default UI Theme is replaced with Click&Collect theme.

This will generate the full project in the `generated-{name}` folder.

### Start Commercetools App

```bash
cd generated-{name}/
npm install # install dependencies
npm install --no-optional # or install without optional dependencies
npm run dev # run app in dev mode
```

or with **yarn**

```bash
cd generated-{name}/
yarn install # install dependencies
yarn install --ignore-optional # or install without optional dependencies
yarn dev # run app in dev mode
```

### Creating a new theme

If you would like to create a new custom theme based on Enterprise Theme (Commercetools, CMS, payments, etc) you can do so by following below steps:

1. Add object with custom theme to the config

```js
// xx-config.js
  ...
    from: [
      ...
      {
        path: './themes/xx',
        ignore: [],
        variables: {},
        watch: false
      }
    ]
```

2. Inside `./themes/xx` create your components/pages/layouts/etc as you would do with normal Nuxt.js application. They will overwrite default VSF Nuxt Theme and Enterprise Theme.

3. Add new options to the CLI, so generating app basing on your new theme will be as easy as it gets :)

### CMS CLI

In CMS related ENV provide content management credentials (`XYZ_MANAGEMNT_TOKEN`)

Run command:

```bash
npm run generate:cms
## or with yarn
yarn generate:cms
```

Here you will be asked a question, wheter you want to:

- update the schema in the repo
- setup a cms enviroment

This might take a while.
Along with this action, proper CMS SKD will create space and components schemas for further usage.
Remember to provide and generate the spacial content management token in the CMS panel
(**tip**: it's not the same one as content delivery token).
