const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
    Types: { ObjectId },
} = Schema;
const challengeSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    kind:{
        type: String,
        required: true,
    },
    profile:{
        type: String,
        required: true,
    },
    start: {
        type: Date,
        required: true,
    },
    end: {
        type: String,
        required: true,
    },
    verifyStart: {
        type: Date,
        required: true,
    },
    verifyEnd: {
        type: Date,
        required: true,
    },
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    participate: [
        {
            type: ObjectId,
            ref: 'User',
        },
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Challenge", challengeSchema);
