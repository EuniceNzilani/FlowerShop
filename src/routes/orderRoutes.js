const express = require('express');
const router = express.Router();
const { 
  createOrder, 
  getOrderById, 
  updateOrderToPaid,
  updateOrderToDelivered,
  getMyOrders,
  getOrders
} = require('../controllers/orderController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
  .post(createOrder)
  .get(protect, admin, getOrders);
  
router.route('/myorders')
  .get(protect, getMyOrders);
  
router.route('/:id')
  .get(getOrderById);
  
router.route('/:id/pay')
  .put(updateOrderToPaid);
  
router.route('/:id/deliver')
  .put(protect, admin, updateOrderToDelivered);

module.exports = router;