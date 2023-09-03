import { Request, Response } from "express";
import { usuarioDatabase } from "../data/UsuarioDatabase";
import Usuario from "../models/Usuario";

import dotenv from 'dotenv'
import generateToken from "../helpers/functions/generateToken";
import generateUniqueId from "../helpers/functions/generateUniqueId";
import { movimentacaoDatabase } from "../data/MovimentacaoDatabase";
import Compras from "../models/Movimentacao";

dotenv.config()

class UsuarioController {

    async getUsuarios(req: Request, res: Response) {
        let statusError = 400
        try {
            const usuarios = await usuarioDatabase.getAll()

            res.send(usuarios)
        } catch (error: any) {
            res.status(statusError || 400).send({ message: error.message })
        }
    }

    async criarUsuario(req: Request, res: Response) {
        let statusError = 400
        try {
            const { email, password, nome } = req.body

            const buscaEmailJacadastrado = await usuarioDatabase.findOne({ email })

            if (buscaEmailJacadastrado?.email) {
                statusError = 409
                throw new Error('email ja cadastrado')
            }

            if (`${password}`.length < 8) {
                statusError = 422
                throw new Error('a senha deve conter pelo menos 8 dígitos');
            }

            if (Number(password)) {
                statusError = 422
                throw new Error('a senha não pode conter apenas números');
            }

            const novoUsuario = new Usuario(email, password, nome)

            await usuarioDatabase.create(novoUsuario)

            res.status(201).send({ message: 'usuario criado com sucesso!' })
        } catch (error: any) {
            res.status(statusError || 400).send({ message: error.message })

        }
    }

    async login(req: Request, res: Response) {
        let statusError = 400
        try {
            const { email, password } = req.body

            const usuario = await usuarioDatabase.findOne({ email, password })

            if (!usuario) {
                statusError = 404
                throw new Error("usuário não encontrado");
            }

            const token = await generateToken(usuario, '1h')

            res.send({ token })
        } catch (error: any) {
            res.status(statusError || 400).send({ message: error.message })
        }
    }

    async getInvestimentosAtualizados(req: Request, res: Response) {
        let statusError = 400
        try {
            const { id } = req.params

            const usuario = await usuarioDatabase.findOne({ id })

            if (!usuario) {
                statusError = 404
                throw new Error('Usuario não encontrado')
            }

            const movimentacoesPapeis: any = {}

            const movimentacoes = await movimentacaoDatabase.getMovimentacoesComPapeis({ userId: id })

            movimentacoes.map(mov => {
                if (!movimentacoesPapeis[mov.tipoDeRenda]) {
                    movimentacoesPapeis[mov.tipoDeRenda] = {}
                }

                if (!movimentacoesPapeis[mov.tipoDeRenda][mov.tipoDeInvestimento]) {
                    movimentacoesPapeis[mov.tipoDeRenda][mov.tipoDeInvestimento] = {}
                }

                if (!movimentacoesPapeis[mov.tipoDeRenda][mov.tipoDeInvestimento][mov.papel]) {
                    movimentacoesPapeis[mov.tipoDeRenda][mov.tipoDeInvestimento][mov.papel] = [mov]
                    return
                }

                movimentacoesPapeis[mov.tipoDeRenda][mov.tipoDeInvestimento][mov.papel].push(mov)
            })

            res.send({ movimentacoesPapeis })
        } catch (error: any) {
            res.status(statusError || 400).send({ message: error.message })
        }
    }

}

export const usuarioController = new UsuarioController()