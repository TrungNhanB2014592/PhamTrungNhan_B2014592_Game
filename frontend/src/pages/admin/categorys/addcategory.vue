<template>
    <div class="container">

        <div class="row add">
            <h3 class="text-center title">Thêm danh mục</h3>


            <div class=" col-lg-6 col-md-6 col-sm-6">
                <form enctype="multipart/form-data" @submit="addCategory">
                    <div class="mb-3">
                        <label class="form-label title">Danh mục: </label>
                        <div class="name-category-input">
                            <input @click="Removerror" type="text" class="form-control" v-model="categoryname"
                                placeholder="Nhập tên danh mục mới">
                        </div>

                    </div>

                    <button type="submit" class=" btn save">Lưu</button>
                    <router-link to="/admin/categorys"><button class="cancel btn ">Hủy</button></router-link>

                </form>



                <div v-if="showError" class="container error-message alert alert-danger" role="alert">
                    {{ Error }}
                </div>
            </div>
            <div class=" col-lg-6 col-md-6 col-sm-6">
                <div class="border table-category">
                    <h6>Danh mục sản phẩm hiện đang có</h6>
                    <ul v-for="category in categorys" :key="category.id">
                        <li>{{ category.categoryname }}</li>
                    </ul>
                </div>


            </div>

        </div>
    </div>
</template>

<script>
import CategoryService from '@/services/category.service';

export default {
    name: 'addCategory',

    data() {
        return {
            categoryname: '',
            showError: false,
            Error: 'Vui lòng nhập tên danh mục',
            categorys: [],
        }
    },

    mounted() {
        this.fetchgetNameCategorys()
    },

    methods: {

        async addCategory(event) {
            event.preventDefault(); // Ngăn chặn hành vi mặc định của form (tải lại trang)
            if (this.categoryname === '') {
                this.showError = true;
            } else {
                this.showError = false;

                const formData = new FormData();
                formData.append('categoryname', this.categoryname);
                console.log("data", formData);

                try {
                    const response = await CategoryService.createCategory(formData);
                    console.log("response", response);
                    if (response.status === 200) {
                        this.fetchgetNameCategorys();
                        this.categoryname = '';
                    }

                } catch (error) {
                    if (error.response.status === 400) {

                        this.Error = error.response.data.message;
                        this.showError = true;
                        this.categoryname = '';

                    } else {
                        console.error(error);
                    }

                }
            }
        },

        async fetchgetNameCategorys() {
            try {
                this.categorys = await CategoryService.getNameCategorys();
            } catch (error) {
                console.error(error);
            }
        },

        async Removerror() {
            this.showError = false;

        }
    },





}
</script>

<style scoped>
.error-message {
    color: red;
    margin-top: 10px;
    width: 50%;
}

.cancel {
    margin-left: 3px;
    color: red;
    font-weight: bold;
    background-color: rgb(250, 194, 174);
}

.add {
    margin: 30px 0;
}

.table-category {
    padding: 10px;
}

h6 {
    font-weight: bold;
    text-align: center;
}

.save {
    color: rgb(20, 20, 255);
    font-weight: bold;
    background-color: rgb(179, 205, 255);
}

.title {
    margin-bottom: 30px;
}

h3,
.title {
    font-weight: bold;
}
</style>