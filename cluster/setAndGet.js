process.env.DEBUG = "ioredis:*";

const Redis = require("ioredis");

const cluster = new Redis.Cluster([
    {
        port: 7000,
        host: "127.0.0.1",
    }
], {
    enableReadyCheck: true
});

cluster.on("ready", function () {
    console.log('READY');

    setAndGet();
});


async function setAndGet() {
    for (let i = 0; i < 10; i++) {
        await cluster.set(`foo${i}`, `bar${i}`);
        const result = await cluster.get(`foo${i}`);
        console.log(`result${i}`, result);
    }
}