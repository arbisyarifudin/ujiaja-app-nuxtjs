<template>
  <div class="container-fluid crud">
    <!-- {{ $route.query }} -->
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">
          Daftar Tryoutku
        </h2>
        <p>
          Ini adalah daftar tryout yang kamu miliki, yang sudah dikerjakan
          maupun belum ya.
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
                    v-model="filterCategory"
                    :options="[
                      { text: 'Semua', value: null },
                      { text: 'UTBK Mandiri', value: 'UTBK Mandiri' },
                      { text: 'UTBK Akbar', value: 'UTBK Akbar' },
                      { text: 'ASPD', value: 'ASPD' },
                      { text: 'Paket Tryout', value: 'Paket Tryout' }
                    ]"
                  ></b-form-select>
                </b-input-group>
              </div>
              <div class="col-md-5">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text
                      ><i class="fas fa-filter"></i
                    ></b-input-group-text>
                  </template>
                  <b-form-select
                    v-model="filterArchive"
                    
                    :options="[
                      { text: 'Semua', value: null },
                      { text: 'Diarsipkan', value: true },
                      { text: 'Tidak Diarsipkan', value: false }
                    ]"
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
                placeholder="Cari Tryout"
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
            v-for="(item, i) in filteredItems"
            :key="i"
          >
            <div class="card card-karir m-2 router-push" @click="$router.push(`/user/tryout/${item.id}/detail?ref=${$route.path}`)">
              <!-- style="width: 350px; max-width: 100%" -->
              <div class="card-body text-left p-0">
                <div class="" style="display: flex; justify-content: space-between;">
                  <span style="padding: 8px; z-index: 99;" @click.stop.prevent="archiveTryOut(`${item.id}`)">
                    <img :src="`${item.is_archive}` == '1' ? '/icon/archive-tick.svg' : '/icon/unarchive-tick.svg'" class="img-fluid image" />
                  </span>
                  <p
                    class="label-event mb-2 px-4 py-1"
                    :class="[item.is_task_start ? '' : 'draft']"
                  >
                    {{ item.is_task_start ? "Dikerjakan" : "Belum Dikerjakan" }}
                  </p>
                </div>
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
                      {{ item.harga_produk > 0 ? item.harga_label : "GRATIS" }}
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
                  <a
                    :href="`/user/tryout/${item.id}/detail?ref=${$route.path}`"
                    class="karir-link"
                    >Detail <i class="fas fa-chevron-right ml-1"></i
                  ></a>
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
        class="kelas lihat-tryout mt-4 d-flex w-100"
        v-if="totalRows == 0 && !loading && !filter.keyword"
      >
        <div class="col-md-8">
          <h4 class="m-0 mb-3">Oops!</h4>
          <p class="shadow-none" style="background-color: rgba(255, 255, 255, 0.5)">
            Data pada filter ini tidak tersedia atau kamu belum memiliki Tryout. <br />
            Yuk beli tryout sekarang..
          </p>
          <nuxt-link class="btn btn-primary dashboard px-4" to="/user/tryout">
            Beli Tryout
          </nuxt-link>
        </div>
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
        perPage: 6,
        keyword: "",
        // category: "UTBK",
        // package: "Reguler",
        // event: "Perorangan"
        category: "",
        package: "",
        event: ""
      },
      totalRows: 0,
      items: [],
      filterCategory: null,
      filterArchive: null,
    };
  },
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    userDetail() {
      return this.$store.state.dataUser.detail;
    },
    filteredItems() {
      // Jika filterArchive null, tampilkan semua item
      if (this.filterArchive === null) {
        return this.items;
      }
      // Jika filterArchive true, tampilkan item dengan is_archive = 1
      if (this.filterArchive) {
        return this.items.filter(item => item.is_archive === 1);
      }
      // Jika filterArchive false, tampilkan item dengan is_archive = 0
      return this.items.filter(item => item.is_archive === 0);
    },
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData("produk");
    },
    "filter.page": function(value) {
      this.getData("produk");
    },
    filterCategory: function(value) {
      this.getData("produk");
    },
    filterArchive: function(value) {
      this.getData("produk");

    }
  },
  created() {
    this.getData("produk");
  },
  methods: {
    archiveTryOut(id) {
      this.loading = true
      this.$axios
        .$put(`api/tryout_user/archived/${id}`)
        .then(res => {
          this.loading = false
          console.log(res);
          this.getData('produk')
          // if (res.success) {
          //   this.items = res.data.data;
          //   this.totalRows = res.data.paginate.total;
          //   this.filter.perPage = res.data.paginate.per_page;
          // }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));

    },
    getData(type) {
      switch (this.filterCategory) {
        case "UTBK Mandiri":
          this.filter.category = "UTBK";
          this.filter.event = "Perorangan";
          this.filter.package = "Reguler";
          break;
        case "UTBK Akbar":
          this.filter.category = "UTBK";
          this.filter.event = "Masal";
          this.filter.package = "Reguler";
          break;
        case "ASPD":
          this.filter.category = "ASPD";
          this.filter.event = "Perorangan";
          this.filter.package = "Reguler";
          break;
        case "Paket Tryout":
          this.filter.category = "";
          this.filter.event = "";
          this.filter.package = "Bundling";
          break;
        default:
          // this.filter.category = "UTBK";
          // this.filter.event = "Perorangan";
          // this.filter.package = "Reguler";
          this.filter.category = "";
          this.filter.event = "";
          this.filter.package = "";
          break;
      }
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, {
          params: {
            q: this.filter.keyword,
            paginate: this.filter.perPage,
            page: this.filter.page,
            kategori_produk: this.filter.category,
            jenis_produk: this.filter.event,
            status_produk: "Aktif",
            tipe_paket: this.filter.package,
            id_user: this.user.id,
            excludes_kategori: ['UKTT'],
            ...(this.filterArchive && { is_archive: this.filterArchive })
          }
        })
        .then(res => {
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
  
};
</script>
