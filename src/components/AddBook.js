import { Modal, Box, Typography, Button } from '@mui/material'
import React, { useState } from 'react'
import AddBookForm from './AddBookForm'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
}

const courses = [
    {
        id: 1,
        name: 'Course 1',
    },
    {
        id: 2,
        name: 'Course 2',
    },
    {
        id: 3,
        name: 'Course 3',
    },
]

function AddBook({ open, handleClose, rooms, selectedRoom, instructors }) {
    const [course, setCourse] = useState('')

    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={() => {
                    setCourse('')
                    handleClose()
                }}
                aria-labelledby='keep-mounted-modal-title'
                aria-describedby='keep-mounted-modal-description'
            >
                <Box sx={style}>
                    {course === '' ? (
                        courses.map((c) => (
                            <div
                                key={c.id}
                                className='my-3 d-flex'
                                style={{
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    backgroundColor: '#eee',
                                    padding: '10px 20px',
                                    borderRadius: 15,
                                }}
                            >
                                <p className='m-0'>{c.name} </p>
                                <Button
                                    className='ms-auto'
                                    variant='outlined'
                                    color='primary'
                                    onClick={() => {
                                        setCourse(c.name)
                                    }}
                                >
                                    Select
                                </Button>
                            </div>
                        ))
                    ) : (
                        <AddBookForm
                            rooms={rooms}
                            selectedRoom={selectedRoom}
                            instructors={instructors}
                            course={course}
                        />
                    )}
                </Box>
            </Modal>
        </div>
    )
}

export default AddBook
