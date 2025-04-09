const controller = require('../controllers/product.controller')
const {authJwt} = require('../middelwares')
const verifyIdentificator = require('../middelwares/verifyIdentificator')

module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        )
        next();
    })
app.get('/getProducts', controller.getProducts)
app.get('/getProductById/:id', controller.getProductById)
app.post('/createProduct/',[authJwt.verifyToken,verifyIdentificator.checkDuplicateProductId, authJwt.isAdmin], controller.createProducts)
app.put('/updateProduct/',[authJwt.verifyToken, authJwt.isAdmin], controller.updateProducts)
app.delete('/deleteProductById/:id',[authJwt.verifyToken, authJwt.isAdmin], controller.deleteProducts)
}