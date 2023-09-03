import generateUniqueId from "../helpers/functions/generateUniqueId";

export default class Usuario {
    constructor(
        public email: string,
        public password: string,
        public nome: string,
        public id: string = generateUniqueId()
    ) { }

}