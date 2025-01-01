import dayjs from "dayjs";
import React from "react";
let weekDays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ',];
export  function DayBlock({day, month, nowDay, id, setActiveDate, activeDate, nowDate}) {
    const dayWeek = dayjs(`${day}/${month + 1}`, 'D/M').day()
    return (

        <div id={id} style={{borderRadius: 7}}
             className={`'d-flex flex-column text-center px-1.5 border rounded' ${id === activeDate ? 'border-2 border-danger' : 'border-secondary'} `}
             onClick={() => {
                 setActiveDate(id)
             }}
        >
            <div>
                {nowDay === day ? <p className={'text-success'} style={{fontSize: 28, fontWeight: 'bold'}}>{day}</p> :
                    <p style={{fontSize: 28}}>{day}</p>}
            </div>
            <div><p className={nowDay === day ? 'text-success' : ''}
                    style={{fontSize: 20, textAlign: 'center'}}>{weekDays[dayWeek]}</p>
            </div>
        </div>
    );
}