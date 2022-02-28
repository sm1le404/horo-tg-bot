export class EnumHelper {

    static getValueByStringCode(e: any, code: string) {
        return Object.values(e)[Object.keys(e).indexOf(code)];
    }

    static getCodeByName(e: any, name: string) {
        return Object.keys(e)[Object.values(e).indexOf(name)];
    }

    static getNames(e: any) {
        return Object.keys(e)
    }

    static getValues(e: any) {
        return Object.values(e).flat().map((value) => value.toString())
    }
}

module.exports = {EnumHelper}
