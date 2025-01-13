'use client'
import React, {useContext} from 'react';
import {Button, ConfigProvider, message, TimePicker} from 'antd';
import dayjs from 'dayjs';
import Slots from "@/app/schedule/slots/page";
import Lessons from "@/app/schedule/lessons/page";
import StudentsContext from "@/app/context/StudentsContext";


export default function Schedule() {
    const [messageApi, contextHolder] = message.useMessage();
    const success = (contentText) => {
        messageApi.open({
            type: 'success',
            content: contentText,
        });
    };
    const students = useContext(StudentsContext)
    return (

        <div className={'d-flex flex-column fontSize18'} >
            {contextHolder}
            <div style={{minHeight: '100%'}}>Расписание</div>
            <Lessons success={success}/>
            {/*<Slots/>*/}
            {/*<Button onClick={()=>{*/}
            {/*    console.log(students)*/}
            {/*}}>ffff</Button>*/}
        </div>
    );
}
