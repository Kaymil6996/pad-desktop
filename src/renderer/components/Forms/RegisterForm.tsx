import { Formik } from 'formik';
import * as yup from 'yup';
import { useState } from 'react';
import {
  TextField,
  Box,
  Button,
  Typography,
  IconButton,
  Alert,
} from '@mui/material';
import { useAuthenticate } from 'renderer/hooks/useAuthenticate';
import { useNavigate } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const initialValues = {
  email: '',
  password: '',
  confirmPassword: '',
};

const validationSchema = yup.object().shape({
  email: yup.string().email().trim().required(),
  password: yup
    .string()
    .trim()
    .min(6, () => 'Password must be at least 6 characters')
    .required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required(),
});

export default function RegisterForm() {
  const navigate = useNavigate();
  const {
    authenticate: auth,
    isError,
    errorMessage,
  } = useAuthenticate({
    onSuccess: () => navigate('/'),
  });

  const [isVisible, setIsVisible] = useState(false);

  return (
    <Formik
      validationSchema={validationSchema}
      initialValues={initialValues}
      onSubmit={(props) => auth('register', props)}
    >
      {(f) => (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '40%',
            minWidth: '389px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={() => navigate('/landing')}>
              <ArrowBackIcon sx={{ fontSize: 30 }} color="primary" />
            </IconButton>

            <Typography
              color="primary"
              fontSize={40}
              fontWeight={'bold'}
              sx={{ marginBottom: '10px' }}
            >
              Register.
            </Typography>
          </div>
          <TextField
            label="Email"
            value={f.values.email}
            placeholder="Email"
            error={!!f.errors.email && f.touched.email}
            onChange={f.handleChange('email')}
            variant="outlined"
            onBlur={f.handleBlur('email')}
            helperText={f.errors.email}
          />
          <div style={{ position: 'relative', marginTop: '10px' }}>
            <TextField
              type={isVisible ? 'text' : 'password'}
              label="Password"
              sx={{ width: '100%' }}
              value={f.values.password}
              placeholder="Password"
              error={!!f.errors.password && f.touched.password}
              onChange={f.handleChange('password')}
              variant="outlined"
              onBlur={f.handleBlur('password')}
              helperText={f.errors.password}
            />

            <IconButton
              onClick={() => setIsVisible((p) => !p)}
              sx={{ position: 'absolute', right: 5, top: 10 }}
            >
              {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </div>

          <div style={{ position: 'relative', marginTop: '10px' }}>
            <TextField
              type={isVisible ? 'text' : 'password'}
              label="Confirm password"
              sx={{ width: '100%' }}
              value={f.values.confirmPassword}
              placeholder="Password"
              error={!!f.errors.confirmPassword && f.touched.confirmPassword}
              onChange={f.handleChange('confirmPassword')}
              variant="outlined"
              onBlur={f.handleBlur('confirmPassword')}
              helperText={f.errors.confirmPassword}
            />

            <IconButton
              onClick={() => setIsVisible((p) => !p)}
              sx={{ position: 'absolute', right: 5, top: 10 }}
            >
              {isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </div>

          {isError && (
            <Alert sx={{ mt: 1 }} severity="error">
              {errorMessage}
            </Alert>
          )}

          <Button
            onClick={() => f.handleSubmit()}
            sx={{ marginTop: '10px' }}
            variant="contained"
            color="primary"
            disabled={!(f.isValid && f.dirty)}
          >
            Create account
          </Button>
        </Box>
      )}
    </Formik>
  );
}
