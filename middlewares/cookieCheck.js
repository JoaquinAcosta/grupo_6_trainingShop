module.exports = (req,res,next) => {
    if (ref.cookies.trainingshop) {
        req.session.userLogin = req.cookies.trainingshop
    }
    next()
}