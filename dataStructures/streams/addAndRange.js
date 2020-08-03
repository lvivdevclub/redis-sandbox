const redis = require("redis");
const {promisify} = require("util");
const client = redis.createClient();

const delAsync = promisify(client.del).bind(client);
const xaddAsync = promisify(client.xadd).bind(client);
const xlenAsync = promisify(client.xlen).bind(client);
const xrangeAsync = promisify(client.xrange).bind(client);

delAsync('stream')
    .then(res => {
        console.log("del", res);
    })
    .catch(err => {
        console.error("del", err);
    });

//* to auto generate id
xaddAsync("stream", "*", "sensor-id", "1234", "temperature", "19.8")
    .then(res => {
        console.log("xadd", res);
    })
    .catch(err => {
        console.error("xadd", err);
    });

xlenAsync("stream")
    .then(res => {
        console.log("xlen", res);
    })
    .catch(err => {
        console.error("xlen", err);
    });

//- - start with smallest id, + - end on greatest id
xrangeAsync("stream", "-", "+")
    .then(res => {
        console.log("xrange", res);
    })
    .catch(err => {
        console.error("xrange", err);
    });