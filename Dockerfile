FROM public.ecr.aws/docker/library/node:18.13.0-alpine

COPY . /app
WORKDIR /app

RUN npm ci

CMD ["npm", "start"]
