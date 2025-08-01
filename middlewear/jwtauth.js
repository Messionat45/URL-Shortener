const jwt = require("jsonwebtoken");
const secretKey = process.env.JWT_SECRET;

const auth = async (req, res, next) => {
  const jwtToken = req.cookies.token;
  console.log("middlesware", jwtToken);
  if (!jwtToken)
    return res
      .status(200)
      .json({ message: "No token found, u need to login again" });

  try {
    const jwtDecode = await jwt.verify(jwtToken, secretKey);
    console.log("authpage", jwtDecode);
    console.log("login middleware succefully sent");
    req.loggedUser = jwtDecode;
    next();
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ message: "issue, login again" });
  }
};

module.exports = auth;
