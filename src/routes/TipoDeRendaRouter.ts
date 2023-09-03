import express, { Router } from 'express'
import { tipoDeRendaController } from '../controller/TipoDeRendaController'


export const tipoDeRendaRouter: Router = express.Router()

tipoDeRendaRouter.get('/', tipoDeRendaController.getRendas)
