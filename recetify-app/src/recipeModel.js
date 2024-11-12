const mongoose = require("mongoose");

const recipeSchema = new mongoose.Schema(
    {
        author: { type: String, required: true },
        title: { type: String, required: true },
        description: { type: String, required: true },
        photo_url: { type: String, required: true },
        severity: { type: String, required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ModelRecipe = mongoose.model("recipes", recipeSchema);

module.exports = ModelRecipe;