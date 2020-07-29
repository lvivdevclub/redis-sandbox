const redis = require("redis");
const {promisify} = require("util");
const client = redis.createClient();

//adds elements to HyperLogLog data structure
const pfaddAsync = promisify(client.pfadd).bind(client);

//returns the approximated cardinality(count) computed by the HyperLogLog data structure
const pfcountAsync = promisify(client.pfcount).bind(client);
const getAsync = promisify(client.get).bind(client);

pfaddAsync("hll-1", "1", "2", "3", "9", "0", "1")
    .then(res => {
        console.log("pfadd hll-1", res);
    })
    .catch(err => {
        console.error("pfadd hll-1", err);
    });

//HLL is encoded as string, so commands get, set, etc could be used
getAsync("hll-1")
    .then(res => {
        console.log("get hll-1 ", res);
    })
    .catch(err => {
        console.error("get hll-1", err);
    });

pfcountAsync("hll-1")
    .then(res => {
        console.log("pfcount hll-1", res);
    })
    .catch(err => {
        console.error("pfcount hll-1", err);
    });

pfaddAsync("hll-2", "1", "4", "7", "9", "8", "11", 12)
    .then(res => {
        console.log("pfadd hll-2", res);
    })
    .catch(err => {
        console.error("pfadd hll-2", err);
    });

pfcountAsync("hll-2")
    .then(res => {
        console.log("pfcount hll-2", res);
    })
    .catch(err => {
        console.error("pfcount hll-2", err);
    });

pfcountAsync("hll-2", "hll-1")
    .then(res => {
        console.log("pfcount hll-1 + hll-2", res);
    })
    .catch(err => {
        console.error("pfcount hll-1 + hll-2", err);
    });