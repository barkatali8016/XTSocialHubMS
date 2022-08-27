# XTSocialHubMS

# To RUN Services with docker use following command together

#

docker-compose run --rm waitforrabbit
docker-compose up posts users shares

# docker-compose up posts users

# Some useful docker commands

1. `docker stop $(docker ps -aq)` - Stop all the container
1. `docker rm $(docker ps -aq)` - To remove all the docker images

ENV DETAILS
APP_SECRET ='barkat'

# Mongo DB

#MONGODB_URI='mongodb://localhost:27017/user'
MONGODB_URI='mongodb+srv://barkat:Password%40123@cluster0.ff4tjtm.mongodb.net/user'

# Port

PORT=8000
#MOJO AUTH API KEY
MOJO_API_KEY='test-39c833cd-adc0-4787-8027-400b8551d49f'

# Message Broker URL

# MESSAGE_BROKER_URL="amqp://localhost"

MESSAGE_BROKER_URL="amqp://guest:guest@rabbitmq:5672"
