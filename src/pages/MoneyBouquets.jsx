import React from 'react';
import { useCart } from '../context/CartContext';
import moneyflower1 from "../assets/moneyflower1.jpg";
import flower2 from "../assets/flower2.jpeg";
import wallpaperFlower1 from "../assets/wallpaper flower1.jpg";
import flowerbouquet1 from "../assets/flowerbouquet1.jpg";
import moneyFlower2 from "../assets/Money Flower 2.png";
import moneyFlower3 from "../assets/Money Flower 3.png";
import moneyFlower4 from "../assets/Money Flower 4.png";
import moneyFlower5 from "../assets/Money Flower 5.png";
import moneyFlower6 from "../assets/Money Flower 6.png";
import moneyFlower7 from "../assets/Money Flower 7.png";
import moneyFlower8 from "../assets/Money Flower 8.png";
import moneyFlower9 from "../assets/Money Flower 9.png";
import moneyFlower10 from "../assets/Money Flower 10.png";
import moneyFlower11 from "../assets/Money Flower 11.png";
import moneyFlower12 from "../assets/Money Flower 12.png";
import moneyFlower13 from "../assets/Money Flower 13.png";
import moneyFlower14 from "../assets/Money Flower 14.png";
import moneyFlower15 from "../assets/Money Flower 15.png";
import moneyFlower16 from "../assets/Money Flower 16.png";
import moneyFlower17 from "../assets/Money Flower 17.png";
import moneyFlower18 from "../assets/Money Flower 18.png";
import moneyFlower19 from "../assets/Money Flower 19.png";
import moneyFlower20 from "../assets/Money Flower 20.png";

export default function MoneyBouquets() {
  const { addToCart } = useCart();
  
  // Array of 20 money bouquet products with improved names and varying prices
  const bouquets = [
    { id: 1, name: "Emerald Fortune", price: 3000, description: "Elegant arrangement with KES 3,000 worth of notes", image: moneyflower1 },
    { id: 2, name: "Prosperity Bloom", price: 3500, description: "Stunning money bouquet with KES 3,500 value", image: moneyFlower2 },
    { id: 3, name: "Golden Harvest", price: 4000, description: "Luxurious arrangement with KES 4,000 notes", image: moneyFlower3 },
    { id: 4, name: "Wealth Blossom", price: 4200, description: "Beautiful money flower with KES 4,200 worth of currency", image: moneyFlower4 },
    { id: 5, name: "Fortune Petals", price: 4500, description: "Sophisticated money arrangement valued at KES 4,500", image: moneyFlower5 },
    { id: 6, name: "Abundant Grace", price: 5000, description: "Premium money bouquet with KES 5,000 notes", image: moneyFlower6 },
    { id: 7, name: "Royal Treasury", price: 5500, description: "Deluxe money flower arrangement worth KES 5,500", image: moneyFlower7 },
    { id: 8, name: "Luxe Blossoms", price: 6000, description: "Exquisite money bouquet with KES 6,000 value", image: moneyFlower8 },
    { id: 9, name: "Prosperity Garden", price: 6200, description: "Graceful money flower arrangement with KES 6,200 notes", image: moneyFlower9 },
    { id: 10, name: "Elite Bouquet", price: 6500, description: "Stylish money bouquet worth KES 6,500", image: moneyFlower10 },
    { id: 11, name: "Regal Treasure", price: 7000, description: "Premium money arrangement with KES 7,000 value", image: moneyFlower11 },
    { id: 12, name: "Diamond Jubilee", price: 7200, description: "Elegant money flower bouquet with KES 7,200 notes", image: moneyFlower12 },
    { id: 13, name: "Opulent Cascade", price: 7500, description: "Luxurious money arrangement valued at KES 7,500", image: moneyFlower13 },
    { id: 14, name: "Success Bloom", price: 8000, description: "Spectacular money bouquet with KES 8,000 worth of notes", image: moneyFlower14 },
    { id: 15, name: "Grand Fortune", price: 8500, description: "Magnificent money flower worth KES 8,500", image: moneyFlower15 },
    { id: 16, name: "Prestige Collection", price: 9000, description: "Premium money arrangement with KES 9,000 value", image: moneyFlower16 },
    { id: 17, name: "Majestic Bouquet", price: 9200, description: "Deluxe money flower bouquet with KES 9,200 notes", image: moneyFlower17 },
    { id: 18, name: "Affluent Harmony", price: 9500, description: "Elegant money arrangement valued at KES 9,500", image: moneyFlower18 },
    { id: 19, name: "Executive Elegance", price: 9800, description: "Sophisticated money bouquet with KES 9,800 worth of currency", image: moneyFlower19 },
    { id: 20, name: "Millionaire's Dream", price: 10000, description: "Ultimate luxury money flower arrangement valued at KES 10,000", image: moneyFlower20 },
  ];

  const handleAddToCart = (bouquet) => {
    // Add to cart with notification feedback
    addToCart({
      id: bouquet.id,
      name: bouquet.name,
      price: bouquet.price,
      image: bouquet.image,
      quantity: 1
    });
    
    // Optional: Show a notification that item was added (if you have a notification system)
    // If you have a toast notification system, you can use it here
    // Example: toast.success(`${bouquet.name} added to cart!`);
    
    // Alternative: You could implement a simple notification
    const notification = document.createElement('div');
    notification.textContent = `${bouquet.name} added to cart!`;
    notification.className = 'fixed top-4 right-4 bg-emerald-600 text-white py-2 px-4 rounded-lg shadow-lg z-50';
    document.body.appendChild(notification);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
      notification.classList.add('opacity-0', 'transition-opacity', 'duration-500');
      setTimeout(() => document.body.removeChild(notification), 500);
    }, 3000);
  };

  return (
    <div className="container mx-auto px-6 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Money Bouquets</h1>
      <p className="text-center text-gray-600 mb-8">Elegant money bouquets for special occasions</p>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {bouquets.map((bouquet) => (
          <div key={bouquet.id} className="overflow-hidden rounded-xl shadow-lg transition-transform duration-300 transform hover:scale-102 bg-white">
            <div className="aspect-video bg-emerald-50">
              <img 
                src={bouquet.image} 
                alt={bouquet.name}
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              />
            </div>
            <div className="p-8">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-semibold hover:text-emerald-600 transition-colors duration-300">
                  {bouquet.name}
                </h2>
                <span className="text-emerald-600 font-bold">KES {bouquet.price.toLocaleString()}</span>
              </div>
              <p className="text-gray-600 mb-6">{bouquet.description}</p>
              <button 
                className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors duration-300"
                onClick={() => handleAddToCart(bouquet)}
                aria-label={`Add ${bouquet.name} to cart`}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}