const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.signup = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Hashing password during signup
    // const hashedPassword = await bcrypt.hash(password.trim(), 10);
    const newUser = new User({
      username: username.trim(),
      email: email.trim(),
      password: password.trim(),
  });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// exports.login = async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email: email.trim() });

//     if (!user) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Compare provided password with hashed password in database
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid credentials" });
//     }

//     // Set the userId in the session after successful login
//     req.session.userId = user._id; // Ensure user ID is stored in session

//     res.json({ message: "Login successful", userId: user._id }); // Send a success response
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };
exports.login = async (req, res) => {
  try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });

      if (!user) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      console.log('Provided password:', password); // Log the provided password
      console.log('Stored password hash:', user.password); // Log the stored password hash

      // Compare provided password with hashed password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log('Password match:', isMatch); // Log whether password matched

      if (!isMatch) {
          return res.status(400).json({ message: "Invalid credentials" });
      }

      // Proceed if credentials are valid
      req.session.userId = user._id;
      res.json({ message: "Login successful", userId: user._id });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.logout = (req, res) => {
  // Destroy the session
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Could not log out" });
    }
    res.json({ message: "Logged out successfully" });
  });
};
