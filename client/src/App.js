import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, CSSReset, Box } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Chat from './components/Chat';
import Login from './pages/Login';
import RegisterPage from './pages/Register';
import PrivateRoute from './components/PrivateRouter';

function App() {
  return (
    <ChakraProvider>
      <CSSReset />
      <Router>
        <Navbar />
        <Box mt={0} p={5}>
          <Routes>
            <Route path="/" element={<PrivateRoute/>}>
              <Route path='/' element={<Chat/>}/>
            </Route>
            {/* Add more routes for different pages */}
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<RegisterPage/>}/>
          </Routes>
        </Box>
      </Router>
    </ChakraProvider>
  );
}

export default App;
