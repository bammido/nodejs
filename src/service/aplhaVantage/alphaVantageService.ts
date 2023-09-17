import { apiAlphVantage } from "./api"
import dotenv from 'dotenv'

dotenv.config()
const apiKey = process.env.alphaVantageApiKey

const baseQuery = `query?apikey=${apiKey}&`

class AlphaVantageService {
    async getCotacaoDiarioPapelBrasil(papel: string) {
        try {
            if (!papel) {
                throw new Error("nescesário passar o código do papel")
            }

            const res = await apiAlphVantage.get(`${baseQuery}function=TIME_SERIES_DAILY&symbol=${papel}.SAO`)

            if (res?.data["Error Message"]) {
                throw new Error(res?.data["Error Message"])
            }

            return res
        } catch (error: any) {
            return error
        }
    }
}

export const alphaVantageService = new AlphaVantageService()