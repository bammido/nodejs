import BaseDatabase from "./BaseDatabase";
import dotenv from "dotenv"
import Taxa from "../models/Taxa";

dotenv.config()

class TaxaDatabase extends BaseDatabase {
    TABLE_NAME = (process.env.taxas as string)

    public async getAll(): Promise<Taxa[]> {
        return await super.getAll()
    }

    public async create(novaMovimentacao: Taxa): Promise<void> {
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
        const colunas = `id VARCHAR(255) NOT NULL PRIMARY KEY, taxa VARCHAR(20) NOT NULL UNIQUE`
        return await super.createTable(colunas)
    }

    public async populate(): Promise<void> {
        const taxas = [
            new Taxa('selic'),
            new Taxa('CDI'),
            new Taxa('IPCA'),
            new Taxa('PREFIXADO')
        ]
        await super.create(taxas)
    }
}

export const taxaDatabase = new TaxaDatabase()