import Link from "next/link";

import GroupTag from "@/app/students/components/item-components/Tags/groupTag";
import QuantityLessonsBlock from "@/app/students/components/item-components/QuantityLessonsBlock";
import ExerBlock from "@/app/students/components/item-components/ExerBlock";
import StudentNameBlock from "@/app/students/components/item-components/StudentNameBlock";
import ExamsBlock from "@/app/students/components/item-components/ExamsBlock";
import React, {useRef, useState,} from "react";
import SwipeEditBlock from "@/app/components/SwipeEditBlock";
import {Radio} from "antd";
import StudentsListItem from "@/app/students/components/StudentsListItem";

const optionsRadio = [
    {label: 'Не ходят', value: false},
    {label: 'Сдавшие', value: true}
];
export default function InactiveStudents({students}) {

    const [isPassed, setIsPassed] = useState(false)
    const onChangeActive = (e) => {
        setIsPassed(e.target.value)
    }
    const passedStudentsList = students.map(student => {
        if (student.exams[1].result === true) {
        return <StudentsListItem key={student._id} student={student}/>
        }
    })
    const inactiveStudentsList = students.map(student => {
        if (student.exams[1].result === false) {
            return <StudentsListItem key={student._id} student={student}/>
        }
    })



    return (<div>
            <div>
                <Radio.Group onChange={onChangeActive} block options={optionsRadio} defaultValue={isPassed}
                             optionType="button" buttonStyle="solid"/>
            </div>
            {isPassed ? passedStudentsList : inactiveStudentsList}
        </div>
    );

}
