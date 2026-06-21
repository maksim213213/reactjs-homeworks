import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthListener from './components/AuthListener';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/LoginPage';
import OrderPage from './pages/OrderPage';
import ProtectedRoute from './components/utils/ProtectedRoute';

function App() {
  return (
    <BrowserRouter>
      <AuthListener>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <OrderPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </AuthListener>
    </BrowserRouter>
  );
}

export default App;
