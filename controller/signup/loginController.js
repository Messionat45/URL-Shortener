const userModel = require("../../models/userModel.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

console.log(secretKey);

const login = async (req, res) => {
  try {
    const userData = req.body;
    console.log(userData);

    if (!userData.username || !userData.password)
      return res
        .status(400)
        .json({ message: "both username and password needed" });

    const dbUser = await userModel.findOne({ username: userData.username });

    console.log(dbUser);

    if (!dbUser)
      return res.status(400).json({ message: "user does not exixt" });

    const checkPass = await bcrypt.compare(userData.password, dbUser.password);

    if (checkPass) {
      const jwtToken = await jwt.sign(
        { userId: dbUser._id, username: dbUser.username },
        secretKey,
        { expiresIn: 600000 }
      );

      console.log(jwtToken);

      res.cookie("token", jwtToken, {
        httpOnly: true,
        maxAge: 600000,
      });

      return res.status(200).json({ message: " succesfully logged in" });
    } else return res.status(400).json({ message: "incorrect password" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "some server issue" });
  }
};

module.exports = login;
