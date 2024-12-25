import React from 'react';
import {Button, message, Space, Spin} from 'antd';
export default function Loading () {
    return (
        <div className={'mx-auto w-100'}><Spin className={'w-100 my-5'} size="large"/></div>
    );
};