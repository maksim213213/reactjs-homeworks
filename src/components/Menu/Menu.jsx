import { useState } from 'react';
import MenuItem from '../MenuItem/MenuItem';
import useFetch from '../../hooks/useFetch';

const API_URL = 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals';

const Menu = ({ onAddToCart }) => {
  const [visibleItems, setVisibleItems] = useState(6);
  const [selectedCategory, setSelectedCategory] = useState('Dessert');
  const { data: menuItems, loading, error } = useFetch(API_URL);

  const handleSeeMore = () => {
    setVisibleItems(prev => prev + 6);
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    setVisibleItems(6);
  };

  const filteredItems = (menuItems || []).filter(item => item.category === selectedCategory);

  if (loading) return <div className="text-center py-20">Loading menu...</div>;
  if (error) return <div className="text-center py-20 text-red-500">Failed to load menu items</div>;

  return (
    <div className="bg-bgLight min-h-screen py-20 px-8">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-5xl md:text-6xl text-center text-primary mb-6">Browse our menu</h2>
        <p className="text-xl md:text-2xl text-center text-textGray max-w-3xl mx-auto mb-12 opacity-80">
          Use our menu to place an order online, or{" "}
          <span className="relative group cursor-pointer text-primary">
            phone
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
              +1 (555) 123-4567
            </div>
          </span>{" "}
          our store to place a pickup order. Fast and fresh food.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mb-16">
          {['Dessert', 'Dinner', 'Breakfast'].map(category => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-12 py-4 rounded-xl text-xl transition-colors ${
                selectedCategory === category
                  ? 'bg-primary text-white'
                  : 'bg-white border border-gray-300 text-textDark hover:border-primary'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {filteredItems.slice(0, visibleItems).map(item => (
            <MenuItem key={item.id} item={item} onAddToCart={onAddToCart} />
          ))}
        </div>

        {visibleItems < filteredItems.length && (
          <div className="flex justify-center">
            <button
              onClick={handleSeeMore}
              className="px-12 py-3 bg-primary text-white rounded-xl hover:bg-primary/90"
            >
              See more
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Menu;
