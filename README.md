# Combo App

To visit: https://combo-app.vercel.app/

Note: Unfortunately right now the DB on Planetscale is no longer up and running and there is no way currently yo log in to the live project.

A Next.js and Tailwind CSS app built with the T3 stack that both holds front and the backend.

I use Next Auth and Discord Provider for authentication, Vercel for deployment and Planetscale for deploying the database.

Read documentation on T3 App bellow to get started.

# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

## What's next? How do I make an app with this?

We try to keep this project as simple as possible, so you can start with just the scaffolding we set up for you, and add additional things later when they become necessary.

If you are not familiar with the different technologies used in this project, please refer to the respective docs. If you still are in the wind, please join our [Discord](https://t3.gg/discord) and ask for help.

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)

## Learn More

To learn more about the [T3 Stack](https://create.t3.gg/), take a look at the following resources:

- [Documentation](https://create.t3.gg/)
- [Learn the T3 Stack](https://create.t3.gg/en/faq#what-learning-resources-are-currently-available) — Check out these awesome tutorials

You can check out the [create-t3-app GitHub repository](https://github.com/t3-oss/create-t3-app) — your feedback and contributions are welcome!

## How do I deploy this?

Follow our deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## Setting up needed environment variables

Create a .env file in the root folder and copy the variables from the _.env.example_ file in the project root folder

```
DATABASE_URL="file:./db.sqlite"

# Next Auth
NEXTAUTH_SECRET=""
NEXTAUTH_URL="http://localhost:3000"

# Next Auth Discord Provider
DISCORD_CLIENT_ID=""
DISCORD_CLIENT_SECRET=""
```

Make sure to visit https://discord.com/developers/applications and register a new application to setup the client secret and id.

Make sure to seperately setup the variables on the deployment.
