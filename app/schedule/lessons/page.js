'use client'
import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import AddLesson from "@/app/schedule/lessons/AddLesson";
import Schedule from "@/app/schedule/lessons/Schedule";
import weekday from 'dayjs/plugin/weekday'
import duration from 'dayjs/plugin/duration'
import calendar from 'dayjs/plugin/calendar'
import toObject from 'dayjs/plugin/toObject'
import {B612} from "next/dist/compiled/@next/font/dist/google";

dayjs.extend(calendar)
dayjs.extend(toObject)
dayjs.extend(weekday);
dayjs.extend(duration)

const localeObject = {
    name: 'ru', // имя String
    weekdays: 'Domingo_Lunes ...'.split('_'), // дни недели Array
    weekdaysShort: 'Sun_M'.split('_'), // НЕОБЯЗАТЕЛЬНО, короткое наименование дней недели Array, используйте первые три буквы, если это не предусмотрено
    weekdaysMin: 'Su_Mo'.split('_'), // НЕОБЯЗАТЕЛЬНО, минимальное наименование дней недели Array, используйте первые две буквы, если это не предусмотрено
    weekStart: 1, // НЕОБЯЗАТЕЛЬНО, установка начала недели. Если значение 1, понедельник будет началом недели, вместо воскресенья。
    yearStart: 4, // НЕОБЯЗАТЕЛЬНО, неделя, которая содержит значение 4-го января в качестве первой недели в году.
    months: 'Enero_Febrero ... '.split('_'), // месяцы Array
    monthsShort: 'Jan_F'.split('_'), // НЕОБЯЗАТЕЛЬНО, краткая запись наименования месяцев Array, используйте первые три буквы, если это не предусмотрено
    ordinal: n => `${n}º`, // ordinal Function (number) => return number + output
    formats: {
        // сокращенные имена параметров для локализации
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A',
        // нижний регистр/краткая запись, необязательные форматы для локализации
        l: 'D/M/YYYY',
        ll: 'D MMM, YYYY',
        lll: 'D MMM, YYYY h:mm A',
        llll: 'ddd, MMM D, YYYY h:mm A'
    },
    relativeTime: {
        // строковый формат относительного времени, оставьте %s %d в том же виде
        future: 'в %s', // например, "в 2 часа", %s был заменен на "2 часа"
        past: '%s ago',
        s: 'a few seconds',
        m: 'минута',
        mm: '%d минут',
        h: 'час',
        hh: '%d часа', // например, "2 часа" %d был заменен на "2"
        d: 'a число',
        dd: '%d число',
        M: 'a месяц',
        MM: '%d месяц',
        y: 'a год',
        yy: '%d год'
    },
    meridiem: (hour, minute, isLowercase) => {
        // НЕОБЯЗАТЕЛЬНО, AM/PM
        return hour > 12 ? 'PM' : 'AM'
    }
}
dayjs.locale('ru', localeObject);


let weekDays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ',];


export default function Lessons() {
    const nowDay = dayjs().date()
    const nowMonth = dayjs().month()
    const nowDate = nowDay + '/' + Number(nowMonth+1)
    const [activeDate, setActiveDate] = useState(nowDate)
    const startWeek = dayjs().weekday(0).toObject()
    const endWeek = dayjs().weekday(6)
    const arr = []

    function getViewDays() {

        for (let i = 0; i < 8; i++) {
            let day = dayjs().weekday(i).toObject()
            arr.push(day)
        }
    }

    getViewDays()

    const datesList = arr.map(e => {
        return <DayBlock key={`${e.date}/${e.months + 1}`}
                         id={`${e.date}/${e.months + 1}`}
                         day={e.date} month={e.months}
                         nowDay={nowDay}
                         setActiveDate={setActiveDate}
        />

    })
    return (
        <div className={'d-flex flex-column fontSize18 gap-2 p-1.5'}>
            <div style={{scrollSnapType: 'x proximity', overflow: 'auto', borderRadius: 10}}
                 className={'d-flex flex-row gap-2'}>
                {datesList}
            </div>
            {/*<Schedule/>*/}
            <AddLesson/>
        </div>
    );
}


function DayBlock({day, month, nowDay, id, setActiveDate}) {
    const dayWeek = dayjs(`${day}/${month + 1}`, 'DD/MM').day()
    return (

        <div id={id} style={{borderRadius: 7}}
             className={`'d-flex flex-column px-1.5 border rounded' ${day === nowDay ? 'border-danger' : 'border-secondary'} `}
             onClick={()=>{setActiveDate(id)}}
        >
            <div>
                {nowDay === day ? <p style={{fontSize: 28, color: 'red', fontWeight: 'bold'}}>{day}</p> :
                    <p style={{fontSize: 28}}>{day}</p>}
            </div>
            <div><p style={{fontSize: 20, textAlign: 'center'}}>{weekDays[dayWeek]}</p>
            </div>
        </div>
    );
}

