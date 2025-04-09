const controller = require('../controllers/coupon.controller')
const {authJwt} = require('../middelwares')
const verifyCoupon = require('../middelwares/verifyCoupon')

module.exports = function(app){
    app.use(function(req,res,next){
        res.header(
            "Access-Control-Allow-Headers",
            "Origin, Content-Type, Accept"
        )
        next();
    })
app.get('/getCoupons', controller.getCoupons)
app.get('/getCouponById/:id', getCouponById)
app.post('/createCoupon/',[authJwt.verifyToken, verifyIdentificator.checkDuplicateCouponId ,authJwt.isAdmin], controller.createCoupon)
app.put('/updateCoupon/',[authJwt.verifyToken, authJwt.isAdmin], controller.updateCoupon)
app.delete('/deleteCouponById/:id',[authJwt.verifyToken, authJwt.isAdmin], controller.deleteCoupon)
}