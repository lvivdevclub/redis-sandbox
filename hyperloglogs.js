const redis = require("redis");
const client = redis.createClient();
const {promisify} = require("util");

//HyperLogLogs
const pfaddAsync = promisify(client.pfadd).bind(client);
const pfcountAsync = promisify(client.pfcount).bind(client);

pfaddAsync("hll-1", "1", "2", "3", "9", "0", "1").then(function (res) {
    console.log("hll-1", res);
}).catch(function (err) {
    console.error("hll-1", err);
});

pfcountAsync("hll-1").then(function (res) {
    console.log("hll-1 count", res);
}).catch(function (err) {
    console.error("hll-1 count", err);
});

pfaddAsync("hll-2", "1", "4", "7", "9", "8", "11", 12).then(function (res) {
    console.log("hll-2", res);
}).catch(function (err) {
    console.error("hll-2", err);
});

pfcountAsync("hll-2").then(function (res) {
    console.log("hll-2 count", res);
}).catch(function (err) {
    console.error("hll-2 count", err);
});

pfcountAsync("hll-2", "hll-1").then(function (res) {
    console.log("hll-2", res);
}).catch(function (err) {
    console.error("hll-2", err);
});