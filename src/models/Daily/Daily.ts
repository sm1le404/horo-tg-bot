import {model, Schema} from "mongoose";
import {IDaily} from "./IDaily";

const schemaDaily: Schema = new Schema({
    date: {type: Date, default: Date.now},
    description: String,
    sign: {
        type: Schema.Types.ObjectId,
        ref: 'Sign'
    }
})

const Daily = model<IDaily>("Daily", schemaDaily);
export default Daily;

