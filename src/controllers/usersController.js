const db = require("../database/models");
const { loadUsers, storeUsers } = require("../data/db");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
const sequelize = db.sequelize;
module.exports = {
  register: (req, res) => {
    db.User.findAll()
      .then((user) => {
        console.log(user);
        return res.render("register", { title: "Register" });
      })
      .catch((err) => console.log(err));
    /* return res.render('register',{
            title:'Register'
        }) */
  },
  processRegister: async (req, res) => {
    try {
        let errors = validationResult(req);
        if (errors.isEmpty()) {
          const { name, email, password, phone, lastName } = req.body;
          await db.User.create({
            name: name.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            phone: +phone,
            password: bcryptjs.hashSync(password, 10),
            rolId: 2,
            avatar: "default-image.png",
            createdAt: new Date(),
          })
        } else {
            return res.render("register", { errors: errors.mapped(), old: req.body });
          }         
    } catch (error) {
        console.log(error)
    }       
  },

  login: (req, res) => {
    return res.render("login", {
      title: "Login",
    });
  },

  profile: (req, res) => {
    const users = loadUsers();
    const userlogged = users.find(
      (user) => user.id === req.session.userLogin.id
    );
    return res.render("profile", {
      title: "Mi Perfil",
      userlogged,
      users,
    });
  },

  profileUpdate: (req, res) => {
    let errors = validationResult(req);
    if (errors.isEmpty()) {
      const users = loadUsers();
      const { name, email, avatar, phone, lastName } = req.body;
      const userlogged = users.find(
        (user) => user.id === req.session.userLogin.id
      );

      const userModify = users.map((user) => {
        if (user.id === +req.params.id) {
          return {
            ...user,
            name: name.trim(),
            lastName: lastName.trim(),
            email: email.trim(),
            phone: +phone,
            avatar: req.file ? req.file.filename : userlogged.avatar,
          };
        }
        return user;
      });

      storeUsers(userModify);
      return res.redirect("/users/profile");
    } else {
      const users = loadUsers();
      const userlogged = users.find(
        (user) => user.id === req.session.userLogin.id
      );
      return res.render("profile", {
        errors: errors.mapped(),
        old: req.body,
        userlogged,
        users,
      });
    }
    //test//
  },
  processLogin: (req, res) => {
    /*  return res.send(req.body.remember) */
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      let { id, name, lastName, rol, avatar } = loadUsers().find(
        (user) => user.email === req.body.email
      );
      req.session.userLogin = {
        id,
        name,
        lastName,
        rol,
        avatar,
      };

      if (req.body.remember) {
        res.cookie("trainingshop", req.session.userLogin, {
          maxAge: 1000 * 600,
        });
      }
      return res.redirect("/users/profile");
    } else {
      return res.render("login", { errors: errors.mapped() });
    }
  },
  logout: (req, res) => {
    req.session.destroy();
    res.cookie("trainingshop", null, { maxAge: -1 });
    return res.redirect("/");
  },
};
