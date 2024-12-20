'use client'
import React from 'react';
import {ConfigProvider, Slider, Splitter} from 'antd';
import dayjs from 'dayjs';
import styles from '../slots.module.css'

const format = 'HH:mm';
export default function ReservedSlot({startTime, endTime, surname}) {
    // const startTime = dayjs('9:00', 'HH:mm');
    // const endTime = dayjs('12:08', 'HH:mm');
    // const startTime = dayjs('9:00', 'HH:mm');
    // const endTime = dayjs('12:08', 'HH:mm');

    const marks = {
        0: '9',
        10: '11',
        20: '11',
        30: '12',
        40: '13',
        50: '14',
        60: '15',
        70: '16',
        80: '17',
        90: '18',
        100: {
            style: {
                color: '#f50',
            },
            label: <strong>19</strong>,
        },
    };
    return (

                    <div className={styles.rail}>
                        <div className={styles.train} >
                            <p style={{position: "absolute", top: '-20px', textAlign: 'center', width: '100%'}}>{surname}</p>
                            <div style={{position: "absolute", display: 'flex', justifyContent: 'space-between', bottom: '-20px', width: '100%'}}>
                            <p>{startTime}</p>
                            <p>{endTime}</p>
                            </div>
                        </div>
                    </div>

    );
}

