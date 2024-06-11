import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { BiLock } from 'react-icons/bi';
import { theme } from '@/theme';
import { Head, useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import InputError from '@/Components/InputError';
import Layout from '@/Layout';

const defaultTheme = createTheme();

export default function SignInSide({ status, canResetPassword }) {
  
  const { data, setData, post, processing, errors, reset } = useForm({
      email: '',
      password: '',
      remember: false,
  });

  useEffect(() => {
      return () => {
          reset('password');
      };
  }, []);

  const submit = (e) => {
      e.preventDefault();

      post(route('login'));
  };

  return (
    <> 
      <Head title="Log in" />
      {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}
      <div className='py-10 px-4 bg-liliana-background'>
      <ThemeProvider theme={defaultTheme}>
        <Grid container component="main" justifyContent={'center'}>
          <CssBaseline />
          <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor:'#000000' }}>
                <BiLock/>
              </Avatar>
              <Typography component="h1" variant="h5">
                Sign in
              </Typography>
              <Box component="form" noValidate onSubmit={submit} sx={{ mt: 1 }}>
                <InputError message={errors.email} className="mt-2" />
                <TextField
                  margin= "normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                />
                <InputError message={errors.password} className="mt-2" />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                  className='font-Poppins'
                />
                <ThemeProvider theme={theme}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color='liliana_dark'
                    sx={{ mt: 3, mb: 2 }}
                    className='font-Poppins font-semibold'
                    disabled={processing}
                  >
                    Sign In
                  </Button>
                </ThemeProvider>
                <Grid container>
                  <Grid item xs>
                  {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="underline text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                      Forgot password?
                    </Link>
                  )}
                  </Grid>
                  <Grid item>
                    <Link href="/register" variant="body2" className='font-Poppins'>
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </ThemeProvider>
      </div>
    </>
  );
}

SignInSide.layout = page => <Layout children={page} tite="checkout" />