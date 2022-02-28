import axios from "axios";
import {XMLParser} from "fast-xml-parser";
import {get} from "lodash";
import {Days} from "../helpers/Types"

export class ApiHoro {

    protected items: object;
    private horoXmlPath: string;

    constructor(horoXmlPath: string) {
        this.horoXmlPath = horoXmlPath;
    }

    public getItems() {
        return axios.get(this.horoXmlPath).then((response) => {
            if (response.data) {
                const parser = new XMLParser()
                const parsedData = parser.parse(response.data)
                this.items = parsedData.horo;
                return this.items
            }
        })
    }

    public getHoro(signCode: string, day = Days.td) {
        return get(this.items, `${signCode}.${day}`, '')
    }
}

export const getHoroInstance = async (url: string) => {
    const apiHoro = new ApiHoro(url);
    await apiHoro.getItems();
    return apiHoro;
}

module.exports = {ApiHoro, getHoroInstance}