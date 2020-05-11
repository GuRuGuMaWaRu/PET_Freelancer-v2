const express = require("express");
const { check } = require("express-validator");

const userController = require("../controllers/userController");
const { validateForm } = require("../middleware/validation");

const router = express.Router();

router
  // @route     POST users/signup/
  // @desc      Create user
  // @access    Public
  .post(
    "/signup",
    [
      check("name", "Please add name")
        .not()
        .isEmpty(),
      check("email", "Please add email").isEmail(),
      check(
        "password1",
        "Please enter a password with 6 or more characters"
      ).isLength({ min: 6 })
    ],
    validateForm,
    userController.registerUser
  );

//--> Generic API routes (should be admin-only)

router
  .route("/")
  // @route     GET users/
  // @desc      Get all users
  // @access    Private
  .get(userController.getAllUsers)
  // @route     POST users/
  // @desc      Create user
  // @access    Private
  .post(userController.createUser);

router
  .route("/:id")
  // @route     GET users/:id
  // @desc      Get user
  // @access    Private
  .get(userController.getUser);

module.exports = router;
