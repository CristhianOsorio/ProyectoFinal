const mongoose = require('mongoose');
const Coupon = mongoose.model(
    "Coupon",
    new mongoose.Schema({
        name: String,
        description: String,
        percentage:{
            type:Number,
            default:0
        },
        expirationDate:{
            type:Date,
            required:true
        }
    })
);

module.exports = Coupon;