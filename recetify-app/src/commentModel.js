const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
    {
        description: { type: String, required: true },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        publication_id: { type: mongoose.Schema.Types.ObjectId, ref: 'publications', required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ModelComment = mongoose.model("comments", commentSchema);

module.exports = ModelComment;