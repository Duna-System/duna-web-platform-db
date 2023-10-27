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

import { UserModel } from '../validationUserModel'
import { IUsers } from '../../interfaces'
import { ErrorMessages, IError } from 'duna-web-platform-error-defs'

export async function updateUserService(
    userId: string,
    updates: Partial<IUsers>
): Promise<IUsers | null> {
    try {
        const existingUser = await UserModel.findById(userId)

        if (!existingUser) {
            return null
        }

        if (updates.name) existingUser.name = updates.name
        if (updates.lastName) existingUser.lastName = updates.lastName
        if (updates.email) existingUser.email = updates.email
        if (updates.password) existingUser.password = updates.password
        if (updates.actingField) existingUser.actingField = updates.actingField
        if (updates.phoneNumber) existingUser.phoneNumber = updates.phoneNumber
        if (updates.postalCode) existingUser.postalCode = updates.postalCode
        if (updates.useObjective)
            existingUser.useObjective = updates.useObjective
        if (updates.imagePath) existingUser.imagePath = updates.imagePath
        if (updates.street) existingUser.street = updates.street
        if (updates.number) existingUser.number = updates.number
        if (updates.complement) existingUser.complement = updates.complement

        await existingUser.save()

        return existingUser
    } catch (error) {
        throw error
    }
}
