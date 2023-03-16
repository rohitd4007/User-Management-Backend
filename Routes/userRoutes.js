const express = require("express")
const userController = require("../Controllers/userController")
const Route = express.Router()

// console.log('came here',)

Route
    .route('/')
    .get(userController.getAllUser)
    .post(userController.createUser)

Route
    .route('/:id')
    .get(userController.getUser)
    .patch(userController.updateUser)
    .put(userController.updateUser)
    .delete(userController.deleteUser)
module.exports = Route;