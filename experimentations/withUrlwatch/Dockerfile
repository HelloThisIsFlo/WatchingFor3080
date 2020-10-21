FROM ubuntu:20.04

# Install Deps
RUN apt-get update
RUN apt-get -y upgrade

## Install Python & pip
RUN apt-get install -y python3-pip
### Fix for Timezone
ENV TZ=Europe/London
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN apt-get install -y ssh python3-boto3

## Install NodeJS & npm
RUN apt-get install -y curl
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

RUN npm -v

## Install Pupeteer
RUN apt-get update \
    && apt-get install -y wget gnupg \
    && wget -q -O - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add - \
    && sh -c 'echo "deb [arch=amd64] http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google.list' \
    && apt-get update \
    && apt-get install -y google-chrome-stable fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-kacst fonts-freefont-ttf libxss1 \
      --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*


RUN npm i puppeteer
#  \
#     # Add user so we don't need --no-sandbox.
#     # same layer as npm install to keep re-chowned files from using up several hundred MBs more space
#     && groupadd -r pptruser && useradd -r -g pptruser -G audio,video pptruser \
#     && mkdir -p /home/pptruser/Downloads \
#     && chown -R pptruser:pptruser /home/pptruser \
#     && chown -R pptruser:pptruser /node_modules

# USER pptruser







RUN pip3 install urlwatch
RUN pip3 install pyyaml minidb requests keyring appdirs lxml cssselect
RUN pip3 install pyppeteer
RUN pyppeteer-install


RUN mkdir /app
WORKDIR /app

ADD ./urlwatch_config /root/.config/urlwatch
ADD ./run_every_x_secs.sh .