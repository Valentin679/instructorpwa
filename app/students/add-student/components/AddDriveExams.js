import React, {useState} from 'react';
import {Checkbox, DatePicker, Space} from "antd";

export default function AddDriveExams ({attempt, setDrive}) {
    const [chooseAttempt, setChooseAttempt] = useState(true)
    const onChangeDate = (date, dateString) => {
        setDrive(dateString)
        console.log('Попытка '+ attempt + " - " + dateString)
    }
    return (
        <div className={'w-100 d-flex items-center justify-content-around'}>
            <Checkbox onChange={(e) => {
                console.log(e.target.checked)
                setChooseAttempt(!e.target.checked)
            }}>{attempt} Попытка</Checkbox>
            <Space direction="vertical">
                <DatePicker placeholder="Дата сдачи" onChange={onChangeDate} disabled={chooseAttempt} format={'DD/MM/YYYY'}/>
            </Space>
        </div>
    );
};