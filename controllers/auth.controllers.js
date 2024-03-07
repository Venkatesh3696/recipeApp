const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const mySecret = process.env.mySecret;

const User = require("../models/users.model");

const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await new User({
      username: username,
      password: hashedPassword,
    });
    newUser.save();
    res.status(201).json({ message: "user created" });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(404).json({ message: "invalid Password" });
    }

    const jwtToken = jwt.sign({ userId: user.id }, mySecret, {
      expiresIn: "1h",
    });

    res.json({ jwtToken });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getProfile = async (req, res) => {
  try {
    const { userId } = req;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json({ username: user.username });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, getProfile };
