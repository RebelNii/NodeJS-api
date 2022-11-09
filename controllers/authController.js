const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { fi } = require("date-fns/locale");
// require("dotenv").config();

const handleLogin = async (req, res) => {
  const { user, password } = req.body;
  // console.log(password)
  if (!user && !password)
    return res
      .status(401)
      .json({ message: "username and password are required" });
  const findUser = await User.findOne({ username: user }).exec();
  // console.log(findUser)
  // const pwdMatch = await bcrypt.compare(pwd, findUser.password)
  if (!findUser)
    return res.status(401).json({ message: "User already exists" });
  
  const pwdMatch = await bcrypt.compare(password, findUser.password);
  // console.log(pwdMatch);
  if (pwdMatch) {
    const roles = Object.values(findUser.roles);
    //create JWTs
    const accessToken = jwt.sign(
      { UserInfo: { username: findUser.username, roles: roles } },
      // {"username": findUser.username},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );

    const refreshToken = jwt.sign(
      { username: findUser.username },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "1d" }
    );
    //this allows me to save refresh token in db and invalidate it when user logs out
    findUser.refreshToken = refreshToken;
    const results = await findUser.save();
    console.log(results);
    // secure: true,
    res.cookie("jwt", refreshToken, {
      httpOnly: true,
      sameSite: "none",
      
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({ accessToken });
  } else {
    res.status(400).json({ message: "error" });
  }
};

module.exports = { handleLogin };
