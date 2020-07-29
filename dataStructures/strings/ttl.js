const redis = require("redis");
const {promisify} = require("util");
const client = redis.createClient();

const setAsync = promisify(client.set).bind(client);
const ttlAsync = promisify(client.ttl).bind(client);
const getAsync = promisify(client.get).bind(client);

//option EX (expire) is equal to execution DEL command and could be executed separately with EXPIRE command
//information about expires are replicated and persisted on disk,
//the time virtually passes when your Redis server remains stopped
//Redis saves the date at which a key will expire
setAsync("set:ttl", "value", "EX", 5)
    .then(res => {
        console.log("set", res);
    })
    .catch(err => {
        console.error("set", err);
    });

getAsync("set:ttl")
    .then(res => {
        console.log("get", res);
    })
    .catch(err => {
        console.error("get", err);
    });

ttlAsync("set:ttl")
    .then(res => {
        console.log("ttl", res);
    })
    .catch(err => {
        console.error("ttl", err);
    });

setTimeout(() => {
    getAsync("set:ttl")
        .then(res => {
            console.log("get after ttl", res);
        })
        .catch(err => {
            console.error("get after ttl", err);
        });
}, 6000);

