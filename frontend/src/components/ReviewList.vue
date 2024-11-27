<template>
    <div>
      <h3>Đánh giá</h3>
      <div v-for="review in reviews" :key="review._id" class="review">
        <p>Rating: {{ review.rating }}</p>
        <p>{{ review.comment }}</p>
        <p><i>{{ new Date(review.createdAt).toLocaleString() }}</i></p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      productId: {
        type: String,
        required: true
      }
    },
    data() {
      return {
        reviews: []
      };
    },
    async mounted() {
      this.fetchReviews();
    },
    methods: {
      async fetchReviews() {
        try {
          const response = await axios.get(`/api/reviews/${this.productId}`);
          this.reviews = response.data;
        } catch (error) {
          console.error('Error fetching reviews:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  h3 {
    margin-bottom: 10px;
  }
  .review {
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
  }
  </style>
  