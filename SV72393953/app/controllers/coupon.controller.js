const db = require("../models");
const Coupon = db.coupon;

exports.getCoupons = (req, res) => {
    Coupon.find({})
        .then(coupons => {
            res.status(200).send(coupons);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener los cupones" });
        });
};

exports.getCouponById = (req, res) => {
    const id = req.params.id;
    
    Coupon.findById(id)
        .then(coupon => {
            if (!coupon) {
                return res.status(404).send({ message: "Cupón no encontrado con id " + id });
            }
            res.status(200).send(coupon);
        })
        .catch(err => {
            res.status(500).send({ message: "Error al obtener el cupón con id " + id });
        });
};

exports.createCoupon = (req, res) => {
    if (!req.body.name) {
        return res.status(400).send({ message: "El nombre es un campo requerido" });
    }

    const coupon = new Coupon({
        name: req.body.name,
        description: req.body.description || "",
        percentage: req.body.percentage,
        expirationDate: req.body.expirationDate
    });

    coupon.save()
        .then(data => {
            res.status(201).send({ message: "Cupón creado exitosamente", data: data });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al crear el cupón" });
        });
};

exports.updateCoupon = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Los datos a actualizar no pueden estar vacíos" });
    }

    const id = req.params.id;

    Coupon.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        .then(coupon => {
            if (!coupon) {
                return res.status(404).send({ message: `No se puede actualizar. Cupón con id=${id} no encontrado.` });
            }
            res.status(200).send({ message: "Cupón actualizado exitosamente", data: coupon });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar el cupón con id=" + id });
        });
};

exports.deleteCoupon = (req, res) => {
    const id = req.params.id;

    Coupon.findByIdAndRemove(id)
        .then(coupon => {
            if (!coupon) {
                return res.status(404).send({ message: `No se puede eliminar. Cupón con id=${id} no encontrado.` });
            }
            res.status(200).send({ message: "Cupón eliminado exitosamente" });
        })
        .catch(err => {
            res.status(500).send({ message: "No se pudo eliminar el cupón con id=" + id });
        });
};