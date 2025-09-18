import User from '../models/userDataModel.js'
import generateToken from '../utils/generateTokens.js'
import bcrypt from 'bcryptjs';


export const signupUser = async (req, res) => {
  try {
    const { userName, email, password } = req.body;
    console.log(req.body);

    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({ userName, email, password: hashedPassword });
    if (user) {
      res.status(200).json({
        _id: user._id,
        userName: user.userName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: "Invalid user data" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
