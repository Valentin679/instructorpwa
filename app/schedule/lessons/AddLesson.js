'use client'
import React, {useEffect, useState} from 'react';
import {Button, Radio, DatePicker, Modal, TimePicker, Select, message} from 'antd';
import dayjs from 'dayjs';
import {addLesson} from "@/app/api/fetchLessons";
import {changeCountLesson, getActiveStudents} from "@/app/api/fetchStudents";


export default function AddLesson({setUpdate, update, success}) {
    const [fetchingStudents, setFetchingStudents] = useState(false)
    const [date, setDate] = useState(null)
    const [time, setTime] = useState(null)
    const [timeStart, setTimeStart] = useState()
    const [lessonDuration, setLessonDuration] = useState(1)
    const [student, setStudent] = useState()
    const [studentListForSelect, setStudentListForSelect] = useState()
    const [studentsList, setStudentsList] = useState([])
    const [isModalOpen, setIsModalOpen] = useState(false);
    const format = 'HH:mm';


    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleOk = () => {
        const data = {
            date,
            time,
            student,
            lessonNumber: student.quantityPracticalLessons + 1,
            instructor: {name: 'Мезенин В.А.'},
            car: {model: 'Лада Гранта', number: "В483ОА67"}
        }
        console.log(data)
        addLesson(data).then(()=>{
            changeCountLesson(student._id, student.quantityPracticalLessons+1).then(()=>{
                success('Занятие запланировано')
                update ? setUpdate(false):setUpdate(true)
            })

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
        const result = studentsList.find(student => student._id === value)
        setStudent(result)
    }

    const fetchStudentsForSelect = () => {
        getActiveStudents().then((res)=>{
            setStudentsList(res)
            const studentsArr = res.map(student => {
                return {value: student._id, label: student.firstName}
            })
            setStudentListForSelect(studentsArr)
        })
    }
    useEffect(() => {
        fetchingStudents ? fetchStudentsForSelect() : ''
    }, [fetchingStudents]);

    // console.log(student)
    return (

        <div className={'d-flex flex-column fontSize18'}>

            <Button type={'primary'} onClick={() => {
                showModal(true)
            }}>Добавить занятие</Button>
            <Modal title="Занятие" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <div className={'d-flex flex-column gap-2'}>
                    <div className={'d-flex flex-row gap-1 fontSize18'}>
                        <DatePicker status={date ? "" : "error"} onChange={onChangeDate} needConfirm={false} format={'DD/MM'}/>
                        <Button className={'fontSize18'} onClick={()=>{
                            setDate(dayjs().add(1, 'day').format('DD/MM'))
                        }}>Завтра</Button>
                    </div>
                    <div className={'d-flex flex-row gap-1.5 items-center fontSize18'}>
                        <TimePicker status={time ? "" : "error"}  value={timeStart} onChange={onChangeTime} changeOnScroll needConfirm={false} format={format} minuteStep={15}/>
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
                    <Select onChange={onChangeStudent}
                            options={studentListForSelect}
                            onDropdownVisibleChange={()=>{
                                fetchingStudents ? setFetchingStudents(false) : setFetchingStudents(true)
                            }}
                    >
                        {/*<Select.Option value="Samvel">Самвел</Select.Option>*/}
                    </Select>
                    {/*<TimePicker.RangePicker onChange={onChangeTime} defaultValue={[startTime, endTime]} format={format}*/}
                    {/*                        minuteStep={15}/>*/}
                </div>
            </Modal>

        </div>
    );
}
