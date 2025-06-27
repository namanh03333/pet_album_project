import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Register from './Register'
import Narbar from './Narbar';
import Dashboard from './Dashboard'
import HomePage from './Home';
import Addpet from './Addpet';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'


function App() {
  return (
    <Router>
      <Narbar/>
      <Routes>
        <Route path='/' element={<Dashboard/>}></Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/add-pet" element={<Addpet/>} />
      </Routes>
    </Router>
  );
}

export default App;
