// import argon2 from 'argon2'
// import { ErrorMessages, IError } from 'duna-web-platform-error-defs'
// import { v4 as uuidv4 } from 'uuid'

// import { IUsers } from '../../interfaces'
// import { UserModel } from '../validationUserModel'

// export async function createUserService(user: IUsers): Promise<IUsers> {
//     try {
//         const hashedPassword = await argon2.hash(user.password)

//         const existingUser = await UserModel.findOne({ email: user.email })

//         if (existingUser) {
//             const err: IError = ErrorMessages.ResourceExists
//             throw err
//         }

//         const newUser = new UserModel({
//             _id: uuidv4(),
//             name: user.name,
//             lastName: user.lastName,
//             email: user.email,
//             password: hashedPassword,
//             actingField: user.actingField,
//             phoneNumber: user.phoneNumber,
//             postalCode: user.postalCode,
//             useObjective: user.useObjective,
//             imagePath: user.imagePath,
//             street: user.street,
//             number: user.number,
//             complement: user.complement,
//         })

//         const savedUser = await newUser.save()

//         return savedUser
//     } catch (error) {
//         if (error != ErrorMessages.ResourceExists) {
//             error = ErrorMessages.InternalServerError
//             ;(error as IError).Details = 'Possibly wrong data schema.'
//         }
//         throw error
//     }
// }
