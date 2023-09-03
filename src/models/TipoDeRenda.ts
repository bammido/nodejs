import generateUniqueId from "../helpers/functions/generateUniqueId";

export default class TipoDeRenda {
    constructor(
        public tipo: string,
        public id: string = generateUniqueId()
    ) { }

}