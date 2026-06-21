import Header from "../components/Header/Header";
import Menu from "../components/Menu/Menu";
import Footer from "../components/Footer/Footer";
import { useCart } from "../context/CartContext";

const MenuPage = () => {
  const { addToCart } = useCart();

  return (
    <>
      <Header />
      <Menu onAddToCart={addToCart} />
      <Footer />
    </>
  );
};

export default MenuPage;