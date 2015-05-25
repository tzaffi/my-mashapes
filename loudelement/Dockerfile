FROM centos:centos6

# Enable EPEL for Node.js
RUN rpm -Uvh http://download.fedoraproject.org/pub/epel/6/i386/epel-release-6-8.noarch.rpm
# Install Node.js and npm
RUN yum install -y npm

# Install the necessary files
COPY . /src

# Install app dependencies
RUN cd /src; npm install

EXPOSE 8000
CMD ["node", "/src/intermediator.js", "8000", "config.json"]