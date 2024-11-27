require('dotenv').config(); // Load biến môi trường từ file .env
const express = require('express');
const paypal = require('paypal-rest-sdk');
const bodyParser = require('body-parser');
const path = require('path');
const MongoDB = require('./node_modules/mongodb'); 
const reviewRoutes = require('./src/routes/reviews');

const app = express();
app.use(bodyParser.json());

const uri = 'mongodb://127.0.0.1:27017/Game'; // Thay thế bằng chuỗi kết nối MongoDB của bạn

MongoDB.connect(uri).then(client => {
    console.log('Connected to MongoDB');
    const db = client.db('Game'); // Thay thế bằng tên cơ sở dữ liệu của bạn

    app.use((req, res, next) => {
        req.db = db; // Đính kèm đối tượng db vào req để có thể sử dụng trong các route
        next();
    });
  });
paypal.configure({
  'mode': 'sandbox', // Thay đổi thành 'live' khi bạn sẵn sàng cho môi trường thực
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_SECRET_KEY
});

// Endpoint để tạo Payment
app.post('/create-payment', (req, res) => {
  const create_payment_json = {
    "intent": "sale",
    "payer": {
      "payment_method": "paypal"
    },
    "transactions": [{
      "amount": {
        "currency": "USD",
        "total": "10.00"
      },
      "description": "This is the payment description."
    }],
    "redirect_urls": {
      "return_url": "http://return.url",
      "cancel_url": "http://cancel.url"
    }
  };

  paypal.payment.create(create_payment_json, (error, payment) => {
    if (error) {
      res.status(500).send({ error: error.response });
    } else {
      res.send(payment);
    }
  });
});

// Phục vụ các file tĩnh
app.use(express.static(path.join(__dirname, 'public')));

// Khởi động server trên cổng 4001
app.listen(4001, () => {
  console.log('Server is running on port 4001');
});
