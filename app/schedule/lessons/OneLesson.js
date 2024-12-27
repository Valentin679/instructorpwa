import React, {useState} from 'react';
import {MoreOutlined} from "@ant-design/icons";
import styles from './lessons.module.css'
import EditDeleteBlock from "@/app/schedule/lessons/components/EditDeleteBlock";
import TimeBlock from "@/app/schedule/lessons/components/TimeBlock";
import StudentNameBlock from "@/app/schedule/lessons/components/StudentNameBlock";
import QuantityLessonsBlock from "@/app/schedule/lessons/components/QuantityLessonsBlock";
import ExerBlock from "@/app/schedule/lessons/components/ExerBlock";

export default function OneLesson({update, setUpdate, lesson, success}) {

    const [moreActions, setMoreActions] = useState(false)

    return (
        <div
            className={'d-flex flex-row justify-between items-center py-2 gap-1'} key={lesson.time}>
            <div className={'d-flex flex-row gap-2 w-100'}>
                <TimeBlock timeStart={lesson.time[0]} timeEnd={lesson.time[1]}/>
                <div className={'d-flex flex-col gap-0.5 py-1 w-100'}>
                    <div className={'d-flex flex-row justify-between'}>
                        <StudentNameBlock lastName={lesson.student.lastName}
                                          firstName={lesson.student.firstName}
                                          surname={lesson.student.surname}
                                          group={lesson.student.group.number}
                        />
                        <QuantityLessonsBlock quantity={lesson.student.quantityPracticalLessons}/>
                    </div>
                    <ExerBlock exercise={lesson.student.exercise}/>
                </div>
            </div>
            <div style={{height: 70}} className={'d-flex flex-row bg-light border rounded p-2 h-1/2 text-2x'}>
                <EditDeleteBlock lessonId={lesson._id}
                                 studentId={lesson.student._id}
                                 quantityPracticalLessons={lesson.student.quantityPracticalLessons}
                                 moreActions={moreActions}
                                 success={success}
                                 update={update}
                                 setUpdate={setUpdate}
                />
                <MoreOutlined className={moreActions ? styles.hiddenMore : styles.visibleMore} onClick={() => {
                    moreActions ? setMoreActions(false) : setMoreActions(true)
                }}/>
            </div>
        </div>
    )
};
