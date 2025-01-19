import {createContext, useContext, useEffect, useReducer} from "react";
import {getActiveStudents} from "@/app/api/fetchStudents";
import FetchStudents from "@/app/components/FetchStudents";
export const StudentsContext = createContext([])
export const StudentsDispatchContext = createContext([])

export function StudentsProvider({children}) {

    const [students, dispatch] = useReducer(
        studentsReducer,
        initialStudents
    );
    return (
        <StudentsContext.Provider value={students}>
            <StudentsDispatchContext.Provider value={dispatch}>
                <FetchStudents>
                    {children}
                </FetchStudents>
            </StudentsDispatchContext.Provider>
        </StudentsContext.Provider>
    );
}

let initialStudents

function studentsReducer(students, action) {
    switch (action.type) {
        case 'fetch': {
            // console.log(action)
            return action.payload;
        }
        case 'changeExamDates': {
            // console.log(action)
            return students.map((s) => {
                if (s._id === action.student._id) {
                    return action.student
                } else {
                    return s;
                }
            });
        }
        case 'changed': {
            return students.map((t) => {
                if (t.id === action.students.id) {
                    return action.students;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return students.filter((t) => t.id !== action.id);
        }
        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}


export function useStudents() {
    return useContext(StudentsContext);
}

export function useStudentsDispatch() {
    return useContext(StudentsDispatchContext);
}