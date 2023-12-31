import Home from './components/Home';
import NavBar from './components/NavBar';
import { Route, Routes } from 'react-router-dom';
import UserRegistrationFom from './components/UserRegistrationFom';
import EditUserDetails from './components/EditUserDetails';

function App() {
    return (
        <>
            <NavBar />
            <Routes>
                <Route path='/' element={<Home />}></Route>
                <Route path='/registeruser' element={<UserRegistrationFom />}></Route>
                <Route path='/edituser/:id' element={<EditUserDetails />}></Route>
            </Routes>
        </>
    );
};
export default App;