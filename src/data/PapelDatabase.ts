import BaseDatabase from "./BaseDatabase";
import dotenv from "dotenv"
import Papel from "../models/Papel";

dotenv.config()

class PapelDatabase extends BaseDatabase {
    TABLE_NAME = (process.env.papeis as string)
    TABLE_MOVIMENTACOES = (process.env.movimentacoes as string)

    public async getAll(): Promise<Papel[]> {
        return await super.getAll()
    }

    public async create(novoPapel: Papel): Promise<void> {
        await super.create(novoPapel)
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
        const colunas = `id Varchar(255) PRIMARY KEY, papel VARCHAR(10) NOT NULL UNIQUE, nome VARCHAR(50) NOT NULL, tipoDeRenda VARCHAR(30) NOT NULL, tipoDeInvestimento VARCHAR(30) NULL, FOREIGN KEY (tipoDeRenda) REFERENCES ${(process.env.tiposDeRenda as string)} (tipo), FOREIGN KEY (tipoDeInvestimento) REFERENCES ${(process.env.tiposDeInvestimento as string)} (tipo) ON DELETE SET NULL`
        await super.createTable(colunas)
    }

    public async update(where: any, update: any): Promise<any> {
        return await super.update(where, update)
    }
}

export const papelDatabase = new PapelDatabase()