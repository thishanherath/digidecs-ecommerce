import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export const registerUser = async (req, res) => {  
  try {
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
      
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        firstName,
        lastName,
        email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ message: "Server error" });
  } 
};


// {
//   "firstName": "Dinidu",
//   "lastName": "Thishan",
//   "email": "dinidu@example.com",
//   "password": "password123"
// }


export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user || user.isBlocked) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_KEY,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};