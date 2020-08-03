const redis = require("redis");
const {promisify} = require("util");
const client = redis.createClient();

const lpushAsync = promisify(client.lpush).bind(client);
const delAsync = promisify(client.del).bind(client);

delAsync('list1:queue')
    .then(res => {
        console.log("del", res);
    })
    .catch(err => {
        console.error("del", err);
    });
delAsync('list2:queue:processing')
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
    lpushAsync("list1:queue", "lpush")
        .then(res => {
            console.log("lpush", res);
        })
        .catch(err => {
            console.error("lpush", err);
        });
}, 6000);

setTimeout(() => {
    lpushAsync("list1:queue", "lpush")
        .then(res => {
            console.log("lpush", res);
        })
        .catch(err => {
            console.error("lpush", err);
        });
}, 7000);

for (let i = 0; i < 2; i++) {
    const subClient = redis.createClient();
    const brpoplpushAsync = promisify(client.brpoplpush).bind(subClient);
    const lremAsync = promisify(client.lrem).bind(subClient);

    brpop(i);

    async function brpop(index) {
        //by default blocks the connection until
        //another client performs an LPUSH or RPUSH operation against one of the keys
        //set 0 to block indefinitely
        const message = await brpoplpushAsync("list1:queue", "list2:queue:processing", 0);
        console.log(`brpoplpush ${index}`, message);
        //if BLPOP is used instead, it would return an element to the client and removes the element from the list
        //BRPOPLPUSH allows us to store message in the "processing" list to make process more reliable
        const lremRes = await lremAsync("list2:queue:processing", 0, message);
        console.log(`lremRes ${index}`, lremRes);
        await brpop(index);
    }
}
