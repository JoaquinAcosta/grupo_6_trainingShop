module.exports = {
    cart: function (req, res) {
        return res.render('productCart', {
            title: 'Cart'
        })
    }
}