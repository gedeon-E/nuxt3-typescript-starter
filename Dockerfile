# BUILD
FROM node:22-alpine as buildstage

WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY --chown=node:node . .
 
RUN yarn generate

# STARTER
FROM nginx:alpine3.18-slim
ENV NODE_ENV production

COPY --from=build-stage /app/.output/public /usr/share/nginx/html
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
