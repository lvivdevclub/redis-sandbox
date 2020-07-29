const redis = require("redis");
const client = redis.createClient();
const {promisify} = require("util");

//bitmaps
const setbitAsync = promisify(client.setbit).bind(client);
const bitcountAsync = promisify(client.bitcount).bind(client);

let chain = Promise.resolve();

for (let i = 0; i < 10000; i = i + 3) {
    chain = chain.then(() => {
        return Promise.all([
            setbitAsync("bitmaps", i, 1),
            setbitAsync("bitmaps", i + 1, 0),
            setbitAsync("bitmaps", i + 2, 1),
        ]);
    })
}

chain.then(() => {
    bitcountAsync("bitmaps").then(function (res) {
        console.log("bitcount", res);
    }).catch(function (err) {
        console.error("bitcount", err);
    });
});

