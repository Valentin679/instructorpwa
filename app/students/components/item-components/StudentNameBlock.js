import React from 'react';

export default function StudentNameBlock ({lastName, firstName, surname}) {
    return (
        <p style={{fontSize: 20}}>
            {lastName} {firstName[0].toUpperCase()}. {surname[0].toUpperCase()}.
        </p>
    );
};