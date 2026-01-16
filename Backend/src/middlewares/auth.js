import jwt from "jsonwebtoken";

export const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Authentication required" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.user = decoded; // { id, role }
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
