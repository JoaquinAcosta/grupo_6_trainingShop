module.exports = {
    detail : (req, res) => {
        return res.render ('detalledelproducto')
    },
    add: (req, res) => {
        return res.render ('addProduct')
    },
    edit : (req, res) => {
    return res.render ('editProduct')
    }
 } 