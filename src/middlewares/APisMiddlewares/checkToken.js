const { verify } = require("jsonwebtoken")
const checkToken = async (req,res,next) => {

  try {
    const token = req.header('Authorization') || req.params.token

    if(!token){
      return res.status(401).json({
        ok:false,
        status:401,
        msg:"El token requerido"
      })
    }

    const decoded = verify(token, process.env.SECRET_KEY_JWT)
    req.userToken = decoded /* {id , rolId} */

    next()
    

  } catch (error) {
    
    return res.status(403).json({
      ok:false,
      status:403,
      msg: error.message || "Error en el token"
    })
  }
}

module.exports = {
  checkToken
}