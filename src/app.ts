import express from 'express';
import 'dotenv/config'
import connectDB from "./config/Database"
import {Bot} from "./tg/Bot"
import morgan from "morgan"
import {Engine} from "./utils/Engine";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const localtunnel = require('localtunnel')

const app = express()
const port = 3000

const logger = morgan('combined')
app.use(logger)

connectDB()
    .then(() => localtunnel(port))
    .then((client: any) => {
        const engine = new Engine()
        engine.load()
        const bot = new Bot(process.env.BOT_TOKEN)
        app.use(bot.getMiddleware(client.url))
        app.listen(port, () => {
            return console.log(`Express up`)
        })
    })