import express, { Router } from 'express'
import { papelController } from '../controller/PapelController'


export const papelRouter: Router = express.Router()

papelRouter.get('/', papelController.getPapeis)
papelRouter.post('/', papelController.cadastrarPapel)
papelRouter.put('/:id', papelController.editarPapel)
papelRouter.get('/cotacao-recente', papelController.getCotacaoRecentePapel)
papelRouter.post('/cotacao-recente/varios', papelController.getCotacaoRecenteVariosPapeis)