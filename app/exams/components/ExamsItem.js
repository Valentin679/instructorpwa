'use client'
import {UserAddOutlined} from "@ant-design/icons";
import {Button} from "antd";
import {useRouter} from 'next/navigation'
import {useEffect, useRef, useState} from "react";
import {getExams} from "@/app/api/fetchExams";
import Link from "next/link";
import SwipeHOC from "@/app/components/SwipeHOC";

export default function ExamsItem({exam}) {

    const refBlock = useRef();
    const refLeftMenu = useRef();
    const refRightMenu = useRef();
    const refContainer = useRef();

    return (
        <SwipeHOC refLink={refBlock} refRightMenu={refRightMenu} refLeftMenu={refLeftMenu} refContainer={refContainer}>
            <div ref={refContainer} className={'d-flex flex-row overflow-hidden'}>
                <div ref={refLeftMenu} style={{float: "right", width: 0, overflow: "hidden"}}>
                    <div>
                        l1
                    </div>
                </div>
                <div
                    ref={refBlock}
                    className={'d-flex flex-col p-3 bg-light border-secondary border-bottom position-relative w-100'}>
                    <p>{exam.date}</p>
                </div>
                <div ref={refRightMenu} style={{float: "left", width: 0, overflow: "hidden", position: "relative",}}
                     className={' d-flex flex-row justify-between items-center text-center'}
                >
                    <div className={'d-flex items-center justify-center bg-amber-600 h-100 border-right border-secondary w-100 '}>
                        c1
                    </div>
                    <div className={"d-flex items-center justify-center text-center w-100 h-100 bg-danger"}>
                        c2
                    </div>
                </div>
            </div>

        </SwipeHOC>
    );
}
