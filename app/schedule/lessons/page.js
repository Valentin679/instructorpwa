'use client'
import React, {useEffect, useState} from 'react';
import dayjs from 'dayjs';
import AddLesson from "@/app/schedule/lessons/AddLesson";
import weekday from 'dayjs/plugin/weekday'
import toObject from 'dayjs/plugin/toObject'
import {message} from "antd";
import {getLessonsByDate} from "@/app/api/fetchLessons";
import Loading from "@/app/components/Loading";
import OneLesson from "@/app/schedule/lessons/OneLesson";
import {DayBlock} from "@/app/schedule/lessons/DayBlock";

dayjs.extend(toObject)
dayjs.extend(weekday);

export const localeObject = {
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

export default function Lessons({success}) {
    const [messageApi, contextHolder] = message.useMessage();
    const nowDay = dayjs().date()
    const nowMonth = dayjs().month()
    const nowDate = nowDay + '/' + Number(nowMonth + 1)
    const [activeDate, setActiveDate] = useState(nowDate)
    const [update, setUpdate] = useState(false)
    const [loadLessons, setLoadLessons] = useState(false)
    const [lessons, setLessons] = useState([])
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
                         nowDate={nowDate}
                         setActiveDate={setActiveDate}
                         activeDate={activeDate}
        />

    })
    useEffect(() => {
        setLoadLessons(true)
        // console.log(activeDate)
        activeDate ? getLessonsByDate(activeDate).then((res) => {
            setLessons(res)
            setLoadLessons(false)
        }) : ''
    }, [activeDate, update]);
    return (
        <div className={'d-flex flex-column fontSize18 gap-2 p-2'}>
            {contextHolder}
            <div style={{scrollSnapType: 'x proximity', overflow: 'auto', borderRadius: 10}}
                 className={'d-flex flex-row gap-2'}>
                {datesList}
            </div>
            {loadLessons ?
                <Loading/>
                :
                <div>
                    {lessons.length !== 0 ? lessons.sort((a, b) => a.time > b.time ? 1 : -1).map(lesson => {
                        // <div><p>{lesson.date}</p></div>
                        return <OneLesson key={lesson._id} lesson={lesson} setUpdate={setUpdate} update={update}
                                          success={success}/>
                        // console.log(lesson)
                    }) : <p>Нет занятий</p>
                    }
                    <AddLesson success={success} setUpdate={setUpdate} update={update}/>
                </div>}
            {/*<Schedule/>*/}

        </div>
    );
}




