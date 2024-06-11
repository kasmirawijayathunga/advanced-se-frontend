import useLoading from '../../../utils/hooks/useLoading';
import Axios from '../../../utils/services/Axios';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Box, Button, Container, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, styled, TextField, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack';
import React, { useState } from 'react'
import AuthService from '../../../utils/services/Auth';

const PageContiner = styled(Container)({
  maxHeight: `calc(100vh - 64px)`
});

function AuthLogin() {
  const [loading, setLoading] = useLoading();
  const [showPassword, setShowPassword] = useState(false);
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  })

  const handleSubmit = async (e: React.FormEvent<HTMLInputElement>) => {
    e.preventDefault();
    try {
      setLoading(true);

      let { data } = await Axios.post("/auth/login", {
        email: inputs.email,
        password: inputs.password
      })

      AuthService.storeTokens(data);
      window.location.reload()
    } catch (err) {
      console.log(err);
      return enqueueSnackbar("Unexpected error occoured", { variant: 'warning' });
  } finally {
      setLoading(false);
  }
  };

  return (
    <PageContiner maxWidth="xs" sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Box sx={{ border: "solid thin", borderColor: (theme)=>theme.palette.grey[400], p:5, borderRadius: 4 }}>
        <Typography variant="h4" sx={{ my: 2 }}>
          Welcome Back
        </Typography>
        <Typography variant="body2" sx={{ color: (theme) => theme.palette.grey[500] }}>
          Please enter your email address and password
        </Typography>
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4, display: "flex", flexDirection: "column" }}>
          <FormControl sx={{ mb: 2 }}>
            <TextField
              label="Email Address"
              value={inputs.email}
              onChange={(e) => setInputs((data) => ({ ...data, email: e.target.value }))}
            />
          </FormControl>
          <FormControl sx={{ mb: 4 }}>
            <InputLabel>Password</InputLabel>
            <OutlinedInput
              label="Password"
              type={showPassword ? "text" : "password"}
              value={inputs.password}
              onChange={(e) => setInputs((data) => ({ ...data, password: e.target.value }))}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((show) => !show)}
                    onMouseDown={(e) => e.preventDefault()}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>
          <Box sx={{ textAlign: "right" }}>
            <Button type="submit" sx={{ color: "#ffffff", px: 3 }} variant="contained">
              Login
            </Button>
          </Box>
        </Box>
      </Box>
    </PageContiner>
  )
}

export default AuthLogin