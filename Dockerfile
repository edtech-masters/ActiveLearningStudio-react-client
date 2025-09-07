FROM node:14.21 AS build

WORKDIR /app
ENV PATH=/app/node_modules/.bin:$PATH
ARG DOMAIN
ENV DOMAIN_URL=$DOMAIN
COPY ./package*.json ./
RUN npm install

#RUN apt-get update && apt-get install -y git
RUN sed -i 's|deb.debian.org|archive.debian.org|g; s|security.debian.org|archive.debian.org|g' /etc/apt/sources.list \
 && apt-get -o Acquire::Check-Valid-Until=false update \
 && apt-get install -y --no-install-recommends git \
 && rm -rf /var/lib/apt/lists/*

COPY . .
#RUN git log --graph -10 --decorate --pretty > log.txt

#RUN npm install --no-package-lock
#RUN CI=true npm test && GENERATE_SOURCEMAP=false && npm run build
RUN DISABLE_ESLINT_PLUGIN=true GENERATE_SOURCEMAP=false npm run build

#COPY . .
#RUN mv log.txt build/

# -- RELEASE --
FROM nginx:stable-alpine AS release

COPY --from=build /app/build /usr/share/nginx/html
#copy .env.example as .env to the release build
COPY --from=build /app/.env.example /usr/share/nginx/html/.env
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf

#RUN apk add --update nodejs
#RUN apk add --update npm
RUN apk add --no-cache nodejs npm
RUN npm install -g runtime-env-cra@0.2.2

WORKDIR /usr/share/nginx/html

EXPOSE 80
RUN chmod 777 -R /usr/lib/node_modules/
CMD ["/bin/sh", "-c", "runtime-env-cra && touch /usr/share/nginx/html/health.ok && nginx -g \"daemon off;\""]
