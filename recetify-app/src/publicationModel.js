const mongoose = require("mongoose");

const publicationSchema = new mongoose.Schema(
    {
        calification: { type: Number, required: true },
        description: { type: String, required: true },
        title: { type: String, required: true },
        photo_url: { type: String, required: true },
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ModelPublication = mongoose.model("publications", publicationSchema);

module.exports = ModelPublication;