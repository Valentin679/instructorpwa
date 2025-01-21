'use client'
import {deleteExamById} from "@/app/api/fetchExams";
import Link from "next/link";
import {MdFreeCancellation} from "react-icons/md";

export default function ExamsItem({exam}) {

    function deleteExam(id) {
        deleteExamById(id).then((res) => {
            console.log(res)
        })
    }

    return (
        <div className={'d-flex flex-row overflow-hidden h-100 '}>
            <Link className={'d-flex p-3 bg-light border-bottom position-relative w-100'}
                  key={exam._id} href={`/exams/${exam._id}`}>
                <p>{exam.date}</p>
            </Link>
            <div
                className={'d-flex items-center justify-center bg-red-600 h-100 border-right border-secondary text-white px-2 py-3 '}
                onClick={() => {
                    deleteExam(exam._id)
                }}
            >
                <MdFreeCancellation size={'1.8em'}/>
            </div>
        </div>

    );
}
