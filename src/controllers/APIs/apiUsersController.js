const db = require("../../database/models");
const path = require("path");
const { literalQueryUrlImage } = require("../../helpers/literalQueryUrlImage");

module.exports = {
    image: (req, res) => {
        res.sendFile(
          path.join(__dirname, `../../../public/images/profilesImage/${req.params.img}`)
        );
      },

    getById : async (req, res) => {
        try{
            const user = await db.User.findByPk(req.params.id,{ 
                attributes: {
                    association: "images",
                    include: [ literalQueryUrlImage(req, "avatar", "avatar", "/apiUsers")],
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
    },
    verifyEmail : async (req,res) => {
        try {
            console.log(req.body);

            const {email}= req.body;
            let user = await db.User.findOne({
                where : {
                    email
                }
            });
            return res.status(200).json({
                ok: true,
                data: user ? true :false
            })
        }
            catch (error) {
                console.log(error)
                return res.status(500).json({
                    ok : false,
                    msg : error.message

                })
            }
        }

    }