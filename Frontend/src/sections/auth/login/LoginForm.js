import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';
import axiosInstance from 'src/AxiosInstance';

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [data, setData] = useState({});

  const handleClick = () => {
    navigate('/dashboard');
  };

  const handleSignin = () => {
    axiosInstance(`token/`, { method: "POST", data: data })
      .then(res => {
        console.log('res: ', res);
        axiosInstance.defaults.headers['Authorization'] = "JWT " + res.data.access;
        localStorage.setItem("user", btoa(JSON.stringify(res?.data)));
        navigate("/dashboard");
      })
  }

  return (
    <>
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

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" variant="contained" onClick={handleSignin}>
        Login
      </LoadingButton>
    </>
  );
}
