const db = require('../../database/models')

module.exports = {
    getAll : async (req,res) => {
        try {
            return res.status(200).json({
                count : 12,
                users : [{

                }]
            })
        } catch (error) {

        }
    },
    getById : (req,res) => {

    },
    verifyEmail : async (req, res) =>{
        try {
            const {email} = req.body;
            let user = await db.User.findOne({
                where : {
                    email
                }
            });
            return res.status(200).json({
                ok : true,
                data : user && true
            })
        }  catch (error) {
            console.log(error)
            return res.status(500).json({
                ok : false,
                msg : error.message
            })
        }
    }
} 