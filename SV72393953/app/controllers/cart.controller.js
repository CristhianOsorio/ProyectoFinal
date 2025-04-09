const db = require("../models");
const Product = db.product;
const Cart = db.cart;


exports.getCart = (req, res) => {
    Cart.findOne()
        .populate('products.product') 
        .then(cart => {
            if (!cart) {
             
                const newCart = new Cart({ products: [] });
                return newCart.save().then(savedCart => {
                    res.status(200).send(savedCart);
                });
            }
            res.status(200).send(cart);
        })
        .catch(err => {
            res.status(500).send({ message: err.message || "Error al obtener el carrito" });
        });
};

exports.addToCart = async (req, res) => {
    try {
        const { productId, quantity = 1 } = req.body;

        
        const parsedQuantity = parseInt(quantity);
        if (parsedQuantity < 1) {
            return res.status(400).json({ message: "La cantidad debe ser al menos 1" });
        }

   
        const product = await Product.findById(productId);
        if (!product) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

       
        let cart = await Cart.findOne().populate('products.product');
        if (!cart) {
            cart = new Cart({ products: [] });
        }

        
        const existingProductIndex = cart.products.findIndex(
            item => item.product._id.toString() === productId
        );

        
        if (existingProductIndex >= 0) {
            cart.products[existingProductIndex].quantity += parsedQuantity;
        } else {
            cart.products.push({ 
                product: productId, 
                quantity: parsedQuantity 
            });
        }

     
        const updatedCart = await cart.save();
        const populatedCart = await Cart.populate(updatedCart, { path: 'products.product' });

        res.status(200).json({
            success: true,
            message: "Producto agregado al carrito",
            cart: populatedCart
        });

    } catch (error) {
        console.error("Error en addToCart:", error);
        res.status(500).json({ 
            success: false,
            message: "Error al procesar la solicitud",
            error: error.message 
        });
    }
};



