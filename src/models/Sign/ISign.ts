import {Document} from "mongoose";

export interface ISign extends Document {
    title: string,
    code: string,
    sort: number,
    tgIcon: string,
    description: string,
    dateFrom: string
    dateTo: string,
}
