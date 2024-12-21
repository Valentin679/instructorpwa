'use client'
import React, {useState} from 'react';
import {Button, Radio, DatePicker, Modal, TimePicker, Select, message} from 'antd';
import dayjs from 'dayjs';
import styles from './lessons.module.css'
import {addLesson, getLessonsByDate} from "@/app/api/fetchLessons";
import MessageSuccess from "@/app/components/Loading";

const format = 'HH:mm';
export default function AddLesson({setUpdate, update}) {
    const startTime = dayjs('9:00', 'HH:mm');
    const endTime = dayjs('10:30', 'HH:mm');
    const [messageApi, contextHolder] = message.useMessage();
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [timeStart, setTimeStart] = useState()
    const [lessonDuration, setLessonDuration] = useState(1)
    const [student, setStudent] = useState()

    const [isModalOpen, setIsModalOpen] = useState(false);

    const success = () => {
        messageApi.open({
            type: 'success',
            content: 'Занятие запланировано',
        });
    };

    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        const data = {
            date,
            time,
            student,
            number: 'student.countLessons+1',
            instructor: {name: 'Мезенин В.А.'},
            car: {model: 'Лада Гранта', number: "В483ОА67"}
        }
        console.log(data)
        addLesson(data).then(()=>{
            success()
            update ? setUpdate(false):setUpdate(true)
        })
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
            {contextHolder}
            <Button type={'primary'} onClick={() => {
                showModal(true)
                console.log(dayjs().add(1, 'day').format('DD-MM-YYYY'))
            }}>Добавить занятие</Button>
            <Modal title="Занятие" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className={'d-flex flex-column gap-2'}>
                    <div className={'d-flex flex-row gap-1 fontSize18'}>
                        <DatePicker onChange={onChangeDate} needConfirm format={'DD/MM'}/>
                        <Button className={'fontSize18'} onClick={()=>{
                            console.log(dayjs().add(1, 'day').format('DD/MM'))
                        }}>Завтра</Button>
                    </div>
                    <div className={'d-flex flex-row gap-1.5 items-center fontSize18'}>
                        <TimePicker  value={timeStart} onChange={onChangeTime} format={format} minuteStep={15}/>
                        <Radio.Group
                            optionType="button"
                            buttonStyle="solid"
                            onChange={onChangeLessonDuration}
                            value={lessonDuration}>
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
