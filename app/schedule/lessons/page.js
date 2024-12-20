'use client'
import React, {useState} from 'react';
import {Button, Radio, DatePicker, Modal, TimePicker, Select } from 'antd';
import dayjs from 'dayjs';

const format = 'HH:mm';
export default function Lessons() {
    const startTime = dayjs('9:00', 'HH:mm');
    const endTime = dayjs('10:30', 'HH:mm');

    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [timeStart, setTimeStart] = useState()
    const [lessonDuration, setLessonDuration] = useState(1)
    const [student, setStudent] = useState()

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
    const onChangeDate = (date, dateString) => {
        setDate(dateString)
    }
    const onChangeTime = (date, dateString) => {
        let newTime
        if (lessonDuration === 3) {
            newTime = dayjs(date, 'HH:mm').add(1, "hour").format('HH:mm')
        } else if( lessonDuration === 1) {
            newTime = dayjs(date, 'HH:mm').add(1, "hour").add(30, 'minute').format('HH:mm')
        } else if (lessonDuration === 2) {
            newTime = dayjs(date, 'HH:mm').add(1, "hour").add(15, 'minute').format('HH:mm')
        }
        setTime([dateString, newTime])
    }
    const onChangeLessonDuration = (e) => {
        setLessonDuration(e.target.value);
    }
    
    const onChangeStudent = (value) => {
        console.log(value)
        setStudent(value)
    }
    
    return (

        <div className={'d-flex flex-column fontSize18'}>
            <div style={{minHeight: '100%'}}>Расписание</div>
            <Button type={'primary'} onClick={() => {
                showModal(true)
                console.log(dayjs().add(1, 'day').format('DD-MM-YYYY'))
            }}>Добавить занятие</Button>
            <Modal title="Занятие" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className={'d-flex flex-column gap-2'}>
                    <div className={'d-flex flex-row gap-1'}>
                        <DatePicker onChange={onChangeDate} needConfirm/>
                        <Button onClick={()=>{
                            console.log(dayjs().add(1, 'day').format('DD-MM-YYYY'))
                        }}>Завтра</Button>
                    </div>
                    <div className={'d-flex flex-row gap-2 items-center'}>
                        <TimePicker value={timeStart} onChange={onChangeTime} format={format} minuteStep={15}/>
                        <Radio.Group onChange={onChangeLessonDuration} value={lessonDuration}>
                            <Radio value={1}>1:30</Radio>
                            <Radio value={2}>1:15</Radio>
                            <Radio value={3}>1</Radio>
                        </Radio.Group>
                    </div>
                    <Select onChange={onChangeStudent}>
                        <Select.Option value="Samvel">Самвел</Select.Option>
                    </Select>
                    {/*<TimePicker.RangePicker onChange={onChangeTime} defaultValue={[startTime, endTime]} format={format}*/}
                    {/*                        minuteStep={15}/>*/}
                </div>
            </Modal>

        </div>
    );
}
