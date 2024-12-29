export default function StudentListOnExam({selectedStudents}) {

    return (
        <>
            {selectedStudents.map((student, index) => {
                return <div
                    className={'d-flex flex-row w-100 bg-light p-2 rounded-2 items-center justify-content-between'}>
                    <div>{student.lastName + ' ' + student.firstName + ' ' + student.surname}</div>
                    <div>{student.exams[1].dates.length + 1} раз</div>
                </div>
            })}
        </>
    )
}
