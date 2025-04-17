// This is a simplified example for a Node.js backend to handle M-Pesa integration
const express = require('express');
const axios = require('axios');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// M-Pesa credentials from .env file
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const SHORTCODE = process.env.MPESA_SHORTCODE;
const PASSKEY = process.env.MPESA_PASSKEY;
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL;

// Get OAuth token from Safaricom
const getAccessToken = async () => {
  try {
    const url = 'https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials';
    const auth = Buffer.from(`${CONSUMER_KEY}:${CONSUMER_SECRET}`).toString('base64');
    
    const response = await axios.get(url, {
      headers: {
        Authorization: `Basic ${auth}`
      }
    });
    
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting access token:', error);
    throw error;
  }
};

// Initiate STK Push
app.post('/api/stkpush', async (req, res) => {
  try {
    const { phoneNumber, amount, orderRef } = req.body;
    
    // Validate required fields
    if (!phoneNumber || !amount) {
      return res.status(400).json({ 
        success: false, 
        message: 'Phone number and amount are required' 
      });
    }
    
    // Format phone number if needed
    let formattedPhone = phoneNumber;
    if (phoneNumber.startsWith('0')) {
      formattedPhone = '254' + phoneNumber.substring(1);
    } else if (phoneNumber.startsWith('+254')) {
      formattedPhone = phoneNumber.substring(1);
    }
    
    // Get access token
    const accessToken = await getAccessToken();
    
    // Prepare STK Push request
    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, '').substring(0, 14);
    const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString('base64');
    
    const url = 'https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest';
    const data = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: CALLBACK_URL,
      AccountReference: orderRef || 'KenyanBlooms',
      TransactionDesc: 'Payment for flowers'
    };
    
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    return res.status(200).json({
      success: true,
      message: 'STK push initiated successfully',
      data: response.data
    });
  } catch (error) {
    console.error('Error initiating STK push:', error.response?.data || error.message);
    return res.status(500).json({
      success: false,
      message: 'Failed to initiate STK push',
      error: error.response?.data || error.message
    });
  }
});

// Callback endpoint for M-Pesa
app.post('/api/mpesa/callback', (req, res) => {
  const data = req.body;
  
  // Log the callback data
  console.log('M-Pesa callback data:', data);
  
  // Process the callback data
  // In a real application, you'd update your database and notify the client
  
  // Always respond to Safaricom
  res.status(200).json({
    ResultCode: 0,
    ResultDesc: 'Success'
  });
});

// Check payment status endpoint
app.get('/api/payment/status/:orderRef', (req, res) => {
  const { orderRef } = req.params;
  
  // In a real application, you'd check your database for the payment status
  // For this example, we'll simulate a successful payment
  
  res.status(200).json({
    success: true,
    paid: true,
    orderRef,
    transactionId: 'MPESA' + Math.floor(1000000000 + Math.random() * 9000000000)
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});