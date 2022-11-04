import React, { useEffect, useState } from 'react'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { Button } from '@mui/material'

function MatrixItem({ id, name, week, onBookClick, isRoom }) {
    return (
        <TableRow
            sx={{
                '&:last-child td, &:last-child th': {
                    border: 0,
                },
            }}
        >
            <TableCell component='th' scope='row'>
                {name}
            </TableCell>
            {week.map((date) => (
                <TableCell align='right' key={date} className='p-1'>
                    <Button
                        variant='contained'
                        className='m-0'
                        size='small'
                        style={{
                            fontSize: 12,
                        }}
                        onClick={() => {
                            onBookClick(id, date)
                        }}
                    >
                        {/* {isRoom ? 'Book Room' : 'Book Trainer'} */}
                        Book
                    </Button>
                </TableCell>
            ))}
        </TableRow>
    )
}

export default MatrixItem
