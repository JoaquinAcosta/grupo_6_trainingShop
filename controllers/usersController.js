module.exports={
    register:(req, res)=>{
        return res.render('register',{
            title:'Register'
        })
    },
    login:(req, res)=>{
        return res.render('login',{
            title:'Login'
        })
    },
    profile:(req,res)=>{
        return res.render('profile',{
            title: 'Mi Perfil'
        })
    }
}