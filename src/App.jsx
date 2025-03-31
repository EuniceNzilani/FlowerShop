import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import MoneyBouquets from './pages/MoneyBouquets'
import CustomBouquets from './pages/CustomBouquets'
import Cart from './pages/Cart'
import { CartProvider } from './context/CartContext'
import './index.css'

function App() {
  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/money-bouquets" element={<MoneyBouquets />} />
              <Route path="/custom-bouquets" element={<CustomBouquets />} />
              <Route path="/cart" element={<Cart />} />
            </Routes>
          </main>
          <Footer />
        </div>
        <Toaster position="top-center" />
      </CartProvider>
    </Router>
  )
}

export default App