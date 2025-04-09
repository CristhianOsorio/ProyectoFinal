const mongoose = require('mongoose');

const Cart = mongoose.model(
    "Cart",
    new mongoose.Schema({
        products: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Product"
            },
            quantity: {
                type: Number,
                default: 1
            }
        }]
    })
);

module.exports = Cart;