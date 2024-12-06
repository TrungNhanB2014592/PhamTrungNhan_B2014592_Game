require('dotenv').config();
const express = require('express');
const paypal = require('paypal-rest-sdk');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose'); 
const reviewRoutes = require('./src/routes/reviews');

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Use cors
const uri = 'mongodb://127.0.0.1:27017/Game'; 

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error(`Error connecting to MongoDB: ${err.message}`));

paypal.configure({
  'mode': 'sandbox', 
  'client_id': process.env.PAYPAL_CLIENT_ID,
  'client_secret': process.env.PAYPAL_SECRET_KEY
});

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

app.use('/api', reviewRoutes);
app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 4001;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
