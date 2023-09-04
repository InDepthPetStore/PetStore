const pool = require("../database-mysql");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
    const { fullname, email, password, phone, shipping } = req.body;
    if (!fullname || !email || !password || !phone || !shipping) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const [existingUser] = await pool.query('SELECT * FROM clients WHERE email = ?', [email]);
  
      if (existingUser.length > 0) {
        return res.status(401).json({ message: "User already exists" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const [result] = await pool.query('INSERT INTO clients (fullname, email, password, phone, shipping) VALUES (?, ?, ?, ?, ?)', [fullname, email, hashedPassword, phone, shipping]);
      const userId = result.insertId;
  
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: userId,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1m' }
      );
  
      const refreshToken = jwt.sign(
        {
          UserInfo: {
            id: userId,
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
  
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        // secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      res.json({
        accessToken,
        email,
        fullname,
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  const registerAdmin = async (req, res) => {
    const {  email, password} = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const [existingUser] = await pool.query('SELECT * FROM admin WHERE email = ?', [email]);
  
      if (existingUser.length > 0) {
        return res.status(401).json({ message: "User already exists" });
      }
     else{
      const hashedPassword = await bcrypt.hash(password, 10);
  
      const [result] = await pool.query('INSERT INTO admin (email, password) VALUES (?, ?)', [email, hashedPassword]);
      const userId = result.insertId;
  
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: userId,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1m' }
      );
  
      const refreshToken = jwt.sign(
        {
          UserInfo: {
            id: userId,
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );}
  
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        // secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      res.json({
        accessToken,
        email
      });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };
  const loginClient = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const [foundUser] = await pool.query('SELECT * FROM clients WHERE email = ?', [email]);
  
      if (foundUser.length === 0) {
        return res.status(401).json({ message: "User does not exist" });
      }
  
      const match = await bcrypt.compare(password, foundUser[0].password);
  
      if (!match) {
        return res.status(401).json({ message: "Wrong Password" });
      }
  
      const userId = foundUser[0].idclient;
  
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: userId,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1m' }
      );
  
      const refreshToken = jwt.sign(
        {
          UserInfo: {
            id: userId,
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
  
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        // secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      res.json({
        accessToken,
        email,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

  const loginAdmin = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const [foundUser] = await pool.query('SELECT * FROM admin WHERE email = ?', [email]);
  
      if (foundUser.length === 0) {
        return res.status(401).json({ message: "User does not exist" });
      }
  
      const match = await bcrypt.compare(password, foundUser[0].password);
  
      if (!match) {
        return res.status(401).json({ message: "Wrong Password" });
      }
  
      const userId = foundUser[0].idadmin;
  
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: userId,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1m' }
      );
  
      const refreshToken = jwt.sign(
        {
          UserInfo: {
            id: userId,
          },
        },
        process.env.REFRESH_TOKEN_SECRET,
        { expiresIn: "7d" }
      );
  
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        sameSite: "None",
        // secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });
  
      res.json({
        accessToken,
        email,
      });
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  };

const refreshClient = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.status(401).json({ message: "Unauthorized" });
  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      const foundUser = await pool.query('SELECT * FROM clients WHERE idclient = ?', [decoded.UserInfo.id])
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.json({ accessToken });
    }
  );
};
const refreshAdmin = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) res.status(401).json({ message: "Unauthorized" });
  const refreshToken = cookies.jwt;
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET,
    async (err, decoded) => {
      if (err) return res.status(403).json({ message: "Forbidden" });
      const foundUser = await pool.query('SELECT * FROM admin WHERE idadmin = ?', [decoded.UserInfo.id])
      if (!foundUser) return res.status(401).json({ message: "Unauthorized" });
      const accessToken = jwt.sign(
        {
          UserInfo: {
            id: foundUser._id,
          },
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );
      res.json({ accessToken });
    }
  );
};
const logout = (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.sendStatus(204); //No content
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "None",
    // secure: true,

  });
  res.json({ message: "Cookie cleared" });
};
module.exports = {
  register,
  registerAdmin,
  loginClient,
  loginAdmin,
  refreshAdmin,
  refreshClient,
  logout,
};
