<template>
  <header class="nav-top test-2">
    <nav class="navbar navbar-expand-lg text-white">
      <div class="container">
        <nav class="navbar navbar-expand-lg">
          <div class="container" id="navbarNav1">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item"></li>
            </ul>

            <ul>
              <div class="logo">
                <router-link to="/"
                  ><img src="/img/Mơ1.png" class="" alt=""
                /></router-link>
              </div>
            </ul>
          </div>
        </nav>

        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navbarOffcanvasLg"
          aria-controls="navbarOffcanvasLg"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="navbarOffcanvasLg"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">MENU</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <ul class="navbar-nav justify-content-center flex-grow-1 pe-3">
              <li class="nav-item active">
                <router-link to="/" class="nav-link dropdown-item text-Back"
                  >TRANG CHỦ</router-link
                >
              </li>

              <li class="nav-item">
                <router-link
                  to="/product2"
                  class="nav-link dropdown-item text-Back"
                  >TRÒ CHƠI</router-link
                >
              </li>

              <li class="nav-item">
                <router-link
                  to="/about"
                  class="nav-link dropdown-item text-Back"
                  >GIỚI THIỆU</router-link
                >
              </li>

              <li class="nav-item">
                <router-link
                  to="/contact"
                  class="nav-link dropdown-item text-Back"
                  >LIÊN HỆ</router-link
                >
              </li>
            </ul>

            <div class="d-flex">
              <div class="d-flex search">
                <form class="d-flex" role="search">
                  <input
                    class="form-control"
                    type="text"
                    v-model="searchProduct"
                    placeholder="Tìm sản phẩm"
                    aria-label="Search"
                  />
                  <button
                    @click.prevent="searchProducts"
                    class="btn btn-outline-success text-white icon-search"
                    type="submit"
                  >
                    <i class="bi bi-search"></i>
                  </button>
                </form>
              </div>
            </div>

            <div class="d-lg-none">
              <div class="text-black">
                <router-link class="nav-link" to="/login"
                  >Đăng Nhập</router-link
                >
              </div>

              <div class="nav-item">
                <router-link class="nav-link" to="/register"
                  >Đăng Ký</router-link
                >
              </div>
            </div>
          </div>
        </div>
        <ul class="navbar-nav ml-auto d-flex text-center">
          <li>
            <LoginIcon></LoginIcon>
          </li>
          <li>
            <div class="d-flex search">
              <button
                v-if="storedValue"
                class="btn btn-outline position-relative"
                type="submit"
                @click="goToCart"
              >
                <i class="bi bi-cart3"></i>
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >
                  {{ totalQuantity }}
                </span>
              </button>
              <button
                v-else
                class="btn btn-outline position-relative"
                type="submit"
                @click="redirectToLogin"
              >
                <i class="bi bi-cart3"></i>
                <span
                  class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                >
                  0
                </span>
              </button>
            </div>
          </li>
        </ul>
      </div>
    </nav>
  </header>
</template>

<script>
import LoginIcon from "@/components/LoginIcon.vue";
import CategoryService from "@/services/category.service";
import { useCartStore } from "../stores/cart";
import { ref, watch, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import CartService from "@/services/cart.service";

export default {
  name: "HeaderHome",
  components: { LoginIcon },

  setup() {
    const totalQuantity = ref(0);
    const cartItems = ref([]);
    const category = "";
    const categories = ref([]);
    const router = useRouter();

    const searchProduct = ref(""); // Biến reactive để lưu trữ giá trị nhập liệu tìm kiếm

    const userId = localStorage.getItem("userId");
    const storedValue = ref(localStorage.getItem("isLoggedIn") === "true");

    const goToCart = () => {
      router.push("/cart");
    };

    const redirectToLogin = () => {
      router.push("/login");
    };

    const fetchgetNameCategorys = async () => {
      try {
        categories.value = await CategoryService.getNameCategorys();
      } catch (error) {
        console.error(error);
      }
    };

    const getCart = async () => {
      try {
        const userId = localStorage.getItem("userId");
        const response = await CartService.getCart(userId); // Thay đổi đường dẫn API tùy thuộc vào cấu trúc của ứng dụng của bạn
        cartItems.value = response;
      } catch (error) {
        console.error(error);
      }
    };

    // Tạo một watcher để theo dõi sự thay đổi của cartItems.value
    watch(cartItems, (newCartItems) => {
      totalQuantity.value = newCartItems.reduce((total, product) => {
        return total + parseInt(product.quantity);
      }, 0);
    });

    // Lưu totalQuantity vào local storage
    localStorage.setItem("totalQuantity", totalQuantity.value.toString());

    onMounted(() => {
      // Lấy trạng thái đăng nhập từ local storage khi component được mounted
      storedValue.value = localStorage.getItem("isLoggedIn") === "true";

      fetchgetNameCategorys();

      getCart();
    });

    const searchProducts = (event) => {
      event.preventDefault(); // Ngăn chặn gửi form mặc định

      if (searchProduct.value === "") {
        alert("Vui lòng nhập sản phẩm cần tìm kiếm");
      } else {
        const query = { search: searchProduct.value }; // Hàm thực hiện tìm kiếm

        console.log("query", query);
        router.push({ path: "/search", query });

        // Xóa nội dung trong thanh tìm kiếm
        searchProduct.value = "";
      }
    };

    return {
      totalQuantity,
      goToCart,
      redirectToLogin,

      searchProduct,
      searchProducts,

      userId,
      storedValue,
    };
  },
};
</script>
<style scoped>
.test-2 {
  /* color: white; */
  background: white;
}

.auth {
  color: white;
}
.nav-link {
  color: aquamarine;
}

.icon-phone {
  font-size: 35px;
}

.hotline {
  margin-right: 5px;
}
.icon-search {
  background-color: rgb(215, 79, 25);
}
.logo img {
  width: 170px;
  background-color: beige;
}
.btn:hover {
  color: aquamarine;
}
</style>
