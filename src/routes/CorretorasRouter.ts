import express, { Router } from 'express'
import { corretoraController } from '../controller/CorretoraController'

export const corretorasRouter: Router = express.Router()

corretorasRouter.get('/', corretoraController.getCorretoras)
corretorasRouter.post('/', corretoraController.cadastrarCorretora)