import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import { BiLock } from 'react-icons/bi';
import { useForm } from '@inertiajs/react';
import { useEffect } from 'react';
import { theme } from '@/theme';
import Layout from '@/Layout';
import InputError from '@/Components/InputError';


const defaultTheme = createTheme();

export default function SignUp() {
  const { data, setData, post, errors, reset } = useForm({
    firstname: '', 
    lastname: '',
    address: '',
    email: '',
    phone: '',
    password: '',
    password_confirmation: '',
});

useEffect(() => {
    return () => {
        reset('password', 'password_confirmation');
    };
}, []);

const submit = (e) => {
    e.preventDefault();

    post(route('register'));
};

  return (
    <>
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
                  Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={submit} sx={{ mt: 3 }}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <InputError message={errors.firstname} />
                      <TextField
                        autoComplete="given-name"
                        name="firstname"
                        required
                        fullWidth
                        id="firstname"
                        label="First Name"
                        onChange={(e) => setData('firstname', e.target.value)}
                        value={data.firstname}
                        autoFocus
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <InputError message={errors.lastname} />
                      <TextField
                        required
                        fullWidth
                        id="lastName"
                        label="Last Name"
                        name="lastName"
                        autoComplete="family-name"
                        onChange={(e) => setData('lastname', e.target.value)}
                        value={data.lastname}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputError message={errors.email} />
                      <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        onChange={(e) => setData('email', e.target.value)}
                        value={data.email}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputError message={errors.password} />
                      <TextField
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="new-password"
                        onChange={(e) => setData('password', e.target.value)}
                        value={data.password}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputError message={errors.password_confirmation} />
                      <TextField
                        required
                        fullWidth
                        name="password_confirmation"
                        label="Confirm Password"
                        type="password"
                        id="password_confirmation"
                        autoComplete="new-password"
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        value={data.password_confirmation}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputError message={errors.address} />
                      <TextField
                        required
                        fullWidth
                        name="address"
                        label="Address"
                        id="address"
                        onChange={(e) => setData('address', e.target.value)}
                        value={data.address}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <InputError message={errors.phone} />
                      <TextField
                        required
                        fullWidth
                        name="phone"
                        label="Phone"
                        id="phone"
                        onChange={(e) => setData('phone', e.target.value)}
                        value={data.phone}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <FormControlLabel
                        className='font-Poppins'
                        control={<Checkbox value="allowExtraEmails" color="primary" />}
                        label="I want to receive inspiration, marketing promotions and updates via email."
                      />
                    </Grid>
                  </Grid>
                  <ThemeProvider theme={theme}>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                    color='liliana_dark'
                    onSubmit={submit}
                  >
                    Sign Up
                  </Button>
                  </ThemeProvider>
                  <Grid container justifyContent="flex-end">
                    <Grid item>
                      <Link href="/login" variant="body2" className='font-Poppins'>
                        Already have an account? Sign in
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
SignUp.layout = page => <Layout children={page} tite="checkout" />