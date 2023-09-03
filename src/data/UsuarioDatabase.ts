import BaseDatabase from "./BaseDatabase";
import dotenv from "dotenv"
import Usuario from "../models/Usuario";

dotenv.config()

class UsuarioDatabase extends BaseDatabase {
    TABLE_NAME = (process.env.usuarios as string)

    public async getAll(): Promise<Usuario[]> {
        return await super.getAll()
    }

    public async create(novaMovimentacao: Usuario): Promise<void> {
        return await super.create(novaMovimentacao)
    }

    public async findOne(where: any): Promise<Usuario> {
        return await super.findOne(where)
    }

    public async dropTable(): Promise<void> {
        await super.dropTable()
    }

    public async delete(where: any): Promise<void> {
        await super.delete(where)
    }

    public async createTable(): Promise<void> {
        const colunas = `id VARCHAR(255) NOT NULL PRIMARY KEY, email VARCHAR(50) NOT NULL UNIQUE, password VARCHAR(255) NOT NULL, nome VARCHAR(50) NOT NULL`
        return await super.createTable(colunas)
    }

    public async populate(): Promise<void> {
        const usuarios = [
            new Usuario('teste@email.com', '12345678', 'usuario teste')
        ]
        await super.create(usuarios)
    }

}

export const usuarioDatabase = new UsuarioDatabase()