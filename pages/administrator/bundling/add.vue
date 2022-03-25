<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">
            Tambah Bundling Produk
          </h2>
        </div>
        <div class="col-md-12 crud-body">
          <div class="form-user">
            <div class="form-group reg-siswa">
              <label for="name">Nama Bundle <code>*</code></label>
              <b-form-input
                id="name"
                name="name"
                v-model="form.name"
                type="text"
                placeholder="Tulis nama bundle"
              >
              </b-form-input>
            </div>
          </div>
          <div class="form-user">
            <div class="form-group reg-user">
              <label for="desc">Deskripsi Bundle <code>*</code></label>
              <client-only>
                <VueEditor
                  id="desc"
                  v-model="form.desc"
                  :editor-toolbar="customToolbar"
                />
              </client-only>
            </div>
          </div>
          <div class="form-user">
            <div class="form-group reg-siswa">
              <label for="price">Harga Bundle <code>*</code></label>
              <b-form-input
                id="price"
                name="price"
                v-model="form.price"
                type="number"
                placeholder="Tulis deskripsi bundle"
              >
              </b-form-input>
            </div>
          </div>
          <div class="form-user">
            <div class="form-group reg-siswa">
              <label for="products"
                >Pilih Produk yang ingin di Bundle <code>*</code></label
              >
              <v-select
                id="products"
                :options="dataProducts"
                multiple
                label="nama_produk"
                placeholder="Pilih produk"
                v-model="productSelected"
                :reduce="item => item.id"
                :selectable="
                  item => form.products && !form.products.includes(item.id)
                "
              >
                <template
                  #option="{ nama_produk, kategori_produk, jenis_produk }"
                >
                  <h5 class="mb-0">{{ nama_produk }}</h5>
                  <div class="small text-italic">
                    <span>Kategori: {{ kategori_produk }}</span>
                  </div>
                  <div class="small text-italic">
                    <span>Pengerjaan: {{ jenis_produk }}</span>
                  </div>
                </template>
                <template
                  #selected-option="{ nama_produk, kategori_produk, jenis_produk }"
                >
                  <h5 class="mb-0 mr-1">{{ nama_produk }}</h5>
                  <div class="small text-italic mr-1">
                    <span>- Kategori: {{ kategori_produk }}</span>
                  </div>
                  <div class="small text-italic mr-1">
                    <span>- Pengerjaan: {{ jenis_produk }}</span>
                  </div>
                </template>
                <template #no-options="{ search, /* searching, loading */ }">
                  <div class="small py-2" v-if="search">
                    <em class="text-muted">{{ search }}</em> tidak ditemukan
                  </div>
                  <div class="small py-2" v-else>
                    Tidak ada data produk.
                  </div>
                </template>
              </v-select>
              <div class="small text-info mt-2" v-if="fetching">
                Mengambil data produk...
              </div>
            </div>
          </div>
        </div>
        <div
          class="crud-footer d-flex justify-content-end mt-4"
          style="z-index: 5"
        >
          <nuxt-link
            :to="`/administrator/bundling/${$route.params.id}/detail`"
            class="btn btn-outline-secondary mr-2"
          >
            Kembali
          </nuxt-link>
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <b-spinner small class="mr-1" v-if="loading"></b-spinner>
            Simpan
          </button>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";

export default {
  layout: "admin",
  components: { vSelect },
  data() {
    return {
      loading: false,
      fetching: false,
      dataProducts: [],
      dataDetail: {},
      productSelected: [],
      form: {
        name: null,
        desc: "",
        price: 50000,
        products: []
      },
      listProducts: [],
      selectedId: null,
      selectedIndex: null,
      customToolbar: [["bold", "italic", "underline"], [{ list: "bullet" }]]
    };
  },
  async mounted() {
    this.$store.commit("modifyBreadcrumb", [
      {
        text: "Bundling Product",
        href: "/administrator/bundling"
      },
      {
        text: "Add",
        active: true
      }
    ]);
    await this.getData("produk");
  },
  watch: {},
  methods: {
    validateForm() {
      console.log(this.form);
      if (
        !this.form.name ||
        !this.form.desc ||
        !this.form.price ||
        !this.productSelected ||
        (this.productSelected && this.productSelected.length < 1)
        // ||
        // !this.form.perhitungan
      ) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }

      this.form.products = this.productSelected.map(item => {
        return {
          id: item,
          custom_price: null
        };
      });
      this.submitData("bundling");
    },
    submitData(type) {
      this.loading = true;
      this.$axios
        .$post(`/api/${type}/create`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data " + type + " berhasil ditambah.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$router.replace("/administrator/bundling");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getData(type) {
      this.fetching = true;
      this.$axios
        .$get(`/api/produk`, {
          params: { excludes_kategori: ["UKTT"], paginate: 999 }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataProducts = res.data.data;
            // this.dataProducts = this.dataProducts.map(item => {
            //   return {
            //     value: item.id,
            //     label: `${item.nama_produk}`
            //   };
            // });
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.fetching = false));
    }
  }
};
</script>

<style>
.vs__state-disabled-bg {
  background-color: red !important;
}
.vs__dropdown-toggle .vs__selected {
  background: white;
  padding: 5px 20px;
}
</style>
