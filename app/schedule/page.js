'use client'
import React from 'react';
import {ConfigProvider, TimePicker} from 'antd';
import dayjs from 'dayjs';
import Slots from "@/app/schedule/slots/page";
import Lessons from "@/app/schedule/lessons/page";

const format = 'HH:mm';
export default function Schedule() {
    const startTime = dayjs('9:00', 'HH:mm');
    const endTime = dayjs('12:08', 'HH:mm');
    return (

        <div className={'d-flex flex-column fontSize18'} >
            <div style={{minHeight: '100%'}}>Расписание</div>
            <Lessons/>
            <Slots/>
        </div>
    );
}
