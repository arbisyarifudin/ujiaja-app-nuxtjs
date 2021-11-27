<template>
  <div class="container-fluid crud">
    <!-- {{ $route.query }} -->
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">
          Kelas Privat Saya
        </h2>
        <p>
          Ini adalah daftar kelas privat yang sudah kamu beli.
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
                      { text: 'Tampil 6', value: 6 },
                      { text: 'Tampil 24', value: 24 },
                      { text: 'Tampil 64', value: 64 },
                      { text: 'Tampil 100', value: 100 },
                    ]"
                    @change="getData"
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
                placeholder="Cari Kelas"
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
            <div class="card card-karir m-2">
              <!-- style="width: 350px; max-width: 100%" -->
              <div class="card-body text-left p-0">
                <div class="" style="display: flex; justify-content: flex-end;">
                  <p
                    class="label-event mb-2 px-4 py-1"
                    :class="[item.menerima_peserta == 1 ? '' : 'draft']"
                  >
                    {{ item.menerima_peserta == 1 ? "Aktif" : "Nonaktif" }}
                  </p>
                </div>
                <div class="card-content px-4 mt-4">
                   <p class="mb-2" style="font-size: 14px" v-html="rerataUlasan(item.rerata_ulasan)"></p>
                  <h3
                    class="card-judul card-program mb-4 mt-3"
                    style="height: 60px"
                  >
                    {{ item.nama_kursus }}
                  </h3>
                  <p class="mb-2">
                    <i class="fas fa-award fa-fw"></i> {{item.mapel ? item.mapel.nama_mapel : '-'}}
                  </p>
                  <div class="d-flex justify-content-between mb-2">
                    <p class="">
                      <i class="fas fa-tags fa-fw"></i> Rp 
                      {{ formatRupiah(item.harga_kursus) }}
                    </p>
                    <p class="beda">
                     {{item.jenjang ? item.jenjang.nama_jenjang : '-'}}
                    </p>
                  </div>
                </div>
                <div
                  class="card-bawah pb-3 px-4 m-0 bordered"
                  style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;"
                >
                  <nuxt-link
                  v-if="item.menerima_peserta"
                    :to="`/app/student/courses/${item.id}/detail?ref=${$route.path}`"
                    class="karir-link"
                    >Detail <i class="fas fa-chevron-right ml-1"></i
                  ></nuxt-link>
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
          <p>
           Kamu belum pernah membeli Kelas Kursus. <br>Yuk beli sekarang! 
          </p>
          <nuxt-link class="btn btn-primary dashboard px-4" to="/app/student/courses">
            Beli dan Bergabung di Kelas
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
      },
      totalRows: 0,
      items: [],
    };
  },
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    userDetail() {
      return this.$store.state.dataUser.detail;
    }
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData();
    },
    "filter.page": function(value) {
      this.getData();
    },
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      this.loading = true;
      this.$axios
        .$get('api/kursus/mine', {
          params: {
            q: this.filter.keyword,
            paginate: this.filter.perPage,
            verifikasi: 1
          }
        })
        .then(res => {
          if (res.success) {
            this.items = res.data.data;
            this.totalRows = res.data.total;
            this.filter.perPage = res.data.per_page;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    rerataUlasan(rataRata) {
      const rataRataFloor = Math.floor(rataRata);
      const sisaDesimal = Math.round(rataRata - rataRataFloor);

      let element = "";
      for (let i = 0; i < rataRataFloor; i++) {
        element += '<i class="fas fa-star fa-fw text-star"></i>';
      }
      for (let x = 0; x < sisaDesimal; x++) {
        element += '<i class="fas fa-star-half-alt fa-fw text-star"></i>';
      }
      for (let x = 0; x < (5 - rataRataFloor - sisaDesimal); x++) {
        element += '<i class="far fa-star fa-fw text-star"></i>';
      }

      return `${element} <span>${rataRata}/5</span>`;
    },
  }
};
</script>
