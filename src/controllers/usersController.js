const db = require('../database/models');
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const { promiseImpl } = require('ejs');


module.exports = {
  register: (req, res) => {
    db.User.findAll()
      .then((user) => {
        console.log(user);
        return res.render("register", { title: "Register" });
      })
      .catch((err) => console.log(err));
  },
    processRegister: (req, res) => {
       let errors = validationResult(req)
        if (errors.isEmpty()) {
            const { name, email, password,phone, lastName } = req.body;
            
        db.User.create({
            name: name.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            phone: +phone,
            password: bcryptjs.hashSync(password, 10),
            rolId: 2,
            avatar: "default-image.png",
            createdAt: new Date(),
          })
          .then(() => {
            res.redirect('/users/login')
        })
        .catch(error => console.log(error))
        }
        else {
            return res.render('register', { errors: errors.mapped(), old: req.body })
        }
    },

    login:(req, res)=>{
        db.User.findAll()
            .then((user) => {
                console.log(user)
                return res.render('login',{title : 'Login'})
            })
            .catch((error) => console.log(error));
    },
    profile:(req,res) => {
        const userlogged = req.session.userLogin.id
        db.User.findByPk(userlogged)
       .then(user => res.render('profile', {
                title: 'Mi perfil', userlogged, user
              
        })) 
            .catch(error => console.log(error))
},         

/*     profileUpdate:(req,res) =>{
        db.Users.profileUpdate({
            ...req.body,
            name : req.body.name,
            email : req.body.email,
            avatar : req.body.avatar,
            phone : req.body.phone,
            lastName : req.body.lastName,
        })
        .then(user => {

            if(){

            }

        })
        .catch(error => console.log(error))
    },
 */
     profileUpdate:(req,res) =>{

        let errors = validationResult(req);
        if (errors.isEmpty()){
            const users= loadUsers();
            const {name,email,avatar,phone,lastName} = req.body;
            const userlogged = users.find(user => user.id === req.session.userLogin.id);
            
            const userModify = users.map(user => {
                if(user.id === +req.params.id){
                    return{...user,
                    name: name.trim(),
                    lastName : lastName.trim(),
                    email: email.trim(),
                    phone: +phone,
                    avatar : req.file ? req.file.filename : userlogged.avatar
                }
                }
                return user
            });
            
            storeUsers(userModify);
		    return res.redirect('/users/profile');
        }else {
            const users= loadUsers();
            const userlogged = users.find(user => user.id === req.session.userLogin.id)
            return res.render('profile', { errors: errors.mapped(), old: req.body, userlogged,users});
        }
        //test//
		
    },


    processLogin: async(req, res) => {
        //nota: agregar el if con las validaciones, tambien ya puede leer los datos de profile :)
        let errors = validationResult(req);

            try{
           const {email} = req.body;
           const user = await db.User.findOne({ where: { email } });
           
                req.session.userLogin ={
                    name: user.name,
                    lastname: user.lastname,
                    avatar:user.avatar,
                    rolId: user.rolId }
            
            return res.redirect('/')
                
            }catch(error){
                console.log(error)
            }
           /*  const {email, password} = req.body
            const { rolId,name,lastname,avatar } = db.User.findOne({ where: { email } })
            .then( ()=> res.redirect('/'))
            .catch(error => console.log(error))

            req.session.userLogin ={
                name,
                lastname,
                rolId,
                avatar};

                if (req.body.remember) {
                    res.cookie('trainingshop', req.session.userLogin, {
                        maxAge : 1000 * 600
                    })
                }
                console.log(req.session.userLogin)
                return res.redirect('/')
            }else {
                return res.render('login', {errors: errors.mapped()})
                
            } */

    }
    ,
    logout : (req,res) => {
        req.session.destroy();
        res.cookie('trainingshop',null,{maxAge: -1});
        return res.redirect('/')
    }   
}