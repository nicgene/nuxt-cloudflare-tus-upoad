# nicgene/nuxt-cloudflare-tus-upload

## Setup

### Install [wrangler](https://github.com/cloudflare/wrangler) and login to your Cloudflare account

```sh
npm i @cloudflare/wrangler -g
wrangler login
```

### Create a `wrangler.toml` in your root directory based on `wrangler.example.toml`

Update the `account_id` to match your Cloudflare account.

### Update `./server/api/createUpload.post.ts`

Replace $ACCOUNT and $TOKEN with your account id and token.

### Install the dependencies

```sh
yarn install
```

## Development

```sh
yarn dev
```

## Deploy to Cloudflare Workers

```sh
wrangler publish
```
