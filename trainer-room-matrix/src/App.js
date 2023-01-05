import { useState, useEffect } from 'react'
import DropDown from './components/DropDown'
import Matrix from './components/Matrix'
import InstructorDropDown from './components/InstructorDropDown'
import AddBook from './components/AddBook'
import SessionDetail from './components/SessionDetail'
import { Collapse, Divider, Button } from '@mui/material'
import axios from 'axios'
import Loading from './components/Loading'
import PopupAlert from './components/alert/PopupAlert'
import RemoveRedEyeTwoToneIcon from '@mui/icons-material/RemoveRedEyeTwoTone'
import VisibilityOffTwoToneIcon from '@mui/icons-material/VisibilityOffTwoTone'

const baseUrl = 'http://localhost:8010/proxy'
function Home() {
    const [locations, setLocations] = useState([])
    const [rooms, setRooms] = useState([])
    const [instructors, setInstructors] = useState([])
    const [bookedDates, setBookedDates] = useState([])
    const [organizations, setOrganizations] = useState([])
    const [courses, setCourses] = useState([])
    const [showAddBook, setShowAddBook] = useState(false)
    const [session, setSession] = useState(null)
    const [selectedRoom, setSelectedRoom] = useState('')
    const [selectedDate, setSelectedDate] = useState(null)
    const [selectedInstructor, setSelectedInstructor] = useState('')
    const [loading, setLoading] = useState(true)
    const [token, setToken] = useState('')
    const [showSideBar, setShowSideBar] = useState(true)
    const [showWeekEnd, setShowWeekEnd] = useState(false)

    const [alert, setAlert] = useState({
        open: false,
        message: '',
        severity: 'success',
    })

    const closeAlert = () => {
        setAlert((pre) => ({ ...pre, open: false }))
    }

    useEffect(() => {
        getData()
    }, [token])

    const getData = async () => {
        setLoading(true)
        try {
            await loadRooms()
            await loadInstructors()
            await loadOrganizations()
            await loadCourses()
            await loadSessions()
        } catch (error) {
            await reloadToken()
        }
        setLoading(false)
    }

    const loadRooms = async () => {
        const reqRooms = await reqData(
            'pixelmechanics-importexportteams/getLocation'
        )

        // console.log(reqRooms)
        setRooms(
            reqRooms.data.rooms.map((room) => {
                return { ...room, checked: false }
            })
        )
    }

    const loadInstructors = async () => {
        const req = await reqData(
            'pixelmechanics-importexportteams/getInstructor'
        )

        setInstructors((prev) => {
            return [
                ...req.data.instructors.map((instructor) => {
                    return {
                        ...instructor,
                        checked:
                            prev.find((i) => i.id === instructor.id)?.checked ??
                            false,
                    }
                }),
            ]
        })
        // setLocations(reqRooms.locations)
    }

    const loadOrganizations = async () => {
        const req = await reqData(
            'pixelmechanics-importexportteams/getOrganisation'
        )
        setOrganizations([...req.data.organisations, { id: '0', name: 'NON' }])
    }

    const loadCourses = async () => {
        const req = await reqData(
            'pixelmechanics-importexportteams/getCourse?limit=1000'
        )

        setCourses(req.data.courses)
    }

    const loadSessions = async () => {
        const req = await reqData('pixelmechanics-importexportteams/getSession')

        const sessions = req.sessions.map((session) => {
            return {
                ...session,
                session_dates: session.session_dates.map((date) => {
                    const start_date = date.start_date.split('/')
                    const end_date = date.end_date.split('/')
                    return {
                        start_date: new Date(
                            start_date[2],
                            start_date[0] - 1,
                            start_date[1]
                        ),
                        end_date: new Date(
                            end_date[2],
                            end_date[0] - 1,
                            end_date[1]
                        ),
                        start_time: date.start_time,
                        end_time: date.end_time,
                    }
                }),
            }
        })

        setBookedDates(sessions)
    }

    const reqData = async (url) => {
        try {
            const res = await axios.get(`${baseUrl}/${url}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    // 'Access-Control-Allow-Origin': '*',
                    // 'Access-Control-Allow-Header': 'Content-Type',
                    // 'Referrer-Policy': 'no-referrer-when-downgrade',
                },
            })
            return res.data
        } catch (error) {
            return error
        }
    }

    const reloadToken = async () => {
        try {
            const res = await axios({
                method: 'post',
                url: `http://localhost:8010/proxy/integration/admin/token`,
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*',
                    'Referrer-Policy': 'no-referrer-when-downgrade',
                },
                data: { username: 'ks', password: 'bosch@123' },
            })
            setToken(res.data)
        } catch (error) {}
    }

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

    const handleAddBookWithInstructor = (instructor_id, date) => {
        const res = instructors.find((i) => i.id === instructor_id)
        setSelectedInstructor(res.id)
        setSelectedDate(date)
        setSelectedRoom('')
        setShowAddBook(true)
    }

    const handleAddBookWithRoom = (room_id, date) => {
        const res = rooms.find((room) => room.id === room_id)
        setSelectedRoom(res.id)
        setSelectedDate(date)
        setSelectedInstructor('')
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

    const addBookedDate = (bookedDate) => {
        setBookedDates((pre) => [
            ...pre,
            {
                ...bookedDate,
                session_dates: bookedDate.session_dates.map((date) => {
                    return {
                        start_date: new Date(date.start_date),
                        end_date: new Date(date.end_date),
                        start_time: new Date(date.start_time),
                        end_time: new Date(date.end_time),
                    }
                }),
            },
        ])
    }

    return (
        <div className='container my-5'>
            <div className='d-flex flex-row-reverse mb-2'>
                <Button
                    variant='outlined'
                    size='large'
                    style={{ textTransform: 'none' }}
                    onClick={() => setShowSideBar((prev) => !prev)}
                    startIcon={
                        showSideBar ? (
                            <RemoveRedEyeTwoToneIcon />
                        ) : (
                            <VisibilityOffTwoToneIcon />
                        )
                    }
                >
                    Sidebar
                </Button>
                <div className='mx-1'></div>
                <Button
                    variant='outlined'
                    size='large'
                    style={{ textTransform: 'none' }}
                    onClick={() => setShowWeekEnd((prev) => !prev)}
                    startIcon={
                        showWeekEnd ? (
                            <RemoveRedEyeTwoToneIcon />
                        ) : (
                            <VisibilityOffTwoToneIcon />
                        )
                    }
                >
                    Weekend
                </Button>
            </div>
            <div className='row'>
                <div className={`${showSideBar && 'col-9'}`}>
                    <div>
                        <Matrix
                            bookedDates={bookedDates}
                            rooms={selectedRooms}
                            instructors={selectedInstructors}
                            handleAddBookWithInstructor={
                                handleAddBookWithInstructor
                            }
                            showSessionDetail={handleShowSessionDetail}
                            handleAddBookWithRoom={handleAddBookWithRoom}
                            courses={courses}
                            refreshData={getData}
                            loading={loading}
                            showSideBar={showSideBar}
                            setShowSideBar={setShowSideBar}
                            showWeekEnd={showWeekEnd}
                        />
                    </div>
                </div>
                <div
                    className='col-3'
                    style={{
                        display: showSideBar ? 'block' : 'none',
                    }}
                >
                    <DropDown
                        data={rooms}
                        handleCheck={handleRoomCheck}
                        loading={loading}
                    />
                    <Divider className='my-3' />
                    <InstructorDropDown
                        instructors={instructors}
                        organizations={organizations}
                        handleCheck={handleInstructorCheck}
                        loading={loading}
                    />
                    <Collapse
                        in={showSideBar}
                        orientation='horizontal'
                    ></Collapse>
                </div>
            </div>
            <AddBook
                open={showAddBook}
                handleClose={handleCloseAddBook}
                rooms={rooms}
                selectedRoom={selectedRoom}
                selectedInstructor={selectedInstructor}
                instructors={instructors}
                selectedDate={selectedDate}
                addBookedDate={addBookedDate}
                courses={courses}
                baseUrl={baseUrl}
                token={token}
                refreshData={getData}
                setAlert={setAlert}
            />
            <SessionDetail
                open={session != null}
                session={session}
                handleClose={handleCloseSessionDetail}
            />
            <PopupAlert handleClose={closeAlert} alert={alert} />
        </div>
    )
}

export default Home
