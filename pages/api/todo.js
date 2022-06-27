import TodoController from "../../controllers/TodoController";
import Auth from "../../middleware/Auth";

export default function handler(req, res) {
  // Middleware
  const user = Auth.user(req);
  if (!user) return res.status(403).send("Access Forbidden");

  switch (req.method) {
    case "GET":
      return TodoController.get(res, user);
    case "POST":
      return TodoController.add(req, res, user);
    case "PUT":
      return TodoController.update(req, res, user);
    case "DELETE":
      return TodoController.delete(req, res, user);
    default:
      return res.status(405).send("Method not allowed");
  }
}
