const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    product_id: { type: String, required: true },
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true }
});

const shoppingCartSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    items: [itemSchema],
    total_price: { type: Number, required: true }
});

module.exports = mongoose.model('ShoppingCarts', shoppingCartSchema);