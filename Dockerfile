From python:3.9
ENV CI=true
ENV PIP_IGNORE_INSTALLED=0

WORKDIR /app

## Install Spark and GNU parallel
RUN apt update  && apt full-upgrade -y 
#&&  apt install unzip parallel tar libgomp1 wget default-jdk scala git -y
#RUN wget https://downloads.apache.org/spark/spark-3.3.0/spark-3.3.0.tar.gz

RUN apt install libgl1 ffmpeg libsm6 libxext6  -yf

COPY requirements.txt  .
RUN /usr/local/bin/python -m pip install --upgrade pip
RUN pip install --no-cache-dir -r requirements.txt

RUN apt-get update && apt-get -y install r-base r-base-dev
RUN  R -e "install.packages(c('qqman'),dependencies=TRUE, repos='http://cran.rstudio.com/')"

COPY scripts ./scripts

#ENTRYPOINT ["bash", "/app/scripts.sh"]
CMD ["bash", "/app/scripts/script.sh"]


