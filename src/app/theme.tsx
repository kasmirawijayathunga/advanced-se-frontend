'use client'

import { createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { useMemo } from 'react';


function Theme({ children, }: { children: React.ReactNode }) {
  const theme = useMemo(() => createTheme({
    palette: {
      primary: {
          main: '#1B1464',
          contrastText: "#ffffff"
      },
      secondary: {
        main: "#FAA61A",
        contrastText: "#ffffff"
      }
    }
  }),[]);

  return (
    <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
    </ThemeProvider>
  )
}

export default Theme