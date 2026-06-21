import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import {
  selectCartItems,
  selectCartTotal,
  removeItem,
  clearCart,
} from '../store/cartSlice';
import { selectUser } from '../store/authSlice';

const OrderPage = () => {
  const items = useSelector(selectCartItems);
  const total = useSelector(selectCartTotal);
  const user = useSelector(selectUser);
  const dispatch = useDispatch();
  const [placed, setPlaced] = useState(false);

  const handlePlaceOrder = () => {
    setPlaced(true);
    dispatch(clearCart());
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-bgLight px-8 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-medium text-textDark mb-2">Your order</h1>
          <p className="text-textGray mb-8">
            Signed in as <span className="text-primary">{user?.email}</span>
          </p>

          {placed && (
            <div className="bg-green-50 text-green-700 rounded-xl px-4 py-3 mb-6">
              Thank you! Your order has been placed.
            </div>
          )}

          {!placed && items.length === 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
              <p className="text-textGray mb-6">Your cart is empty.</p>
              <Link
                to="/menu"
                className="inline-block bg-primary text-white px-8 py-3 rounded-xl hover:bg-opacity-90 transition"
              >
                Browse menu
              </Link>
            </div>
          )}

          {!placed && items.length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm p-6">
              <ul className="divide-y divide-gray-100">
                {items.map((it) => (
                  <li
                    key={it.id}
                    className="flex items-center gap-4 py-4"
                  >
                    {it.img && (
                      <img
                        src={it.img}
                        alt={it.meal}
                        className="w-16 h-16 rounded-md object-cover"
                      />
                    )}
                    <div className="flex-1">
                      <h3 className="text-textDark font-medium">{it.meal}</h3>
                      <p className="text-sm text-textGray">
                        ${it.price.toFixed(2)} × {it.quantity}
                      </p>
                    </div>
                    <span className="text-primary font-medium whitespace-nowrap">
                      ${(it.price * it.quantity).toFixed(2)}
                    </span>
                    <button
                      onClick={() => dispatch(removeItem(it.id))}
                      className="text-sm text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <div className="flex justify-between items-center pt-6 mt-2 border-t border-gray-100">
                <span className="text-lg text-textDark font-medium">Total</span>
                <span className="text-2xl text-primary font-semibold">
                  ${total.toFixed(2)}
                </span>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => dispatch(clearCart())}
                  className="flex-1 bg-white border border-gray-200 text-textDark py-3 rounded-xl hover:bg-gray-50 transition"
                >
                  Clear cart
                </button>
                <button
                  onClick={handlePlaceOrder}
                  className="flex-1 bg-primary text-white py-3 rounded-xl hover:bg-opacity-90 transition"
                >
                  Place order
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default OrderPage;
