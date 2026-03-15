import { authRepository } from "./auth.repository"
import { RegisterUserInput } from "./auth.types"
import { registerSchema, RegisterInput } from "../../validators/auth.validator"
import { hashPassword } from "../../utils/password.util"
import { Role } from"@prisma/client"


export const authService = {
  async registerUser(data: RegisterUserInput) {
    // Validata req Body
    const validatedData = registerSchema.parse(data);

    // check Existing User
    const existingUser = await authRepository.findUserByEmail(validatedData.email)

    if (existingUser) {
      throw new Error("User already exists")
    }

    // Hash Password
    const hashedPassword = await hashPassword(validatedData.password);

    // Create User
    const newUserData = {
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      email: validatedData.email,
      password: hashedPassword,
      role: validatedData.role ?? Role.STUDENT,

      ...(validatedData.mobile && { mobile: validatedData.mobile }),
      ...(validatedData.college && { college: validatedData.college }),
      ...(validatedData.branch && { branch: validatedData.branch }),
      ...(validatedData.graduationYear && { graduationYear: validatedData.graduationYear })
    }
    const user = await authRepository.createUser(newUserData)

    // Remove password from res
    const {password , ...safeUser} = user
    return safeUser
  }
}