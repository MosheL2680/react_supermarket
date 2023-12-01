import './App.css';
import { Outlet } from 'react-router-dom';
import NavBar from './components/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

function App() {
  return (
    <div className="App">
      <NavBar/>
      <Outlet />
      <ToastContainer />
    </div>
  );
}

export default App;
