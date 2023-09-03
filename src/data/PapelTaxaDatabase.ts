import BaseDatabase from "./BaseDatabase";
import dotenv from "dotenv"
import PapelTaxa from "../models/PapelTaxa";

dotenv.config()

class PapelTaxaDatabase extends BaseDatabase {
    TABLE_NAME = (process.env.papelTaxas as string)

    public async getAll(): Promise<PapelTaxa[]> {
        return await super.getAll()
    }

    public async create(novaMovimentacao: PapelTaxa): Promise<void> {
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
        const colunas = `id VARCHAR(255) NOT NULL PRIMARY KEY, papel VARCHAR(10) NOT NULL UNIQUE, taxa VARCHAR(50) NOT NULL UNIQUE, valor FLOAT, FOREIGN KEY (papel) REFERENCES ${(process.env.papeis as string)} (papel), FOREIGN KEY (taxa) REFERENCES ${(process.env.taxas as string)} (taxa)`
        return await super.createTable(colunas)
    }

}

export const papelTaxaDatabase = new PapelTaxaDatabase()