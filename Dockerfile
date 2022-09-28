FROM node:16-alpine

ENV NODE_ENV staging

USER node
WORKDIR /home/node

COPY package*.json ./
RUN npm install

COPY --chown=node:node . .
RUN npm run build \
    && npm prune --staging

EXPOSE 8080

CMD ["node", "dist/main.js"]
