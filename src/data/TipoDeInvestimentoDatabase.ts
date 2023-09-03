import BaseDatabase from "./BaseDatabase";
import dotenv from "dotenv"
import TipoDeInvestimento from "../models/TipoDeInvestimento";

dotenv.config()

class TipoDeInvestimentoDatabase extends BaseDatabase {
    TABLE_NAME = (process.env.tiposDeInvestimento as string)

    public async getAll(): Promise<TipoDeInvestimento[]> {
        return await super.getAll()
    }

    public async create(novaMovimentacao: TipoDeInvestimento): Promise<void> {
        return await super.create(novaMovimentacao)
    }

    public async findOne(where: any): Promise<any> {
        return await super.findOne(where)
    }

    public async dropTable(): Promise<void> {
        await super.dropTable()
    }

    public async delete(where: any): Promise<void> {
        await super.delete(where)
    }

    public async createTable(): Promise<void> {
        const colunas = `id VARCHAR(255) NOT NULL PRIMARY KEY, tipo VARCHAR(30) NOT NULL UNIQUE, renda VARCHAR(30) NOT NULL, FOREIGN KEY (renda) REFERENCES ${(process.env.tiposDeRenda as string)} (tipo)`
        return await super.createTable(colunas)
    }

    public async populate(): Promise<void> {
        const rendaFixa = 'renda fixa'
        const rendaVariavel = 'renda variavel'

        const investimentos: TipoDeInvestimento[] = [
            new TipoDeInvestimento('CDB', rendaFixa),
            new TipoDeInvestimento('CRI', rendaFixa),
            new TipoDeInvestimento('CRA', rendaFixa),
            new TipoDeInvestimento('LCI', rendaFixa),
            new TipoDeInvestimento('LCA', rendaFixa),

            new TipoDeInvestimento('acao', rendaVariavel),
            new TipoDeInvestimento('fundo imobiliario', rendaVariavel),
            new TipoDeInvestimento('ETF', rendaVariavel),
        ]
        await super.create(investimentos)
    }
}

export const tipoDeInvestimentoDatabase = new TipoDeInvestimentoDatabase()