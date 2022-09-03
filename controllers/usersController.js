const { loadUsers, storeUsers } = require('../data/db')
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')

module.exports = {
    register:(req, res)=>{
        return res.render('register',{
            title:'Register'
        })
    },

    processRegister: (req, res) => {
       let errors = validationResult(req)
        if (errors.isEmpty()) {
            const { name, email, password } = req.body;
            let users = loadUsers()

            let newUsers = {
                id: users.length > 0 ? users[users.length - 1].id + 1 : 1,
                name: name.trim(),
                email: email.trim(),
                password: bcryptjs.hashSync(password, 10)
            }

            let userModify = [...users, newUsers];
            storeUsers(userModify)

            return res.redirect('login')
        }
        else {
            return res.render('register', { errors: errors.mapped(), old: req.body })
        }
    },

    login:(req, res)=>{
        return res.render('login',{
            title:'Login'
        })
    },

    profile:(req,res)=>{
        const users = loadUsers();
        const userlogged = users.find(user => user.id === req.session.userLogin.id)
        return res.render('profile',{
            title: 'Mi Perfil',
            userlogged,
            users
        })
    },

    profileUpdate:(req,res) =>{
        const users= loadUsers()
		const {name,email,password,phone} = req.body
		const userModify = users.map(user => {
			if(user.id === +req.params.id){
				return{...user,
				name: name.trim(),
			    email: email.trim(),
                phone,
                password
			}
			}
			return (users)
		})
		storeUsers(userModify)
		return res.redirect('/users/profile')
    },

    processLogin : (req,res) => {
        let errors = validationResult(req);
        if(errors.isEmpty()){
        let {id,name,/* username, rol, avatar */} = loadUsers().find(user => user.email === req.body.email);
        req.session.userLogin ={
            id,
            name,
            /* username,
            rol,
            avatar */ };
            return res.redirect('/users/profile')
        }else {
            return res.render('login', {errors: errors.mapped()})
            
        }

    }
}