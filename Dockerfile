FROM node:lts-alpine
ENV NODE_ENV=production
ENV RING_REFRESH_TOKEN default_token_value
ENV LOCATION_ID default_location_id
ENV ALARM_ID default_alarm_id
ENV WEBHOOK_URL default_webhook_url
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm install --production --silent && mv node_modules ../
COPY . .
EXPOSE 3000
RUN npm run build
RUN chown -R node /usr/src/app
USER node
CMD ["node", "src/script.js"]
