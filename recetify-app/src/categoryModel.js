const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
    {
        name: {type: String, required: true},
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ModelCategory = mongoose.model("categories", categorySchema);

module.exports = ModelCategory;