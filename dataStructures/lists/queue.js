const redis = require("redis");
const {promisify} = require("util");
const cluster = require('cluster');
const client = redis.createClient();

if (cluster.isMaster) {
    const lpushAsync = promisify(client.lpush).bind(client);
    const delAsync = promisify(client.del).bind(client);

    delAsync('list1:queue')
        .then(res => {
            console.log("del", res);
        })
        .catch(err => {
            console.error("del", err);
        });

    setTimeout(() => {
        lpushAsync("list1:queue", "lpush")
            .then(res => {
                console.log("lpush", res);
            })
            .catch(err => {
                console.error("lpush", err);
            });
    }, 5000);

    setTimeout(() => {
        lpushAsync("list2:queue", "lpush")
            .then(res => {
                console.log("lpush", res);
            })
            .catch(err => {
                console.error("lpush", err);
            });
    }, 6000);

    setTimeout(() => {
        lpushAsync("list2:queue", "lpush")
            .then(res => {
                console.log("lpush", res);
            })
            .catch(err => {
                console.error("lpush", err);
            });
    }, 7000);

    cluster.fork();
    setTimeout(() => cluster.fork(), 1000);
} else {
    const blpopAsync = promisify(client.blpop).bind(client);

    //by default BLPOP blocks the connection until
    //another client performs an LPUSH or RPUSH operation against one of the keys
    //set 0 to block indefinitely
    blpopAsync('list1:queue', 'list2:queue', 0)
        .then(res => {
            console.log(`blpop ${process.pid}`, res);
            return blpopAsync('list1:queue', 'list2:queue', 0);
        })
        .then(res => {
            console.log(`blpop ${process.pid}`, res);
        })
        .catch(err => {
            console.error(`blpop ${process.pid}`, err);
        });
}




