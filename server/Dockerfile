FROM node:22

WORKDIR /app

COPY package.json ./
RUN yarn

COPY . .

RUN npx prisma generate

CMD ["yarn", "start:dev", "gateway"]