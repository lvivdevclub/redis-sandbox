To start redis-cluster through docker-compose from dockerCompose1:

export REDIS_CLUSTER_IP=0.0.0.0
docker-compose up

to enter docker console
docker exec -it X /bin/sh
to connect to cli
redis-cli -p 7000

to start/stop nodes
supervisorctl start/stop X

to return nodes
redis-cli -p 7000 cluster nodes

to reshard
redis-cli -p 7000 --cluster reshard 0.0.0.0:7000