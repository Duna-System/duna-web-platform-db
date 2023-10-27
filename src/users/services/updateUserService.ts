// import { ErrorMessages } from 'duna-web-platform-error-defs'
// import { UserModel } from '../validationUserModel'
// import { IUsers } from '../../interfaces'
// import argon2 from 'argon2'

// export async function updateUser(
//     userId: string,
//     updates: Partial<IUsers>
// ): Promise<IUsers | null> {
//     try {
//         const user = await UserModel.findOne({ _id: userId })

//         if (!user) {
//             return null
//         }

//         for (const key in updates) {
//             if (updates.hasOwnProperty(key)) {
//                 const value = updates[key]

//                 if (value === '') {
//                     return null
//                 }
//                 if (key === 'password') {
//                     const updatedValue = await argon2.hash(value)
//                     user[key] = updatedValue
//                 } else {
//                     user[key] = value
//                 }
//             }
//         }

//         const updatedUser = await user.save()
//         return updatedUser
//     } catch (error) {
//         const err = ErrorMessages.InternalServerError
//         err.Details = 'Error updating user data.'
//         throw err
//     }
// }
