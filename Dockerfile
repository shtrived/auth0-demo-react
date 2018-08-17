FROM node:8.11.4

WORKDIR /home/app

RUN npm install -g create-react-app
ADD package.json /home/app
RUN npm install
ADD . /home/app

CMD ["npm", "start"]

EXPOSE 3000
