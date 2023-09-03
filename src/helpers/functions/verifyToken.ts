import * as jose from 'jose'

const privateKey = process.env.JWT_PRIVATE_KEY as string

const secret = new TextEncoder().encode(privateKey)

export default async function verifyToken(token?: string | null): Promise<any> {
    try {
        if (!token) {
            throw new Error('não foi passado o token')
        }
        const jwt = await jose.jwtVerify(token, secret, { clockTolerance: "23h" })

        return jwt
    } catch (error: any) {
        let mensagem = error.message

        throw new Error(mensagem)
    }
}