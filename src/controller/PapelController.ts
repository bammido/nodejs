import { Request, Response } from "express"
import { papelDatabase } from "../data/PapelDatabase"
import Papel from "../models/Papel"

class PapelController {
    async getPapeis(req: Request, res: Response) {
        let statusError = 400
        try {
            const papeis = await papelDatabase.getAll()

            res.send(papeis)
        } catch (error: any) {
            res.status(statusError || 400).send({ message: error.message })
        }
    }

    async cadastrarPapel(req: Request, res: Response) {
        let statusError = 400
        try {
            const { nome, papel, tipoDeRenda, tipoDeInvestimento } = req.body

            if (!papel || !nome || !tipoDeRenda) {
                statusError = 422
                throw new Error('papel, nome, tipoDeRenda são obrigatórios!')
            }

            const papelJaCadastrado = await papelDatabase.findOne({ papel })

            if (papelJaCadastrado) {
                statusError = 409
                throw new Error('papel já cadastrado!')
            }

            const novoPapel = new Papel((papel as string), (nome as string), (tipoDeRenda as string), (tipoDeInvestimento as string | undefined))

            await papelDatabase.create(novoPapel)

            res.status(201).send({ message: 'papel criado com sucesso!' })
        } catch (error: any) {
            res.status(statusError || 400).send({ message: error.message })
        }
    }

    async editarPapel(req: Request, res: Response) {
        let statusError = 400
        try {
            const { id } = req.params

            const { nome, papel, tipoDeRenda, tipoDeInvestimento } = req.body

            const update = {
                nome,
                papel,
                tipoDeRenda,
                tipoDeInvestimento
            }

            const papelAtualizado = await papelDatabase.update({ id }, update)

            res.send(papelAtualizado)
        } catch (error: any) {
            res.status(statusError || 400).send({ message: error.message })
        }
    }
}

export const papelController = new PapelController()