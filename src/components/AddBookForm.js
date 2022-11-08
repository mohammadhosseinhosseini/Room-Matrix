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
import React, { useEffect, useRef, useState } from 'react'

function AddBookForm({
    rooms,
    instructors,
    selectedRoom,
    selectedInstrucor,
    course,
}) {
    const [room, setRoom] = useState('')
    const [instructor, setInstructor] = useState('')
    const [maxSeats, setMaxSeats] = useState(12)
    const [sessionType, setSessionType] = useState('')
    const minSeats = 1

    const litmos_session_id = 'la8576lo'

    useEffect(() => {
        if (selectedRoom !== '') {
            setRoom(selectedRoom)
        }
    }, [])

    const handleRoomChange = (e) => {
        setRoom(e.target.value)
    }

    const handleInstructorChange = (e) => {
        setInstructor(e.target.value)
    }

    const handleSessionTypeChange = (e) => {
        setSessionType(e.target.value)
    }

    const onSave = () => {
        console.log(maxSeats)
    }

    return (
        <div>
            <FormControlLabel
                control={<Switch defaultChecked />}
                label='Active Session'
            />
            <div>Course: {course}</div>
            <TextField
                label='Litmos session name'
                variant='outlined'
                fullWidth
                className='my-3'
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
                            {r.name} {r.city}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth className='my-3'>
                <InputLabel id='instructors'>Instructor</InputLabel>
                <Select
                    labelId='instructors'
                    id='instructors'
                    value={instructor}
                    label='Instructor'
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
            <TextField
                label='Min seats'
                variant='outlined'
                fullWidth
                className='my-3'
                value={minSeats}
                disabled
            />
            <TextField
                label='Max seats'
                variant='outlined'
                fullWidth
                className='my-3'
                value={maxSeats}
                onChange={(e) => {
                    setMaxSeats(e.target.value)
                }}
            />
            <TextField
                label='Availabe seats'
                variant='outlined'
                fullWidth
                className='my-3'
                value={maxSeats}
                disabled
            />
            <TextField
                label='Litmos Session ID'
                variant='outlined'
                fullWidth
                className='my-3'
                value={litmos_session_id}
                disabled
            />
            <FormControl fullWidth className='my-3'>
                <InputLabel id='session_type'>Session Type</InputLabel>
                <Select
                    labelId='session_type'
                    id='session_type'
                    value={sessionType}
                    label='Instructor'
                    onChange={handleSessionTypeChange}
                    // className='my-3'
                >
                    <MenuItem value='Webinar'>Webinar</MenuItem>
                    <MenuItem value='Classroom'>Classroom</MenuItem>
                    <MenuItem value='Microsoft Teams'>Microsoft Teams</MenuItem>
                </Select>
            </FormControl>
            <Button
                variant='contained'
                color='primary'
                onClick={onSave}
                fullWidth
            >
                Save
            </Button>
        </div>
    )
}

export default AddBookForm
