FROM node:18-alpine

RUN apk add --no-cache curl bash python3 make g++

RUN curl -fsSL https://bun.sh/install | bash
ENV PATH="/root/.bun/bin:${PATH}"

WORKDIR /app

COPY package*.json ./
COPY bun.lock ./

RUN bun install

COPY . .

RUN bun run build

RUN chown -R node:node /app
USER node

EXPOSE 3000

CMD ["bun", "run", "start"]
