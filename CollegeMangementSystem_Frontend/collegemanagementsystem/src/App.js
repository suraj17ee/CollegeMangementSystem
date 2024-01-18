import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import UserRegistrationFom from './components/UserRegistrationFom';
import EditUserDetails from './components/EditUserDetails';
import Login from './components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Dashboard from './components/Dashboard';

function App() {
    return (
        <>
        <ToastContainer/>
            <NavBar />
            <Routes>
                <Route path='/' element={<Login />}></Route>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/registeruser' element={<UserRegistrationFom />}></Route>
                <Route path='/edituser/:id' element={<EditUserDetails />}></Route>
            </Routes>
        </>
    );
};
export default App;