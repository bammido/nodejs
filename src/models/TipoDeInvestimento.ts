import generateUniqueId from "../helpers/functions/generateUniqueId";

export default class TipoDeInvestimento {
    constructor(
        public tipo: string,
        public renda: string,
        public id: string = generateUniqueId()
    ) { }
}