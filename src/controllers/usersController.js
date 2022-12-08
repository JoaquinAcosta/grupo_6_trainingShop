const db = require("../database/models");
const { validationResult } = require("express-validator");
const bcryptjs = require("bcryptjs");
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
        phone: +phone || 0,
        password: bcryptjs.hashSync(password, 10),
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
  },

  /* profileUpdate: async (req, res) => {
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
      res.status(500).json({
        ok: false,
        status: 500,
        msg: error.message || "Ocurrió un error",
      });
    }
  }, */


  profileUpdate: async (req, res) => {
    try {
      const id = req.params.id;
      const user = await db.User.findByPk(id);
      const { name, lastName, email, phone, avatar } = req.body;
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        user.name = name;
        user.lastName = lastName;
        user.email = email;
        user.phone = phone;
        user.avatar = req.file?.filename || user.avatar;
  
        await user.save();
        return res.redirect("/users/profile")
      } else {
        db.User.findByPk(req.params.id)
      .then(user => {
        return res.render('profile',{user,old :req.body,errors: errors.mapped() })
      })
      }} catch (error) {
      res.status(500).json({
        ok: false,
        status: 500,
        msg: error.message || "Ocurrió un error",
      });
    }
  },


  processLogin: async (req, res) => {
    let errors = validationResult(req);

    if (errors.isEmpty()) {
      try {
        const { email: emailBody, password } = req.body;
        const user = await db.User.findOne({ where: { email: emailBody } });

        const isPassValid = await bcryptjs.compare(password, user.password);
        if (user && isPassValid) {
          req.session.userLogin = user;

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
          });
        }
      } catch (error) {
        console.log(error);
        res.redirect('/users/login')
      }
    } else {
      return res.render("login", { errors: errors.mapped() });
    }
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
      });
      return res.redirect("/admin/users");
    } catch (error) {
      console.log(error);
    }
  },
};
