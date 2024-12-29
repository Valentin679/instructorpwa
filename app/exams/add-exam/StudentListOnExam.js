import {RxCross1} from "react-icons/rx";

export default function StudentListOnExam({selectedStudents, selectedItems}) {
return (
    <div className={'d-flex flex-col w-100 gap-2'}>
        <h5>Список кандидатов:</h5>
        {selectedStudents.length === 0 ? <p>Нет кандидатов...</p> :
            selectedStudents.map((student, index) => <StudentListOnExam key={index}
                                                                        student={student}
                                                                        index={index}
                                                                        selectedItems={selectedItems}
            />)}
    </div>

);
}
