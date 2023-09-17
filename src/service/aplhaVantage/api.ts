import axios from "axios";
import dotenv from 'dotenv'

dotenv.config()

const url = process.env.alphaVantageURL

export const apiAlphVantage = axios.create({
    baseURL: `${url}`
})