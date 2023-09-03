import express from 'express'
import cors from 'cors'


export const app = express()
app.use(express.json())
app.use(cors(
    {
        origin: "*",
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    }
))

app.use(express.static(__dirname + '/public'));
