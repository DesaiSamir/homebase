FROM arm64v8/node

MAINTAINER Samir Desai

WORKDIR /app

RUN npm i npm@latest -g \
  && npm install yarn -g

ADD ./run.sh /root/run.sh

EXPOSE 3000

CMD ["/root/run.sh"]
