import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaCheck, FaShoppingBag, FaHome } from 'react-icons/fa';

export default function OrderConfirmation() {
  const location = useLocation();
  const navigate = useNavigate();
  const { order } = location.state || {};

  // Redirect to home if accessed directly without an order
  useEffect(() => {
    if (!order) {
      navigate('/');
    }
  }, [order, navigate]);

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-100 text-emerald-600 mb-6">
              <FaCheck className="h-10 w-10" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Thank You for Your Order!</h1>
            <p className="text-lg text-gray-600">
              Your order has been successfully placed and is being processed.
            </p>
          </div>

          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm text-gray-500">Order Number</p>
                <p className="font-semibold">{order.id}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold">
                  {new Date(order.orderDate).toLocaleDateString('en-KE', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm text-gray-500 mb-1">Delivery Details</p>
              <p className="font-medium">{order.customer.name}</p>
              <p>{order.customer.deliveryAddress}</p>
              <p className="mt-1">
                {order.customer.deliveryDate}{' '}
                {order.customer.deliveryTime && `(${
                  order.customer.deliveryTime === 'morning' ? 'Morning (8AM - 12PM)' :
                  order.customer.deliveryTime === 'afternoon' ? 'Afternoon (12PM - 4PM)' :
                  'Evening (4PM - 7PM)'
                })`}
              </p>
            </div>

            <div>
              <p className="text-sm text-gray-500 mb-1">Payment Information</p>
              <p className="font-medium">
                M-Pesa Payment
                <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                  Paid
                </span>
              </p>
              <p>Reference: {order.paymentReference}</p>
            </div>
          </div>

          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            {order.items.map((item) => (
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

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <p>Subtotal</p>
                <p className="font-medium">
                  Ksh {order.items.reduce((sum, item) => sum + item.price, 0).toLocaleString()}
                </p>
              </div>
              <div className="flex justify-between text-sm">
                <p>Delivery Fee</p>
                <p className="font-medium">Ksh 200</p>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between text-lg font-semibold">
                  <p>Total</p>
                  <p>Ksh {(order.total + 200).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 mb-6">
              A confirmation email has been sent to {order.customer.email}
            </p>

            <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-medium text-white bg-emerald-600 hover:bg-emerald-700"
              >
                <FaHome className="mr-2" /> Back to Home
              </Link>
              <Link
                to="/shop"
                className="inline-flex items-center justify-center px-6 py-3 border border-emerald-600 rounded-full shadow-sm text-base font-medium text-emerald-600 bg-white hover:bg-emerald-50"
              >
                <FaShoppingBag className="mr-2" /> Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}