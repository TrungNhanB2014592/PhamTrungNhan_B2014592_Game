<template>
  <div v-if="isEmptyCart" class="container card-nocart text-center">
    <div class="card text-center">
      <img
        src="/img/nocart.png"
        class="card-img-top image-nocart mx-auto"
        alt="..."
      />
      <div class="card-body text-center">
        <p class="card-text">Chưa có sản phẩm nào trong giỏ hàng.</p>
        <router-link to="/product2">
          <button class="btn btn-danger">
            TIẾP TỤC MUA SẮM NHÉ!
          </button>
        </router-link>
      </div>
    </div>
  </div>

  <div v-else class="container">
    <div class="row cart">
      <h3>Giỏ hàng của bạn</h3>
      <table class="table text-center">
        <thead class="table-bordered">
          <tr>
            <th></th>
            <th>Sản Phẩm</th>
            <th>Tên Sản Phẩm</th>
            <th>Đơn Giá</th>
            <th>Số Lượng</th>
            <th>Số Tiền</th>
            <th>Thao Tác</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in cartItems" :key="item.id">
            <td></td>
            <td>
              <img
                :src="`http://localhost:4001/images/${item.images}`"
                :alt="item.productname"
                class="product-image"
              />
            </td>
            <td>{{ item.productname }}</td>
            <td>
              {{
                parseInt(item.price.replace(/\s/g, "")).toLocaleString("vi-VN")
              }}&#8363;
            </td>
            <td>
              <div class="d-flex text-center">
                <button class="button-quantity" @click="decreaseQuantity(item)">
                  -
                </button>
                <button class="button-quantity-number">
                  {{ item.quantity }}
                </button>
                <button class="button-quantity" @click="increaseQuantity(item)">
                  +
                </button>
              </div>
            </td>
            <td>{{ subtotalPrice[index] }}&#8363;</td>
            <td>
              <button class="btn btn-danger" @click="deleteCart(item)">
                <i class="bi bi-trash3-fill"></i>
              </button>
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>Tổng Thanh Toán: {{ totalPrice }}&#8363;</td>
          </tr>

          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <router-link :to="{ name: 'Checkout', params: { id: userId } }">
                <button class="btn btn-danger" @click="handleCheckout">
                  Thanh Toán
                </button>
              </router-link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { useCartStore } from "../stores/cart";
import CartService from "@/services/cart.service";

export default {
  name: "Cart",

  data() {
    return {
      cartItems: [],
      totalQuantity: 0,
    };
  },

  computed: {
    userId() {
      return localStorage.getItem("userId");
    },
    isEmptyCart() {
      return this.cartItems.length === 0;
    },

    totalPrice() {
      const totalPrice = this.cartItems.reduce((total, item) => {
        const itemPrice = parseFloat(item.price.replace(/\s/g, ""));
        const itemQuantity = parseInt(item.quantity);
        return total + itemPrice * itemQuantity;
      }, 0);

      return totalPrice.toLocaleString("vi-VN").replace(/,/g, " ");
    },

    subtotalPrice() {
      return this.cartItems.map((item) => {
        const itemPrice = parseFloat(item.price.replace(/\s/g, ""));
        const itemQuantity = parseInt(item.quantity);

        const totalPrice = itemPrice * itemQuantity;
        return totalPrice.toLocaleString("vi-VN").replace(/,/g, " ");
      });
    },
  },

  methods: {
    async increaseQuantity(item) {
      item.quantity++;
      const userId = localStorage.getItem("userId");
      const response = await CartService.updateCart(
        userId,
        item.productId,
        item.quantity
      );
      if (response.status === 200) {
        alert("Cập nhật thành công");
        this.getCart();
      }
    },

    async decreaseQuantity(item) {
      if (item.quantity > 1) {
        item.quantity--;
        const userId = localStorage.getItem("userId");
        const response = await CartService.updateCart(
          userId,
          item.productId,
          item.quantity
        );
        if (response.status === 200) {
          alert("Cập nhật thành công");
          this.getCart();
        }
      }
    },

    async getCart() {
      try {
        const userId = localStorage.getItem("userId");
        const response = await CartService.getCart(userId);
        this.cartItems = response;

        // Cập nhật lại totalQuantity khi giỏ hàng thay đổi
        this.updateTotalQuantity();
      } catch (error) {
        console.error(error);
      }
    },

    async deleteCart(item) {
      try {
        const userId = localStorage.getItem("userId");
        const productId = item.productId;
        const response = await CartService.deleteCart(userId, productId);
        if (response.status === 200) {
          alert("Xóa sản phẩm trong giỏ hàng thành công!");
          await this.getCart(); // Lấy lại giỏ hàng mới sau khi xóa
        }
      } catch (error) {
        console.error("Lỗi xóa sản phẩm", error);
      }
    },

    updateTotalQuantity() {
      this.totalQuantity = this.cartItems.reduce(
        (total, item) => total + parseInt(item.quantity),
        0
      );
      const cartStore = useCartStore();
      cartStore.setTotalQuantity(this.totalQuantity); // Cập nhật số lượng sản phẩm trong store
    },
  },

  mounted() {
    this.getCart();
  },

  watch: {
    cartItems: {
      handler(newCartItems) {
        this.updateTotalQuantity();
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
.product-image {
  width: 250px;
  height: 250px;
}

.product-cart {
  border: solid 1px grey;
}

.total-price,
.buying {
  text-align: end;
}

.checkbox {
  align-items: center;
  height: 20px;
  width: 20px;
}

.image-nocart {
  width: 250px;
  margin: 30px 0;
  align-items: center;
}

.card-nocart {
  padding: 20px;
}

h3 {
  font-weight: bold;
  text-align: center;
  margin-bottom: 30px;
}

.cart {
  margin: 30px 0;
}
</style>
