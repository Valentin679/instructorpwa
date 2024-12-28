import Link from "next/link";
import GoodTag from "@/app/students/components/item-components/Tags/goodTag";
import StartTag from "@/app/students/components/item-components/Tags/startTag";
import GroupTag from "@/app/students/components/item-components/Tags/groupTag";
import QuantityLessonsBlock from "@/app/students/components/item-components/QuantityLessonsBlock";
import ExerBlock from "@/app/students/components/item-components/ExerBlock";
import StudentNameBlock from "@/app/students/components/item-components/StudentNameBlock";
import ExamsBlock from "@/app/students/components/item-components/ExamsBlock";

export default function StudentsListItem({student}) {
    return (
        <div className={'d-flex flex-col justify-content-between align-items-center w-100 p-2'}>
            <Link href={`/students/${student._id}`} className={'d-flex flex-row justify-content-between align-items-center w-100 gap-1 '}>
                <div className={'d-flex flex-row align-items-center gap-2'}>
                    <GroupTag group={student.group}/>
                    <StudentNameBlock lastName={student.lastName} firstName={student.firstName} surname={student.surname}/>
                </div>
                <ExamsBlock exams={student.exams}/>


            </Link>
            <div className={'d-flex flex-row justify-content-between align-items-center w-100 gap-1'}>
                <ExerBlock exercise={student.exercise}/>
                <QuantityLessonsBlock quantity={student.quantityPracticalLessons}/>
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
