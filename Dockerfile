FROM reactioncommerce/meteor:1.10.2-v1

# hadolint ignore=DL3002
USER root
ARG packages
# Ensure that all files will be linked in owned by node user.
# Every directory that will be listed in `volumes` section of
# docker-compose.yml needs to be pre-created and chown'd here.
# See https://github.com/docker/compose/issues/3270#issuecomment-363478501

RUN mkdir -p /usr/local/src/app/node_modules \
  && mkdir -p /usr/local/src/app/.meteor/local \
  && chown node /usr/local/src/app \
  && chown node /usr/local/src/app/node_modules \
  && chown node /usr/local/src/app/.meteor/local

WORKDIR /usr/local/src/app

COPY ./package.json .
RUN npm install --no-audit

COPY --chown=node:node . .
USER node

RUN yarn bootstrap


ENV PATH $PATH:/usr/local/src/app/node_modules/.bin:/home/node/.meteor

CMD [ "sh", "-c","yarn", "start:dev", "--scope", "$LERNA_PACKAGE"]
