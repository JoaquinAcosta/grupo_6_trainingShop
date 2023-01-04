const db = require("../../database/models");


module.exports = {
    all : async (rec, res) =>{
        try {
            const {count, rows: categories} = await db.Category.findAndCountAll()
            return res.status(200).json({
                data:{
                    totalCategories: count,
                    data: categories
                }
            })
        } catch (error) {
            console.log(error);
        }
        
    }
    

}