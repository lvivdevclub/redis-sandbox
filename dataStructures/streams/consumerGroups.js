const redis = require("redis");
const {promisify, inspect} = require("util");
const client = redis.createClient();

const xaddAsync = promisify(client.xadd).bind(client);
const xgroupAsync = promisify(client.xgroup).bind(client);
const delAsync = promisify(client.del).bind(client);

delAsync("stream")
    .then(res => {
        console.log("del", res);
    })
    .catch(err => {
        console.error("del", err);
    });

//MKSTREAM to create a stream, if it doesn"t exist
xgroupAsync("CREATE", "stream", "group", "$", "MKSTREAM")
    .then(res => {
        console.log("xgroup", res);
    })
    .catch(err => {
        console.error("xgroup", err);
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
    const xackAsync = promisify(client.xack).bind(client);
    const xreadgroupAsync = promisify(client.xreadgroup).bind(client);
    const xpendingAsync = promisify(client.xpending).bind(client);

    xread(i);

    async function xread(index) {
        // > as if to get the new messages
        const message = await xreadgroupAsync("GROUP", "group", `consumer-${index}`, "BLOCK", 0, "STREAMS", "stream", ">");
        console.log(`xreadgroup ${index}`, inspect(message, {depth: 4}));
        const pendingMessages = await xpendingAsync("stream", "group");
        console.log(`xpending ${index}`, inspect(pendingMessages, {depth: 4}));
        const messageId = message[0][1][0][0];
        const xackResult = await xackAsync("stream", "group", messageId);
        console.log(`xack ${index}`, xackResult);
        const pendingMessagesAfterAck = await xpendingAsync("stream", "group");
        console.log(`xpending ${index}`, inspect(pendingMessagesAfterAck, {depth: 4}));

        await xread(index);
    }
}