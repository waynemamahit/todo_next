import { prisma } from "../lib/prisma";
import Response from "../lib/Response";
import Validation from "../lib/Validation";
import Todo from "../models/Todo";

export default class TodoController {
  static async get(res, user) {
    const todo = await prisma.todo.findMany({
      where: {
        user_id: user.id,
      },
    });
    res.json({
      data: todo,
    });
  }

  static async add(req, res, user) {
    try {
      await Validation.form(req.body, {
        title: "required",
        description: "required",
      })
      const newTodo = await prisma.todo.create({
        data: {
          ...req.body,
          user_id: user.id,
        },
      });
      res.json({
        data: newTodo,
        message: "Todo data added successfully!",
      });
    } catch (error) {
      Response.error(res, error);
    }
  }

  static async update(req, res, user) {
    try {
      await Validation.form(req.body, {
        id: "required|numeric",
        title: "required",
        description: "required",
      })
      await Todo.checkUserValidById(req.body.id, user.id)
      const data = { ...req.body };
      delete data.id;
      const todo = await prisma.todo.update({
        where: {
          id: req.body.id,
        },
        data,
      });
      res.json({
        data: todo,
        message: "Todo data has been successfully updated!",
      });
    } catch (error) {
      Response.error(res, error);
    }
  }

  static async delete(req, res, user) {
    try {
      await Validation.form(req.body, {
        id: "required|numeric",
      })
      await Todo.checkUserValidById(req.body.id, user.id)
      await prisma.todo.delete({
        where: {
          id: req.body.id,
          user_id: user.id,
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
