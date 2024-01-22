import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import UserRegistrationFom from './components/UserRegistrationFom';
import EditUserDetails from './components/EditUserDetails';
import Login from './components/Login';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 
import Dashboard from './components/Dashboard';
import UserDashboard from './components/UserDashboard';
import Home from './components/Home';

function App() {
    return (
        <>
        <ToastContainer position='bottom-center'autoClose={2000}/>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/login' element={<Login />}></Route>
                <Route path='/dashboard' element={<Dashboard />}></Route>
                <Route path='/user' element={<UserRegistrationFom />}></Route>
                <Route path='/edituser/:id' element={<EditUserDetails />}></Route>
                <Route path='/profile' element={<UserDashboard />}></Route>
            </Routes>
        </>
    );
};
export default App;