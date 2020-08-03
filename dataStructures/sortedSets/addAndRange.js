const redis = require("redis");
const {promisify} = require("util");
const client = redis.createClient();

const zaddAsync = promisify(client.zadd).bind(client);
const zrangeAsync = promisify(client.zrange).bind(client);
const zrevrangeAsync = promisify(client.zrevrange).bind(client);
const zrankAsync = promisify(client.zrank).bind(client);

zaddAsync("sset", 1, "d")
    .then(res => {
    })
    .catch(err => {
    });

const data = ["a", "b", "c"];
for (let i = 0; i < data.length; i++) {
    zaddAsync("sset", i, data[i])
        .then(res => {
        })
        .catch(err => {
        });
}

zaddAsync("sset", 2, "a")
    .then(res => {
    })
    .catch(err => {
    });

// 0 - first, -1 - last
zrangeAsync("sset", 0, -1)
    .then(res => {
        console.log("zrange", res);
    })
    .catch(err => {
        console.error("zrange", err);
    });

zrevrangeAsync("sset", 0, -1)
    .then(res => {
        console.log("zrevrange", res);
    })
    .catch(err => {
        console.error("zrevrange", err);
    });

zrankAsync("sset", "c")
    .then(res => {
        console.log("zrank", res);
    })
    .catch(err => {
        console.error("zrank", err);
    });