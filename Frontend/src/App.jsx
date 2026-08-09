import { Routes, Route } from 'react-router-dom';
import Home from './pages/customer/Home';
import CustomerLayout from './layouts/CustomerLayout';
import { ModalProvider } from './context/ModalContext';
import './App.css'

function App() {
  return (
    <ModalProvider>
      <Routes>
        <Route path="/" element={<CustomerLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </ModalProvider>
  )
}

export default App;
