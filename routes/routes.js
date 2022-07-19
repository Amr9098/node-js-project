// const  express = require("express");

const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../lib/db");
const { validateRequest } = require("../middleware/cus_sel");
const cust_selMiddleware = require("../middleware/cus_sel");

router.post("/register", validateRequest, async (req, res, next) => {
  db.query(
    `SELECT * FROM customer WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      if (result.length) {
        return res.status(409).send({
          status: 400,
          message: "This email is already in use!",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).send({
              msg: err,
            });
          } else {
            let name = req.body.name;
            let email = req.body.email;
            // let password = req.body.password;
            // const encryptedPassword = await bcrypt.hash(password, 10)

            var data = {
              name: name,
              email: email,
              password: hash,
            };
            var sql = "insert into customer SET ?;";
            db.query(sql, data, (err) => {
              if (!err) {
                res.send({
                  status: 200,
                  message: " registered sucessfully",
                });
              } else
                res.send({
                  status: 400,
                  message: "error occurred",
                  error: error,
                });
            });
          }
        });
      }
    }
  );
});

router.post("/login", (req, res, next) => {
  db.query(
    `SELECT * FROM customer WHERE email = ${db.escape(req.body.email)};`,
    (err, result) => {
      if (err) {
        throw err;
        return res.status(400).send({
          msg: err,
        });
      }
      if (!result.length) {
        return res.status(401).send({
          msg: "Email or password is incorrect!",
        });
      }
      bcrypt.compare(
        req.body.password,
        result[0]["password"],
        (bErr, bResult) => {
          if (bErr) {
            throw bErr;
            return res.status(401).send({
              msg: "Email or password is incorrect!",
            });
          }
          if (bResult) {
            const token = jwt.sign(
              {
                username: result[0].name,
                userId: result[0].cus_id,
                email: result[0].email,
              },
              "363636",
              {
                expiresIn: "1d",
              }
            );
            db.query(
              `UPDATE customer SET last_login = now() WHERE cus_id = '${result[0].cus_id}'`
            );
            return res
              .cookie("jwt", token, {
                httpOnly: true,
                maxAge: 60*24,
                secure: process.env.NODE_ENV === "production",
              })
              .status(200)
              .json({ message: "Logged in successfully 😊 👌" });
          }
          return res.status(401).send({
            msg: "email or password is incorrect!",
          });
        }
      );
    }
  );
});

router.get("/test", cust_selMiddleware.isLoggedIn, (req, res, next) => {
  console.log(req.userData);
  res.send("TOnly logged in users can see that!");
});

router.put("/logout", cust_selMiddleware.isLoggedIn, function (req, res) {

        res.cookie('jwt', '', {maxAge: 0})
        res.send({
            message: 'success logout'
        })
});
module.exports = router;
