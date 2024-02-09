#STAGE 1
FROM node:20.11.0 AS build
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

#STAGE 2
FROM nginx:1.18.0
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /usr/src/app/dist/finance-app /usr/share/nginx/html
