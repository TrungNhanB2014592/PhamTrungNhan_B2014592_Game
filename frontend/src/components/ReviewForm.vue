<template>
  <div>
    <h3>Đánh giá sản phẩm</h3>
    <form @submit.prevent="submitReview">
      <div>
        <label for="rating">Rating:</label>
        <select v-model="review.rating" id="rating" required>
          <option v-for="n in 5" :key="n" :value="n">{{ n }}</option>
        </select>
      </div>
      <div>
        <label for="comment">Comment:</label>
        <textarea v-model="review.comment" id="comment" required></textarea>
      </div>
      <button type="submit">Submit Review</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    productId: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      review: {
        rating: 1,
        comment: ''
      }
    };
  },
  methods: {
    async submitReview() {
      console.log("Submitting review:", {
        productId: this.productId,
        userId: this.userId,
        ...this.review
      });
      try {
        const response = await axios.post('http://localhost:4001/api/reviews', {
          productId: this.productId,
          userId: this.userId,
          rating: this.review.rating,
          comment: this.review.comment
        });
        console.log("Review submitted successfully:", response.data);
        this.$emit('review-submitted', response.data);
        this.review.rating = 1;
        this.review.comment = '';
      } catch (error) {
        console.error('Error submitting review:', error);
      }
    }
  }
};
</script>

<style scoped>
h3 {
  margin-bottom: 10px;
}
form div {
  margin-bottom: 10px;
}
button {
  margin-top: 10px;
}
</style>
