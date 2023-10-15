FROM node:18

RUN apt-get update && apt-get install -y postgresql-client

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000

# initiate database structure
#RUN npx typeorm migration:generate -n InitialCreate

# start app
#CMD ["npm", "run", "start:prod"]
#CMD ["sh", "-c", "npx typeorm migration:generate -n InitialCreate && npm run start:prod"]








