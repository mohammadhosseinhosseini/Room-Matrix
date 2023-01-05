import { Snackbar, Alert } from '@mui/material'
import React, { useRef, useState, useEffect } from 'react'

const PopupAlert = ({ alert, handleClose }) => {
    // useEffect(() => {
    //     if (alert.open) {
    //         setTimeout(() => {
    //             handleClose()
    //         }, 1000)
    //     }
    // }, [alert])

    return (
        <Snackbar
            open={alert.open}
            autoHideDuration={5000}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            <Alert
                onClose={handleClose}
                severity={alert.severity}
                sx={{
                    width: '100%',
                    boxShadow:
                        '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)',
                }}
            >
                <p style={{ fontSize: 19, margin: 0, fontWeight: 300 }}>
                    {alert.message}
                </p>
            </Alert>
        </Snackbar>
    )
}

export default PopupAlert
