FROM node:18-alpine3.14

ARG aaa
ARG bbb

WORKDIR /app

COPY ./index.js .

ENV aaa=${aaa} \
    bbb=${bbb}

CMD ["node", "./index.js"]
