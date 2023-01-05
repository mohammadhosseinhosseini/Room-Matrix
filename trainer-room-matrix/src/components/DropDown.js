import React, { useEffect, useState } from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import { Skeleton } from '@mui/material'

export default function DropDown({ data, handleCheck, loading }) {
    const [expanded, setExpanded] = useState('')

    const handleChangeExpanded = (newExpanded) => {
        setExpanded((pre) => (pre === newExpanded ? '' : newExpanded))
    }

    const groupData = (data, key) => {
        const result = data.reduce(function (r, a) {
            r[a[key]] = r[a[key]] || []
            r[a[key]].push(a)
            return r
        }, Object.create(null))

        return Object.keys(result).map((key) => ({
            name: key,
            data: result[key],
        }))
    }

    const groupedData = groupData(data, 'country').map((group) => ({
        ...group,
        data: groupData(group.data, 'city'),
    }))

    // const groupedData = data.map((country) => {
    //     return {
    //         ...country,
    //         city: [{ ...country.city }],
    //     }
    // })

    if (loading)
        return (
            <Skeleton
                variant='rounded'
                style={{ height: '100%', width: '100%' }}
            />
        )

    return (
        <div>
            {groupedData.map((country, index) => {
                return (
                    <Accordion
                        key={index}
                        // expanded={country.name === expanded}
                        // onChange={() => {
                        //     handleChangeExpanded(country.name)
                        // }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography>{country.name}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {country.data.map((city, index) => {
                                return (
                                    <Accordion key={index}>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon />}
                                        >
                                            <Typography>{city.name}</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <FormGroup>
                                                {city.data.map(
                                                    (room, index) => (
                                                        <FormControlLabel
                                                            key={index}
                                                            control={
                                                                <Checkbox
                                                                    checked={
                                                                        room.checked
                                                                    }
                                                                    onChange={() => {
                                                                        handleCheck(
                                                                            room.id
                                                                        )
                                                                    }}
                                                                />
                                                            }
                                                            label={room.name}
                                                        />
                                                    )
                                                )}
                                            </FormGroup>
                                        </AccordionDetails>
                                    </Accordion>
                                )
                            })}
                        </AccordionDetails>
                    </Accordion>
                )
            })}
        </div>
    )
}
