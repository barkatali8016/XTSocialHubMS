# XTSocialHubMS

# To RUN Services with docker use following command together

#

docker-compose run --rm waitforrabbit
docker-compose up posts users comments query shares

# docker-compose up posts users

# Some useful docker commands

1. `docker stop $(docker ps -aq)` - Stop all the container
1. `docker rm $(docker ps -aq)` - To remove all the docker images

# ENV DETAILS

APP_SECRET: "barkat"
MONGODB_URI: "mongodb://mongo_db:27017/users"
PORT: 8001
MOJO_API_KEY: "test-39c833cd-adc0-4787-8027-400b8551d49f"
MESSAGE_BROKER_URL: "amqp://guest:guest@rabbitmq:5672"
