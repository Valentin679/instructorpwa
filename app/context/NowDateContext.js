import {createContext} from "react";
import dayjs from "dayjs";



const NowDateContext = createContext(dayjs())

export default NowDateContext