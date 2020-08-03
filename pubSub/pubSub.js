const redis = require("redis");

const publisher = redis.createClient();

for (let i = 0; i < 2; i++) {
    const subscriber = redis.createClient();
    let messageCount = 0;

    subscriber.on("subscribe", function () {
        publisher.publish("channel", "message1");
        publisher.publish("channel", "message2");
    });

    subscriber.on("message", function (channel, message) {
        messageCount += 1;

        console.log("channel", message);

        if (messageCount === 2) {
            subscriber.unsubscribe();
        }
    });

    subscriber.subscribe("channel");
}