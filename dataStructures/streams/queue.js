const redis = require("redis");
const {promisify, inspect} = require("util");
const client = redis.createClient();

const xaddAsync = promisify(client.xadd).bind(client);
const delAsync = promisify(client.del).bind(client);

delAsync('stream')
    .then(res => {
        console.log("del", res);
    })
    .catch(err => {
        console.error("del", err);
    });

setTimeout(() => {
    xaddAsync("stream", "*", "id", "1")
        .then(res => {
            console.log("xadd", res);
        })
        .catch(err => {
            console.error("xadd", err);
        });
}, 5000);

setTimeout(() => {
    xaddAsync("stream", "*", "id", "2")
        .then(res => {
            console.log("xadd", res);
        })
        .catch(err => {
            console.error("xadd", err);
        });
}, 6000);

setTimeout(() => {
    xaddAsync("stream", "*", "id", "3")
        .then(res => {
            console.log("xadd", res);
        })
        .catch(err => {
            console.error("xadd", err);
        });
}, 7000);


for (let i = 0; i < 2; i++) {
    const client = redis.createClient();
    const xreadAsync = promisify(client.xread).bind(client);

    xread(i);

    async function xread(index) {
        //set 0 as timeout to block indefinitely
        //set $ as id to consume only new entries
        const message = await xreadAsync("BLOCK", 0, "STREAMS", "stream", "$");
        console.log(`xread ${index}`, inspect(message, {depth: 4}));
        await xread(index);
    }
}