const db = require("../models");
const Product = db.product;

exports.getProducts = (req, res) => {
    Product.find({})
        .then(products => {
            res.status(200).send(products);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener los productos" });
        });
};

exports.getProductsById = (req, res) => {
    const id = req.params.id;
    
    Product.findById(id)
        .then(product => {
            if (!product) {
                return res.status(404).send({ message: "Producto no encontrado con id " + id });
            }
            res.status(200).send(product);
        })
        .catch(err => {
            res.status(500).send({ message: "Error al obtener el producto con id " + id });
        });
};

exports.createProducts = (req, res) => {
    if (!req.body.name || !req.body.price) {
        return res.status(400).send({ message: "Nombre y precio son campos requeridos" });
    }

    const product = new Product({
        id:req.body.name,
        name: req.body.name,
        description: req.body.description || "",
        price: req.body.price,
        stock: req.body.stock || 0
    });

    product.save()
        .then(data => {
            res.status(201).send({ message: "Producto creado exitosamente", data: data });
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al crear el producto" });
        });
};

exports.updateProducts = (req, res) => {
    if (!req.body) {
        return res.status(400).send({ message: "Los datos a actualizar no pueden estar vacíos" });
    }

    const id = req.params.id;

    Product.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true })
        .then(product => {
            if (!product) {
                return res.status(404).send({ message: `No se puede actualizar. Producto con id=${id} no encontrado.` });
            }
            res.status(200).send({ message: "Producto actualizado exitosamente", data: product });
        })
        .catch(err => {
            res.status(500).send({ message: "Error al actualizar el producto con id=" + id });
        });
};

exports.deleteProducts = (req, res) => {
    const id = req.params.id;

    Product.findByIdAndRemove(id)
        .then(product => {
            if (!product) {
                return res.status(404).send({ message: `No se puede eliminar. Producto con id=${id} no encontrado.` });
            }
            res.status(200).send({ message: "Producto eliminado exitosamente" });
        })
        .catch(err => {
            res.status(500).send({ message: "No se pudo eliminar el producto con id=" + id });
        });
};



