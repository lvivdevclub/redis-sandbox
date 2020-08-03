const redis = require("redis");
const {promisify} = require("util");
const client = redis.createClient();

const delAsync = promisify(client.del).bind(client);
const addAsync = promisify(client.geoadd).bind(client);
const distAsync = promisify(client.geodist).bind(client);
const radiusAsync = promisify(client.georadiusbymember).bind(client);

delAsync("locations")
    .then(res => {
        console.log("del", res);
    })
    .catch(err => {
        console.error("del", err);
    });

addAsync("locations", -73.989308, 40.741895, "point1", -74.5995, 40.77549, "point2", -74.5769, 40.71408, "point3")
    .then(res => {
        console.log("add", res);
    })
    .catch(err => {
        console.error("add", err);
    });

distAsync("locations", "point1", "point2", "km")
    .then(res => {
        console.log("dist", res);
    })
    .catch(err => {
        console.error("dist", err);
    });

radiusAsync("locations", "point3", 10, "km")
    .then(res => {
        console.log("radius", res);
    })
    .catch(err => {
        console.error("radius", err);
    });