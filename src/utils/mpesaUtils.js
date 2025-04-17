const axios = require('axios');
const moment = require('moment');

// M-Pesa credentials from .env file
const CONSUMER_KEY = process.env.MPESA_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.MPESA_CONSUMER_SECRET;
const SHORTCODE = process.env.MPESA_SHORTCODE;
const PASSKEY = process.env.MPESA_PASSKEY;
const CALLBACK_URL = process.env.MPESA_CALLBACK_URL;
const MPESA_ENV = process.env.MPESA_ENV || 'sandbox';

// Base URLs
const BASE_URL = MPESA_ENV === 'production'
  ? 'https://api.safaricom.co.ke'
  : 'https://sandbox.safaricom.co.ke';

// Get OAuth token
const getAccessToken = async () => {
  try {
    const url = `${BASE_URL}/oauth/v1/generate?grant_type=client_credentials`;
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
const initiateSTKPush = async (phoneNumber, amount, orderRef) => {
  try {
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
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString('base64');
    
    const url = `${BASE_URL}/mpesa/stkpush/v1/processrequest`;
    const data = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: 'CustomerPayBillOnline',
      Amount: Math.round(amount),  // M-Pesa requires whole numbers
      PartyA: formattedPhone,
      PartyB: SHORTCODE,
      PhoneNumber: formattedPhone,
      CallBackURL: `${CALLBACK_URL}/api/mpesa/callback`,
      AccountReference: orderRef || 'KenyanBlooms',
      TransactionDesc: 'Payment for flowers'
    };
    
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    return {
      success: true,
      data: response.data
    };
    
  } catch (error) {
    console.error('Error initiating STK push:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

// Check transaction status
const checkTransactionStatus = async (checkoutRequestID) => {
  try {
    const accessToken = await getAccessToken();
    
    const timestamp = moment().format('YYYYMMDDHHmmss');
    const password = Buffer.from(`${SHORTCODE}${PASSKEY}${timestamp}`).toString('base64');
    
    const url = `${BASE_URL}/mpesa/stkpushquery/v1/query`;
    const data = {
      BusinessShortCode: SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestID
    };
    
    const response = await axios.post(url, data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    });
    
    return {
      success: true,
      data: response.data
    };
    
  } catch (error) {
    console.error('Error checking transaction status:', error.response?.data || error.message);
    return {
      success: false,
      error: error.response?.data || error.message
    };
  }
};

module.exports = {
  getAccessToken,
  initiateSTKPush,
  checkTransactionStatus
};