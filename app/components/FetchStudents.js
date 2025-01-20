import {useStudents, useStudentsDispatch} from "@/app/context/StudentsContext";
import {useEffect} from "react";
import {getActiveStudents} from "@/app/api/fetchStudents";

export default function fetchStudents ({children}) {
    const dispatch = useStudentsDispatch()

    useEffect(() => {
        getActiveStudents().then((res)=>{
            dispatch({type: 'fetch', payload: res})
        }).catch((e)=>{console.log(e)})
    }, []);
  return (
      <>
          {children}
      </>
  )
}