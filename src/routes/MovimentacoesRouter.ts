import express, { Router } from 'express'
import { movimentacaoController } from '../controller/MovimentacaoController'

export const movimentacaoRouter: Router = express.Router()

movimentacaoRouter.get('/', movimentacaoController.getMovimentacoes)
movimentacaoRouter.get('/:userId', movimentacaoController.getMovimentacoesPeloUserId)
movimentacaoRouter.post('/', movimentacaoController.cadastrarMovimentacao)
movimentacaoRouter.put('/:id', movimentacaoController.editarMovimentacao)