import {Document} from "mongoose";
import {ExDate} from "../../helpers/ExDate";
import {ISign} from "../Sign/ISign";

export interface IDaily extends Document {
    date: ExDate,
    description: string,
    sign: ISign
}
