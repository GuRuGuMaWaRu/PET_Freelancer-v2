const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");

const User = require("../models/User");

module.exports = {
  login: async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid credentials" });
      }

      const payload = {
        user: {
          id: user._id
        }
      };

      jwt.sign(
        payload,
        process.env.JWTSECRET,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  },
  get: async (req, res) => {
    try {
      const user = await User.findById(req.user.id).select("-password");
      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ error: err.message });
    }
  }
};
