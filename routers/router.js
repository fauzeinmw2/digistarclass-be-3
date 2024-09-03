const express = require("express");
const userHandler = require('../handlers/user_handler');
const roleHandler = require('../handlers/role_handler');
const orderHandler = require('../handlers/order_handler');
const jwtAuth = require('../middlewares/jwt');
const { authenticatePassportJwt } = require('../middlewares/passport-jwt');

// Create a router
const router = express.Router();

// User routes
router.post("/user/login", userHandler.login);
router.post("/user/register", userHandler.register);
router.get("/user", userHandler.getList);
router.get("/user/:id", userHandler.getOneByUserId);
router.put("/user/:id", userHandler.updateOne);
router.delete("/user/:id", userHandler.deleteOne);

// Role routes
router.post("/role", roleHandler.create);
router.get("/role", roleHandler.getList);
router.get("/role/:id", roleHandler.getById);
router.put("/role/:id", roleHandler.updateOne);
router.delete("/role/:id", roleHandler.deleteOne);

// Order routes
router.post("/order", jwtAuth, orderHandler.create);
router.get("/order", authenticatePassportJwt(), orderHandler.getList);
router.get("/order/:id", authenticatePassportJwt(), orderHandler.getOneByOrderId);
router.put("/order/:id", authenticatePassportJwt(), orderHandler.updateOne);
router.delete("/order/:id", authenticatePassportJwt(), orderHandler.deleteOne);

module.exports = router;