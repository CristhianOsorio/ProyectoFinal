const db = require('../models');
const Coupon = db.coupon; 
const Product = db.product;

checkDuplicateCouponId = (req, res, next) => {
    Coupon.findOne({
        id: req.body.id
    }).exec((err, coupon) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (coupon) {
            res.status(400).send({ message: "El id del cupón ya está en uso" });
            return;
        }
        next();
    });
};

checkDuplicateProductId = (req, res, next) => {
    if (!req.body.id) {
        res.status(400).send({ message: "El ID del producto es requerido" });
        return;
    }

    Product.findOne({
        id: req.body.id
    }).exec((err, product) => {
        if (err) {
            res.status(500).send({ message: err });
            return;
        }
        if (product) {
            res.status(400).send({ message: "El ID del producto ya está en uso" });
            return;
        }
        next();
    });
};


const verifyIdentificator = {
    checkDuplicateCouponId,
    checkDuplicateProductId
};

module.exports = verifyIdentificator;