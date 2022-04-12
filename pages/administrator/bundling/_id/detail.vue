<template>
  <div class="container-fluid">
    <div class="row" style="position: relative; z-index: 10;">
      <div class="col-md-12">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Detail Bundling Produk
          </h2>
          <BackUrl url="/administrator/bundling" />
        </div>
      </div>
      <div class="col-md-12">
        <div
          class="header-detail bg-white my-4 px-5 py-4"
          style="display: flex; justify-content: space-between; align-items: center;"
        >
          <div v-if="!loading">
            <h3 class="mb-0">{{ dataDetail.name }}</h3>
            <h4 class="h5" v-if="dataDetail.price > 0"><small>Rp</small> {{formatRupiah(dataDetail.price)}}</h4>
            <h4 class="h5" v-else><span class="badge badge-primary">GRATIS</span></h4>
          </div>
          <div v-if="!loading">
            <router-link
              :to="`/administrator/bundling/${dataDetail.id}/edit`"
              role="button"
              z
              class="btn btn-success square py-1 mr-2"
            >
              Ubah
            </router-link>
            <button
              type="button"
              class="btn btn-danger square py-1"
              v-b-modal.modal-delete
            >
              Hapus
            </button>
          </div>
        </div>
      </div>

      <div class="col-md-12 my-4">
        <div class="bg-white p-5">
          <h3 class="h5 mb-0">Status : <span class="badge" :class="dataDetail.show ? 'badge-success' : 'badge-secondary'">{{dataDetail.show ? 'Published' : 'Hidden'}}</span></h3>
          <hr>
          <h3 class="h5 mb-0">Deskripsi</h3>
          <p class="mb-2" v-html="dataDetail.desc"></p>
        </div>
      </div>

      <div class="col-md-12 my-4">
        <div class="card card-header bg-white pt-4 pb-3">
          <h3 class="h4 mb-0">Daftar Produk dari Bundling Ini</h3>
        </div>
        <UILoading v-if="loading" />
        <div
          v-else
          class="bg-white p-5"
          v-for="(bp, p) in dataDetail.bundling_products"
          :key="'p-'+p"
        >
          <div
            class="header-detail d-flex justify-content-between align-items-center"
          >
            <div class="">
              <h5 class="mb-3">{{ bp.product.nama_produk }}</h5>
            </div>
            <div>
              <router-link
                class="btn btn-primary py-1 square"
                :to="`/administrator/product/${bp.product.id}/detail`"
                >Detail Produk</router-link
              >
            </div>
          </div>
          <ul class="pl-4">
            <li class="mb-3">Kategori : {{bp.product.kategori_produk}}</li>
            <li class="mb-3">Pengerjaan : {{bp.product.jenis_produk}}</li>
            <li class="mb-3" v-if="bp.product.jenis_produk == 'Masal'">{{formatTanggal(bp.product.tanggal_mulai)}} s/d {{formatTanggal(bp.product.tanggal_berakhir)}}</li>
          </ul>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-delete"
      title="Konfirmasi Hapus Produk Bundling"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah anda yakin ingin menghapus produk bundling ini?
          <span class="text-danger"
            >Data yang dihapus tidak dapat dikembalikan.</span
          >
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
            :disabled="loading"
            @click.prevent="deleteData('bundling')"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner> Ya
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      loading: true,
      dataDetail: {
        produk: {},
        tryout: []
      }
    };
  },
  mounted() {
    if (!this.$route.params.id)
      return this.$router.push("/administrator/bundling");
    this.$store.commit("modifyBreadcrumb", [
      {
        text: "Bundling Product",
        href: "/administrator/bundling",
       }, 
      {                            
        text: "Detail",    
        active: true
      }
    ]);
    this.getDetail("bundling", this.$route.params.id);
  },
  methods: {
    resetModal() {},
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
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
      this.loading = true;
      this.$axios
        .$delete(`/api/${type}/delete/${this.$route.params.id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            // this.items.splice(this.selectedIndex, 1);
            this.$root.$bvToast.toast("Data " + type + " berhasil dihapus.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$bvModal.hide("modal-delete");
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
    formatRupiah(num) {
      if (num) {
        return num.toLocaleString("ID-id");
      }
      return 0;
    }
  }
};
</script>

<style></style>
