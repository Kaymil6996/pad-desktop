import { Container, Box, Typography, Button } from '@mui/material';
import LandingLayout from 'renderer/components/Layouts/LandingLayout';
import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigation = useNavigate();

  return (
    <LandingLayout>
      <Box sx={{ width: '60%' }}>
        <Typography fontSize={55} fontWeight={'bold'}>
          Hello User
        </Typography>

        <Typography>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem
          expedita excepturi aliquid vitae delectus? Dolore sequi omnis eum
          sapiente, corporis sint rem ullam consequuntur alias enim nulla! Iste,
          molestias itaque!
        </Typography>

        <Button
          onClick={() => navigation('/login')}
          type="button"
          variant="contained"
          color="primary"
          sx={{ width: '100%', marginTop: '10px' }}
        >
          Login
        </Button>
        <Button
          onClick={() => navigation('/register')}
          type="button"
          variant="contained"
          color="secondary"
          sx={{ width: '100%', marginTop: '10px' }}
        >
          Register
        </Button>
      </Box>
    </LandingLayout>
  );
}
