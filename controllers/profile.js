const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../lib/db");
const { validateRequest } = require("../middleware/cus_sel");


const profile_data=(req, res) => {
    let cus_id = req.userData.userId;

    db.query(`select name,email from customer where cus_id=${cus_id}`, (err,data) => {
        if (!err)
            res.status(200).send(data);
        else
            res.send(err);
    });



}


const profile_update=(req, res) => {
    let cus_id = req.userData.userId;

    db.query(`update  customer set email='${req.body.email}' , name='${req.body.name}'  where cus_id=${cus_id}`, (err,data) => {
        if (!err)
            res.status(200).send("update done");
        else
            res.send(err);
    });



}



module.exports = {profile_data,profile_update };