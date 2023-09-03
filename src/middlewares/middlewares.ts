// import { NextFunction, Request, Response } from "express";
// import dotenv from 'dotenv'

// dotenv.config()

// export function verifyIsLoggedIn(req: Request, res: Response, next: NextFunction) {
//     try {
//         const token = req.headers.token

//         const decoded = Jwt.verify(token as string, process.env.JWT_PRIVATE_KEY as string, function (error, dec) {
//             if (error) {
//                 res.status(400).send({ message: 'token invalido!' })
//             }

//             const email = (decoded as any).email
//             const password = (decoded as any).password

//             if (!email || !password) {
//                 res.status(400).send({ message: 'token invalido!' })
//             }
//         })
//     } catch (error: any) {
//         res.status(400).send({ message: 'token invalido!' })
//     }
// }