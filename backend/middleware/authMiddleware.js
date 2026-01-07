import jwt from "jsonwebtoken";
import User from "../models/userDataModel.js";

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_secret);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (error) {
      return res.status(401).json({ message: "Invalid token" });
    }
  }

  // 6️⃣ No token
  if (!token) {
    return res.status(401).json({ message: "No token, authorization denied" });
  }
};

export default protect;
