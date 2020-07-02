const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const answerSchema = new Schema({
    content: {
        type: String,
        required: [true, "Please provide a content"],
        minlength: [10, "Please provide a content at least 10 character"]
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    questions: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }
});

module.exports = mongoose.model("Answer", answerSchema);