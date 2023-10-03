# Sveltekit + Sanity + Shopify Starter

Everything you need to build a Sveltekit Project powered by an embedded [`Sanity Studio`](https://sanity.io), PLUS [`Shopify`](https://shopify.com) for instant world class ecommerce.

NOTE: This project is intended to be a learning tool for developers who want to learn how to use Sveltekit, Sanity and Shopify together. In particular, it is intended to represent a specific use case where you already have a Sveltekit project driven by Sanity and you want to add Shopify to manage cart and checkout. This is not the only way to use Sanity and Shopify together. It is simply one way and it gets you quickly to the point where you can start experimenting and learning.

Most of the included schemas in the embedded studio here came from Sanity and the [`Sanity Connect App`](https://www.sanity.io/docs/sanity-connect-for-shopify). There's a lot of useful information in the Sanity docs and I highly recommend reading through them.

## Creating the project

Clone the repo or use the template button on Github. CD into the project and install the dependencies using the package manager of your choice. I'll be using `pnpm` for this example.

---

_install packages_

```bash
pnpm install
```

---

## Setup the Sanity Studio

Docs: https://www.sanity.io/docs/create-a-sanity-project

---

_connect to sanity_

```bash
pnpm create sanity@latest init --env
```

---

This step will:

1. Ask you to select or create a Sanity project and dataset
2. Output a `.env` file with some environment variables

- SANITY_PROJECT_ID="xxxxxx"
- SANITY_DATASET="production"

## Add Environment Variables

1. Copy the contents of the `.env.example` file and paste it into the `.env` file after the Sanity environment variables.
2. Replace the values for

- VITE_SANITY_PROJECT_ID="xxxxxx" with the SANITY_PROJECT_ID variable and delete the SANITY_PROJECT_ID variable.
- VITE_SANITY_DATASET="production" with the SANITY_DATASET variable and delete the SANITY_DATASET variable.

You should end up with a `.env` file that looks something like this:

```bash
VITE_SANITY_PROJECT_ID="abc1234"
VITE_SANITY_DATASET="production"
VITE_SANITY_PROJECT_TITLE="My Sanity Project"
VITE_SANITY_API_VERSION="2023-03-07"
VITE_SANITY_USE_CDN=true
# VITE_SHOPIFY_DOMAIN="awesome-project.myshopify.com"
# VITE_SHOPIFY_API_VERSION="2021-04"
# VITE_SHOPIFY_STOREFRONT_API_TOKEN="111"
```

## Development

Once you've created a project, installed dependencies and set up the Sanity ENV variables you can run the development server locally to view the project.

---

_start the development server_

```bash
pnpm dev
```

---

## Working with Sanity

With the project running you'll see that the homepage has a message informing you that there is no content in Sanity yet. This is because the dataset that you are fetching from is empty and there is no data to display.

Click the link to go to the Sanity Studio and login with your Sanity credentials. You'll need to add your studio URL as a CORS origin within your Sanity project. You should be guided through this process the first time you connect. Once you're logged into your studio take a look at [`Home`](/studio/desk/home) and you'll see an empty hero component.

1. Add a title.
2. Click Add Item under Content and add a new image.
3. Click the SEO tab and give it an SEO title, description and image if you like. Only the title is required.
4. Click Publish.

Now you're ready to go back to the homepage and see your hero component.

## Adding Shopify

This project will use the Shopify Storefront API to create Cart Functionality and Checkout. The products themselves will be fetched from Sanity.

There are some assumptions made here.

1. You have a Shopify store.
2. There are products in your store available for sale.

In order to connect Shopify to Sveltekit you'll need to setup Shopify Storefront API access. You can do that quite simply by adding the Headless Sales Channel: https://shopify.dev/docs/custom-storefronts/building-with-the-storefront-api/manage-headless-channels

Once you have your API key you'll need to add it to your `.env` file. You can do that by uncommenting the variables that you copied into `.env` from `.env.example` in an earlier step and replacing the placeholder values with the values that match your store domain, api version and api key. Your `.env` file should look something like this:

```bash
VITE_SANITY_PROJECT_ID="abc1234"
VITE_SANITY_DATASET="production"
VITE_SANITY_PROJECT_TITLE="My Sanity Project"
VITE_SANITY_API_VERSION="2023-03-07"
VITE_SANITY_USE_CDN=true
VITE_SHOPIFY_DOMAIN="mydomain.myshopify.com"
VITE_SHOPIFY_API_VERSION="2023-07"
VITE_SHOPIFY_STOREFRONT_API_TOKEN="shpca_1234567890abcdefghijklmnopqrstuvwxyz"
```

Note: You'll leave the Sanity environment variables as you set them in the prior step. Those are used to connect to your Sanity project.

## Putting it all together

At this stage you should have a Sanity Studio with a Hero component and a Sveltekit project with a homepage that displays the Hero component. You should also have a 5 Sanity and 3 Shopify environment variables in your `.env` file. All of them should be uncommented with real values.

Now using the Sanity Connect App within the Shopify App Store you can connect your Sanity Studio to your Shopify store. You can find the app here: https://apps.shopify.com/sanity-connect

After installing the app simply follow the instructions to connect your Sanity Studio to your Shopify store. Once you've connected your store you'll need to sync your products. You can do that by clicking the Sync Products button in the Sanity Connect App.

## Sanity Studio

The Sanity Studio is embedded in the project and can be accessed at `/studio`.

You can build more schemas at `src/lib/sanity/schemas`.

## Building

To create a production version of your app:

```bash
pnpm build
```

You can preview the production build with `pnpm preview`.
