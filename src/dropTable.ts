import { corretoraDatabase } from "./data/CorretoraDatabase";
import { movimentacaoDatabase } from "./data/MovimentacaoDatabase";
import { papelDatabase } from "./data/PapelDatabase";
import { papelTaxaDatabase } from "./data/PapelTaxaDatabase";
import { taxaDatabase } from "./data/TaxaDatabase";
import { tipoDeInvestimentoDatabase } from "./data/TipoDeInvestimentoDatabase";
import { tipoDeRendaDatabase } from "./data/TipoDeRendaDatabase";
import { usuarioDatabase } from "./data/UsuarioDatabase";

async function dropTable() {
    await papelTaxaDatabase.dropTable()

    await movimentacaoDatabase.dropTable()
    await papelDatabase.dropTable()
    await tipoDeInvestimentoDatabase.dropTable()

    await usuarioDatabase.dropTable()
    await corretoraDatabase.dropTable()
    await tipoDeRendaDatabase.dropTable()
    await taxaDatabase.dropTable()

}

dropTable().finally(() => process.exit())