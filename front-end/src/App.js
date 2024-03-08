import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Nav from './Components/Nav';
import Add from './Components/Add';
import SignUp from './Components/SignUp';
import Product from './Components/Product';
import PrivateComp from './Components/PrivateComp';
import Login from './Components/Login';
import Update from './Components/Update';
import Profile from './Components/Profile';

function App() {
  return (
    <div className='d-flex flex-column align-items-center '>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route element={<PrivateComp />}>
            <Route path='/' element={<Product />} />
            <Route path='/add' element={<Add />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/update/:id' element={<Update />} />
          </Route>
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
