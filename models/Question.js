const mongoose = require("mongoose");
const slugify = require("slugify");

const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        minlength: [10, "Please Provide a title at least 10 characters"]
    },
    content: {
        type: String,
        required: true,
        minlength: [20, "Please Provide a content at least 20 characters "]
    },
    slug: String,
    createdAt: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    answers: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Answer"
        }
    ]
});

QuestionSchema.pre("save", function (next) {
    if (!this.isModified("title")) {
        next();
    }
    this.slug = this.makeSlug();
    next();
});

QuestionSchema.methods.makeSlug = function () {
    return slugify(this.title, {
        replacement: "-",
        remove: /[*+~.()'"!:@]/g,
        lower: true,
    });
}

module.exports = mongoose.model("Question", QuestionSchema);