FROM arm64v8/node:slim

MAINTAINER Samir Desai

WORKDIR /app

RUN echo "alias l='ls -lart'" > ~/.bashrc

RUN npm install yarn -g

ADD ./run.sh /root/run.sh

EXPOSE 3000

CMD ["/root/run.sh"]
