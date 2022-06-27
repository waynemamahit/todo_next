import AuthController from "../../controllers/AuthController";

export default function handler(req, res) {
  switch (req.method) {
    case "GET":
      return AuthController.logout(req, res);
    case "POST":
      return AuthController.login(req, res);
    default:
      return res.status(405).send("Method not allowed");
  }
}
