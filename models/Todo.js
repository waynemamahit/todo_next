import { prisma } from "../lib/prisma";

export default class Todo {
  static async checkUserValidById(id, user_id) {
    const todo = await prisma.todo.findFirst({
      where: {
        id,
        user_id,
      },
    });
    if (!todo)
      return Promise.reject({
        code: 403,
        message: "Access Forbidden",
      });
    return Promise.resolve(todo);
  }
}
