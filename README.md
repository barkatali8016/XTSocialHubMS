# XTSocialHubMS

# To RUN Services with docker use following command together

#

docker-compose run --rm waitforrabbit
docker-compose up posts users shares

# docker-compose up posts users

# Some useful docker commands
1) `docker stop $(docker ps -aq)` - Stop all the container
1) `docker rm $(docker ps -aq)` - To remove all the docker images