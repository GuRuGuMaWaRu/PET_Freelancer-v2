const express = require("express");
const { check } = require("express-validator");

const loginLimiter = require("../../middleware/loginLimiter");
const { protect, validateForm } = require("../../utils");
const authControllers = require("./auth.controllers");
const userControllers = require("./user.controllers");

const router = express.Router();

//* Authorization routes
/**
 * @route     GET getUser/
 * @desc      Get my user details
 * @access    Private
 */
router.get("/getUser", protect, authControllers.getUser);
/**
 * @route     POST login/
 * @desc      Log in with username and password
 * @access    Public
 */
router.post(
  "/login",
  loginLimiter,
  [
    check("email", "Please provide valid email").isEmail(),
    check("password", "Please provide password").exists(),
  ],
  validateForm,
  authControllers.login,
);
/**
 * @route     POST signup/
 * @desc      Register a new user
 * @access    Public
 */
router.post(
  "/signup",
  [
    check("name", "Please add name")
      .not()
      .isEmpty(),
    check("email", "Please provide valid email").isEmail(),
    check(
      "password",
      "Please enter a password with 6 or more characters",
    ).isLength({ min: 6 }),
  ],
  validateForm,
  authControllers.signup,
);

//* Admin routes
router.use(protect);

router
  .route("/")
  /**
   * @route     GET users/
   * @desc      Get all users
   * @access    Private
   */
  .get(userControllers.getAll);

router
  .route("/:id")
  /**
   * @route     GET users/:id
   * @desc      Get user
   * @access    Private
   */
  .get(userControllers.getOne)
  /**
   * @route     DELETE users/:id
   * @desc      Delete user
   * @access    Private
   */
  .delete(userControllers.deleteOne);

module.exports = router;
