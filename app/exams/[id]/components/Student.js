'use client'
import {useEffect, useRef, useState} from "react";
import Loading from "@/app/components/Loading";
import SwipeHOC from "@/app/components/SwipeHOC";

export default function Student({studentData, examDate}) {
    const [student, setStudent] = useState(studentData)
    const [confirmPresence, setConfirmPresence] = useState(false)
    const refContainer = useRef();
    const refBlock = useRef();
    const refRightMenu = useRef();

    function ConfirmPresence() {
        let driveExams = student.exams[1]
        let examDateText = '12/12/2024'
        let res = driveExams.dates.find(exam => exam === examDate)
        if (res !== undefined) {
            console.log(student.firstName + ' записан')
            setConfirmPresence(true)
        }
    }

    useEffect(() => {
        ConfirmPresence()
    }, [confirmPresence]);

    const rightMenuResult = () => {
        return (<>
            <div>Сдал</div>
            <div>Не сдал</div>
        </>)
    }

    const rightMenuPresence = () => {
        return (<>
            <div>Подтв</div>
            <div>Отмена</div>
        </>)
    }


    if (!student) {
        return <Loading/>
    } else {
        return (

            <SwipeHOC refLink={refBlock} refRightMenu={refRightMenu} refContainer={refContainer}>
                <div ref={refContainer} className={'d-flex flex-row overflow-hidden'}>
                    <div ref={refBlock}
                         className={'d-flex p-3 bg-light border-bottom w-100 position-relative'}>
                        <p>{student.firstName + ' ' + student.lastName + ' ' + student.surname}</p>
                    </div>
                    <div ref={refRightMenu} style={{float: "left", width: 0, overflow: "hidden", position: "relative",}}
                         className={' d-flex flex-row justify-between items-center text-center'}
                    >
                        {confirmPresence ? <>
                            <div className={'d-flex items-center justify-center bg-green-700 h-100 border-right border-secondary w-100 text-white '}>Сдал</div>
                            <div className={'d-flex items-center justify-center bg-red-700 h-100 border-right border-secondary w-100 text-white '}>Не сдал</div>
                        </> : <>
                            <div className={'d-flex items-center justify-center bg-green-700 h-100 border-right border-secondary w-100 text-white '}>Подтв</div>
                            <div className={'d-flex items-center justify-center bg-yellow-500 h-100 border-right border-secondary w-100 text-white '}>Отмена</div>
                        </>}
                        {/*<div>ll</div>*/}
                        {/*<div>ll</div>*/}
                    </div>
                </div>
            </SwipeHOC>
        );
    }
}
