import React, {useEffect, useState, createContext} from 'react';
import DifferenceContext from "@/app/context/DifferenceContext";
import {RiDeleteBin2Line} from "react-icons/ri";
import {useRouter} from "next/navigation";
import {deleteStudent} from "@/app/api/fetchOneStudent";


export default function SwipeEditBlock({children, ref, studetntId}) {
    const router = useRouter()
    const [openRight, setOpenRight] = useState(false)
    const [touchDifference, setTouchDifference] = useState(0)

    let defWidth = window.innerWidth
    useEffect(() => {
        let touchStartX = 0
        let touchMove = 0
        defWidth = ref.current.clientWidth
        // console.log(defWidth)
        ref.current.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].pageX
            // console.log(touchStartX)
        })

        ref.current.addEventListener('touchmove', (e) => {
            touchMove = e.changedTouches[0].pageX
            if (touchStartX - touchMove < 50) {
                setTouchDifference(touchStartX - touchMove)
                defWidth = defWidth + (touchStartX - touchMove)
            }
            if (touchStartX - touchMove > 50) {
                setTouchDifference(50)
                defWidth = defWidth + 50
                setOpenRight(true)

            }
            if (touchStartX - touchMove < -10) {
                setTouchDifference(0)
            }
        })

    }, []);

    useEffect(() => {
        // console.log(openRight)
    }, [openRight]);
    useEffect(() => {
    }, [touchDifference]);
    // console.log(touchDifference)
    return (
        <DifferenceContext.Provider value={touchDifference}>
            <div className={'d-flex flex-row'}
                 style={{position: 'relative', left: -touchDifference, width: defWidth + touchDifference}}>
                <div ref={ref}
                     style={{}}
                     className={'d-flex flex-col  align-items-center w-100 p-2 overflow-hidden'}
                >
                    {children}

                </div>
                <div
                    style={{position: "relative", width: touchDifference}}
                    className={'bg-danger text-white d-flex justify-center items-center text-2xl text-center align-middle'}
                    onClick={() => {
                        deleteStudent(studetntId).then(() => {
                            router.refresh()
                        })
                    }
                    }
                >
                    {/*<p className={'p-2'}>*/}
                    <RiDeleteBin2Line className={'relative align-middle'}/>
                    {/*</p>*/}
                </div>
            </div>
        </DifferenceContext.Provider>
    );
};