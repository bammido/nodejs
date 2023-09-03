import { Request, Response } from "express"
// import { movimentacaoDatabase } from "../data/MovimentacaoDatabase"
import { corretoraDatabase } from "../data/CorretoraDatabase"
import { usuarioDatabase } from "../data/UsuarioDatabase"
import Movimentacao from "../models/Movimentacao"
import Corretora from "../models/Corretora"

class CorretoraController {
    async getCorretoras(req: Request, res: Response) {
        let statusError = 400
        try {
            const corretoras = await corretoraDatabase.getAll()

            res.send(corretoras)
        } catch (error: any) {
            res.status(statusError || 400).send({ message: error.message })
        }
    }

    async cadastrarCorretora(req: Request, res: Response) {
        let statusError = 400
        try {
            const { nome } = req.body

            const corretoraJaCadastrada = await corretoraDatabase.findOne({ nome })

            if (!nome) {
                statusError = 422
                throw new Error('O campo nome é obrigatório!')
            }

            if (corretoraJaCadastrada) {
                statusError = 409
                throw new Error('Corretora já cadastrada!')
            }

            const novaCorretora = new Corretora(nome)

            await corretoraDatabase.create(novaCorretora)

            res.status(201).send({ message: 'Corretora cadastrada com sucesso!' })
        } catch (error: any) {
            console.log(error.message)
            res.status(statusError || 400).send({ message: error.message })
        }
    }
}

export const corretoraController = new CorretoraController()