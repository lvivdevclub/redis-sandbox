const redis = require("redis");
const {promisify} = require("util");
const client = redis.createClient();

const saddAsync = promisify(client.sadd).bind(client);
const smembersAsync = promisify(client.smembers).bind(client);
const sismemberAsync = promisify(client.sismember).bind(client);
const sinterAsync = promisify(client.sinter).bind(client);

saddAsync("set1", ["a", "b", "c", "d"])
    .then(res => {
        console.log("sadd set1", res);
    })
    .catch(err => {
        console.error("sadd set1", err);
    });

smembersAsync("set1")
    .then(res => {
        console.log("smembers set1", res);
    })
    .catch(err => {
        console.error("smembers set1", err);
    });

sismemberAsync("set1", "a")
    .then(res => {
        console.log("sismember set1 a", res);
    })
    .catch(err => {
        console.error("sismember set1 a", err);
    });

sismemberAsync("set1", "e")
    .then(res => {
        console.log("sismember set1 e", res);
    })
    .catch(err => {
        console.error("sismember set1 e", err);
    });

saddAsync("set2", ["a", "b", "e", "f"])
    .then(res => {
        console.log("sadd set2", res);
    })
    .catch(err => {
        console.error("sadd set2", err);
    });

sinterAsync("set1", "set2")
    .then(res => {
        console.log("sinter", res);
    })
    .catch(err => {
        console.error("sinter", err);
    });