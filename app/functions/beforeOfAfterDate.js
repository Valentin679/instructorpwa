import dayjs from "dayjs";
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'
dayjs.extend(isSameOrAfter)


export const beforeOfAfterDate = (date) => {

    return dayjs().isSameOrAfter(dayjs(date, 'DD/MM/YYYY'), "day")
}