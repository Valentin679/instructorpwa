'use client'
import React, {useState} from 'react';
import {Button, Modal, TimePicker} from 'antd';
import dayjs from 'dayjs';
const format = 'HH:mm';

export default function Slots() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const startTime = dayjs('9:00', 'HH:mm');
    const endTime = dayjs('18:00', 'HH:mm');

    return (

        <div className={'d-flex flex-column fontSize18'}>
            <div className={'d-flex flex-column gap-3'}>
                <p>slots</p>
                <Button type={'primary'} onClick={() => {
                    showModal(true)
                }}>Добавить слот</Button>
                <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <TimePicker.RangePicker defaultValue={[startTime, endTime]} format={format} minuteStep={15}/>
                </Modal>
            </div>

        </div>
    );
}

