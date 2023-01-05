import {
    Switch,
    TextField,
    FormControlLabel,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Button,
} from '@mui/material'
// import { collection, addDoc } from 'firebase/firestore'
import SaveTwoToneIcon from '@mui/icons-material/SaveTwoTone'

import React, { useEffect, useRef, useState } from 'react'
import axios from 'axios'
import { LoadingButton } from '@mui/lab'
import DatePickerList from './DatePickerList'

import timeZones from '../data/timeZones.json'

function AddBookForm({
    rooms,
    instructors,
    selectedRoom,
    selectedInstructor,
    course,
    selectedDate,
    addBookedDate,
    closeModal,
    baseUrl,
    token,
    refreshData,
    setAlert,
}) {
    const [activeSession, setActiveSession] = useState(false)
    const [room, setRoom] = useState('')
    const [selectedInstructors, setSelectedInstructors] = useState([])
    const [maxSeats, setMaxSeats] = useState(12)
    const [sessionType, setSessionType] = useState('')
    const [dates, setDates] = useState([])
    const [minSeats, setMinSeats] = useState(1)
    const [litmosSessionName, setLitmosSessionName] = useState('')
    const [timeZone, setTimeZone] = useState('W. Europe Standard Time')

    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (selectedRoom !== '') {
            setRoom(selectedRoom)
        } else if (selectedInstructor !== '') {
            setSelectedInstructors([selectedInstructor])
        }
        setDates([
            {
                start_date: selectedDate,
                end_date: selectedDate,
                start_time: new Date(),
                end_time: new Date(),
            },
        ])
    }, [])

    const handleRoomChange = (e) => {
        setRoom(e.target.value)
    }

    const handleInstructorChange = (e) => {
        const {
            target: { value },
        } = e
        // For adding multiple instructors change 1 to 3
        if (value.length <= 1) setSelectedInstructors(value)
    }

    const handleSessionTypeChange = (e) => {
        setSessionType(e.target.value)
    }

    // const litmos_session_name = `${course.name}-${course.training_reference_number}`

    // -${
    //     instructor &&
    //     organizations.find(
    //         (o) =>
    //             o.id ==
    //             instructors.find((i) => i.id == instructor).organization_id
    //     ).name
    // }`

    const onSave = async () => {
        if (litmosSessionName === '') {
            setAlert({
                open: true,
                message: 'Litmos session name is required',
                severity: 'info',
            })
            return
        }
        if (room === '') {
            setAlert({
                open: true,
                message: 'Please select a location',
                severity: 'info',
            })

            return
        }
        if (selectedInstructors.length === 0) {
            setAlert({
                open: true,
                message: 'Please select an instructor',
                severity: 'info',
            })
            return
        }
        if (maxSeats < minSeats) {
            setAlert({
                open: true,
                message: 'Max seats must be greater or equal than min seats',
                severity: 'info',
            })
            return
        }
        if (sessionType === '') {
            setAlert({
                open: true,
                message: 'Please select a session type',
                severity: 'info',
            })
            return
        }

        for (let i = 0; i < dates.length; i++) {
            if (dates[i].start_date === null) {
                setAlert({
                    open: true,
                    message: 'Please select a start date',
                    severity: 'info',
                })
                return
            }
            if (dates[i].end_date === null) {
                setAlert({
                    open: true,
                    message: 'Please select an end date',
                    severity: 'info',
                })
                return
            }
            if (dates[i].start_time === null) {
                setAlert({
                    open: true,
                    message: 'Please select a start time',
                    severity: 'info',
                })
                return
            }
            if (dates[i].end_time === null) {
                setAlert({
                    open: true,
                    message: 'Please select an end time',
                    severity: 'info',
                })
                return
            }
        }

        // setLoading(true)

        // const docRef = collection(db, 'bookedDates')

        const session_dates = dates.map((date) => {
            return {
                session_start_date: `${
                    date.start_date.getMonth() + 1
                }/${date.start_date.getDate()}/${date.start_date.getFullYear()}`,
                session_end_date: `${
                    date.end_date.getMonth() + 1
                }/${date.end_date.getDate()}/${date.end_date.getFullYear()}`,
                session_startTime: `${date.start_time.getHours()}:${date.start_time.getMinutes()}`,
                session_endTime: `${date.end_time.getHours()}:${date.end_time.getMinutes()}`,
                record_id: '',
                session_day_id: '',
            }
        })

        const newSession = {
            record_id: '',
            active_session: activeSession ? '1' : '0',
            litmos_session_name: litmosSessionName,
            location: `${room}`,
            instructor: `${selectedInstructors[0]}`,
            min_seats: `${minSeats}`,
            max_seats: `${maxSeats}`,
            available_seats: `${maxSeats}`,
            session_id: '',
            session_type: sessionType,
            session_dates_list: session_dates,
            time_zones: timeZone,
        }

        console.log(newSession)

        try {
            const req = await axios({
                method: 'put',
                url: `${baseUrl}/pixelmechanics-importexportteams/updateSessionsToCourse/course?id=${course.id}`,
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Referrer-Policy': 'no-referrer-when-downgrade',
                },
                data: {
                    ...newSession,
                },
            })

            console.log(req)

            setAlert({
                open: true,
                message: 'Session added successfully',
                severity: 'success',
            })
        } catch (error) {
            setAlert({
                open: true,
                message: 'Error adding session',
                severity: 'error',
            })
        }

        // const newBookedDate = await addDoc(docRef, {
        //     litmos_session_name: litmosSessionName,
        //     room_id: parseInt(room),
        //     instructors: selectedInstructors,
        //     time_zone: 'Europe/Berlin',
        //     min_seats: 1,
        //     available_seats: parseInt(maxSeats),
        //     max_seats: parseInt(maxSeats),
        //     session_type: sessionType,
        //     session_dates,
        //     course_id: course.id,
        // })

        refreshData()
        closeModal()
        setLoading(false)
    }

    return (
        <div>
            <FormControlLabel
                control={
                    <Switch
                        checked={activeSession}
                        onChange={(e) => {
                            setActiveSession(e.target.checked)
                        }}
                    />
                }
                label='Active Session'
            />
            <div>Course: {course.name}</div>
            <TextField
                label='Litmos session name'
                variant='outlined'
                fullWidth
                className='my-3'
                value={litmosSessionName}
                onChange={(e) => setLitmosSessionName(e.target.value)}
            />
            <FormControl fullWidth>
                <InputLabel id='demo-simple-select-label'>Location</InputLabel>
                <Select
                    labelId='demo-simple-select-label'
                    id='demo-simple-select'
                    value={room}
                    label='Location'
                    onChange={handleRoomChange}
                    // className='my-3'
                >
                    {rooms.map((r) => (
                        <MenuItem key={r.id} value={r.id}>
                            {r.name} ({r.city}, {r.country})
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth className='my-3'>
                <InputLabel id='instructors'>Instructor</InputLabel>
                <Select
                    labelId='instructors'
                    id='instructors'
                    value={selectedInstructors}
                    label='Instructor'
                    multiple
                    onChange={handleInstructorChange}
                    // className='my-3'
                >
                    {instructors.map((i) => (
                        <MenuItem key={i.id} value={i.id}>
                            {i.name} {i.organization}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth>
                <InputLabel id='select-time-zone'>Time Zone</InputLabel>
                <Select
                    labelId='select-time-zone'
                    value={timeZone}
                    label='Time Zone'
                    onChange={(e) => setTimeZone(e.target.value)}
                >
                    {timeZones.map((t) => (
                        <MenuItem key={t.value} value={t.value}>
                            {t.text}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <TextField
                label='Min seats'
                variant='outlined'
                fullWidth
                className='my-3'
                value={minSeats}
                onChange={(e) => setMinSeats(e.target.value)}
                type='number'
            />
            <TextField
                label='Max seats'
                variant='outlined'
                fullWidth
                className='my-3'
                value={maxSeats}
                onChange={(e) => setMaxSeats(e.target.value)}
                type='number'
            />
            <TextField
                label='Availabe seats'
                variant='outlined'
                fullWidth
                className='my-3'
                value={maxSeats}
                disabled
            />

            <FormControl fullWidth className='my-3'>
                <InputLabel id='session_type'>Session Type</InputLabel>
                <Select
                    labelId='session_type'
                    id='session_type'
                    value={sessionType}
                    label='Instructor'
                    onChange={(e) => setSessionType(e.target.value)}
                    // className='my-3'
                >
                    <MenuItem value='1'>Classroom</MenuItem>
                    <MenuItem value='2'>Webinar</MenuItem>
                    <MenuItem value='3'>Microsoft Teams</MenuItem>
                </Select>
            </FormControl>

            <DatePickerList dates={dates} setDates={setDates} />

            <LoadingButton
                variant='contained'
                color='primary'
                onClick={onSave}
                fullWidth
                loading={loading}
                loadingPosition='start'
                startIcon={<SaveTwoToneIcon />}
            >
                Save
            </LoadingButton>
        </div>
    )
}

export default AddBookForm
