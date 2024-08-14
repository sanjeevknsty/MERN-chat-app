import './App.css';
import { Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Signup from './components/signup';
import Home from './components/Home';
function App() {
  return (
    <>
      {/* <UserState> */}
      {/* <Outlet/> */}
      {/* </UserState> */}

            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
    </>
  );
}

export default App;
