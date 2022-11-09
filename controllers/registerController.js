const User = require('../model/User')

// const fss = require("fs").promises;
// const path = require("path");
const bcrypt = require("bcrypt");

const newUserHandler = async (req, res) => {
  //
  const { user, pwd } = req.body;
  // console.log(user)
  if (!user && !pwd)
    return res
      .status(400)
      .json({ message: "username and password are required" });
  //check for duplication
  const duplicate = await User.findOne({username: user}).exec()
  // const getty = usersDB.users;
  // const duplicate = getty.find((persons) => persons.username === user);
  // const duplicate = usersDB.users.find((persons) => {const newLocal = persons.username === user;});
  if (duplicate) {
    return res.status(409).json({ message: "User already exists" });
  } else {
    try {
      //first we encrypt password
      const hassPwd = await bcrypt.hash(pwd, 10);
      //now save details
      const result = await User.create({
        "username": user,
        "password": hassPwd
      })
      console.log(result)
      res.status(200).json({ message: `${user} created` });
    } catch (err) {
      console.log(err);
      res.status(500).json({ message: err.message });
    }
  }
};

module.exports = { newUserHandler };
