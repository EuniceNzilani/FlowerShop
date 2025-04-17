const asyncHandler = require('express-async-handler');
const Order = require('../models/orderModel');
const { initiateSTKPush, checkTransactionStatus } = require('../utils/mpesaUtils');

// @desc    Initiate M-Pesa STK Push
// @route   POST /api/mpesa/stkpush
// @access  Public
const initiatePayment = asyncHandler(async (req, res) => {
  const { phoneNumber, amount, orderId } = req.body;
  
  if (!phoneNumber || !amount || !orderId) {
    res.status(400);
    throw new Error('Phone number, amount and order ID are required');
  }
  
  // Find order by ID
  const order = await Order.findById(orderId);
  
  if (!order) {
    res.status(404);
    throw new Error('Order not found');
  }
  
  const orderRef = `KBL-${order._id.toString().slice(-6)}`;
  
  // Initiate STK Push
  const response = await initiateSTKPush(phoneNumber, amount, orderRef);
  
  if (response.success) {
    // Update order with checkout request ID
    order.reference = orderRef;
    order.paymentResult = {
      ...order.paymentResult,
      checkoutRequestID: response.data.CheckoutRequestID,
      merchantRequestID: response.data.MerchantRequestID,
      mpesaPhoneNumber: phoneNumber
    };
    await order.save();
    
    res.status(200).json({
      success: true,
      message: 'Payment initiated successfully',
      data: {
        checkoutRequestID: response.data.CheckoutRequestID,
        merchantRequestID: response.data.MerchantRequestID,
        responseCode: response.data.ResponseCode,
        responseDescription: response.data.ResponseDescription,
        customerMessage: response.data.CustomerMessage,
        orderRef
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Failed to initiate payment',
      error: response.error
    });
  }
});

// @desc    Handle M-Pesa callback
// @route   POST /api/mpesa/callback
// @access  Public
const confirmPayment = asyncHandler(async (req, res) => {
  const { Body } = req.body;
  
  if (Body.stkCallback.ResultCode === 0) {
    // Payment successful
    const { CallbackMetadata } = Body.stkCallback;
    
    // Extract data from callback metadata
    const metadataItems = CallbackMetadata.Item;
    const amount = metadataItems.find(item => item.Name === 'Amount').Value;
    const mpesaReceiptNumber = metadataItems.find(item => item.Name === 'MpesaReceiptNumber').Value;
    const transactionDate = metadataItems.find(item => item.Name === 'TransactionDate').Value;
    const phoneNumber = metadataItems.find(item => item.Name === 'PhoneNumber').Value;
    
    // Find order using checkout request ID
    const order = await Order.findOne({
      'paymentResult.checkoutRequestID': Body.stkCallback.CheckoutRequestID
    });
    
    if (order) {
      // Update order with payment details
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        ...order.paymentResult,
        resultCode: Body.stkCallback.ResultCode,
        resultDesc: Body.stkCallback.ResultDesc,
        amount,
        mpesaReceiptNumber,
        transactionDate: new Date(transactionDate),
        mpesaPhoneNumber: phoneNumber
      };
      
      await order.save();
      
      console.log(`Payment confirmed for order ${order._id}`);
    } else {
      console.error('Order not found for checkout request ID:', Body.stkCallback.CheckoutRequestID);
    }
  } else {
    // Payment failed
    console.error('Payment failed:', Body.stkCallback.ResultDesc);
    
    // Find order and update status
    const order = await Order.findOne({
      'paymentResult.checkoutRequestID': Body.stkCallback.CheckoutRequestID
    });
    
    if (order) {
      order.paymentResult = {
        ...order.paymentResult,
        resultCode: Body.stkCallback.ResultCode,
        resultDesc: Body.stkCallback.ResultDesc
      };
      
      await order.save();
    }
  }
  
  // Return response to M-Pesa (always acknowledge)
  res.status(200).json({ ResultCode: 0, ResultDesc: 'Success' });
});

// @desc    Check payment status
// @route   GET /api/mpesa/status/:checkoutRequestID
// @access  Public
const checkPaymentStatus = asyncHandler(async (req, res) => {
  const { checkoutRequestID } = req.params;
  
  // First check if order is already marked as paid in our database
  const order = await Order.findOne({
    'paymentResult.checkoutRequestID': checkoutRequestID
  });
  
  if (order && order.isPaid) {
    return res.status(200).json({
      success: true,
      isPaid: true,
      order: {
        _id: order._id,
        reference: order.reference,
        totalPrice: order.totalPrice,
        isPaid: order.isPaid,
        paidAt: order.paidAt,
        paymentResult: {
          mpesaReceiptNumber: order.paymentResult.mpesaReceiptNumber,
          transactionDate: order.paymentResult.transactionDate
        }
      }
    });
  }
  
  // If not paid yet, check with M-Pesa
  const response = await checkTransactionStatus(checkoutRequestID);
  
  if (response.success) {
    const resultCode = response.data.ResultCode;
    
    // If payment successful according to M-Pesa but not yet updated in our DB
    if (resultCode === 0 && order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        ...order.paymentResult,
        resultCode: resultCode,
        resultDesc: response.data.ResultDesc
      };
      
      await order.save();
      
      return res.status(200).json({
        success: true,
        isPaid: true,
        order: {
          _id: order._id,
          reference: order.reference,
          totalPrice: order.totalPrice,
          isPaid: order.isPaid,
          paidAt: order.paidAt
        }
      });
    }
    
    return res.status(200).json({
      success: true,
      isPaid: resultCode === 0,
      message: response.data.ResultDesc
    });
  } else {
    return res.status(400).json({
      success: false,
      error: response.error
    });
  }
});

module.exports = {
  initiatePayment,
  confirmPayment,
  checkPaymentStatus
};