<template>
  <div id="app">
    
    <router-view></router-view>
    
  </div>
</template>

<script>
import PaypalButton from './components/PaypalButton.vue';

export default {
  components: {
    PaypalButton
  }
};
</script>

<style>
.page {
  max-width: 400px;
  margin: auto;
}
</style>
