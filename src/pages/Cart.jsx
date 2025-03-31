import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaTrash } from 'react-icons/fa';

export default function Cart() {
  const { cartItems, removeFromCart } = useCart();

  const total = cartItems.reduce((sum, item) => sum + item.price, 0);

  return (
    <div className="container mx-auto px-6 py-8">
      <div className="flex items-center mb-8">
        <Link to="/" className="text-emerald-600 hover:text-emerald-700 mr-4 flex items-center">
          <FaArrowLeft className="mr-2" /> Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
      </div>
      
      {cartItems.length === 0 ? (
        <div className="bg-white rounded-lg shadow-md text-center py-16">
          <p className="text-gray-600 text-lg mb-6">Your cart is empty</p>
          <Link to="/money-bouquets" className="bg-emerald-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-700 transition duration-300">
            Browse Products
          </Link>
        </div>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow-md p-4 mb-4 flex items-center">
                <div className="w-24 h-24 mr-4 rounded-md overflow-hidden">
                  {item.image ? (
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-400">
                      No image
                    </div>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-emerald-600 font-medium">KES {item.price.toLocaleString()}</p>
                  {item.options && (
                    <p className="text-gray-500 text-sm mt-1">
                      {Object.entries(item.options).map(([key, value]) => (
                        `${key}: ${value}`
                      )).join(', ')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700 p-2"
                  aria-label="Remove item"
                >
                  <FaTrash />
                </button>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow-md p-6 h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
            <div className="border-t border-b py-4 my-4">
              {cartItems.map((item) => (
                <div key={item.id} className="flex justify-between mb-2 text-sm">
                  <span>{item.name}</span>
                  <span>KES {item.price.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="flex justify-between mb-4 font-semibold">
              <span>Total</span>
              <span>KES {total.toLocaleString()}</span>
            </div>
            <button className="bg-emerald-600 text-white w-full py-3 rounded-full font-semibold hover:bg-emerald-700 transition duration-300">
              Proceed to Checkout
            </button>
            <p className="text-center text-gray-500 text-sm mt-4">
              Taxes and shipping calculated at checkout
            </p>
          </div>
        </div>
      )}
    </div>
  );
}