import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowLeft, FaMoneyBill, FaSpinner } from 'react-icons/fa';

export default function Checkout() {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: '',
    phone: '',
    deliveryAddress: '',
    deliveryDate: '',
    deliveryTime: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('mpesa');
  const [mpesaNumber, setMpesaNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [errors, setErrors] = useState({});

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo({
      ...customerInfo,
      [name]: value
    });
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    if (!customerInfo.name.trim()) newErrors.name = 'Name is required';
    if (!customerInfo.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(customerInfo.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!customerInfo.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^(0|\+254|254)7\d{8}$/.test(customerInfo.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Please enter a valid Kenyan phone number';
    }
    
    if (!customerInfo.deliveryAddress.trim()) newErrors.deliveryAddress = 'Delivery address is required';
    if (!customerInfo.deliveryDate) newErrors.deliveryDate = 'Delivery date is required';
    
    if (paymentMethod === 'mpesa') {
      if (!mpesaNumber.trim()) {
        newErrors.mpesaNumber = 'M-Pesa number is required';
      } else if (!/^(0|\+254|254)7\d{8}$/.test(mpesaNumber.replace(/\s/g, ''))) {
        newErrors.mpesaNumber = 'Please enter a valid M-Pesa number';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Format phone number to required format (2547XXXXXXXX)
  const formatPhone = (phone) => {
    phone = phone.replace(/\s/g, '');
    
    if (phone.startsWith('+254')) {
      return phone.substring(1);
    } else if (phone.startsWith('0')) {
      return '254' + phone.substring(1);
    } else if (phone.startsWith('254')) {
      return phone;
    }
    
    return phone;
  };

  // Simulate M-Pesa STK push
  const initiateSTKPush = async () => {
    // This is where you would integrate with your backend that handles M-Pesa API
    setLoading(true);
    
    try {
      // In a real implementation, you would make an API call to your backend
      // which would then call the M-Pesa API to initiate STK push
      
      // For demonstration purposes, we'll simulate the API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Simulate successful STK push
      setPaymentStatus({
        success: true,
        message: 'M-Pesa STK push sent to your phone. Please complete the payment.',
        reference: 'KB' + Math.floor(100000 + Math.random() * 900000)
      });
      
      // In a real implementation, you would then need to check payment status
      // This could be through polling, webhooks, or other methods
    } catch (error) {
      setPaymentStatus({
        success: false,
        message: 'Failed to initiate payment. Please try again.',
        error: error.message
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    if (paymentMethod === 'mpesa') {
      await initiateSTKPush();
    }
  };

  // Handle payment confirmation (in a real app, this would be automated via webhooks)
  const handlePaymentConfirmation = () => {
    // In a real app, this would be triggered by a webhook or other confirmation method
    // For demo purposes, we'll simulate payment confirmation
    
    setLoading(true);
    
    setTimeout(() => {
      // Create order object with all info
      const order = {
        id: 'ORD' + Date.now(),
        customer: customerInfo,
        items: cartItems,
        total: getCartTotal(),
        paymentMethod,
        paymentStatus: 'paid',
        paymentReference: paymentStatus?.reference,
        orderDate: new Date().toISOString()
      };
      
      // In a real app, you would save this to your database
      console.log('Order created:', order);
      
      // Clear cart
      clearCart();
      
      // Redirect to success page
      navigate('/order-confirmation', { state: { order } });
      
      setLoading(false);
    }, 2000);
  };

  // Calculate delivery fee based on address (simplified example)
  const getDeliveryFee = () => {
    return 200; // Fixed fee of KSh 200 for this example
  };

  // Calculate total with delivery
  const total = getCartTotal();
  const deliveryFee = getDeliveryFee();
  const grandTotal = total + deliveryFee;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <Link to="/cart" className="flex items-center text-emerald-600 hover:text-emerald-700">
            <FaArrowLeft className="mr-2" /> Back to Cart
          </Link>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              
              {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
              ) : (
                <>
                  <div className="max-h-80 overflow-y-auto mb-4">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center py-3 border-b">
                        <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                          <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                        </div>
                        <div className="ml-4 flex-1">
                          <h3 className="text-sm font-medium text-gray-900">{item.name}</h3>
                          <p className="text-sm text-gray-500">Ksh {item.price.toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <p>Subtotal</p>
                      <p className="font-medium">Ksh {total.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between text-sm">
                      <p>Delivery Fee</p>
                      <p className="font-medium">Ksh {deliveryFee.toLocaleString()}</p>
                    </div>
                    <div className="border-t pt-2 mt-2">
                      <div className="flex justify-between text-lg font-semibold">
                        <p>Total</p>
                        <p>Ksh {grandTotal.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Checkout Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">Checkout</h2>
              
              {cartItems.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-gray-500 mb-4">Your cart is empty</p>
                  <Link 
                    to="/shop" 
                    className="bg-emerald-600 text-white px-6 py-2 rounded-full font-semibold hover:bg-emerald-700 transition duration-300"
                  >
                    Continue Shopping
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Delivery Information</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input
                          type="text"
                          name="name"
                          value={customerInfo.name}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <input
                          type="email"
                          name="email"
                          value={customerInfo.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                        <input
                          type="tel"
                          name="phone"
                          value={customerInfo.phone}
                          onChange={handleChange}
                          placeholder="e.g. 0712345678"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
                      </div>
                      
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                        <textarea
                          name="deliveryAddress"
                          value={customerInfo.deliveryAddress}
                          onChange={handleChange}
                          rows="3"
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${errors.deliveryAddress ? 'border-red-500' : 'border-gray-300'}`}
                        ></textarea>
                        {errors.deliveryAddress && <p className="mt-1 text-sm text-red-500">{errors.deliveryAddress}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Date</label>
                        <input
                          type="date"
                          name="deliveryDate"
                          value={customerInfo.deliveryDate}
                          onChange={handleChange}
                          min={new Date().toISOString().split('T')[0]}
                          className={`w-full px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${errors.deliveryDate ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.deliveryDate && <p className="mt-1 text-sm text-red-500">{errors.deliveryDate}</p>}
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Preferred Delivery Time</label>
                        <select
                          name="deliveryTime"
                          value={customerInfo.deliveryTime}
                          onChange={handleChange}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-emerald-500 focus:border-emerald-500"
                        >
                          <option value="">Select a time</option>
                          <option value="morning">Morning (8AM - 12PM)</option>
                          <option value="afternoon">Afternoon (12PM - 4PM)</option>
                          <option value="evening">Evening (4PM - 7PM)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-8">
                    <h3 className="text-lg font-medium mb-4">Payment Method</h3>
                    <div className="space-y-4">
                      <div className="flex items-center">
                        <input
                          id="mpesa"
                          name="paymentMethod"
                          type="radio"
                          checked={paymentMethod === 'mpesa'}
                          onChange={() => setPaymentMethod('mpesa')}
                          className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300"
                        />
                        <label htmlFor="mpesa" className="ml-3 flex items-center">
                          <span className="ml-2 text-sm font-medium text-gray-700">M-Pesa</span>
                        </label>
                      </div>
                      
                      {paymentMethod === 'mpesa' && (
                        <div className="ml-7 mt-3">
                          <label className="block text-sm font-medium text-gray-700 mb-1">M-Pesa Phone Number</label>
                          <input
                            type="tel"
                            value={mpesaNumber}
                            onChange={(e) => setMpesaNumber(e.target.value)}
                            placeholder="e.g. 0712345678"
                            className={`w-full md:w-1/2 px-4 py-2 border rounded-lg focus:ring-emerald-500 focus:border-emerald-500 ${errors.mpesaNumber ? 'border-red-500' : 'border-gray-300'}`}
                          />
                          {errors.mpesaNumber && <p className="mt-1 text-sm text-red-500">{errors.mpesaNumber}</p>}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  {paymentStatus && (
                    <div className={`mb-6 p-4 rounded-lg ${paymentStatus.success ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'}`}>
                      <p className="font-medium">{paymentStatus.message}</p>
                      {paymentStatus.success && (
                        <p className="mt-2">Reference: {paymentStatus.reference}</p>
                      )}
                    </div>
                  )}
                  
                  <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                    <p className="text-gray-600 text-sm">
                      By placing this order, you agree to our <a href="/terms" className="text-emerald-600 hover:underline">Terms and Conditions</a>
                    </p>
                    
                    {!paymentStatus?.success ? (
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full md:w-auto bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition duration-300 flex items-center justify-center disabled:bg-emerald-300"
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" /> Processing
                          </>
                        ) : (
                          <>
                            <FaMoneyBill className="mr-2" /> Pay with M-Pesa
                          </>
                        )}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handlePaymentConfirmation}
                        disabled={loading}
                        className="w-full md:w-auto bg-emerald-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-emerald-700 transition duration-300 flex items-center justify-center disabled:bg-emerald-300"
                      >
                        {loading ? (
                          <>
                            <FaSpinner className="animate-spin mr-2" /> Processing
                          </>
                        ) : (
                          'Complete Order'
                        )}
                      </button>
                    )}
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}