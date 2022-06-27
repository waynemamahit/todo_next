import { compareSync } from "bcrypt";
import Cookies from "cookie-universal";
import { sign } from "jsonwebtoken";
import { secretKey } from "../lib/config";
import { prisma } from "../lib/prisma";
import Response from "../lib/Response";
export default class AuthController {
  static async login(req, res) {
    try {
      const user = await prisma.user.findFirst({
        where: {
          email: req.body.email,
        },
      })
      const message = "Invalid username and password!";
      if (!user) throw new Object({ code: 200, message });
      const password = compareSync(req.body.password, user.password);
      if (!password) throw new Object({ code: 200, message });
      delete user.password
      const token = sign(
        {
          ip: req.connection.remoteAddress,
          id: user.id,
          email: user.email,
          role: user.role_id,
        },
        secretKey
      );
      const maxAge = 60 * 60 * 24 * 30
      const cookies = Cookies(req, res) 
      cookies.set("role", user.role_id, {
        maxAge,
        path: "/",
      });
      cookies.set("token", token, {
        maxAge,
        path: "/",
      });
      res.json({
        data: user,
        token,
      });
    } catch (error) {
      Response.error(res, error);
    }
  }

  static async logout(req, res) {
    try {
      Cookies(req, res).remove("token");
      res.json({
        message: "OK",
      });
    } catch (error) {
      Response.error(res, error);
    }
  }
}
