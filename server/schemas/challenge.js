const mongoose = require("mongoose");

const { Schema } = mongoose;
const {
    Types: { ObjectId },
} = Schema;
const challengeSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
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
        unique: true,
    },
    end: {
        type: String,
        required: true,
        unique: true,
    },
    verifyStart: {
        type: Date,
        required: true,
        unique: true,
    },
    verifyEnd: {
        type: Date,
        required: true,
        unique: true,
    },
    user: {
        type: ObjectId,
        required: true,
        ref: 'User'
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Challenge", challengeSchema);
