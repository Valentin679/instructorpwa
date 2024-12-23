'use client'
import React from 'react';
import {ConfigProvider, message, TimePicker} from 'antd';
import dayjs from 'dayjs';
import Slots from "@/app/schedule/slots/page";
import Lessons from "@/app/schedule/lessons/page";


export default function Schedule() {
    const [messageApi, contextHolder] = message.useMessage();
    const success = (contentText) => {
        messageApi.open({
            type: 'success',
            content: contentText,
        });
    };

    return (

        <div className={'d-flex flex-column fontSize18'} >
            {contextHolder}
            <div style={{minHeight: '100%'}}>Расписание</div>
            <Lessons success={success}/>
            {/*<Slots/>*/}
        </div>
    );
}
