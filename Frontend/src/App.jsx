import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import Home from './pages/customer/Home';
import CustomerLayout from './layouts/CustomerLayout';
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<CustomerLayout />}>
        <Route index element={<Home />} />
      </Route>
      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
    </Routes>
  )
}

export default App;
