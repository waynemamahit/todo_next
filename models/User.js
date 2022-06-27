import { prisma } from "../lib/prisma";

export default class User {
  static async checkById(id) {
    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });
    if (!user)
      return Promise.reject({
        code: 404,
        message: "User data not found!",
      });
    return Promise.resolve(user);
  }
}
