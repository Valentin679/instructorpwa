import React, {useEffect, useState} from "react";
import {Select} from "antd";
import {TfiSave} from "react-icons/tfi";
import {editStudentGrades} from "@/app/api/fetchOneStudent";

const selectList = [
    { value: 5, label: 'Полностью освоен' },
    { value: 4, label: 'Изредка требуется подсказка' },
    { value: 3, label: 'Часто требуется подсказка' },
    { value: 2, label: 'Ознакомлен' },
    { value: 1, label: 'Не изучено' },
]



export default function Grades({id, grade, gradeIndex}) {
    // console.log(id)
    // console.log(grade)
    const [exercise, setExercise] = useState(grade.name)
    const [level, setLevel] = useState(grade.level)
    const [slug, setSlug] = useState(grade.slug)
    const [changed, setChanged] = useState(false)
// console.log(grade)
    useEffect(() => {

        // console.log(level)
    }, [level]);
    return (
        <div key={grade.slug} className={'d-flex flex-row, mb-1, gap-1 justify-content-between items-center'}>
            <p className={'mb-0.5'} key={grade.slug}>{exercise}</p>
            {level === selectList[0].label ? <p className={'text-success mb-0.5'}>{level}</p> :
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
            {changed ? <div className={'ml-1'}><button onClick={()=>{
                editStudentGrades(id, slug, level, exercise, gradeIndex).then(r => setChanged(false))
            }}><TfiSave size={22} /></button></div> : null}

        </div>)
}
