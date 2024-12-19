'use client'
import React from 'react';
import {TimePicker} from 'antd';
import dayjs from 'dayjs';

const format = 'HH:mm';
export default function Schedule() {
    const startTime = dayjs('9:00', 'HH:mm');
    const endTime = dayjs('12:08', 'HH:mm');
    return (

        <div className={'d-flex flex-column'}>
            <div style={{minHeight: '100%'}}>Расписание</div>
            <TimePicker.RangePicker defaultValue={[startTime, endTime]}
                                    onChange={(time, timeString) => {
                                        console.log(time, timeString);
                                    }}
                                    format={format}
                                    minuteStep={15}/>
        </div>
    );
}
