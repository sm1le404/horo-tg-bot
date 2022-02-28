import {Context} from "telegraf";

interface SessionData {
    currentSign: string
}

export interface CustomContext extends Context {
    session?: SessionData
}