import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, Sun, Moon } from 'lucide-react';
import { useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase';
import { selectUser } from '../../store/authSlice';
import { selectCartTotal } from '../../store/cartSlice';
import { useTheme } from '../../context/ThemeContext';
import logo from '../../assets/images/logo.svg';

const Header = () => {
  const user = useSelector(selectUser);
  const cartTotal = useSelector(selectCartTotal);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const isDark = theme === 'dark';

  const handleLogout = async () => {
    await signOut(auth);
    navigate('/');
  };

  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white dark:bg-slate-900 shadow-sm">
      <Link to="/">
        <img src={logo} alt="FoodDelivery" className="h-10 w-10" />
      </Link>

      <div className="flex items-center gap-8">
        <nav className="flex items-center gap-8">
          <Link to="/" className="text-primary font-medium">Home</Link>
          <Link to="/menu" className="text-gray-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition">Menu</Link>
          <Link to="/order" className="text-gray-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition">Order</Link>
          {user ? (
            <button
              onClick={handleLogout}
              className="text-gray-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="text-gray-700 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition">Login</Link>
          )}
        </nav>

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          aria-pressed={isDark}
          title={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          className="p-3 rounded-lg text-gray-700 dark:text-slate-200 hover:text-primary dark:hover:text-primary hover:bg-gray-100 dark:hover:bg-slate-800 transition focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-slate-900 inline-flex"
        >
          {isDark ? <Sun size={24} /> : <Moon size={24} />}
        </button>

        <Link
          to="/order"
          className="relative bg-primary p-3 rounded-lg text-white hover:bg-opacity-90 transition inline-flex"
        >
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 bg-white text-primary rounded-full w-10 h-8 flex items-center justify-center text-xs font-bold shadow-sm">
            {cartTotal.toFixed(2)}
          </span>
        </Link>
      </div>
    </header>
  );
};

export default Header;
