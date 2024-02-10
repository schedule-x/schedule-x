FROM node:current

WORKDIR /usr/src/app

COPY . .

RUN npm install --quiet

CMD ["npx", "vitest", "run", "--silent"]