const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
    Types: { ObjectId },
} = Schema;
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    birth: {
        type: Date,
        required: true,
    },
    profile: {
        type: String,
        required: true,
    },
    participated: [
        {
            type: ObjectId,
            ref: 'Challenge',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("User", userSchema);
