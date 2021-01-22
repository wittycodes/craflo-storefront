#FROM reactioncommerce/meteor:1.10.2-v1
#
## hadolint ignore=DL3002
#USER root
#
## Ensure that all files will be linked in owned by node user.
## Every directory that will be listed in `volumes` section of
## docker-compose.yml needs to be pre-created and chown'd here.
## See https://github.com/docker/compose/issues/3270#issuecomment-363478501
#
#RUN mkdir -p /usr/local/src/app/node_modules \
#  && mkdir -p /usr/local/src/app/.meteor/local \
#  && chown node /usr/local/src/app \
#  && chown node /usr/local/src/app/node_modules \
#  && chown node /usr/local/src/app/.meteor/local
#
#WORKDIR /usr/local/src/app
#COPY --chown=node  . .
#RUN npm i -g npm@latest
#RUN npm install --no-audit
#USER node
#
#
#ENV PATH $PATH:/usr/local/src/app/node_modules/.bin:/home/node/.meteor
#
#CMD ["npm", "run", "start"]
#
#
#
#-------

FROM reactioncommerce/meteor:1.10.2-v1 as builder

ENV APP_SOURCE_DIR /usr/local/src/appsrc
ENV APP_BUNDLE_DIR /usr/local/src/build
ENV TOOL_NODE_FLAGS --max-old-space-size=4096
COPY . "$APP_SOURCE_DIR"
USER root

RUN mkdir -p "$APP_SOURCE_DIR" \
 && mkdir -p "$APP_BUNDLE_DIR" \
 && chown -R node "$APP_SOURCE_DIR" \
 && chown -R node "$APP_BUNDLE_DIR"

COPY --chown=node . $APP_SOURCE_DIR

WORKDIR $APP_SOURCE_DIR

USER node

RUN npm install --no-audit
RUN printf "\\n[-] Building Meteor application...\\n" \
 && /home/node/.meteor/meteor build --server-only --architecture os.linux.x86_64 --directory "$APP_BUNDLE_DIR"

##############################################################################
# final build stage - create the final production image
##############################################################################
FROM node:12.16.1-slim

LABEL maintainer="Reaction Commerce <engineering@reactioncommerce.com>"

# grab the dependencies and built app from the previous temporary builder image
COPY --chown=node --from=builder /usr/local/src/build/bundle /usr/local/src/app

# copy the waitForMongo script, too
COPY --chown=node --from=builder /usr/local/src/appsrc/.reaction/waitForMongo.js /usr/local/src/app/programs/server/waitForMongo.js

# Install the latest version of NPM (as of when this
# base image is built)
RUN npm i -g npm@latest

WORKDIR /usr/local/src/app/programs/server/

RUN npm install --production --no-audit

# Also install mongodb pkg needed by the waitForMongo script
RUN npm install -E --no-save mongodb@3.5.7

WORKDIR /usr/local/src/app

ENV PATH $PATH:/usr/local/src/app/programs/server/node_modules/.bin

CMD ["sh", "-c", "cd programs/server && node waitForMongo.js && cd ../.. && node main.js"]
