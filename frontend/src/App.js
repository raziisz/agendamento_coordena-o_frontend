import React from 'react';
import Routes from './routes/routes'
import { ToastContainer } from 'react-toastify'

import './global.css'
function App() {
  return (
    <>
    <ToastContainer />
    <Routes />
    </>
  );
}

export default App;
