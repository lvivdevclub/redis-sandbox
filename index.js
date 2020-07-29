const redis = require("redis");
const client = redis.createClient();
const {promisify} = require("util");

const getAsync = promisify(client.get).bind(client);
const hgetallAsync = promisify(client.hgetall).bind(client);
const hgetAsync = promisify(client.hget).bind(client);

client.on("error", function (error) {
    console.error(error);
});


//
client.hmset("MY-key", ["foo", "bar", "qw", "asd"], function (err, res) {
    if (err) {
        console.error("hmset", err);
        return;
    }
    console.log("hmset", res);
});

client.set("key2", "value", redis.print);
client.set(["hello", "world"]);

hgetallAsync("MY-key").then(function (res) {
    console.log("MY-key", res);
}).catch(function (err) {
    console.error("MY-key", err);
});

hgetAsync("MY-key", "qw").then(function (res) {
    console.log("MY-key qw", res);
}).catch(function (err) {
    console.error("MY-key qw", err);
});

getAsync("key2").then(function (res) {
    console.log("key2", res);
}).catch(function (err) {
    console.error("key2", err);
});

getAsync("hello").then(function (res) {
    console.log("hello", res);
}).catch(function (err) {
    console.error("hello", err);
})
