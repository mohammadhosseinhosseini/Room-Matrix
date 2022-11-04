import { useState, useEffect } from 'react'
import DropDown from './components/DropDown'
import Matrix from './components/Matrix'
import InstructorDropDown from './components/InstructorDropDown'

import roomsData from './data/rooms'
import bookedDates from './data/bookedDates'
import organizations from './data/organizations'
import instructorsData from './data/instructors'
import AddBook from './components/AddBook'

function App() {
    const [rooms, setRooms] = useState([])
    const [instructors, setInstructors] = useState([])
    const [showAddBook, setShowAddBook] = useState(false)

    useEffect(() => {
        roomsData.map((room) => {
            room.checked = Math.random() < 0.2
        })
        setRooms(roomsData)

        instructorsData.map((instructor) => {
            instructor.checked = Math.random() < 0.2
        })
        setInstructors(instructorsData)
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

    const handleCloseAddBook = () => {
        setShowAddBook(false)
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
            <AddBook open={showAddBook} handleClose={handleCloseAddBook} />
        </div>
    )
}

export default App
