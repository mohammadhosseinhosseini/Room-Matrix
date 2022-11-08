import { useState, useEffect } from 'react'
import DropDown from './components/DropDown'
import Matrix from './components/Matrix'
import InstructorDropDown from './components/InstructorDropDown'

import roomsData from './data/rooms'
import bookedDatesData from './data/bookedDates'
import organizations from './data/organizations'
import instructorsData from './data/instructors'
import AddBook from './components/AddBook'
import SessionDetail from './components/SessionDetail'

function App() {
    const [rooms, setRooms] = useState([])
    const [instructors, setInstructors] = useState([])
    const [bookedDates, setBookedDates] = useState([])
    const [showAddBook, setShowAddBook] = useState(false)
    const [session, setSession] = useState(null)
    const [selectedRoom, setSelectedRoom] = useState('')

    useEffect(() => {
        roomsData.map((room) => {
            room.checked = room.id === 1 || room.id === 2
        })
        setRooms(roomsData)

        instructorsData.map((instructor) => {
            instructor.checked = instructor.id === 1 || instructor.id === 2
        })
        setInstructors(instructorsData)
        bookedDatesData.map((bookedDate) => {
            bookedDate.session_dates.map((sessionDate) => {
                let date = new Date()
                sessionDate.start_date = new Date(sessionDate.start_date)
                sessionDate.end_date = new Date(sessionDate.end_date)
                sessionDate.start_time = new Date(sessionDate.start_time)
                sessionDate.end_time = new Date(sessionDate.end_time)
            })
        })
        setBookedDates(bookedDatesData)
    }, [])

    const handleRoomCheck = (id) => {
        const newRooms = [...rooms]
        newRooms.map((room) => {
            if (room.id === id) {
                room.checked = !room.checked
            }
        })
        setRooms(newRooms)
    }

    const handleInstructorCheck = (id) => {
        const newInstructors = [...instructors]
        newInstructors.map((instructor) => {
            if (instructor.id === id) {
                instructor.checked = !instructor.checked
            }
        })
        setInstructors(newInstructors)
    }

    const handleAddBook = () => {
        setShowAddBook(true)
    }

    const handleAddBookWithRoom = (room_id, date) => {
        const res = rooms.find((room) => room.id === room_id)
        setSelectedRoom(res.id)
        setShowAddBook(true)
    }

    const handleCloseAddBook = () => {
        setShowAddBook(false)
    }

    const handleShowSessionDetail = (session) => {
        setSession(session)
    }

    const handleCloseSessionDetail = () => {
        setSession(null)
    }

    const selectedRooms = rooms.filter((room) => room.checked)

    const selectedInstructors = instructors.filter(
        (instructor) => instructor.checked
    )

    return (
        <div className='container my-5'>
            <div className='row'>
                <div className='col-9'>
                    <div>
                        <Matrix
                            bookedDates={bookedDates}
                            rooms={selectedRooms}
                            instructors={selectedInstructors}
                            handleAddBook={handleAddBook}
                            showSessionDetail={handleShowSessionDetail}
                            handleAddBookWithRoom={handleAddBookWithRoom}
                        />
                    </div>
                </div>
                <div className='col-3'>
                    <DropDown data={rooms} handleCheck={handleRoomCheck} />
                    <br />
                    <InstructorDropDown
                        instructors={instructors}
                        organizations={organizations}
                        handleCheck={handleInstructorCheck}
                    />
                </div>
            </div>
            <AddBook
                open={showAddBook}
                handleClose={handleCloseAddBook}
                rooms={rooms}
                selectedRoom={selectedRoom}
                instructors={instructors}
            />
            <SessionDetail
                open={session != null}
                session={session}
                handleClose={handleCloseSessionDetail}
            />
        </div>
    )
}

export default App
