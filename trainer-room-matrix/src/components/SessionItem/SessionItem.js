import React from 'react'
import { Button, TableRow, TableCell, Chip } from '@mui/material'
import { isDateEqual } from '../../helper/helpers'
import SessionItemSeats from './SessionItemSeats'
import SchoolTwoToneIcon from '@mui/icons-material/SchoolTwoTone'
import ClassTwoToneIcon from '@mui/icons-material/ClassTwoTone'

const getBorderColor = (session_type, course_id) => {
    if (course_id === 1) return 'grey'
    switch (session_type) {
        case '1':
            return 'gray'
        case '2':
            return '#ccc'
        case '3':
            return '#4287f5'
        default:
            return '#4287f5'
    }
}

const getBGColor = (session_type, course_id) => {
    if (course_id === 1) return '#ababab'

    switch (session_type) {
        case '1':
            return '#d1bd0a'
        case '2':
            return '#eee'
        case '3':
            return '#28c6ed'
        default:
            return '#28c6ed'
    }
}

const getColor = (session_type, course_id) => {
    if (course_id === 1) return '#fff'

    switch (session_type) {
        case '1':
            return '#fff'
        case '2':
            return '#000'
        case '3':
            return '#fff'
        default:
            return '#fff'
    }
}

const getBGclass = (session_type, course_id) => {
    if (course_id === 1) return 'blocker'

    switch (session_type) {
        case '1':
            return 'classroom'
        case '2':
            return 'webinar'
        case '3':
            return 'teams'
        default:
            return 'teams'
    }
}

function SessionItem({ session, date, showSessionDetail, isRoom }) {
    const {
        session_type,
        litmos_session_name,
        available_seats,
        max_seats,
        session_dates,
        course,
    } = session
    return (
        <div
            className={`SessionItem ${getBGclass(
                session_type,
                session.course_id
            )}`}
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
            // style={{
            //     borderColor: getBorderColor(session_type, session.course_id),
            //     backgroundColor: getBGColor(session_type, session.course_id),
            //     color: getColor(session_type, session.course_id),
            // }}
        >
            <SessionItemSeats
                availableSeats={available_seats}
                maxSeats={max_seats}
            />
            <div className='d-flex mt-1'>
                {/* <ClassTwoToneIcon style={{ fontSize: 20 }} /> */}
                <p className='m-0 ms-1' style={{ fontSize: 12 }}>
                    <strong>Name:</strong>
                    {course.name}
                </p>
            </div>

            <div className='d-flex mt-1'>
                {/* <SchoolTwoToneIcon style={{ fontSize: 20 }} /> */}
                <p className='m-0 ms-1' style={{ fontSize: 12 }}>
                    {isRoom ? (
                        <>
                            <strong>Trainer:</strong>{' '}
                            {session.instructors.map((i) => i.name).join(', ')}
                        </>
                    ) : (
                        <>
                            <strong>Room:</strong> {session.room.name} (
                            {session.room.city})
                        </>
                    )}
                </p>
            </div>
        </div>
    )
}

export default SessionItem
