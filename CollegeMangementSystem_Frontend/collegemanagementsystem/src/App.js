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
import About from './components/About';
import Footer from './components/Footer';
import './App.css';

function App() {
    return (
        <div className='body-container'>
            <ToastContainer position='bottom-center' autoClose={2000} />
            <header>
                <NavBar />
            </header>
            <section>
                <Routes>
                    <Route path='/' element={<Home />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/dashboard' element={<Dashboard />}></Route>
                    <Route path='/user' element={<UserRegistrationFom />}></Route>
                    <Route path='/edituser/:id' element={<EditUserDetails />}></Route>
                    <Route path='/profile' element={<UserDashboard />}></Route>
                    <Route path='/about' element={<About />}></Route>
                </Routes>
            </section>
            <footer>
                {/* <Footer /> */}
            </footer>
        </div>
    );
};
export default App;