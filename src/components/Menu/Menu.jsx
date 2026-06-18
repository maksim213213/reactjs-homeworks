import { useState, useEffect } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import { fetchMenuItems } from '../../utils/api';

const Menu = ({ onAddToCart }) => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadMenuItems = async () => {
      try {
        const items = await fetchMenuItems();
        setMenuItems(items);
        setLoading(false);
      } catch {
        setError('Failed to load menu items');
        setLoading(false);
      }
    };
    loadMenuItems();
  }, []);

  const handleSeeMore = () => {
    setVisibleItems(prev => prev + 6);
  };

  const handleAddToCart = (price) => {
    onAddToCart(price);
  };

  if (loading) return <div className="text-center py-20">Loading menu...</div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div className="bg-bgLight min-h-screen py-20 px-8">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-5xl md:text-6xl  text-center text-primary mb-6">Browse our menu</h2>
        <p className="text-xl md:text-2xl text-center text-textGray max-w-3xl mx-auto mb-12 opacity-80">
          Use our menu to place an order online, or <span className="relative group cursor-pointer text-primary">phone
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              +1 (555) 123-4567
            </div>
          </span> our store to place a pickup order. Fast and fresh food.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-16">
          <button disabled className="px-12 py-4 bg-primary text-white rounded-xl text-xl">Dessert</button>
          <button disabled className="px-12 py-4 bg-white border border-gray-300 text-textDark rounded-xl text-xl">Dinner</button>
          <button disabled className="px-12 py-4 bg-white border border-gray-300 text-textDark rounded-xl text-xl">Breakfast</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {menuItems.slice(0, visibleItems).map(item => (
            <MenuItem key={item.id} item={item} onAddToCart={handleAddToCart} />
          ))}
        </div>

        {visibleItems < menuItems.length && (
          <div className="flex justify-center">
            <button onClick={handleSeeMore} className="px-12 py-3 bg-primary text-white rounded-xl hover:bg-primary/90">See more</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;