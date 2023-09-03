import { corretoraDatabase } from "./data/CorretoraDatabase";
import { movimentacaoDatabase } from "./data/MovimentacaoDatabase";
import { papelDatabase } from "./data/PapelDatabase";
import { papelTaxaDatabase } from "./data/PapelTaxaDatabase";
import { taxaDatabase } from "./data/TaxaDatabase";
import { tipoDeInvestimentoDatabase } from "./data/TipoDeInvestimentoDatabase";
import { tipoDeRendaDatabase } from "./data/TipoDeRendaDatabase";
import { usuarioDatabase } from "./data/UsuarioDatabase";

async function criaTabelas() {
    console.log('\n')
    await usuarioDatabase.createTable()
    await corretoraDatabase.createTable()
    await tipoDeRendaDatabase.createTable()
    await taxaDatabase.createTable()
    await tipoDeInvestimentoDatabase.createTable()
    await papelDatabase.createTable()
    await movimentacaoDatabase.createTable()
    await papelTaxaDatabase.createTable()
}

async function populaTabelas() {
    console.log('\n')
    await usuarioDatabase.populate()
    await tipoDeRendaDatabase.populate()
    await taxaDatabase.populate()
    await tipoDeInvestimentoDatabase.populate()
}

async function createTables(): Promise<void> {
    await criaTabelas()
    await populaTabelas()
}

createTables().finally(() => process.exit())