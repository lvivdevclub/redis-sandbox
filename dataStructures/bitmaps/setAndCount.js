const redis = require("redis");
const {promisify} = require("util");
const client = redis.createClient();

//sets (1) or clears (0) the bit at offset, returns old value
const setbitAsync = promisify(client.setbit).bind(client);

//calculates number of bits set to 1
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

chain
    .then(() => bitcountAsync("bitmaps"))
    .then(res => {
        console.log("bitcount", res);
    })
    .catch(err => {
        console.error("bitcount", err);
    });

