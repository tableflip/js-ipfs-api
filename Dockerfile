FROM node:6

ENV DISPLAY :99.0
ENV CHROME_BIN /usr/bin/google-chrome

WORKDIR /usr/src/app

RUN apt-get update; \
    apt-get install -y git curl; \
    curl https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - ; \
    sh -c 'echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list'; \
    apt-get update && apt-get install -y google-chrome-stable Xvfb; \
    apt-get clean && rm -rf /var/lib/apt/lists/* /tmp/* /var/tmp/*

ADD xvfb.sh /etc/init.d/xvfb
ADD entrypoint.sh /entrypoint.sh

COPY package.json /usr/src/app/package.json

RUN npm install --verbose

COPY . /usr/src/app

CMD ["/usr/src/app/src/cli/bin.js"]
ENTRYPOINT ["/entrypoint.sh"]
