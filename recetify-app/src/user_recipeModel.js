const mongoose = require("mongoose");

const userRecipeSchema = new mongoose.Schema(
    {
        user_id: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },
        recipe_id: { type: mongoose.Schema.Types.ObjectId, ref: 'recipes', required: true }
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const ModelUserRecipe = mongoose.model("users_recipes", userRecipeSchema);

module.exports = ModelUserRecipe;