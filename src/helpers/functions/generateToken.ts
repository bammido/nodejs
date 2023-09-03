import * as jose from 'jose'

const privateKey = process.env.JWT_PRIVATE_KEY as string

const secret = new TextEncoder().encode(privateKey)

export default async function generateToken(data: any, expiresIn: string | number) {
    const alg = 'HS256'
    const jwt = await new jose.SignJWT({ data })
        .setProtectedHeader({ alg })
        .setExpirationTime(expiresIn)
        .sign(secret)

    return jwt
}