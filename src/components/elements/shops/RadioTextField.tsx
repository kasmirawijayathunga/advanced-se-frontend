import { Box, Radio, TextField, TextFieldProps, Typography } from '@mui/material'
import React from 'react'

type RadioButton = {
    label: string;
    value: number;
    active: boolean;
    handleOnClick: () => void;
}

function RadioTextField({ radio1, radio2, radio3, textFieldProps }:{ radio1: RadioButton, radio2: RadioButton, radio3: RadioButton, textFieldProps: TextFieldProps }) {
  return (
    <>
        <TextField fullWidth {...textFieldProps} />
        <Box sx={{ display: "flex" }}>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Radio disabled={!textFieldProps.value} value={radio1.value} checked={radio1.active} onClick={radio1.handleOnClick} size="small" />
                <Typography variant="caption">{radio1.label}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Radio disabled={!textFieldProps.value} value={radio2.value} checked={radio2.active} onClick={radio2.handleOnClick} size="small" />
                <Typography variant="caption">{radio2.label}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }}>
                <Radio disabled={!textFieldProps.value} value={radio3.value} checked={radio3.active} onClick={radio3.handleOnClick} size="small" />
                <Typography variant="caption">{radio3.label}</Typography>
            </Box>
        </Box>
    </>
  )
}

export default RadioTextField