import { ShoppingCart } from "lucide-react";
import logo from "../../assets/images/logo (1).svg";

const Header = ({ cartTotal = 0 }) => {
  return (
    <header className="flex items-center justify-between px-8 py-4 bg-white shadow-sm">
      <img src={logo} alt="FoodDelivery" className="h-10 w-10" />

      <div className="flex items-center gap-8">
        <nav className="flex items-center gap-8">
          <a href="#" className="text-primary font-medium">Home</a>
          <a href="#" className="text-gray-700 hover:text-primary transition">Menu</a>
          <a href="#" className="text-gray-700 hover:text-primary transition">Company</a>
          <a href="#" className="text-gray-700 hover:text-primary transition">Login</a>
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