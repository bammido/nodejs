import { Request, Response } from "express"
import { tipoDeRendaDatabase } from "../data/TipoDeRendaDatabase"
// import Papel from "../models/Papel"

class TipoDeRendaController {
    async getRendas(req: Request, res: Response) {
        let statusError = 400
        try {
            const rendas = await tipoDeRendaDatabase.getAll()

            res.send(rendas)
        } catch (error: any) {
            res.status(statusError || 400).send({ message: error.message })
        }
    }
}

export const tipoDeRendaController = new TipoDeRendaController()