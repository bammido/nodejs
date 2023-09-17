import { Request, Response } from "express"
import { papelDatabase } from "../data/PapelDatabase"
import Papel from "../models/Papel"
import { alphaVantageService } from "../service/aplhaVantage/alphaVantageService"

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

    async getCotacaoRecentePapel(req: Request, res: Response) {
        let statusError = 400
        try {

            const { papel } = req.query
            const response = await alphaVantageService.getCotacaoDiarioPapelBrasil(papel as string)

            const papelPreco = response?.data

            if (!papelPreco) {
                return res.status(204).send()
            }

            const dias = Object.keys(papelPreco["Time Series (Daily)"]).sort((a, b) => new Date(a).getMilliseconds() - new Date(b).getMilliseconds())

            const diaCotacaoMaisRecente = dias[0]

            const cotacaoMaisRecente = papelPreco["Time Series (Daily)"][diaCotacaoMaisRecente]

            const retorno = { cotacao: cotacaoMaisRecente["4. close"], dia: diaCotacaoMaisRecente }

            res.send(retorno)
        } catch (error: any) {
            console.log(error)
            res.status(statusError || 400).send({ message: error.message })
        }
    }

    async getCotacaoRecenteVariosPapeis(req: Request, res: Response) {
        let statusError = 400
        try {

            const { papeis } = req.body

            const retorno: any = []

            for (const papel of papeis) {
                const response = await alphaVantageService.getCotacaoDiarioPapelBrasil(papel as string)

                const papelPreco = response?.data

                if (!papelPreco) {
                    retorno.push({ papel, errorMessage: 'não foi encontrado cotação!' })
                    continue
                }

                if (papelPreco.Note) {
                    retorno.push({ papel, errorMessage: 'limite de chamadas por minuto excedido!' })
                    continue
                }

                if (papelPreco.Information) {
                    retorno.push({ papel, errorMessage: 'limite de chamadas por dia excedido!' })
                    continue
                }

                console.log({ papel, papelPreco })

                const dias = Object.keys(papelPreco["Time Series (Daily)"]).sort((a, b) => new Date(a).getMilliseconds() - new Date(b).getMilliseconds())

                const diaCotacaoMaisRecente = dias[0]

                const cotacaoMaisRecente = papelPreco["Time Series (Daily)"][diaCotacaoMaisRecente]

                retorno.push({ cotacao: cotacaoMaisRecente["4. close"], dia: diaCotacaoMaisRecente, papel })
            }

            res.send(retorno)
        } catch (error: any) {
            console.log(error)
            res.status(statusError || 400).send({ message: error.message })
        }
    }
}

export const papelController = new PapelController()