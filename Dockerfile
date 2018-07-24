FROM node:10.6-alpine
ENV HOME=/src/jv-agricultor
RUN mkdir -p $HOME/
WORKDIR $HOME/
ADD package* $HOME/
RUN npm install
RUN npm i esm
EXPOSE 80
ADD . $HOME/
CMD ["node", "--experimental-modules", "node_modules/.bin/nodemon", "-L", "index.js"]