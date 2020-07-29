const redis = require("redis");
const {promisify} = require("util");
const client = redis.createClient();

const hmsetAsync = promisify(client.hmset).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);
const hgetAsync = promisify(client.hget).bind(client);

hmsetAsync("hmset", ["foo", "bar", "qw", "asd"])
    .then(res => {
        console.log("hmset", res);
    })
    .catch(err => {
        console.error("hmset", err);
    });

hgetallAsync("hmset")
    .then(res => {
        console.log("hgetall", res);
    })
    .catch(err => {
        console.error("hgetall", err);
    });

hgetAsync("hmset", "qw")
    .then(res => {
        console.log("hget qw", res);
    })
    .catch(err => {
        console.error("hget qw", err);
    });
