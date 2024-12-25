'use client'
import React, {useEffect, useState} from "react";
import {getActiveStudents, getInactiveStudents, getStudents} from "@/app/api/fetchStudents";
import StudentsListItem from "@/app/students/components/StudentsListItem";
import {useRouter} from 'next/navigation'
import {Button} from "antd";
import Loading from "@/app/components/Loading";
import {Radio} from 'antd';

const optionsActive = [
    {label: 'Активные', value: true},
    {label: 'Не активные', value: false}
];
export default function Students() {
    const router = useRouter()
    const [students, setStudents] = useState([])
    const [activeStudents, setActiveStudents] = useState(true)
    const onChangeActive = (e) => {
        setActiveStudents(e.target.value)
    }

    useEffect(() => {
        activeStudents ? getActiveStudents().then(res => setStudents(res)) : getInactiveStudents().then(res => setStudents(res))
    }, [activeStudents]);


    const studentsList = students.map(student => (
        <StudentsListItem key={student._id} student={student}/>
    ))
    if (students.length === 0) {
        return <Loading style={{margin: '0 auto'}}/>
    } else {
        return (

            <div className={'h-100 d-flex flex-column'}>
                <div>
                    <Radio.Group onChange={onChangeActive} block options={optionsActive} defaultValue={activeStudents}
                                 optionType="button" buttonStyle="solid"/>
                </div>
                {studentsList}
                {/*<Link href={'students/add-student'} className={'btn-primary'}>Добавить ученика</Link>*/}
                <Button className={'mx-auto'} type={'primary'} onClick={() => {
                    router.push('/students/add-student')
                }}>Добавить ученика</Button>
            </div>
        );
    }
}
