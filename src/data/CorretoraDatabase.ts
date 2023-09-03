import BaseDatabase from "./BaseDatabase";
import dotenv from "dotenv"
import Corretora from "../models/Corretora";

dotenv.config()

class CorretoraDatabase extends BaseDatabase {
    TABLE_NAME = (process.env.corretoras as string)

    public async getAll(): Promise<Corretora[]> {
        return await super.getAll()
    }

    public async create(novaMovimentacao: Corretora): Promise<void> {
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
        const colunas = `id VARCHAR(255) NOT NULL PRIMARY KEY, nome VARCHAR(50) NOT NULL UNIQUE`
        return await super.createTable(colunas)
    }

}

export const corretoraDatabase = new CorretoraDatabase()