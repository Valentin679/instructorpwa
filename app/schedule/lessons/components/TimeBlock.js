import React from 'react';

export default function TimeBlock ({timeStart, timeEnd}) {
    return (
        <div className={'d-flex flex-col  items-end j'}>
            <p className={'text-3xl text-secondary'}>{timeStart}</p>
            <p className={'text-1xl text-secondary'}>{timeEnd}</p>
        </div>
    );
};