import { Modal, Box, Typography, Button } from '@mui/material'
import React, { useEffect, useState } from 'react'
import AddBookForm from './AddBookForm'
import SelectCourseForm from './SelectCourseForm'
import {
    useWindowSize,
    useWindowWidth,
    useWindowHeight,
} from '@react-hook/window-size'
import axios from 'axios'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxHeight: '90vh',
    overflow: 'scroll',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 2,
}

function AddBook({
    open,
    handleClose,
    rooms,
    selectedRoom,
    instructors,
    selectedDate,
    addBookedDate,
    courses,
    selectedInstructor,
    baseUrl,
    token,
    refreshData,
    setAlert,
}) {
    const [course, setCourse] = useState('')
    const windowWidth = useWindowWidth()

    const handleCourseChange = (id) => {
        setCourse(courses.find((c) => c.id === id))
    }

    const handleCloseModal = () => {
        setCourse('')
        handleClose()
    }

    return (
        <div>
            <Modal
                keepMounted
                open={open}
                onClose={handleCloseModal}
                aria-labelledby='keep-mounted-modal-title'
                aria-describedby='keep-mounted-modal-description'
            >
                <Box
                    sx={{
                        ...style,
                        width: windowWidth > 900 ? 800 : windowWidth - 20,
                    }}
                >
                    {course === '' ? (
                        <SelectCourseForm
                            courses={courses}
                            selectCourse={handleCourseChange}
                        />
                    ) : (
                        <AddBookForm
                            rooms={rooms}
                            selectedRoom={selectedRoom}
                            selectedInstructor={selectedInstructor}
                            instructors={instructors}
                            course={course}
                            selectedDate={selectedDate}
                            addBookedDate={addBookedDate}
                            closeModal={handleCloseModal}
                            baseUrl={baseUrl}
                            token={token}
                            refreshData={refreshData}
                            setAlert={setAlert}
                        />
                    )}
                </Box>
            </Modal>
        </div>
    )
}

export default AddBook
