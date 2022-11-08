import React from 'react'
import { Button, TableRow, TableCell, Chip } from '@mui/material'
import PeopleAltTwoToneIcon from '@mui/icons-material/PeopleAltTwoTone'
import { isDateEqual } from '../helpers'

const getBorderColor = (session_type) => {
    switch (session_type) {
        case 'Classroom':
            return 'gray'
        case 'Webinar':
            return '#ccc'
        case 'Microsof Teams':
            return '#4287f5'
        default:
            return '#4287f5'
    }
}

const getBGColor = (session_type) => {
    switch (session_type) {
        case 'Classroom':
            return '#aaa'
        case 'Webinar':
            return '#eee'
        case 'Microsof Teams':
            return '#28c6ed'
        default:
            return '#28c6ed'
    }
}

function SessionItem({ session, date, showSessionDetail }) {
    const {
        session_type,
        litmos_session_name,
        available_seats,
        session_dates,
    } = session
    return (
        <div
            className=''
            onClick={() => {
                const dates = session_dates.map((session_date) => {
                    if (isDateEqual(session_date.start_date, date))
                        return session_date
                })
                showSessionDetail({
                    ...session,
                    ...dates[0],
                })
            }}
            style={{
                marginTop: 5,
                marginBottom: 5,
                padding: 5,
                borderRadius: 5,
                borderColor: getBorderColor(session_type),
                borderStyle: 'solid',
                borderWidth: 1,
                backgroundColor: getBGColor(session_type),
                cursor: 'pointer',
                boxShadow:
                    '0 0 6px 0 rgba(0,0,0,0.3), 0 3px 0px 0px rgba(0,0,0,0.15)',
            }}
        >
            <Chip
                label={available_seats}
                size='small'
                icon={<PeopleAltTwoToneIcon style={{ fontSize: 12 }} />}
                color={
                    available_seats === 0
                        ? 'error'
                        : available_seats <= 4
                        ? 'warning'
                        : 'success'
                }
                style={{
                    fontSize: 10,
                    color: 'white',
                    padding: 0,
                }}
            />
            <p
                className='m-0'
                style={{
                    fontSize: 10,
                }}
            >
                {litmos_session_name}
            </p>
        </div>
    )
}

export default SessionItem
