import {ApiHoro} from "./ApiHoro";
import Sign from "../models/Sign/Sign";
import {ISign} from "../models/Sign/ISign";
import {get} from "lodash";
import Daily from "../models/Daily/Daily";
import {getDateByString} from "../helpers/ExDate";

export class Engine {

    public load() {
        const apiHoro = new ApiHoro(process.env.HORO_XML);
        apiHoro.getItems().then((resultItems) => this.dbLoad(resultItems))
    }

    private dbLoad(horoData: object) {
        Sign.find({}).then((signList: object) => {
            Promise.all(Object.values(signList).map((sign: ISign) => {
                const daysData: object = get(horoData, sign.code)
                return Object.keys(daysData).map((dayCode: string) => {
                    const day = getDateByString(dayCode)
                    return Daily.findOneAndUpdate({sign: sign, date: day},
                        {$set: {sign: sign, date: day, description: get(daysData, dayCode)}},
                        {upsert: true}).exec()
                })
            }))
        })
    }
}
