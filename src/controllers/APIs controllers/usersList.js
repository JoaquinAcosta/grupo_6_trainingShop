const db = require('../../database/models');

module.exports={
    usersList: async(req, res) =>{

        try{
            let users = await db.User.findAll({
                attributes: {
                    exclude: ['updatedAt', 'createdAt','rolId','phone','password','avatar'],
                  },
            });

            if(users.length){
                return res.status(200).json({
                    count: +users.length,
                    ok : true,
                    data : users
                })
            }
            throw new Error('No hay usuarios registrados en la base de datos.')
        }catch(error){
            console.log(error);
        }
    }
}