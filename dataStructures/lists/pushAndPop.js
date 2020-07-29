const redis = require("redis");
const {promisify} = require("util");
const client = redis.createClient();

const rpushAsync = promisify(client.rpush).bind(client);
const lpushAsync = promisify(client.lpush).bind(client);
const lrangeAsync = promisify(client.lrange).bind(client);
const ltrimAsync = promisify(client.ltrim).bind(client);
const rpopAsync = promisify(client.rpop).bind(client);
const lpopAsync = promisify(client.lpop).bind(client);

const rdata = [];
const ldata = [];
for (let i = 0; i < 5; i++) {
    rdata.push('rdata' + i);
    ldata.push('ldata' + i);
}

rpushAsync("list", rdata)
    .then(res => {
        console.log("rpush", res);
    })
    .catch(err => {
        console.error("rpush", err);
    });

lpushAsync("list", ldata)
    .then(res => {
        console.log("lpush", res);
    })
    .catch(err => {
        console.error("lpush", err);
    });

//LRANGE key start stop
lrangeAsync("list", 0, 4)
    .then(res => {
        console.log("lrange 0 - 4", res);
    })
    .catch(err => {
        console.error("lrange 0 - 4", err);
    });

//-1 is the last element of the list, -2 the penultimate, and so on
lrangeAsync("list", 5, -1)
    .then(res => {
        console.log("lrange 5 - -1", res);
    })
    .catch(err => {
        console.error("lrange 5 - -1", err);
    });

ltrimAsync("list", 1, -2)
    .then(res => {
        console.log("ltrim 1 - -2", res);
    })
    .catch(err => {
        console.error("ltrim 1 - -2", err);
    });

lrangeAsync("list", 0, -1)
    .then(res => {
        console.log("lrange", res);
    })
    .catch(err => {
        console.error("lrange", err);
    });

for (let i = 0; i < 5; i++) {
    rpopAsync("list")
        .then(res => {
            console.log(`rpop${i}`, res);
        })
        .catch(err => {
            console.error(`rpop${i}`, err);
        });
    lpopAsync("list")
        .then(res => {
            console.log(`lpop${i}`, res);
        })
        .catch(err => {
            console.error(`lpop${i}`, err);
        });
}

lrangeAsync("list", 0, -1)
    .then(res => {
        console.log("lrange", res);
    })
    .catch(err => {
        console.error("lrange", err);
    });