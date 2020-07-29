const redis = require("redis");
const {promisify} = require("util");
const client = redis.createClient();

const incrbyAsync = promisify(client.incrby).bind(client);
const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

setAsync("counter", "100")
    .then(res => {
        console.log("set", res);
    })
    .catch(err => {
        console.error("set", err);
    });

for (let i = 0; i < 1000000; i++) {
    incrbyAsync("counter", 100000000000 * i)
        .then(res => {
        })
        .catch(err => {
        });
}

getAsync("counter")
    .then(res => {
        console.log("counter", res);
    })
    .catch(err => {
        console.error("counter", err);
    });