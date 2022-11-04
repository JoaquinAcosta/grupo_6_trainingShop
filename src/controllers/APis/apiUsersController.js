const db = require("../../database/models");

module.exports = {
    getById : async (req, res) => {
        try{
            const user = await db.User.findByPk(req.params.id,{ 
                attributes: {
                    association: "images",
                    exclude: ["createdAt", "updatedAt", "deletedAt", "productId", "password", "rolId"]
                            }
                })
            let respuesta = {
                    meta: {
                        status: 200,
                        url: '/api/user/:id',
                    },
                    data: user 
                }
                res.json(respuesta)
        } catch (error) {
                console.log(error)
        }
    }
}