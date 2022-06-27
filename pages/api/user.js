import UserController from "../../controllers/UserController";
import Auth from "../../middleware/Auth";

export default function handler(req, res) {
  // Middleware
  const user = Auth.user(req, 1);
  if (!user) return res.status(403).send("Access Forbidden");

  switch (req.method) {
    case "GET":
      return UserController.get(res);
    case "POST":
      return UserController.add(req, res);
    case "PUT":
      return UserController.update(req, res);
    case "PATCH":
      return UserController.reset(req, res);
    case "DELETE":
      return UserController.delete(req, res);
    default:
      return res.status(405).send("Method not allowed");
  }
}
