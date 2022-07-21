const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../lib/db");
const { validateRequest } = require("../middleware/cus_sel");
const router = require("express").Router();





  const createproduct = (req, res, next) => {
    let product = req.body;
    var query = "insert into product (name , description ,photo,price,sel_id,sel_name) values(?,?,?,?,?,?)";
    db.query(query, [product.name, product.description, product.photo,product.price,req.userData.userId,req.userData.username], (err, results) => {
        if (!err) {
            return res.status(200).json({ message: "Product Added Successfully" });
        }
        else
            return res.status(500).json(err);
    });
  };

  const allproducts = (req, res, next) => {
    var query = "select * from product";
    db.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else
            return res.status(500).json(err);
    });


  }
//   const productsbyid = (req, res, next) => {
//     var query = `select * from product where sel_id = '${req.body.sel_id}'`;
//     db.query(query, (err, results) => {
//         if (!err) {
//             return res.status(200).json(results);
//         }
//         else
//             return res.status(500).json(err);
//     });


//   }




  const UPDATEproducts = (req, res, next) => {
    const pro_id = req.params.pro_id;
    let product = req.body;
    var query = "update product set name=?,description=?,photo=?,price=? where pro_id=?";
    db.query(query, [product.name, product.description, product.photo, product.price,pro_id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product Id does not Exist" });
            }
            return res.status(200).json({ message: "Product Updated Successfully" });
        }
        else
            return res.status(500).json(err);
    });


  }
  const deleteproducts= (req, res, next) => {

    const pro_id = req.params.pro_id;
    var query = "delete from product where pro_id=?";
    db.query(query, [pro_id], (err, results) => {
        if (!err) {
            if (results.affectedRows == 0) {
                return res.status(404).json({ message: "Product id does not Exist" });
            }
            return res.status(200).json({ message: "Product Deleted Successfully" });
        }
        else
            return res.status(500).json(err);
    });

  }


  const myproducts = (req, res, next) => {

    let sel_id = req.userData.userId;

    var query = `select * from product where sel_id=${sel_id}`;
    db.query(query, (err, results) => {
        if (!err) {
            return res.status(200).json(results);
        }
        else
            return res.status(500).json(err);
    });


  }








  module.exports = {createproduct ,UPDATEproducts,allproducts,deleteproducts, myproducts };