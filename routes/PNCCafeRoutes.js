const express = require('express');
const {verifyUser, getUser, addUser} = require('../controller/AuthenticationController')
const {addMenu, editMenu, deleteMenu, getMenu, getMenuByID} = require('../controller/MenuController')
const {getCartItem, addQuantity, addToBag, getCartItems, removeItem} = require('../controller/CartController')
const {getUsers, getUserByID, updateUserWithID, deleteUserAccount} = require('../controller/UsersController')
const {addOrder, getOrders, setOrderAsCancelled, getOrdersWithStatus, setOrderAs, getMonthlySales, getNumberOfMenus
, getTodaysOrders} = require('../controller/OrdersController')
const {verifyAdmin} = require('../controller/AdminAuthController')

var mysql  = require('mysql');

const route = express.Router();

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'password',
  database : 'food_hub'
});

connection.connect((err) => {
    if (err)
        console.log(err)

    console.log('connected to food_hub')
});


/** ROUTES FOR AUTHENTICATING A USER */
route.post('/verify-user', verifyUser)

route.post('/get-user', getUser)

route.post('/add-user', addUser);


// ROUTES FOR MENU
route.post('/add-menu', addMenu)

route.post('/get-menu', getMenu)

route.post('/get-menu-id', getMenuByID)

route.post('/edit-menu', editMenu)

route.delete('/delete-menu', deleteMenu)


// ROUTES FOR CART
route.post('/get-cart-item', getCartItem)

route.post('/add-quantity', addQuantity)

route.post('/add-to-bag', addToBag)

route.post('/get-cart-items', getCartItems)

route.post('/remove-item', removeItem)

// ROUTES FOR USERS' DETAILS
route.get('/users', getUsers)
route.post('/user-id', getUserByID)
route.post('/update-with-id', updateUserWithID)
route.delete('/delete-user', deleteUserAccount)


// ORDER
route.post('/add-order', addOrder)
route.post('/set-as-cancelled', setOrderAsCancelled)
route.post('/get-order-with-status', getOrdersWithStatus)
route.get('/get-orders', getOrders)
route.post('/set-order-as', setOrderAs)
route.post('/get-monthly-sales', getMonthlySales)
route.post('/verify-admin', verifyAdmin)
route.get('/get-total-menus', getNumberOfMenus)
route.get('/get-todays-orders', getTodaysOrders)
module.exports = route;