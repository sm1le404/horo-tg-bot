export class ExDate extends Date {
    private addDay(countDays: number) {
        this.setUTCHours(0, 0, 0, 0)
        this.setUTCDate(this.getDate() + countDays)
    }

    public today() {
        this.addDay(0)
    }

    public yesterday() {
        this.addDay(-1)
    }

    public tomorrow() {
        this.addDay(1)
    }

    public tomorrow2() {
        this.addDay(2)
    }
}

export const getDateByString = (dayName: string): ExDate => {
    const day = new ExDate()
    switch (dayName) {
        case 'today':
            day.today()
            break
        case 'yesterday':
            day.yesterday()
            break
        case 'tomorrow':
            day.tomorrow()
            break
        case 'tomorrow02':
            day.tomorrow2()
            break
    }
    return day
}