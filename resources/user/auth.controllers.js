const jwt = require("jsonwebtoken");

const AppError = require("../../utils/appError");
const catchAsync = require("../../utils/catchAsync");
const User = require("./user.model");

// Helper functions
const newToken = (payload) => {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(400, "All fields are required"));
  }

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    return next(new AppError(400, "Invalid credentials"));
  }

  const match = await foundUser.comparePasswords(password, foundUser.password);

  if (!match) {
    return next(new AppError(400, "Invalid credentials"));
  }

  const payload = {
    id: foundUser._id,
  };

  jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
    (err, token) => {
      if (err) throw err;
      res.status(200).json({
        status: "success",
        message: `${foundUser.name} logged in successfully`,
        data: { name: foundUser.name, email, token },
      });
    },
  );
});

const getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.userId)
    .select("-password -_id -__v")
    .lean()
    .exec();

  //** Return early if no user found for the given userId */
  if (!user) {
    return next(
      new AppError(406, "Token is invalid, there is no corresponding user"),
    );
  }

  //** Get new token */
  const payload = {
    id: user._id,
  };

  jwt.sign(
    payload,
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN },
    (err, token) => {
      if (err) throw err; //** TODO: need to test if I need AppError here */

      res.status(200).json({
        status: "success",
        message: `${user.name} logged in successfully`,
        data: { ...user, token },
      });
    },
  );
});

const signup = catchAsync(async (req, res, next) => {
  // Handle errors on Registration form
  const { name, email, password } = req.body;

  const duplicate = await User.findOne({ email })
    .lean()
    .exec();

  if (duplicate) {
    return next(new AppError(409, "User already exists"));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  if (user) {
    const token = newToken({ id: user._id });

    return res.status(201).json({
      status: "success",
      message: `${user.name} registered successfully`,
      data: { name, email, token },
    });
  } else {
    return next(new AppError(400, "Invalid user data received"));
  }
});

module.exports = {
  login,
  getUser,
  signup,
};
