import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import moneyflower1 from "../assets/moneyflower1.jpg";
import flower2 from "../assets/flower2.jpeg";
import wallpaperFlower1 from "../assets/wallpaper flower1.jpg";
import flowerbouquet1 from "../assets/flowerbouquet1.jpg";

import { FaLeaf, FaGift, FaPhone, FaShoppingCart } from 'react-icons/fa';

export default function Home() {
  const { cartItems, addToCart } = useCart();
  const [showNotification, setShowNotification] = useState(false);
  
  const handleAddToCart = (product) => {
    addToCart(product);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Cart Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-emerald-600 text-white p-4 rounded-lg shadow-lg z-50 animate-fade-in">
          <p className="flex items-center">
            <FaShoppingCart className="mr-2" /> Item added to cart!
          </p>
        </div>
      )}
      
      {/* Cart Icon with Count */}
      <div className="fixed top-4 right-4 z-40">
        <Link to="/cart" className="flex items-center bg-white p-2 rounded-full shadow-md">
          <FaShoppingCart className="text-emerald-600 text-xl" />
          {cartItems.length > 0 && (
            <span className="bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs ml-1">
              {cartItems.length}
            </span>
          )}
        </Link>
      </div>

      {/* Hero Section */}
      <div
        className="relative bg-cover bg-center h-[600px]"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.3)), url(${wallpaperFlower1})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-5xl font-bold text-white mb-4 drop-shadow-lg">
            Welcome to Kenyan Blooms
          </h1>
          <p className="text-xl text-white mb-8 max-w-2xl">
            Transforming ordinary moments into extraordinary memories with our
            handcrafted floral arrangements.
          </p>
          <div>
            <Link to="/shop" className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition duration-300 shadow-md">
              Shop Now
            </Link>
            <Link to="/contact" className="ml-4 bg-transparent text-white border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-emerald-600 transition duration-300">
              Contact Us
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
              <FaLeaf className="text-emerald-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
            <p className="text-gray-600">
              Our bouquets feature only the freshest, highest quality materials for lasting beauty.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
              <FaGift className="text-emerald-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Custom Designs</h3>
            <p className="text-gray-600">
              Every arrangement is handcrafted to perfectly match your vision and occasion.
            </p>
          </div>
          
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="inline-block p-4 bg-emerald-100 rounded-full mb-4">
              <FaPhone className="text-emerald-600 text-3xl" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Expert Support</h3>
            <p className="text-gray-600">
              Our floral designers provide personalized guidance throughout your order process.
            </p>
          </div>
        </div>

        {/* Featured Products */}
        <h2 className="text-3xl font-bold text-center mb-12">Our Signature Collections</h2>
        <div className="grid md:grid-cols-2 gap-10 mb-16">
          <div className="overflow-hidden rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-102 bg-white">
            <div className="aspect-video">
              <img 
                src={moneyflower1} 
                alt="Money Bouquet" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
              />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold hover:text-emerald-600 transition-colors duration-300">
                  Money Bouquets
                </h2>
                <span className="text-emerald-600 font-medium">Starting at Ksh 2,500</span>
              </div>
              <p className="text-gray-600 mb-6">
                Transform your monetary gifts into stunning floral arrangements that leave lasting impressions. Perfect for weddings, graduations, and special celebrations.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">12 designs available</span>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleAddToCart({
                      id: 'money-bouquet-standard',
                      name: 'Standard Money Bouquet',
                      price: 2500,
                      image: moneyflower1
                    })}
                    className="py-2 px-4 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors duration-300 flex items-center"
                  >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </button>
                  <Link to="/money-bouquets" className="py-2 px-4 bg-emerald-50 text-emerald-600 rounded-full font-medium hover:bg-emerald-100 transition-colors duration-300">
                    View Collection
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-102 bg-white">
            <div className="aspect-video">
              <img 
                src={flowerbouquet1} 
                alt="Custom Bouquet" 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105" 
              />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold hover:text-emerald-600 transition-colors duration-300">
                  Custom Bouquets
                </h2>
                <span className="text-emerald-600 font-medium">Starting at Ksh 3,000</span>
              </div>
              <p className="text-gray-600 mb-6">
                Design your perfect bouquet with our customization options. Choose colors, styles, and flowers that speak to your unique preferences and occasion.
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">Unlimited possibilities</span>
                <div className="flex space-x-3">
                  <button 
                    onClick={() => handleAddToCart({
                      id: 'custom-bouquet-standard',
                      name: 'Custom Bouquet',
                      price: 3000,
                      image: flowerbouquet1
                    })}
                    className="py-2 px-4 bg-emerald-600 text-white rounded-full font-medium hover:bg-emerald-700 transition-colors duration-300 flex items-center"
                  >
                    <FaShoppingCart className="mr-2" /> Add to Cart
                  </button>
                  <Link to="/custom-bouquets" className="py-2 px-4 bg-emerald-50 text-emerald-600 rounded-full font-medium hover:bg-emerald-100 transition-colors duration-300">
                    Create Yours
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="bg-white rounded-xl shadow-md p-10 mb-16">
          <h2 className="text-3xl font-bold text-center mb-10">What Our Customers Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="border border-gray-100 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="text-amber-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"The money bouquet I ordered for my sister's wedding was absolutely stunning. Everyone was amazed by the creativity and craftsmanship."</p>
              <p className="font-semibold">- Sarah Kamau</p>
            </div>
            
            <div className="border border-gray-100 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="text-amber-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"The customer service was exceptional. They helped me design a custom bouquet that matched exactly what I had envisioned for my event."</p>
              <p className="font-semibold">- David Mwangi</p>
            </div>
            
            <div className="border border-gray-100 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="text-amber-400 flex">
                  {[...Array(5)].map((_, i) => (
                    <svg key={i} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">"Fast delivery and the quality exceeded my expectations. The flowers were fresh and the arrangement was even more beautiful than in the pictures!"</p>
              <p className="font-semibold">- Grace Odhiambo</p>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-emerald-600 rounded-xl shadow-xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Create Something Beautiful?</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Let us help you craft the perfect floral arrangement for your next special occasion.
          </p>
          <div>
            <Link to="/custom-bouquets" className="bg-white text-emerald-600 px-8 py-3 rounded-full font-semibold hover:bg-emerald-50 transition duration-300 inline-block">
              Get Started Today
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}