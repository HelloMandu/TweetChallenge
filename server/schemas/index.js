const mongoose = require("mongoose");
const init = require('../lib/init');

module.exports = () => {
    const connect = () => {
        if (process.env.NODE_ENV !== "production") {
            mongoose.set("debug", true);
        }
        mongoose.connect(
            process.env.MONGO_URI,
            {
                useNewUrlParser: true,
                dbName: "tweet-challenge",
            },
            (error) => {
                if (error) {
                    console.log("MongoDB Connection Error", error);
                } else {
                    console.log("MongoDB Connection Success");
                }
            }
        );
        try{
            // init(); //default data
        } catch(e){
            console.error(e)
        }
    };
    connect();
    mongoose.connection.on("error", (error) => {
        console.error("MongoDB Connection Error", error);
    });
    mongoose.connection.on("disconnected", (error) => {
        console.error("MongoDB Connection Failed, Try Connection Again", error);
        connect();
    });
};
