const db = require("../database/models");
const { validationResult } = require("express-validator");
const { hashSync, compare, hash } = require("bcryptjs");
const { promiseImpl } = require("ejs");

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
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const { name, email, password, phone, lastName } = req.body;

      db.User.create({
        name: name.trim(),
        lastName: lastName.trim(),
        email: email.trim(),
        phone: +phone,
        password: hashSync(password, 10),
        rolId: 2,
        avatar: "default-image.png",
        createdAt: new Date(),
      })
        .then(() => {
          res.redirect("/users/login");
        })
        .catch((error) => console.log(error));
    } else {
      return res.render("register", { errors: errors.mapped(), old: req.body });
    }
  },

  login: (req, res) => {
    db.User.findAll()
      .then((user) => {
        console.log(user);
        return res.render("login", { title: "Login" });
      })
      .catch((error) => console.log(error));
  },
  profile: async (req, res) => {
    try {
      const id = req.session.userLogin.id;
      const user = await db.User.findByPk(id);

      return res.render("profile", {
        user,
      });
    } catch (error) {
      console.log(error);
    }

    /*   const userlogged = req.session.userLogin.id
        db.User.findByPk(userlogged)
       
        .then((user)=>res.send(user)) */

    /* .then(user => res.render('profile', {
                title: 'Mi perfil', userlogged, user
              
        })) */
    /* .catch(error => console.log(error)) */
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
  profileUpdate: async (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      try {
        const id = req.params.id;
        const user = await db.User.findByPk(id);
        const { name, lastName, email, phone, avatar } = req.body;

        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;
        user.avatar = req.file?.filename || user.avatar;

        await user.save();
        return res.redirect("/users/profile");
      } catch (error) {
        console.log(error);
      }
    } else {
      const id = req.params.id;
      const user = await db.User.findByPk(id);
      return res.render("profile", {
        errors: errors.mapped(),
        old: req.body,
        user,
      });
    }

    /*  try{
            
            const {name,lastName,email,phone,avatar} = req.body;
            const user= await db.Users.Update({
                ...req.body,
                name: name.trim(),
                lastName: lastName.trim(),
                email: email.trim(),
                phone,
                avatar: 'default-image.png'
            },
            {
                where: {
                  id: req.params.id,
                },
              },)

            return res.send(user);

        }catch(error){
            console.log(error);
        }
 */
    /*  let errors = validationResult(req);
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
        } */
  },

  //test//

  processLogin: async (req, res) => {
    //nota: agregar el if con las validaciones, tambien ya puede leer los datos de profile :)

    let errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        const { email, password } = req.body;
        const {
          id,
          name,
          lastName,
          avatar,
          rolId,
          email: emailUser,
          phone,
          password: passwordHash,
        } = await db.User.findOne({ where: { email } });

        const isPassValid = await compare(password, passwordHash);
        if (isPassValid && email == emailUser) {
          req.session.userLogin = {
            id,
            name,
            lastName,
            avatar,
            rolId,
            email: emailUser,
            password: passwordHash,
            phone: phone || 0,
          };

          if (req.body.remember) {
            res.cookie("trainingshop", req.session.userLogin, {
              maxAge: 1000 * 600,
            });
          }

          return res.redirect("/");
        } else {
          return res.render("login", {
            errors: errors.mapped(),
            old: req.body,
            // validaciones con db
          });
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      return res.render("login", { errors: errors.mapped() });
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
                
            } 

     */
  },

  logout: (req, res) => {
    req.session.destroy();
    res.cookie("trainingshop", null, { maxAge: -1 });
    return res.redirect("/");
  },

  destroy: async (req, res) => {
    try {
        await db.User.destroy({
          where: {
            id: req.params.id,
          },
        })
        return res.redirect('/admin/users')
        
    } catch (error) {console.log(error)}

  },
};
