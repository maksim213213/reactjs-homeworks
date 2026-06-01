import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import logo from '../../assets/images/logo (1).svg';

const Header = () => {
  const { cartTotal } = useCart();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <Link to="/">
        <img src={logo} alt="FoodDelivery" className="h-10 w-10" />
      </Link>

      <div className="flex items-center gap-8">
        <nav className="flex items-center gap-8">
          <Link to="/" className="text-primary font-medium">Home</Link>
          <Link to="/menu" className="text-gray-700 hover:text-primary transition">Menu</Link>
          <Link to="/order" className="text-gray-700 hover:text-primary transition">Order</Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-gray-700 hover:text-primary transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-gray-700 hover:text-primary transition">Login</Link>
          )}
        </nav>

        <button className="relative bg-primary p-3 rounded-lg text-white hover:bg-opacity-90 transition">
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-white text-primary rounded-full w-10 h-8 flex items-center justify-center text-xs font-bold shadow-sm">
            {cartTotal.toFixed(2)}
          </span>
        </button>
      </div>
    </header>
  );
};

export default Header;
