import { Box, Divider, IconButton, Tooltip, Typography } from '@mui/material'
import React from 'react'

import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import PhoneIcon from '@mui/icons-material/Phone';
import MessageIcon from '@mui/icons-material/Message';

function MobileNumberView({ id, label, whatsApp, call, message }:{ id: number, label: string, whatsApp: boolean, call: boolean, message: boolean }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
        {label && (
            <>
                {call && (
                    <Box sx={{ mr: 0.5 }}>
                        <Tooltip title="Messaging">
                            <IconButton component="a" href={`sms:${label}`} size="small"><MessageIcon fontSize="small" /></IconButton>
                        </Tooltip>
                    </Box>
                )}
                {message && (
                    <Box sx={{ mr: 0.5 }}>
                        <Tooltip title="Call">
                            <IconButton component="a" href={`tel:${label}`} size="small"><PhoneIcon fontSize="small" /></IconButton>
                        </Tooltip>
                    </Box>
                )}
                {whatsApp && (
                    <Box sx={{ mr: 0.5 }}>
                        <Tooltip title="WhatsApp">
                            <IconButton component="a" href={`https://wa.me/${label}`} size="small"><WhatsAppIcon fontSize="small" /></IconButton>
                        </Tooltip>
                    </Box>
                )}
                <Divider orientation="vertical" flexItem sx={{ mr: 1 }} />
            </>
        )}
        <Box>
            <Typography variant="caption">Mobile Number {id}</Typography>
            <Typography variant="body1">{label ? label :"Not Provided"}</Typography>
        </Box>
    </Box>
  )
}

export default MobileNumberView