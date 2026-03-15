import { prisma } from "../../database/client"
import { RegisterUserInput } from "./auth.types"
import { RegisterInput } from "../../validators/auth.validator"


export const authRepository = {
  async findUserByEmail(email: string) {
    return await prisma.user.findUnique({
      where: { email }
    })
  },

  async createUser(data: RegisterUserInput) {
    return await prisma.user.create({
      data
    })
  }
}