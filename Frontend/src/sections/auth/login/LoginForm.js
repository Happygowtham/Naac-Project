import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Box, Snackbar, Alert } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import axiosInstance from 'src/AxiosInstance';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});

  const handleSignin = (event) => {
    event.preventDefault();
    if (event.type === "click" || event.which === 13) {
      axiosInstance(`token/`, { method: "POST", data: data })
        .then(res => {
          axiosInstance.defaults.headers['Authorization'] = "JWT " + res.data.access;
          localStorage.setItem("naac_dbcy_user", btoa(JSON.stringify(res?.data)));
          navigate("/dashboard");
        })
    }
  }

  return (
    <>
      <Box component="form">
        <Stack spacing={3}>
          <TextField name="username" label="User Name" onChange={(e) => setData({ ...data, username: e.target.value })} />
          <TextField
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setData({ ...data, password: e.target.value })}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Stack>

        <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
          <Link variant="subtitle2" underline="hover">
            Forgot password?
          </Link>
        </Stack>

        <LoadingButton type='submit' fullWidth size="large" variant="contained" onClick={handleSignin}>
          Login
        </LoadingButton>
      </Box>
    </>
  );
}
