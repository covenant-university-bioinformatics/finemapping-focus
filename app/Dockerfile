From python:3.8-bullseye
ENV CI=true
ENV PIP_IGNORE_INSTALLED=0

WORKDIR /app

#update linux packages
RUN apt update && apt-get install -y --no-install-recommends &&  apt-get install -y ca-certificates
RUN apt-get update && apt-get -y install r-base r-base-dev

COPY requirements.txt  .
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

## R packages: r-devtools, rcpp
RUN  R -e "install.packages(c('devtools','Rcpp','expm'),dependencies=TRUE, repos='http://cran.rstudio.com/')"
RUN  R -e "install.packages(c('Ckmeans.1d.dp','wavethresh','RcppZiggurat', 'stringi','RcppGSL','Rfast','matrixStats'),dependencies=TRUE, repos='http://cran.rstudio.com/')"
#RUN  R -e "install.packages('expm',dependencies=TRUE, repos='http://cran.rstudio.com/')"
#RUN  R -e "install.packages('expm',dependencies=TRUE, repos='http://cran.rstudio.com/')"

COPY packages/susieR-0.8.0.tar.gz .

RUN R CMD INSTALL  susieR-0.8.0.tar.gz
RUN rm susieR-0.8.0.tar.gz

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
## testing with bind mount
#CMD ["/bin/bash", "-c", "/app/pipeline_scripts/pipeline.sh"]
