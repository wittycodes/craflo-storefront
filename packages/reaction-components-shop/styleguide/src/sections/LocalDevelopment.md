If you'd like to see your changes locally inside of [Reaction Admin](https://github.com/reactioncommerce/reaction), it's possible to link your local version of Catalyst using the following steps:

- `cd` into your local version of [`Catalyst`](https://github.com/reactioncommerce/catalyst), and run the following commands:

```diff
yarn install
cd package
yarn install
yarn run build
```

- Next, `cd` into the local version of the repository you'd like to use the local `Catalyst` inside. Add the following line to the `volumes:` portion of the `docker-compose.yml` file:

Inside `Reaction Admin`:
```diff
volumes:
  - .:/opt/reaction/src:cached
  - ./.meteor/local:/opt/reaction/src/.meteor/local:delegated
  - reaction_node_modules:/opt/reaction/src/node_modules # do not link node_modules in, and persist it between dc up runs
+ - /{Path-to-your-local-repo}/catalyst/package/dist:/opt/reaction/src/node_modules/@reactioncommerce/catalyst
```

- Remove the `"@reactioncommerce/catalyst"` line from the project's `package.json` file. 

- Next, run `docker-compose up -d` like normal to access the app in your browser and test it.

**Be sure to remove and not commit the added line from `docker-compose.yml` and the removed line from `package.json` when you are done testing.**
