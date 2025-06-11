const userModel = require("../../models/userModel.js");
const bcrypt = require("bcrypt");

const signUp = async (req, res) => {
  try {
    const userData = req.body;

    if (!userData.username || !userData.password) {
      return res
        .status(400)
        .json({ message: "require both username and password" });
    }

    const dbUserData = await userModel.findOne({ username: userData.username });

    if (dbUserData)
      return res.status(400).json({ message: "username alredy exists" });
    else {
      const userProfile = {
        username: userData.username,
        password: await bcrypt.hash(userData.password, 9),
      };

      await userModel.create(userProfile);
      return res.status(200).json({ message: "acc created " });
    }
  } catch (error) {}
};

module.exports = signUp;
