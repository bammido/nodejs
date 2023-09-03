import generateUniqueId from "../helpers/functions/generateUniqueId";

export default class Compras {
    constructor(
        public papel: string,
        public data: Date,
        public corretora: string,
        public preco: number,
        public qtd: number,
        public userId: string,
        public tipoMovimentacao: string,
        public id = generateUniqueId()
    ) {
    }

}