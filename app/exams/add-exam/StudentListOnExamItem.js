import {RxCross1} from "react-icons/rx";

export default function StudentListOnExamItem({student, index, selectedItems}) {
return(
      <div className={'d-flex flex-row w-100 bg-light p-2 rounded-2 items-center justify-content-between'}>
          <div>{student.lastName + ' ' + student.firstName + ' ' + student.surname}</div>
          <div className={'d-flex flex-row gap-2 items-center'}>
              <div>{student.exams[1].dates.length + 1} раз</div>
              <RxCross1 onClick={()=> {
              const removed = selectedItems.splice(index, 1);
              console.log(selectedItems)

          }}/>
          </div>
      </div>

  );
}
