import {createContext, useContext, useReducer} from "react";
import dayjs from "dayjs";
import {message} from "antd";
import FetchStudents from "@/app/components/FetchStudents";
import {StudentsContext, StudentsDispatchContext} from "@/app/context/StudentsContext";





const MessagesSuccessContext = createContext()
const MessagesErrorContext = createContext()

export function MessagesProvider({children}) {
    const [messageApi, contextHolder] = message.useMessage();

    const success = (contentText) => {
        messageApi.open({
            type: 'success',
            content: contentText,
        });
    };
    const error = (contentText) => {
        messageApi.open({
            type: 'error',
            content: contentText,
        });
    };
    return (
        <MessagesSuccessContext.Provider value={success}>
            <MessagesErrorContext.Provider value={error}>
                {contextHolder}
                {children}
            </MessagesErrorContext.Provider>
        </MessagesSuccessContext.Provider>
    );
}

export function useMessageSuccess() {
    return useContext(MessagesSuccessContext);
}

export function useMessageError() {
    return useContext(MessagesErrorContext);
}