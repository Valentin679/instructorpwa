import {useStudents, useStudentsDispatch} from "@/app/context/StudentsContext";
import {useEffect} from "react";
import {getActiveStudents} from "@/app/api/fetchStudents";

export default function fetchStudents ({children}) {
    const dispatch = useStudentsDispatch()
    const stu = useStudents()

    useEffect(() => {
        getActiveStudents().then((res)=>{
            dispatch({type: 'fetch', payload: res})
        })
    }, [stu?.length === 0]);
    console.log(stu)
  return (
      <>
          {children}
      </>
  )
}