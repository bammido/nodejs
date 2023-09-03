import generateUniqueId from "../helpers/functions/generateUniqueId";

export default class Taxas {
    constructor(
        public taxa: string,
        public id: string = generateUniqueId()
    ) { }

}