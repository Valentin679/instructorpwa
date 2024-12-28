import React, {useState} from 'react';
import {Checkbox, DatePicker, Input, Space} from "antd";

export default function PhoneNumberInput ({setStateValue, stateValue, placeholder}) {

    return (
        <Input onChange={(e) => {
            setStateValue(e.target.value)
        }} placeholder={placeholder} status={stateValue && stateValue.length > 9 ? "" : "error"} prefix={'+7'} minLength={10} maxLength={10}></Input>
    );
};