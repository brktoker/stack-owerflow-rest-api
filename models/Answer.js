const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Question = require("./Question");

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
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Question"
    }
});

answerSchema.pre("save", async function (next) {
    if (!this.isModified("user" || "question")) {
        return next();
    }

    try {
        const question = await Question.findById(this.question);

        question.answers.push(this._id);

        await question.save();
    }
    catch (err) {
        return err
    }
});

module.exports = mongoose.model("Answer", answerSchema);