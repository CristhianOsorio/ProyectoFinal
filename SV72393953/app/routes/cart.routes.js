const controller = require('../controllers/cart.controller')
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
app.get('/getcart', controller.getCart)
app.post('/addToCart',[authJwt.verifyToken,verifyIdentificator.checkDuplicateProductId, authJwt.isAdmin], controller.createProducts)
}