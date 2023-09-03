import knex from "knex"
import dotenv from "dotenv"

dotenv.config()

export default abstract class BaseDatabase {

    abstract TABLE_NAME: string

    protected static connection = knex({
        client: "mysql",
        connection: {
            host: process.env.DB_HOST,
            port: 3306,
            user: process.env.DB_USER,
            password: process.env.DB_PASS,
            database: process.env.DB_NAME
        }
    });

    protected async create(entity: any): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).insert(entity)

            console.log(`item(s) inserido(S) na tabela ${this.TABLE_NAME}`)
        } catch (error: any) {
            const errorMessage = error.sqlMessage || `erro ao inserir item na tabela ${this.TABLE_NAME}`
            console.log(errorMessage)
            throw new Error(errorMessage)
        }
    };

    protected async getAll(): Promise<any[]> {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME).select()

            return result
        } catch (error: any) {
            console.log(error.sqlMessage || `erro ao pegar itens na tabela ${this.TABLE_NAME}`)
            return error
        }
    };

    protected async getAllWhere(where: any): Promise<any[]> {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME).select().where(where)

            return result
        } catch (error: any) {
            console.log(error.sqlMessage || `erro ao pegar itens na tabela ${this.TABLE_NAME} com where ${where}`)
            return error
        }
    };

    protected async dropTable(): Promise<void> {
        try {
            await BaseDatabase.connection.raw(`
            DROP TABLE ${this.TABLE_NAME};
            `)
            console.log(`tabela ${this.TABLE_NAME} foi dropada/deletada!`)
        } catch (error: any) {
            console.log(error.sqlMessage || `erro ao dropar tabela ${this.TABLE_NAME}`)
            return error
        }

    }

    protected async findOne(where: any): Promise<any> {
        try {
            const result = await BaseDatabase.connection(this.TABLE_NAME).select().where(where)

            return result[0]
        } catch (error: any) {
            console.log(error.sqlMessage || `erro ao buscar item por ${where} na tabela ${this.TABLE_NAME}`)
            return error
        }
    }

    protected async delete(where: any): Promise<void> {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).where(where).del()

            console.log(`item deletado na tabela ${this.TABLE_NAME}`)
        } catch (error: any) {
            console.log(error.sqlMessage || `erro ao deletar item na tabela ${this.TABLE_NAME}`)
            return error
        }
    }

    protected async createTable(colunas: string): Promise<void> {
        try {
            await BaseDatabase.connection.raw(`
            CREATE TABLE IF NOT EXISTS ${this.TABLE_NAME} (${colunas});  
            `)
            console.log(`tabela ${this.TABLE_NAME} criada com sucesso!`)
        } catch (error: any) {
            console.error(error.sqlMessage || error.message || `erro ao criar tabela ${this.TABLE_NAME}`)
            return error
        }
    }

    protected async update(where: any, update: any) {
        try {
            await BaseDatabase.connection(this.TABLE_NAME).where(where).update(update)

            console.log(`item da tabela ${this.TABLE_NAME} editado com sucesso!`)
        } catch (error: any) {
            console.log(error.sqlMessage || error.message || `erro ao criar tabela ${this.TABLE_NAME}`)
            return error
        }
    }
}