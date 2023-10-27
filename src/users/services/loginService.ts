// import argon2 from 'argon2'
// import { IUsers } from '../../interfaces'
// import { UserModel } from '../validationUserModel'
// import { ErrorMessages } from 'duna-web-platform-error-defs'

// export async function getUserByEmail(email: string): Promise<IUsers | null> {
//     try {
//         const user = await UserModel.findOne({ email }).exec()
//         return user
//     } catch (error) {
//         const err = ErrorMessages.InternalServerError
//         err.Details = 'Internal server Error '
//         throw err
//     }
// }

// export async function verifyPassword(
//     user: IUsers,
//     password: string
// ): Promise<boolean> {
//     return await argon2.verify(user.password, password)
// }
