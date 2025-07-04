import jwt from "jsonwebtoken";

const isCoordinator = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res
      .status(401)
      .json({ success: false, message: "Authorization header missing" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Bearer token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "COORDINATOR") {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    req.userId = decoded.userId;
    req.role = decoded.role;
    req.libId = decoded.library_id;
    next();
  } catch (err) {
    return res.status(403).json({ success: false, message: "Invalid token" });
  }
};

export default isCoordinator;
