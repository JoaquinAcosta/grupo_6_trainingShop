module.exports = (req,res,next) => {
    if (req.cookies.trainingshop) {
        req.session.userLogin = req.cookies.trainingshop
    }
    next()
}