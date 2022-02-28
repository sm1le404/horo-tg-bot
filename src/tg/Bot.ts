import {Markup, session, Telegraf} from 'telegraf';
import Sign from "../models/Sign/Sign";
import {CustomContext} from "./Helpers/CustomContext";
import _ from "lodash"
import {EnumHelper} from "./Helpers/EnumHelper";
import {Days, DaysRu} from "../helpers/Types";
import cache from "memory-cache"
import {ISign} from "../models/Sign/ISign";
import Daily from "../models/Daily/Daily";
import {getDateByString} from "../helpers/ExDate";

export class Bot {
    token: string
    bot: Telegraf<CustomContext>

    constructor(token: string) {
        if (token === undefined) {
            throw new Error('BOT_TOKEN must be provided!')
        }
        this.token = token
        this.bot = new Telegraf<CustomContext>(token)
        this.bot.use(session())
        this.init()
    }

    getMiddleware(clientUrl: string) {
        const secretPath = `/telegraf/${this.bot.secretPathComponent()}`
        this.bot.telegram.setWebhook(`${clientUrl}${secretPath}`)
        return this.bot.webhookCallback(secretPath)
    }

    init() {
        const getSigns = async (): Promise<Array<ISign>> => {
            let signs = cache.get('signsList')
            if (!signs) {
                signs = await Sign.find({})
                cache.put('signsList', signs)
            }
            return signs
        }
        getSigns().then((signs) => {
            this.step1(signs)
            this.step2(signs)
        })
    }

    step1(signsList: Array<ISign>) {
        const signsKeyboard = signsList.map((item) => `${item.tgIcon} ${item.title}`);
        this.bot.start((ctx) =>
            ctx.reply('Выберите знак зодиака', Markup
                .keyboard(signsKeyboard)
                .oneTime()
                .resize()
            )
        )
        const days = EnumHelper.getValues(DaysRu);
        this.bot.hears(signsKeyboard, (ctx) => {
                ctx.session ??= {currentSign: null}
                ctx.session.currentSign = ctx.message.text
                return ctx.reply('Выберите день', Markup
                    .keyboard(days)
                    .oneTime()
                    .resize()
                )
            }
        )
    }

    step2(signsList: Array<ISign>) {
        const days = EnumHelper.getValues(DaysRu);
        this.bot.hears(days, (ctx) => {
                ctx.session ??= {currentSign: null}
                if (ctx.session.currentSign) {
                    const [signSymbol, signTitle] = ctx.session.currentSign.split(` `)
                    const selectedDay = ctx.message.text
                    const dayCode = EnumHelper.getCodeByName(DaysRu, selectedDay)
                    //@ts-ignore
                    const dateObj = getDateByString(Days[dayCode])
                    const foundSign = _.find(signsList, {title: signTitle})
                    if (foundSign && dateObj) {
                        Daily.findOne({sign: foundSign, date: dateObj}).then((signDaily) => {
                            if (signDaily) {
                                return ctx.reply(signDaily.description, Markup.removeKeyboard())
                            }
                            return ctx.reply('Начните заного, /start')
                        }).catch(() => {
                            return ctx.reply('Начните заного, /start')
                        })
                    }
                }
            }
        )
    }
}

module.exports = {Bot}