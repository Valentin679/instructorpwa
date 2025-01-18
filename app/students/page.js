'use client'
import React, {useContext, useEffect, useState} from "react";
import {getActiveStudents, getInactiveStudents} from "@/app/api/fetchStudents";
import StudentsListItem from "@/app/students/components/StudentsListItem";
import {useRouter} from 'next/navigation'
import {Button, Select} from "antd";
import Loading from "@/app/components/Loading";
import {Radio} from 'antd';
import {UserAddOutlined} from "@ant-design/icons";
import NowDateContext from "@/app/context/NowDateContext";
import dayjs from "dayjs";
import studentsContext, {useStudents} from "@/app/context/StudentsContext";
import StudentsContext from "@/app/context/StudentsContext";

const optionsActive = [
    {label: 'Активные', value: true},
    {label: 'Не активные', value: false}
];

const optionsFilter = [
    {label: 'По группе', value: 'groups'},
    {label: 'Только ДП', value: "additional"},
    {label: 'Сдана теория', value: 'theoryPassed'},
    {label: 'По алфавиту', value: 'alphabet'}
];

export default function Students() {
    const router = useRouter()
    const students = useStudents()
    const [viewStudents, setViewStudents] = useState(students)
    const [inactiveStudents, setInactiveStudents] = useState([])
    const [activeStudents, setActiveStudents] = useState(true)
    const [activeFilter, setActiveFilter] = useState('groups')
    const onChangeActive = (e) => {
        setActiveStudents(e.target.value)
    }

    const handleChangeFilter = (value) => {
        setActiveFilter(value)
    };
    const filterFunction = (arr) => {
        if (activeFilter === 'groups') {
            let newStudentsList = arr.sort((a, b) => {
                if (a.group.number > b.group.number) return 1;
                if (a.group.number < b.group.number) return -1;

            })
            let result = newStudentsList.sort((a, b) => {
                if (a.group.year < b.group.year) return -1;
                if (a.group.year > b.group.year) return 1;
            })
            // console.log(result)
            setViewStudents(result)
            // students === result
        } else if (activeFilter === 'alphabet') {
            let result = arr.sort((a, b) => {
                if (a.lastName > b.lastName) return 1;
                if (a.lastName < b.lastName) return -1;
            })
            // console.log(result)
            setViewStudents(result)
            // students === result
        } else if (activeFilter === 'additional') {
            let result = arr.sort((a, b) => {
                if (a.quantityPracticalLessons > b.quantityPracticalLessons) return -1;
                if (a.quantityPracticalLessons < b.quantityPracticalLessons) return 1;
            })
            // console.log(result)
            setViewStudents(result)
            // students === result
        } else if (activeFilter === 'theoryPassed') {
            let result = arr.sort((a, b) => {
                if (a.exams[0].result === false) return 1;
                if (a.exams[0].result === true) return -1;
            })
            // console.log(result)
            setViewStudents(result)
            // students === result
        }

    }
    // filterFunction(viewStudents)
    useEffect(() => {
        if (activeStudents && students.length !== 0) {
            filterFunction(students)
        } else {
            getInactiveStudents().then(res => {
                setInactiveStudents(res)
                // filterFunction(res)
            })
        }
    }, [activeStudents, activeFilter]);
    console.log(students)

    const studentsList = viewStudents.map(student => (
        <StudentsListItem key={student._id} student={student}/>
    ))
    const inactiveStudentsList = inactiveStudents.map(student => (
        <StudentsListItem key={student._id} student={student}/>
    ))
    if (students.length === 0) {
        return <Loading style={{margin: '0 auto'}}/>
    } else {
        return (
            <div className={'h-100 d-flex flex-column gap-2 '}>
                <div>
                    <Radio.Group onChange={onChangeActive} block options={optionsActive} defaultValue={activeStudents}
                                 optionType="button" buttonStyle="solid"/>
                </div>
                <div className={'d-flex flex-row gap-2 mx-auto w-100 px-1'}>
                    <Select
                        defaultValue={activeFilter}
                        style={{
                            width: '80%',
                        }}
                        onChange={handleChangeFilter}
                        options={optionsFilter}
                    />
                    <Button className={'mx-auto'} type={'primary'} onClick={() => {
                        router.push('/students/add-student')
                    }}><UserAddOutlined/></Button>
                </div>
                <NowDateContext.Provider value={dayjs()}>
                    {activeStudents ? studentsList : inactiveStudentsList}
                </NowDateContext.Provider>
            </div>
        );
    }
}
