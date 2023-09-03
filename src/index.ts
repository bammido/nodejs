import { Response, Request } from 'express'
import dotenv from 'dotenv'
import { usuarioRouter } from './routes/UsuarioRouter'
import { app } from './app'
import { papelRouter } from './routes/PapelRouter'
import { movimentacaoRouter } from './routes/MovimentacoesRouter'
import { tipoDeRendaRouter } from './routes/TipoDeRendaRouter'
import { tipoDeInvestimentoRouter } from './routes/TipoDeInvestimentoRouter'
import { corretorasRouter } from './routes/CorretorasRouter'

dotenv.config()

app.use('/usuario', usuarioRouter)
app.use('/papel', papelRouter)
app.use('/movimentacao', movimentacaoRouter)
app.use('/tipo-de-renda', tipoDeRendaRouter)
app.use('/tipo-de-investimento', tipoDeInvestimentoRouter)
app.use('/corretora', corretorasRouter)

app.get('/', (req: Request, res: Response) => {
    res.status(200).send('pong')
})

app.listen(process.env.PORT || process.env.port, () => {
    console.log(`Server rodando http://localhost:${process.env.port}`);
})