<template>
  <div class="container-fluid crud">
    <!-- {{ $route.query }} -->
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">
          <BackUrl url="/app/tryout" :title="null" class="py-1 px-2 mr-3" />
          Cari Tryout
          {{ categoryTitle }}
        </h2>
        <p>
          Cari Tryout Yang Sesuai Dengan Kebutuhan Kamu!
        </p>
      </div>
      <div class="col-md-12 text-right mt-4 crud-tools">
        <div class="row no-gutters justify-content-between">
          <div class="col-md-6">
            <div class="row justify-content-start">
              <div class="col-md-5">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text
                      ><i class="fas fa-filter"></i
                    ></b-input-group-text>
                  </template>
                  <b-form-select
                    v-model="filter.perPage"
                    :options="[
                      { text: 'Tampil 9', value: 9 },
                      { text: 'Tampil 30', value: 30 },
                      { text: 'Tampil 60', value: 60 }
                    ]"
                    @change="getData('produk')"
                  ></b-form-select>
                </b-input-group>
              </div>
              <div class="col-md-6" v-if="$route.query.package == 'Bundling'">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text
                      ><i class="fas fa-filter"></i
                    ></b-input-group-text>
                  </template>
                      <!-- { text: 'Asesmen Nasional', value: 'Asmenas' } -->
                  <b-form-select
                    v-model="$route.query.category"
                    :options="[
                      { text: 'UTBK', value: 'UTBK' },
                      { text: 'ASPD', value: 'ASPD' },
                    ]"
                    @change="getData('produk')"
                  ></b-form-select>
                </b-input-group>
              </div>
            </div>
          </div>

          <div class="col-md-5 d-flex align-items-center crud-tools">
            <b-input-group>
              <template #prepend>
                <b-input-group-text
                  ><i class="fas fa-search"></i
                ></b-input-group-text>
              </template>
              <b-form-input
                v-model="filter.keyword"
                :placeholder="`Cari Tryout ${categoryTitle}`"
                debounce="1000"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
      </div>
      <div class="col-md-12 crud-body">
        <div class="row mt-5" v-if="totalRows > 0">
          <div
            class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-3"
            v-for="(item, i) in items"
            :key="i"
          >
            <div class="card card-karir m-2 router-push" @click="$router.push(`/app/tryout/${item.id}/detail`)">
              <!-- style="width: 350px; max-width: 100%" -->
              <div class="card-body text-left p-0">
                <!-- <div class="" style="display: flex; justify-content: flex-end;">
                  <p
                    class="label-event mb-2 px-4 py-1"
                    :class="[item.status_produk == 'Aktif' ? '' : 'draft']"
                  >
                    {{ item.status_produk == "Aktif" ? "Publish" : "Draft" }}
                  </p>
                </div> -->
                <div class="card-content px-4 mt-3">
                  <h3
                    class="card-judul card-program mb-4 mt-3"
                    style="height: 60px"
                  >
                    {{ item.nama_produk }}
                  </h3>
                  <!-- <h5>TPS</h5> -->
                  <div
                    class="d-flex justify-content-between mb-2"
                    v-if="item.tipe_paket == 'Reguler'"
                  >
                    <p class="mb-2">
                      <i class="far fa-clock fa-fw"></i> {{ item.waktu }} Menit
                    </p>
                    <p class="mb-2">
                      <i class="far fa-file-alt fa-fw"></i>
                      {{ item.jumlah_soal }} Soal
                    </p>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <p class="">
                      <i class="fas fa-tags fa-fw"></i>
                      {{ item.harga_label }}
                    </p>
                     <p
                      class=""
                      v-if="item.jenis_produk == 'Masal' && item.tipe_paket != 'Bundling'"
                    >
                      <i class="fas fa-calendar-alt fa-fw"></i>
                      {{ item.tanggal_mulai_label }}
                    </p>
                    <p v-else-if="item.jenis_produk == 'Masal' && item.tipe_paket == 'Bundling'">
                      {{ item.tanggal_mulai_label }}
                    </p>
                    <p
                      class="beda"
                      v-if="
                        item.kategori_produk == 'ASPD' ||
                          item.kategori_produk == 'Asmenas'
                      "
                    >
                      {{ item.penjurusan[0] }}
                    </p>
                  </div>
                  <div
                    v-if="item.tipe_paket == 'Bundling'"
                    class="package-getlist mb-3"
                    v-html="item.deskripsi_produk"
                  ></div>
                </div>
                <div
                  class="card-bawah pb-3 px-4 m-0 bordered"
                  style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;"
                >
                  <nuxt-link
                    :to="`/app/tryout/${item.id}/detail`"
                    class="karir-link"
                    >Detail <i class="fas fa-chevron-right ml-1"></i
                  ></nuxt-link>
                  <div class="icon-footer center">
                    <h4 class="title">TRYOUT</h4>
                    <h5 class="subtitle">
                      <span class="mr-0">{{ item.kategori_produk }}</span
                      ><span class="ml-0" v-if="item.jenis_tryout[0]">
                        - {{ item.jenis_tryout[0] }}</span
                      ><span
                        class="ml-0"
                        v-if="
                          item.kategori_produk == 'UTBK' &&
                            item.kelompok_soal[0]
                        "
                      >
                        {{ item.kelompok_soal[0] }}</span
                      >
                      <span
                        class="ml-0"
                        v-if="
                          item.kategori_produk == 'ASPD' ||
                            item.kategori_produk == 'Asmenas'
                        "
                      >
                        - {{ item.penjurusan[0] }}</span
                      >
                    </h5>
                    <!-- <div>2021</div> -->
                    <img src="/icon/icon-card-bg.png" class="img-fluid image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <b-pagination
          class="pagination-table"
          v-if="totalRows > 0 && totalRows > filter.perPage && !loading"
          v-model="filter.page"
          :total-rows="totalRows"
          :per-page="filter.perPage"
        >
        </b-pagination>
      </div>

      <UITableLoading tag="div" v-if="loading" />
      <UITableNotFound
        tag="div"
        v-if="totalRows == 0 && filter.keyword && !loading"
      />

      <div
        v-if="totalRows == 0 && !loading && !filter.keyword"
        class="crud-body kosong"
      >
        <h2 class="kosong-title">Oops!</h2>
        <p class="kosong-subtitle">Belum ada Tryout</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      loading: false,
      filter: {
        page: 1,
        perPage: 9,
        keyword: "",
        category: ""
      },
      totalRows: 0,
      items: [],
      selectedId: null,
      selectedIndex: null
    };
  },
  created() {
    this.getData("produk");
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData("produk");
    },
    "filter.page": function(value) {
      this.getData("produk");
    },
    "filter.category": function(value) {
      this.getData("produk");
    }
  },
  computed: {
    categoryTitle() {
      let title;
      if (
        this.$route.query.category == "UTBK" &&
        this.$route.query.event == "Perorangan"
      ) {
        title = " - UTBK Mandiri";
      } else if (
        this.$route.query.category == "UTBK" &&
        this.$route.query.event == "Masal"
      ) {
        title = " - UTBK Akbar";
      } else if (this.$route.query.category == "ASPD") {
        title = " - ASPD";
      } else if (this.$route.query.category == "Asmenas") {
        title = " - Asesmen Nasional";
      } else if (
        !this.$route.query.category &&
        this.$route.query.package == "Bundling"
      ) {
        title = " - Bundling";
      }
      return title;
    }
  },
  methods: {
    resetModal() {},
    // perubahan di sini, UTBK akbar bisa ada 2 tipe paket yaitu regular dan bundling. Filter sebelumnya hanya regular saja maka tidak muncul
    getData(type) {
      this.loading = true;
      if (
        this.$route.query.category == "UTBK" &&
        this.$route.query.event == "Masal"
      ) {
        this.$axios
        .$get(`/api/${type}`, {
          params: {
            q: this.filter.keyword,
            paginate: this.filter.perPage,
            page: this.filter.page,
            kategori_produk: this.$route.query.category,
            jenis_produk: this.$route.query.event,
            status_produk: "Aktif",
            
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.items = res.data.data;
            this.totalRows = res.data.paginate.total;
            this.filter.perPage = res.data.paginate.per_page;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
      } else{
        this.$axios
        .$get(`/api/${type}`, {
          params: {
            q: this.filter.keyword,
            paginate: this.filter.perPage,
            page: this.filter.page,
            kategori_produk: this.$route.query.category,
            jenis_produk: this.$route.query.event,
            status_produk: "Aktif",
            tipe_paket: this.$route.query.package
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.items = res.data.data;
            this.totalRows = res.data.paginate.total;
            this.filter.perPage = res.data.paginate.per_page;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
      }
      
    },
    deleteData(type) {
      this.loading = true;
      this.$axios
        .$delete(`/api/${type}/delete/${this.selectedId}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.items.splice(this.selectedIndex, 1);
            this.$bvToast.toast("Data " + type + " berhasil dihapus.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$bvModal.hide("modal-delete");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
