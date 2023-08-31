# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/master/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

ENV Variables Example

```bash
VITE_SANITY_PROJECT_ID="xxxxxx"
VITE_SANITY_PROJECT_TITLE="My Awesome Project"
VITE_SANITY_DATASET="production"
VITE_SANITY_API_VERSION="2023-03-07"
VITE_SANITY_USE_CDN=true
VITE_SHOPIFY_DOMAIN="awesome-project.myshopify.com"
VITE_SHOPIFY_API_VERSION="2021-04"
VITE_SHOPIFY_STOREFRONT_API_TOKEN="111"
```
