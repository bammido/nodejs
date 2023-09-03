import express, { Router } from 'express'
import { tipoDeInvestimentoController } from '../controller/TipoDeInvestimentoController'


export const tipoDeInvestimentoRouter: Router = express.Router()

tipoDeInvestimentoRouter.get('/', tipoDeInvestimentoController.getInvestimentos)
