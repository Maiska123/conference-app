FROM node:16.20.2-alpine3.18 AS build

WORKDIR /app
COPY . .

# im so sorry about this, its old project with hellish dependencies
RUN yarn config set httpTimeout 600000
RUN yarn
RUN yarn run build-prod

FROM alpine:3.18.4 as serve
COPY --from=build /usr/lib /usr/lib
COPY --from=build /usr/local/lib /usr/local/lib
COPY --from=build /usr/local/include /usr/local/include
COPY --from=build /usr/local/bin /usr/local/bin
COPY --from=build /usr/local/share /usr/local/share
COPY --from=build /app/dist/conference-app/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf

# Install necessary packages for nginx and set working directory
RUN apk update && apk add nginx && mkdir -p /app

WORKDIR /app

RUN apk --no-cache add yarn --repository=http://dl-cdn.alpinelinux.org/alpine/edge/community

RUN mkdir -p /run/nginx

# Expose port 80 to allow outside access
EXPOSE 80

# Start nginx
CMD ["nginx", "-g", "daemon off;"]
