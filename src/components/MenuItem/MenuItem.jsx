import { useState } from 'react';

export default function MenuItem({ item, onAddToCart }) {
  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    onAddToCart(item.price * quantity);
  };

  const truncateWords = (text, wordLimit) => {
    if (!text) return '';
    const words = text.split(/\s+/).slice(0, wordLimit);
    return words.join(' ') + (text.split(/\s+/).length > wordLimit ? '...' : '');
  };

  return (
    <div className="grid grid-cols-[124px_1fr] gap-[18px] items-center p-[18px] border border-[#d6e4e8] rounded-lg bg-white px-6 py-8" >
      <img
        src={item.img || "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=400&q=80"}
        alt={item.meal || "Meal"}
        className="w-[108px] h-[108px] object-cover rounded-sm"
      />

      <div className="flex flex-col gap-[10px]">
        <div className="flex justify-between items-center gap-[10px]">
          <h2 className="m-0 text-[#111827] text-base leading-none">
            {item.meal || "Meal"}
          </h2>

          <span className="m-0 text-[#35b8be] text-[17px] leading-none whitespace-nowrap ">
            $ {item.price?.toFixed(2) || "0.00"} USD
          </span>
        </div>

        <p className="m-0 text-[#546285] text-base leading-[1.4] min-h-[46px]">
          {truncateWords(item.instructions, 20) || "No description available"}
        </p>

        <div className="flex items-center gap-2">
          <input 
            type="number" 
            min="1" 
            value={quantity}
            onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
            className="w-[54px] h-11 border border-[#d6e4e8] rounded-md text-[#1f2937] bg-[#fbfbfb] flex items-center justify-center text-[20px]"
          />

          <button 
            onClick={handleAddToCart}
            className="h-11 border-0 rounded-md px-[22px] bg-[#35b8be] text-white text-[17px] cursor-pointer hover:opacity-90"
          >
            Add to card
          </button>
        </div>
      </div>
    </div>
  );
}