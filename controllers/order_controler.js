
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../lib/db");
const { validateRequest } = require("../middleware/cus_sel");
const router = require("express").Router();



const neworder = (req, res, next) => {


    let cus_id = req.userData.userId;
    let pro_id = req.body.pro_id;


    var data = {
        cus_id: cus_id,
        pro_id: pro_id,

      };
      var sql = "insert into pro_order SET ?;";
    db.query(sql, data, (err, rows, ) => {
        if (!err) {
          res.status(200).send('record has been inserted')
        }
        else
            res.send(err);
    })
};

const getorder = (req, res, next) => {
  let cus_id = req.userData.userId;
    var sql = ` SELECT pro_order.ord_id as order_id, customer.name as seller_name, product.*
    FROM ((pro_order INNER JOIN product ON pro_order.pro_id = product.pro_id)
    INNER JOIN customer ON customer.cus_id = product.sel_id)
     WHERE pro_order.cus_id=${cus_id};`;
  db.query(sql,  (err, rows ) => {
      if (!err) {
        res.send(rows);
      }
      else
          res.send(err);
  })
};

const deleteorder = (req, res, next) => {
//
  db.query('delete from pro_order where ord_id=?', [req.params.ord_id], (err) => {
    if (!err)
        res.send('Record deleted successfully.')
    else
        res.send(err);
});
};

const deleteall = (req, res, next) => {
  //
  let cus_id = req.userData.userId;
    db.query('delete from pro_order where cus_id=?', [cus_id], (err) => {
      if (!err)
          res.send('Record deleted successfully.')
      else
          res.send(err);
  })
  };




module.exports = {neworder,getorder, deleteorder,deleteall };