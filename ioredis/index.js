var Redis = require("ioredis");

setTimeout(function () {
    console.log("setTimeout");
    let cluster = new Redis.Cluster([
        {
            host: 'redis-node-0',
            password: 'bitnami'
        },
        {
            host: 'redis-node-1',
            password: 'bitnami'
        },
        {
            host: 'redis-node-2',
            password: 'bitnami'
        },
        {
            host: 'redis-node-3',
            password: 'bitnami'
        },
        {
            host: 'redis-node-4',
            password: 'bitnami'
        },
        {
            host: 'redis-node-5',
            password: 'bitnami'
        },
        {
            host: 'redis-node-6',
            password: 'bitnami'
        },
        {
            host: 'redis-node-7',
            password: 'bitnami'
        },
        {
            host: 'redis-node-8',
            password: 'bitnami'
        }
    ]);

    console.log("set");
    cluster.set("foo", "bar");

    console.log("get");
    cluster.get("foo", function (err, res) {
        console.log(err);
        console.log(res);
    });

}, 30000);
