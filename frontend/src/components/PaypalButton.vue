<template>
  <div>
    <div ref="paypalButton"></div>
  </div>
</template>

<script>
import { loadScript } from '@paypal/paypal-js';

export default {
  name: 'PaypalButton',
  
  async mounted() {
    const paypalScript = await loadScript({ "client-id": "AfVpm80GnRZnUCPqOXLtSlvOw_4n0eBItles6G67TaJ1TgP6KxOXsevVL6nDpkRaKBvASJYzgGU0nA8z" }); // Thay thế bằng Client ID của bạn
    if (paypalScript) {
      this.setupPaypalButton();
    } else {
      console.error("Failed to load PayPal SDK script.");
    }
  },
  methods: {
    setupPaypalButton() {
      window.paypal.Buttons({
        createOrder: (data, actions) => {
          return actions.order.create({
            purchase_units: [{
              amount: {
                value: '10.00' // Số tiền thanh toán
              }
            }]
          });
        },
        onApprove: (data, actions) => {
          return actions.order.capture().then(details => {
            alert('Transaction completed by ' + details.payer.name.given_name);
          });
        },
        onError: (err) => {
          console.error('PayPal payment error: ', err);
        }
      }).render(this.$refs.paypalButton);
    }
  }
};
</script>
