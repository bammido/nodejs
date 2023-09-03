import generateUniqueId from "../helpers/functions/generateUniqueId";

export default class Corretora {
    constructor(
        public nome: string,
        public id: string = generateUniqueId()
    ) {
        this.nome = nome?.toUpperCase()
    }

}