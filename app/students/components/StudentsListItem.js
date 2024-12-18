
import {useEffect, useState} from "react";
import Link from "next/link";

export default function StudentsListItem({student}) {

    // console.log(student)
    const [exercise, setExercise]= useState(student.exercise)
    const goodExerc = exercise?.filter(e => {
        return e.level === 'Полностью освоен'
    })
    const badExerc = exercise?.filter(e => {
        return e.level !== 'Изредка требуется подсказка' && e.level !== 'Полностью освоен'
    })
    return (
        // <Link href="/students/modal-profile/">
        <div className={'d-flex flex-col justify-content-between align-items-center w-100 p-2'}>
            <Link href={`/students/${student._id}`}
                  className={'d-flex flex-row justify-content-between align-items-center w-100 gap-1 '}>
                <div className={'d-flex flex-row align-items-center gap-2'}>
                    <p>{student.group}</p>
                    <p style={{fontSize: 20}}>
                        {student.firstName} {student.lastName[0].toUpperCase()}. {student.surname[0].toUpperCase()}.
                    </p>
                </div>
                <p style={{color: 'green'}}>{student.status.label}</p>
            </Link>
            <div
                className={'d-flex flex-row justify-content-between align-items-center w-100 gap-1'}
            >
                <div className={'d-flex flex-row gap-1'}>
                    <p style={{fontSize: 15, color: 'green'}}>{goodExerc?.at(-1).name}</p>
                    <p> {goodExerc?.length === 0 ? '' : '-->'} </p>
                    <p style={{fontSize: 15, color: 'purple'}}>{badExerc?.at(0).name}</p>
                </div>
                <div>
                    <p>{student.quantityPracticalLessons <= 27 ?
                        student.quantityPracticalLessons + '/27' :
                        student.quantityPracticalLessons - 27 + 'ДП'
                    }</p>
                </div>
            </div>
        </div>
    );
}

// const styles = StyleSheet.create({
//     group: {
//         fontSize: 20,
//         backgroundColor: '#76b716',
//         borderRadius: '50%',
//         paddingVertical: 5,
//         paddingHorizontal: 5,
//         textAlign: 'center',
//         // width: '2em',
//     }
// });
