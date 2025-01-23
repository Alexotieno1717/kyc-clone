


FROM node:20

WORKDIR /app

COPY package*.json ./

# Clear npm cache and install global dependencies
# RUN npm cache clean --force && \
#     npm install -g npm

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3000

CMD [ "npm", "start" ]


