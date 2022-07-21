const db = require("../lib/db");


const orders_to_cofirm = (req, res, next) => {
    let sel_id = req.userData.userId;
      var sql = ` SELECT pro_order.ord_id as order_id, customer.name as customer_name, 
      customer.cus_id as customer_id,    product.*
      FROM ((pro_order INNER JOIN product ON pro_order.pro_id = product.pro_id) 
      INNER JOIN customer ON customer.cus_id = product.sel_id)
       WHERE product.sel_id=${sel_id};`;
    db.query(sql,  (err, rows ) => {
        if (!err) {
          res.send(rows);
        }
        else
            res.send(err);
    })  
  };


  const confirm_order= (req, res, next) => {
  
    db.query('delete from pro_order where ord_id=?', [req.params.ord_id], (err) => {
        if (!err)
            res.send( {'msg':'order confirmed successfully.','status':'confirmed'})
        else
            res.send(err);
    });








    
  };


  const reject_order= (req, res, next) => {
   
    db.query('delete from pro_order where ord_id=?', [req.params.ord_id], (err) => {
        if (!err)
            res.send({'msg':'order rejected and removed from orders successfully.','status':'rejected'})
        else
            res.send(err);
    });



  };





  module.exports = { orders_to_cofirm, confirm_order,reject_order};