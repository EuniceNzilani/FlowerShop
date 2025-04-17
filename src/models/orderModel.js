const mongoose = require('mongoose');

const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: false,
    },
    orderItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
      },
    ],
    customerInfo: {
      name: { type: String, required: true },
      email: { type: String, required: true },
      phone: { type: String, required: true },
      deliveryAddress: { type: String, required: true },
      deliveryDate: { type: Date, required: true },
      deliveryTime: { type: String },
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'mpesa',
    },
    paymentResult: {
      mpesaReceiptNumber: { type: String },
      mpesaPhoneNumber: { type: String },
      amount: { type: Number },
      transactionDate: { type: Date },
      resultCode: { type: String },
      resultDesc: { type: String },
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    deliveryFee: {
      type: Number,
      required: true,
      default: 200,
    },
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
    reference: {
      type: String,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;