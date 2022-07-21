// const  express = require("express");

const router = require("express").Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../lib/db");
const { validateRequest } = require("../middleware/cus_sel");
const cust_selMiddleware = require("../middleware/cus_sel");
const order_controller = require('../controllers/order_controler');
const product_controller = require('../controllers/product');
const AuthController = require('../controllers/AuthController');
const OrdersToConfirm = require('../controllers/OrdersToConfirm');
const profile = require('../controllers/profile');




router.post("/register", validateRequest, AuthController.register);
router.post("/login",  AuthController.login);
router.put("/logout",  cust_selMiddleware.isLoggedIn, AuthController.logout);
router.get("/test", cust_selMiddleware.isLoggedIn, AuthController.test);


router.post('/order',cust_selMiddleware.isLoggedIn, order_controller.neworder);
router.get('/get_order',cust_selMiddleware.isLoggedIn, order_controller.getorder);
router.delete('/delete_order/:ord_id',cust_selMiddleware.isLoggedIn, order_controller.deleteorder);
router.delete('/delete_all',cust_selMiddleware.isLoggedIn, order_controller.deleteall);




router.post('/create',cust_selMiddleware.isLoggedIn, product_controller.createproduct);
router.get('/product', product_controller.allproducts);
router.delete('/delproduct/:pro_id',cust_selMiddleware.isLoggedIn, product_controller.deleteproducts);
router.put('/product/:pro_id',cust_selMiddleware.isLoggedIn, product_controller.UPDATEproducts);
router.get('/myproducts',cust_selMiddleware.isLoggedIn, product_controller.myproducts );



router.get('/getOrdersToConfirm',cust_selMiddleware.isLoggedIn, OrdersToConfirm.orders_to_cofirm);
router.put('/confirmOrder',cust_selMiddleware.isLoggedIn, OrdersToConfirm.confirm_order);
router.delete('/rejectOrder/:ord_id',cust_selMiddleware.isLoggedIn, OrdersToConfirm.reject_order);


router.get('/profile',cust_selMiddleware.isLoggedIn, profile.profile_data);
router.put('/updateProfile',validateRequest,cust_selMiddleware.isLoggedIn, profile.profile_update);


module.exports = router;
