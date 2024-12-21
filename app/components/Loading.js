import React from 'react';
import {Button, message, Space, Spin} from 'antd';
export default function Loading () {
    return (
        <div className={'mx-auto'}><Spin size="large"/></div>
    );
};