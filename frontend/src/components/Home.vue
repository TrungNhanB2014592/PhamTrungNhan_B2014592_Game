<template>
  <div>
    <div class="bg">
      <div id="slider">
        <div class="slider">
          <div class="slides">
            <input type="radio" name="radio-btn" id="radio1" />
            <input type="radio" name="radio-btn" id="radio2" />
            <input type="radio" name="radio-btn" id="radio3" />
            <input type="radio" name="radio-btn" id="radio4" />
            <div class="slide first">
              <img src="/img/21.jpg" alt="" />
            </div>
            <div class="slide">
              <img src="/img/img2.jpg" alt="" />
            </div>
            <div class="slide">
              <img src="/img/img19.jpg" alt="" />
            </div>
            <div class="slide">
              <img src="/img/22.jpg" alt="" />
            </div>
            <div class="navigation-auto">
              <div class="auto-btn1"></div>
              <div class="auto-btn2"></div>
              <div class="auto-btn3"></div>
              <div class="auto-btn4"></div>
            </div>
          </div>
          <div class="navigation-manual">
            <label for="radio1" class="manual-btn"></label>
            <label for="radio2" class="manual-btn"></label>
            <label for="radio3" class="manual-btn"></label>
            <label for="radio4" class="manual-btn"></label>
          </div>
        </div>
      </div>
      <div class="container">
        <h3 class="text-center title-category">SẢN PHẨM MỚI</h3>
        <div class="row">
          <div class="col-md-3" v-for="product in products" :key="product.id">
            <div class="card card-noibat mt-3" @click="viewProduct(product)">
              <div class="card-image card-img">
                <img
                  :src="`http://localhost:4001/images/${product.images}`"
                  :alt="productname"
                  class="product-image text-center"
                />
              </div>
              <div class="card-content"></div>
            </div>
          </div>
        </div>
      </div>

      <!-- <div class="container">
        <div class="row text-center content-2">
          <h3 class="text-center title-category">
            DANH MỤC GAME<span class="title"></span>
          </h3>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <img src="/img/img4.jpg" class="img-fuild image-home-2" />
          </div>
          <div class="col-lg-6 col-md-6 col-sm-6">
            <img src="/img/img5.jpg" class="img-fuild image-home-2" />
          </div>
        </div>
      </div> -->

      <div class="container">
        <h3 class="text-center title-category">
          TẤT CẢ SẢN PHẨM <span class="title"></span>
        </h3>
        <div class="row">
          <div class="list">
            <router-link :to="{ name: 'Product2' }" @click="scrollToTop">
              <p class="p">Xem tất cả sản phẩm</p>
            </router-link>
          </div>
        </div>
        <div class="row">
          <div class="col-md-3" v-for="item in items" :key="item.id">
            <div class="card card-noibat mt-3" @click="viewProduct(item)">
              <div class="card-image card-img">
                <img
                  :src="`http://localhost:4001/images/${item.images}`"
                  :alt="productname"
                  class="product-image text-center"
                />
              </div>
              <div class="card-content"></div>
            </div>
          </div>
        </div>
      </div>
      <section id="services" class="services section-padding">
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="section-header text-center pb-5">
                <h3>DỊCH VỤ CỦA CHÚNG TÔI</h3>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-12 col-md-6 col-lg-3">
              <div class="card text-center">
                <div class="card-body">
                  <i class="bi bi-headset icon-service"></i>
                  <h6 class="py-2">HỖ TRỢ TRỰC TUYẾN</h6>
                  <p class="card-text">Hỗ trợ khách hàng 24/24</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3">
              <div class="card text-center">
                <div class="card-body">
                  <i class="bi bi-currency-dollar icon-service"></i>
                  <h6 class="py-2">HOÀN TIỀN</h6>
                  <p class="card-text">100% trong vòng 3 ngày</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3">
              <div class="card text-center">
                <div class="card-body">
                  <i class="bi bi-truck icon-service"></i>
                  <h6 class="py-2">HỔ TRỢ CÀI ĐẶT</h6>
                  <p class="card-text">hổ trợ cài đặt</p>
                </div>
              </div>
            </div>
            <div class="col-12 col-md-6 col-lg-3">
              <div class="card text-center">
                <div class="card-body">
                  <i class="bi bi-gift icon-service"></i>
                  <h6 class="py-2">BLACK FRIDAY</h6>
                  <p class="card-text">Giảm 10% vào mỗi thứ sáu</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
  <hr class="hr-home">
</template>

<script>
import NoteService from "@/services/notes.service";
import ProductService from "@/services/product.service";

export default {
  name: "Home",

  data() {
    return {
      products: [],
      items: [],
    };
  },

  mounted() {
    this.findProductByNotes();

    this.getAllProduct();
  },

  methods: {
    async getAllProduct() {
      try {
        const result = await ProductService.getAllProducts();
        this.items = this.getRandomElements(result, 4);
      } catch (error) {
        console.error(error);
      }
    },

    async findProductByNotes() {
      try {
        const response = await NoteService.findProductByNotes(); // Thay đổi đường dẫn API tùy thuộc vào cấu trúc của ứng dụng của bạn

        this.products = this.getRandomElements(response, 4);
      } catch (error) {
        console.error(error);
      }
    },

    getRandomElements(array, n) {
      const shuffled = array.slice();
      let i = array.length;
      let temp, index;

      while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
      }

      return shuffled.slice(0, n);
    },

    viewProduct(product) {
      // Chuyển hướng đến trang chi tiết sản phẩm và truyền id của sản phẩm như một param
      this.$router.push({ name: "DetailProduct", params: { id: product._id } });
    },

    methods: {
      scrollToTop() {
        window.scrollTo({ top: 0, behavior: "smooth" });
      },
    },
  },
};
var counter = 1;
setInterval(function () {
  document.getElementById("radio" + counter).checked = true;
  counter++;
  if (counter > 4) {
    counter = 1;
  }
}, 5000);
</script>
<style scoped>
.card {
  width: 250px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  text-align: center;
}
/* .bg {
  background: linear-gradient(
    182deg,
    rgba(254, 185, 158, 0) 10%,
    rgba(242, 199, 182, 0.34) 60.15%,
    rgba(255, 250, 249, 0.59) 80.2%,
    #fefefe 100%
  );
} */
body {
  background: linear-gradient(
    182deg,
    rgba(254, 185, 158, 0) 10%,
    rgba(242, 199, 182, 0.34) 60.15%,
    rgba(255, 250, 249, 0.59) 80.2%,
    #fefefe 100%
  );
}
h6 {
  color: white;
}
h3 {
  color: black;
}

.services {
  margin: 20px 0;
}

.services .card-body i {
  font-size: 50px;
  color: #04aa6d;
}

.services .card-body h6 {
  font-weight: 700;
}

.services .card-body p {
  color: rgb(111, 111, 111);
}

.card:hover i {
  color: white;
}

.card:hover p {
  color: white;
  /* color: #04AA6D; */
}

.card-body:hover p,
.card-body:hover h6,
.card-body:hover i {
  color: #04aa6d;
}

.card:hover {
  /* background-color: #04AA6D; */
  color: white;
}

.zoom {
  padding: 50px;
  /* background-color: green; */
  transition: transform 0.2s;
  /* Animation */
  width: 200px;
  height: 200px;
  margin: 0 auto;
}

.zoom:hover {
  transform: scale(1.5);
  /* (150% zoom)*/
}

.image-category {
  position: relative;
  text-align: center;
  color: black;
  font-weight: 600;
}

.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.title-category,
.content-2 {
  margin-top: 20px;
}

/* card-noibat */

.card-noibat {
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
  position: relative;
  width: 270px;
}

.card-img {
  /* position: absolute; */
  /* Đặt vị trí tuyệt đối cho hình ảnh */
  top: -20px;
  /* Điều chỉnh vị trí top để hình ảnh nổi ra bên ngoài */
  left: -20px;
  /* Điều chỉnh vị trí left để hình ảnh nổi ra bên ngoài */
  z-index: 1;
  /* Đặt chỉ số z để đảm bảo hình ảnh nổi lên trên card */

  /* position: relative; */
  height: 250px;
  /* width: 150px; */
}

.card-img img {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}

.card-img:hover img {
  transform: scale(1.1);
}

.card-text {
  font-size: 16px;
  color: #555555;
}
h3 {
  font-weight: bold;
}

.list {
  text-align: end;
}
.carousel-item {
  display: flex;
  justify-content: center;
  width: 800px;
}
#slider {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  /* left: 43.5%; */
}
.slider {
  width: 800px;
  height: 500px;
  border-radius: 10px;
  margin-bottom: 30px;
  overflow: hidden;
}
.slides {
  width: 500%;
  height: 500px;
  display: flex;
}
.slides input {
  display: none;
}
.slide {
  width: 20%;
  transition: 2s;
}
.slide img {
  width: 800px;
  height: 500px;
}
/* navigation */
.navigation-manual {
  position: absolute;
  width: 800px;
  margin-top: -40px;
  display: flex;
  justify-content: center;
}

.manual-btn {
  border: 2px solid #40d3dc;
  padding: 5px;
  border-radius: 10px;
  cursor: pointer;
  transition: 1s;
}
.manual-btn:not(:last-child) {
  margin-right: 40px;
}
.manual-btn:hover {
  background: #40d3dc;
}
#radio1:checked ~ .first {
  margin-left: 0;
}
#radio2:checked ~ .first {
  margin-left: -20%;
}
#radio3:checked ~ .first {
  margin-left: -40%;
}
#radio4:checked ~ .first {
  margin-left: -60%;
}
/* aotumatic navigation */
.navigation-auto {
  position: absolute;
  display: flex;
  width: 800px;
  justify-content: center;
  margin-top: 460px;
}
.navigation-auto div {
  border: 2px solid #40d3dc;
  padding: 5px;
  border-radius: 10px;
  transition: 1s;
}
.navigation-auto div:not(:last-child) {
  margin-right: 40px;
}
#radio1:checked ~ .navigation-auto.auto-btn1 {
  background: #40d3dc;
}
#radio2:checked ~ .navigation-auto.auto-btn2 {
  background: #40d3dc;
}
#radio3:checked ~ .navigation-auto.auto-btn3 {
  background: #40d3dc;
}
#radio4:checked ~ .navigation-auto.auto-btn4 {
  background: #40d3dc;
}
h6 {
  color: black;
}
.p {
  text-decoration-line: none;
}
.list .p { 
  display: inline-block; 
  padding: 10px 20px;
   background-color: rgb(215, 79, 25); 
   color: white; border-radius: 
   5px; text-decoration: none; 
   transition: background-color 0.3s ease; 
} 
.list .p:hover { 
  background-color: #e64a19; 
  color: white;
}
</style>
