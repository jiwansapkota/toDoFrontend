import { Fragment, React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import { pink } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import CustomizedSnackbars from '../../components/CustomizedSnackbars';
import axios from '../../utils/axios-order';  
import './SignUp.css';

function SignUp(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [username, setUsername] = useState("");
  const [alert, setAlert] = useState({
    show: false,
    message: '',
    severity: 'warn',
  });
  const [errors, seterror] = useState("");
  let navigate = useNavigate();

  const onchangeHandler = (event) => {
    const newErr = { ...errors };
    newErr[event.target.name] = "";
    seterror(newErr);
    if (event.target.name === "email") {
      setemail(event.target.value);
    }
    if (event.target.name === "username") {
      setUsername(event.target.value);
    }
    if (event.target.name === "password") {
      setpassword(event.target.value);
    }
  }

  const onSubmitClickHandler = (event) => {
    event.preventDefault();
    if (email === '' || email === null) {
      const newErr = { ...errors };
      newErr.email = 'please fill the email field';
      seterror(newErr);
      return
    }
    if (username === '' || username === null) {
      const newErr = { ...errors };
      newErr.username = 'please fill the username field';
      seterror(newErr);
      return
    }
    if (password === '' || password === null) {
      const newErr = { ...errors };
      newErr.password = 'please fill the password field';
      seterror(newErr);
      return
    }
    const payload = {
      "email": email,
      "username": username,
      "password": password
    };
    axios.post("/auth/signup", payload).then((response) => {
      if (response.status === 200 && response.data.success) {
        setAlert({
          show: true,
          message: response.data.message,
          severity: 'success',
        })
        setTimeout(() => {
          navigate('/login');
        }, 1000);
      } else {
        setAlert({
          show: true,
          message: response.data.message,
          severity: 'warning',
        })
      }
    }).catch((e) => {
      setAlert({
        show: true,
        message: e.message,
        severity: 'error',
      })

    })

  }

  const handleKeypress = e => {
    if (e.code === 'Enter') {
      onSubmitClickHandler();
    }
  };

  return (
    <Fragment>
      <Container component="main" maxWidth="xs">
        <CustomizedSnackbars alert={alert} setAlert={setAlert} />
        <CssBaseline />
        <div
          className='paper'
        >
          <Avatar
            className='avatar'
            sx={{ bgcolor: pink[500] }}
          >
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form
            className='form'
            noValidate>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              /* id="email" */
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={onchangeHandler}
              onKeyPress={handleKeypress}
              value={email}
            />
            {errors["email"] ? (<div className='guideStyle'>{errors["email"]}</div>) : null}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              label="Username"
              name="username"
              autoComplete="username"
              onChange={onchangeHandler}
              onKeyPress={handleKeypress}
              value={username}
            />
            {errors["username"] ? (<div className='guideStyle'>{errors["username"]}</div>) : null}

            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={onchangeHandler}
              onKeyPress={handleKeypress}
              value={password}
            />
            {errors["password"] ? (<div className='guideStyle'>{errors["password"]}</div>) : null}

            <Button
              fullWidth
              variant="contained"
              color="primary"
              style={{ marginTop: '20px' }}
              onClick={onSubmitClickHandler}
            >
              Sign Up
            </Button>
            <Grid container spacing={1} style={{ marginTop: '10px' }}>
              <Grid item xs={2}>
              </Grid>
              <Grid item xs={8} onClick={() => { navigate('/login'); }}>
                <Link >Already have an account? Sign In </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={8}>
        </Box>
      </Container>
    </Fragment>
  );
}
export default SignUp;