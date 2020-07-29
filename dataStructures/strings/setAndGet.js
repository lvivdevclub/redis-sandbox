const redis = require("redis");
const {promisify} = require("util");
const client = redis.createClient();

const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

setAsync("set", "value")
    .then(res => {
        console.log("set", res);
    })
    .catch(err => {
        console.error("set", err);
    });

getAsync("set")
    .then(res => {
        console.log("get", res);
    })
    .catch(err => {
        console.error("get", err);
    });
