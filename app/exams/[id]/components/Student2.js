'use client'
import {useEffect, useRef, useState} from "react";
import Loading from "@/app/components/Loading";

export default function Student2({studentData, examDate, index, cancelExam, confirmExam}) {
    const [student, setStudent] = useState(studentData)
    const [confirmPresence, setConfirmPresence] = useState(false)
    const refContainer = useRef();
    const refBlock = useRef();
    const refRightMenu = useRef();

    function ConfirmPresence() {
        let driveExams = student.exams[1]
        let examDateText = '12/12/2024'
        let res = driveExams.dates?.find(exam => exam === examDate)
        if (res !== undefined) {
            console.log(student.firstName + ' записан')
            setConfirmPresence(true)
        }
    }

    useEffect(() => {
        ConfirmPresence()
    }, [confirmPresence]);


    if (!student) {
        return <Loading/>
    } else {
        return (

            // <SwipeHOC refLink={refBlock} refRightMenu={refRightMenu} refContainer={refContainer}>
            <div ref={refContainer} className={'d-flex flex-row overflow-hidden'}>
                <div ref={refBlock}
                     className={'d-flex p-3 bg-light border-bottom w-100 position-relative'}>
                    <p>
                        {student.firstName + ' ' + student.lastName + ' ' + student.surname}
                    </p>

                </div>
                <div className={'d-flex text-sm'}>
                    {!confirmPresence ? <div
                        className={'d-flex items-center justify-center bg-green-700 h-100 border-right border-secondary px-1 text-white '}
                        onClick={() => {
                            console.log(' буду на экзамене')
                            confirmExam(index)
                            setConfirmPresence(true)
                            //ничего не делать
                        }}
                    >Подтв.</div> : ''}
                    <div
                        className={'d-flex items-center justify-center bg-red-700 h-100 border-right border-secondary px-1 text-white '}
                        onClick={() => {
                            cancelExam(index)
                        }}
                    >Отмена
                    </div>
                </div>
                {/*<div ref={refRightMenu} style={{float: "left", width: 0, overflow: "hidden", position: "relative",}}*/}
                {/*     className={' d-flex flex-row justify-between items-center text-center'}*/}
                {/*>*/}
                {/*    {confirmPresence ? <>*/}
                {/*        <div className={'d-flex items-center justify-center bg-green-700 h-100 border-right border-secondary w-100 text-white '}*/}

                {/*        onClick={()=>{*/}
                {/*            //добавить результат сдал студенту*/}
                {/*            const id = student._id*/}
                {/*            const exams = student.exams*/}
                {/*            exams[1].result = true*/}
                {/*            editExamResultForStudent(id, exams).then((res) => {*/}
                {/*                refRightMenu.current.style.width = 0*/}
                {/*                refBlock.current.style.right = 0*/}
                {/*                refBlock.current.style.color = '#76b716'*/}
                {/*            })*/}
                {/*        }}*/}
                {/*        >Сдал</div>*/}
                {/*        <div className={'d-flex items-center justify-center bg-red-700 h-100 border-right border-secondary w-100 text-white '}*/}
                {/*             onClick={()=>{*/}
                {/*                //ничего не делать*/}
                {/*             }}*/}
                {/*        >Не сдал</div>*/}
                {/*    </> : <>*/}
                {/*        <div className={'d-flex items-center justify-center bg-green-700 h-100 border-right border-secondary w-100 text-white '}*/}
                {/*             onClick={()=>{*/}
                {/*                //добавить дату экзамена в массив у студента*/}
                {/*             }}*/}
                {/*        >Подтв</div>*/}
                {/*        <div className={'d-flex items-center justify-center bg-yellow-500 h-100 border-right border-secondary w-100 text-white '}*/}
                {/*             onClick={()=>{*/}
                {/*                 //удалить кандидата из списка людей в экзамене*/}
                {/*             }}*/}
                {/*        >Отмена</div>*/}
                {/*    </>}*/}
                {/*</div>*/}
            </div>
            // </SwipeHOC>
        );
    }
}
