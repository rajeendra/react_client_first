import * as React from 'react';
import Button from '@mui/material/Button';
import SignIn from './SignIn';
import Album from './Album';
import StickyFooter from './StickyFooter';
import Dashboard from './dashboard/Dashboard';

export default function MUIApp() {
  return (
    <div>
      {/* <Button variant="contained">Hello World</Button> */}
      {/* <SignIn /> */}
      {/* <Album />   */}
      {/* <StickyFooter />   */}
      <Dashboard />  
    </div>
  );
}
