const redis = require("redis");
const client = redis.createClient();
const {promisify} = require("util");

//counter
const incrAsync = promisify(client.incr).bind(client);
const incrbyAsync = promisify(client.incrby).bind(client);
const getAsync = promisify(client.get).bind(client);

client.set("counter", "100", redis.print);

for (let i = 0; i < 1000000; i++) {
    incrbyAsync("counter", 100000000000*i).then(function (res) {
    }).catch(function (err) {
    });
}

getAsync("counter").then(function (res) {
    console.log("counter", res);
}).catch(function (err) {
    console.error("counter", err);
});