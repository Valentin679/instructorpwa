import React, {useEffect, useState} from "react";
import {editStudentGrades} from "@/app/api/fetchStudents";
import {Select} from "antd";

const selectList = [
    { value: 5, label: 'Полностью освоен' },
    { value: 4, label: 'Изредка требуется подсказка' },
    { value: 3, label: 'Часто требуется подсказка' },
    { value: 2, label: 'Ознакомлен' },
    { value: 1, label: 'Не изучено' },
]



export default function Grades({id, grade, indexGrade}) {
    console.log(id)
    console.log(grade)
    const [exercise, setExercise] = useState(grade.name)
    const [level, setLevel] = useState(grade.level)
    const [slug, setSlug] = useState(grade.slug)
    const [changed, setChanged] = useState(false)
// console.log(grade)
    useEffect(() => {

        // console.log(level)
    }, [level]);
    return (
        <div key={grade.slug} className={'d-flex flex-row, mb-1, gap-1 justify-content-beetwen'}>
            <p key={grade.slug}>{exercise}</p>
            {level === selectList[0].label ? <p style={{color: 'green'}}>{level}</p> :
                <Select
                    id={grade.slug}
                    defaultValue={level}
                    options={selectList}
                    size={"small"}
                    onChange={(value, option)=>{
                        if ("label" in option) {
                            setLevel(option.label)
                            setChanged(true)
                        }
                    }}
                >
                </Select>
            }
            {changed ? <div><button type={"button"} onClick={()=>{
                editStudentGrades(id, slug, level, indexGrade)
            }}>Save</button></div> : null}

        </div>)
}
