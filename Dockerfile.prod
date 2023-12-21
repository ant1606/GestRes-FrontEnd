FROM node:current-alpine3.16

WORKDIR /app

COPY ./dist/ /app

ENV VITE_BACKEND_ENDPOINT=http://localhost/api
ENV VITE_SETTINGS_TYPE=SETTINGS_TYPE
ENV VITE_SETTINGS_STATUS=SETTINGS_STATUS

# RUN npm install

RUN npm i -g serve
# RUN apt install xsel

EXPOSE 3000

CMD ["serve", "-s", "."]

# RUN apk add --no-cache xdg-utils