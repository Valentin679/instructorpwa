import {useStudentsDispatch} from "@/app/context/StudentsContext";
import {useEffect} from "react";
import {getAllStudents} from "@/app/api/fetchStudents";

export default function fetchStudents ({children}) {
    const dispatch = useStudentsDispatch()

    useEffect(() => {
        getAllStudents().then((res)=>{
            dispatch({type: 'fetch', payload: res})
        }).catch((e)=>{console.log(e)})
    }, []);
  return (
      <>
          {children}
      </>
  )
}