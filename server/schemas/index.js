const mongoose = require("mongoose");

module.exports = () => {
    const connect = () => {
        if (process.env.NODE_ENV !== "production") {
            mongoose.set("debug", true);
        }
        mongoose.connect(
            "mongodb://root:*aksen1090314@localhost:27017/admin",
            {
                dbName: "tweet-challege",
            },
            (error) => {
                if (error) {
                    console.log("MongoDB Connection Error", error);
                } else {
                    console.log("MongoDB Connection Success");
                }
            }
        );
    };
    connect();
    mongoose.connection.on('error', (error) => {
        console.error("MongoDB Connection Error", error)
    })
    mongoose.connection.on('disconnected', (error) => {
        console.error("MongoDB Connection Failed, Try Connection Again", error)
        connect();
    })
};
