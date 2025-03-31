import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FaShoppingCart, FaBars, FaTimes } from 'react-icons/fa'
import { useCart } from '../context/CartContext'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { cartItems } = useCart()

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            Kenyan Blooms
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes /> : <FaBars />}
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="hover:text-primary">Home</Link>
            <Link to="/money-bouquets" className="hover:text-primary">Money Bouquets</Link>
            <Link to="/custom-bouquets" className="hover:text-primary">Custom Bouquets</Link>
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-2xl" />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cartItems.length}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-4">
            <Link to="/" className="block hover:text-primary">Home</Link>
            <Link to="/money-bouquets" className="block hover:text-primary">Money Bouquets</Link>
            <Link to="/custom-bouquets" className="block hover:text-primary">Custom Bouquets</Link>
            <Link to="/cart" className="block hover:text-primary">Cart ({cartItems.length})</Link>
          </div>
        )}
      </nav>
    </header>
  )
}