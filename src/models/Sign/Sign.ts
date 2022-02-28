import {model, Schema} from "mongoose";
import {ISign} from "./ISign";

const schemaSign: Schema = new Schema({
    title: {type: String, unique: true},
    code: {type: String, index: true},
    sort: Number,
    tgIcon: String,
    description: String,
    dateFrom: {type: String, required: true},
    dateTo: {type: String, required: true}
})

const Sign = model<ISign>("Sign", schemaSign);
export default Sign;