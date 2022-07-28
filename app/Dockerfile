From python:3.8-bullseye
ENV CI=true
ENV PIP_IGNORE_INSTALLED=0

WORKDIR /app

## Install Spark and GNU parallel
RUN apt update  && apt full-upgrade -y
#&&  apt install unzip parallel tar libgomp1 wget default-jdk scala git -y
#RUN wget https://downloads.apache.org/spark/spark-3.3.0/spark-3.3.0.tar.gz
RUN apt install libgl1 ffmpeg libsm6 libxext6  -yf

# install python packages
COPY ./requirements.txt  .
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

# install R and packages
RUN apt-get update && apt-get -y install r-base r-base-dev
RUN  R -e "install.packages(c('qqman'),dependencies=TRUE, repos='http://cran.rstudio.com/')"

#install node and npm
ENV NODE_VERSION=16.13.0
RUN apt install -y curl
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN node --version
RUN npm --version

COPY package.json ./

RUN npm install

COPY ./ ./

#remove windows line endings
RUN apt-get install -y dos2unix
RUN dos2unix pipeline_scripts/pipeline.sh
RUN chmod 775 pipeline_scripts/pipeline.sh

RUN npm run build

CMD [ "npm", "run", "start:prod" ]
