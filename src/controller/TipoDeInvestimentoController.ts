import { Request, Response } from "express"
import { tipoDeInvestimentoDatabase } from "../data/TipoDeInvestimentoDatabase"
// import Papel from "../models/Papel"

class TipoDeInvestimentoController {
    async getInvestimentos(req: Request, res: Response) {
        let statusError = 400
        try {
            const resultado = await tipoDeInvestimentoDatabase.getAll()

            const investimentos = {
                rendaFixa: resultado.filter(investimento => investimento.renda === 'renda fixa').map(investimento => investimento.tipo),
                rendaVariavel: resultado.filter(investimento => investimento.renda === 'renda variavel').map(investimento => investimento.tipo),
            }

            res.send(investimentos)
        } catch (error: any) {
            res.status(statusError || 400).send({ message: error.message })
        }
    }
}

export const tipoDeInvestimentoController = new TipoDeInvestimentoController()