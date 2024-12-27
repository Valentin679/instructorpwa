import React from 'react';

export default function StudentNameBlock ({lastName, firstName, surname, group}) {
    return (
        <p style={{width: '100%'}} className={'text-1xl w-100'}>
            {lastName + ' ' + firstName[0] + '.' + surname[0] + ' (' + group + ' гр.)'}
        </p>
    );
};