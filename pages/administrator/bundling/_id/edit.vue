<template>
  <div class="container-fluid crud">
    <form @submit.prevent="validateForm">
      <div class="row d-flex no-gutters">
        <div class="col-md-12 dashboard">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Ubah Bundling
            Produk
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
              <label for="desc">Deskripsi Produk <code>*</code></label>
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
                placeholder="Masukkan harga bundle"
              >
              </b-form-input>
            </div>
          </div>
          <div class="form-user">
            <div class="form-group reg-siswa">
              <label for="show">Status Tampil <code>*</code></label>
              <b-form-radio-group
                id="show"
                name="show"
                v-model="form.show"
                :options="showOptions"
              >
              </b-form-radio-group>
            </div>
          </div>
          <div class="form-user">
            <div class="form-group reg-siswa">
              <label for="products"
                >Tambah Produk untuk Bundle ini <code>[opsional]</code></label
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
        <div class="col-md-12 my-4">
            <div class="card card-header bg-white pt-4 pb-3">
              <h3 class="h4 mb-0">Daftar Produk dari Bundling Ini</h3>
            </div>
            <UILoading v-if="loading" />
            <div
              v-else
              class="bg-white p-5 pos-relative"
              v-for="(bp, index) in listProducts"
              :key="'p-' + index"
              style="z-index: 5"
            >
              <div
                class="header-detail d-flex justify-content-between align-items-center"
              >
                <div class="">
                  <h5 class="mb-3">{{ bp.product.nama_produk }}</h5>
                </div>
                <div>
                  <button
                    type="button"
                    @click.prevent="
                      selectedId = bp.id;
                      selectedIndex = index;
                      $bvModal.show('modal-delete');
                    "
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </div>
              </div>
              <ul class="pl-4">
                <li class="mb-3">Kategori : {{ bp.product.kategori_produk }}</li>
                <li class="mb-3">Pengerjaan : {{ bp.product.jenis_produk }}</li>
                <li class="mb-3" v-if="bp.product.jenis_produk == 'Masal'">
                  {{ formatTanggal(bp.product.tanggal_mulai) }} s/d
                  {{ formatTanggal(bp.product.tanggal_berakhir) }}
                </li>
              </ul>
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
          <button type="submit" class="btn btn-primary" :disabled="submitting || loading">
            <b-spinner small class="mr-1" v-if="submitting"></b-spinner>
            Simpan
          </button>
        </div>
      </div>
    </form>
    <b-modal
      id="modal-delete"
      title="Konfirmasi Hapus"
      hide-footer
      centered
      modal-class="admin-modal"
    >
      <div>
        <p class="modal-text">
          Apakah anda yakin ingin menghapus produk dari bundling ini? ID:
          {{ selectedId }}
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btnutline-secondary"
            type="button"
            @click="$bvModal.hide('modal-delete')"
          >
            Tidak
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="submitting"
            @click.prevent="deleteData('bundling-product')"
          >
            <b-spinner small v-if="submitting" class="mr-1"></b-spinner> Ya
          </button>
        </div>
      </div>
    </b-modal>
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
      submitting: false,
      dataProducts: [],
      dataDetail: {},
      productSelected: [],
      form: {
        name: null,
        desc: "",
        price: "",
        show: 1,
        products: []
      },
      listProducts: [],
      selectedId: null,
      selectedIndex: null,
      customToolbar: [["bold", "italic", "underline"], [{ list: "bullet" }]],
      showOptions: [
        { text: "Tampil", value: 1 },
        { text: "Sembunyi", value: 0 }
      ]
    };
  },
  async mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/bundling");
    this.$store.commit("modifyBreadcrumb", [
      {
        text: "Bundling Product",
        href: "/administrator/bundling"
      },
      {
        text: "Edit",
        active: true
      }
    ]);
    await this.getData("produk");
    this.getDetail("bundling", this.$route.params.id);
  },
  watch: {},
  methods: {
    validateForm() {
      console.log(this.form);
      if (
        !this.form.name ||
        !this.form.desc ||
        this.form.price < 0
      ) {
        this.$bvToast.toast("Mohon lengkapi form dengan benar!", {
          title: "Peringatan",
          variant: "warning",
          solid: true,
          autoHideDelay: 2000
        });
        return;
      }

      if (this.productSelected.length > 0) {
        this.form.products = this.productSelected.map(item => {
          return {
            id: item,
            custom_price: null
          };
        });
      }

      this.submitData("bundling");
    },
    submitData(type) {
      this.submitting = true;
      this.$axios
        .$put(`/api/${type}/update/${this.$route.params.id}`, this.form)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast(
              "Data " + type + " berhasil diperbarui.",
              {
                title: "Sukses",
                variant: "success",
                solid: true,
                autoHideDelay: 3000
              }
            );
            this.$router.replace(
              `/administrator/bundling/${this.$route.params.id}/detail`
            );
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.submitting = false));
    },
    getData(type) {
      this.fetching = true;
      this.$axios
        .$get(`/api/${type}/option-data`, {
           params: { excludes_kategori: ['UKTT'], paginate: 999 }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataProducts = res.data.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.fetching = false));
    },
    async getDetail(type, id) {
      this.loading = true;
      await this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
            this.listProducts = res.data.bundling_products;
            this.form = {
              ...this.dataDetail,
              products: this.listProducts.map(item => item.product_id)
            };
            // this.productSelected = this.listProducts.map(item => item.id)
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    deleteData(type) {
      this.submitting = true;
      this.$axios
        .$delete(`/api/${type}/delete/${this.selectedId}`)
        .then(async res => {
          console.log(res);
          if (res.success) {
            this.listProducts.splice(this.selectedIndex, 1);
            const typeLabel = type == "bundling-product" ? "produk bundling" : type;
            this.$root.$bvToast.toast(
              "Data " + typeLabel + " berhasil dihapus.",
              {
                title: "Sukses",
                variant: "success",
                solid: true,
                autoHideDelay: 3000
              }
            );
            this.$bvModal.hide("modal-delete");
            // this.dataProducts = [];
            // await this.getData("tryout");
            // this.$router.replace("/administrator/product");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => {
          // window.location.reload();
          this.getDetail('bundling', this.$route.params.id)
          this.submitting = false;
        });
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
