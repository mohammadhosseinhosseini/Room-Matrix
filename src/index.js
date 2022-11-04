import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import 'bootstrap/dist/css/bootstrap.min.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
)

// const countries  = [
//     {
//         country_id,
//         country_name,
//         cities: [
//             {
//                 city_id,
//                 city_name,
//                 rooms:[
//                     {
//                         room_id,
//                         room_name,
//                     }
//                 ]
//             }
//         ]
//     }
// ]

// const organizations =[
//     {
//         organization_id,
//         organization_name,
//         instructors:[
//             {
//                 instructor_id,
//                 instructor_name,
//             }
//         ]
//     }
// ]
