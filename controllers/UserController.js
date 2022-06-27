import { hashSync } from "bcrypt";
import { prisma } from "../lib/prisma";
import Response from "../lib/Response";
import Validation from "../lib/Validation";
import User from "../models/User";

export default class UserController {
  static async get(res) {
    const data = await prisma.user.findMany({});
    res.json({
      data,
    });
  }

  static async add(req, res) {
    try {
      await Validation.form(req.body, {
        name: "required",
        email: "required|email",
        role_id: "required|numeric",
      });
      const newPassword = Math.round(Math.random() * 100000);
      const password = hashSync(`${newPassword}`, 12);
      const newUser = await prisma.user.create({
        data: {
          ...req.body,
          password,
        },
      });
      res.json({
        data: {
          user: newUser,
          newPassword,
        },
        message: "Todo data added successfully!",
      });
    } catch (error) {
      Response.error(res, error);
    }
  }

  static async update(req, res) {
    try {
      await Validation.form(req.body, {
        id: "required|numeric",
        name: "required",
        email: "required|email",
        role_id: "required|numeric",
      });
      await User.checkById(req.body.id);
      const data = { ...req.body };
      delete data.id;
      const user = await prisma.todo.update({
        where: {
          id: req.body.id,
        },
        data,
      });
      res.json({
        data: user,
        message: "Todo data has been successfully updated!",
      });
    } catch (error) {
      Response.error(res, error);
    }
  }

  static async reset(req, res) {
    try {
      await Validation.form(req.body, {
        id: "required|numeric",
      });
      await User.checkById(req.body.id);
      const data = Math.round(Math.random() * 100000);
      const password = hashSync(`${data}`, 12);
      await prisma.todo.update({
        where: {
          id: req.body.id,
        },
        data: {
          password,
        },
      });
      res.json({
        data,
        message:
          "Todo data has been successfully updated, new password generated!",
      });
    } catch (error) {
      Response.error(res, error);
    }
  }

  async delete(req, res) {
    try {
      await Validation.form(req.body, {
        id: "required|numeric",
      });
      await User.checkById(req.body.id);
      await prisma.user.delete({
        where: {
          id: req.body.id,
        },
      });
      res.json({
        data: "OK",
      });
    } catch (error) {
      Response.error(res, error);
    }
  }
}
