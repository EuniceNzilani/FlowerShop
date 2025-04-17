const express = require('express');
const router = express.Router();
const { 
  initiatePayment,
  confirmPayment,
  checkPaymentStatus
} = require('../controllers/mpesaController');

router.post('/stkpush', initiatePayment);
router.post('/callback', confirmPayment);
router.get('/status/:checkoutRequestID', checkPaymentStatus);

module.exports = router;