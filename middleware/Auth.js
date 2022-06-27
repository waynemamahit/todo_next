import { verify } from "jsonwebtoken";
import { secretKey } from "../lib/config";

export default class Auth {
  static user(req, role = 2) {
    try {
      const user = verify(req.headers.authorization.split(" ")[1], secretKey);
      if (user.ip !== req.connection.remoteAddress && user.role !== role)
        return null;
      return user;
    } catch (error) {
      return null;
    }
  }
}
