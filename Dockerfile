FROM node:alpine

COPY . /app
WORKDIR /app
RUN npm install

EXPOSE 8003

CMD ["npm", "start"]

