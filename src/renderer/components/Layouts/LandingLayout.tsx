import { ReactNode } from 'react';
import { Box } from '@mui/material';
import helloSvg from '../../images/undraw_hello_re_3evm.svg';

export default function LandingLayout(props: { children: ReactNode }) {
  return (
    <main
      style={{ display: 'flex', minHeight: '99vh', width: '100vw', margin: 0 }}
    >
      <Box sx={{ flex: 1 }}>
        <img src={helloSvg} style={{ width: '100%', height: '100%' }} />
      </Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {props.children}
      </Box>
    </main>
  );
}
