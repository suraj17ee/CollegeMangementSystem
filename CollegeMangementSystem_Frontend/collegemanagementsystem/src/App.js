import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import UserRegistrationFom from './components/UserRegistrationFom';
import EditUserDetails from './components/EditUserDetails';
import Login from './components/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dashboard from './components/Dashboard';
import UserDashboard from './components/UserDashboard';
import Home from './components/Home';
import About from './components/About';
import Footer from './components/Footer';
import './App.css';
import ChatWidget from './components/ChatWidget';

function App() {
    return (
        <div className="app-container container-fluid p-0">
            <ToastContainer position="top-right" autoClose={2000} />
            
            <header>
                <NavBar />
            </header>

            <main className="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/user" element={<UserRegistrationFom />} />
                    <Route path="/edituser/:id" element={<EditUserDetails />} />
                    <Route path="/profile" element={<UserDashboard />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </main>

            <footer>
                <Footer />
                <ChatWidget />
            </footer>
        </div>
    );
}

export default App;
