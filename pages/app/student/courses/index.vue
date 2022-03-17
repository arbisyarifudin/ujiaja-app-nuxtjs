<template>
  <div class="container-fluid crud">
    <!-- {{ $route.query }} -->
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">
          Kelas Privat
        </h2>
        <p>
          Semua kelas privat ada disini. Ayo mulai cari kelas private idamanmu!
        </p>
      </div>
      <div class="col-md-12 text-right mt-4 crud-tools">
        <div class="row no-gutters justify-content-between">
          <div class="col-md-6">
            <div
              class="row justify-content-start align-items-center no-gutters"
            >
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
                      { text: 'Tampil 100', value: 100 }
                    ]"
                    @change="getData"
                  ></b-form-select>
                </b-input-group>
              </div>
              <div class="col-md-2 text-left">
                <button
                  class="btn btn-primary tambah crud-btn__add px-4 ml-3"
                  v-b-modal.modal-filter
                  title="Search with more filter"
                >
                  <b-icon icon="filter"></b-icon>
                </button>
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
            <div
              class="card card-karir m-2 router-push"
              @click="
                $router.push(
                  `/app/student/courses/${item.id}/detail?ref=${$route.path}`
                )
              "
            >
              <!-- style="width: 350px; max-width: 100%" -->
              <div class="card-top">
                <img :src="ApiUrl(item.tentor ? item.tentor.foto : '')" @error="noAvatar" alt="" class="card-img-top" />
                <div class="card-top__float-top">
                  <p
                    v-if="item.transaksi &&
                      item.transaksi.status == 'Sudah Diverifikasi' &&
                      item.transaksi.status_dikelas !== 'Sesi Selesai'"
                    class="card-top__label label-event mb-2 px-4 py-1"
                    :class="[
                      item.transaksi &&
                      item.transaksi.status == 'Sudah Diverifikasi' &&
                      item.transaksi.status_dikelas !== 'Sesi Selesai'
                        ? ''
                        : 'draft'
                    ]"
                  >
                    {{
                      item.transaksi &&
                      item.transaksi.status == "Sudah Diverifikasi" &&
                      item.transaksi.status_dikelas !== "Sesi Selesai"
                        ? "Dibeli"
                        : "&nbsp;"
                    }}
                  </p>
                </div>
                <div class="card-top__float-bottom">
                  <div class="title">{{item.tentor ? item.tentor.nama_lengkap : ''}}</div>
                  <div class="subtitle"><b-icon icon="cursor-fill"></b-icon> {{item.nama_kota ? item.nama_kota : 'N/A'}}</div>
                </div>
              </div>
              <div class="card-body text-left p-0">
                <div class="" style="display: flex; justify-content: flex-end;">
                  <!-- <p
                    v-if="item.transaksi"
                    class="label-event mb-2 px-4 py-1"
                    :class="[
                      item.transaksi &&
                      item.transaksi.status == 'Sudah Diverifikasi' &&
                      item.transaksi.status_dikelas !== 'Sesi Selesai'
                        ? ''
                        : 'draft'
                    ]"
                  >
                    {{
                      item.transaksi &&
                      item.transaksi.status == "Sudah Diverifikasi" &&
                      item.transaksi.status_dikelas !== "Sesi Selesai"
                        ? "Dibeli"
                        : "&nbsp;"
                    }}
                  </p> -->
                  <!-- <p v-else>&nbsp;</p> -->
                </div>
                <div class="card-content px-4 mt-4">
                  <p
                    class="mb-2"
                    style="font-size: 14px"
                    v-html="rerataUlasan(item.rerata_ulasan)"
                  ></p>
                  <h3
                    class="card-judul card-program mb-4 mt-3"
                    style="height: 60px"
                  >
                    {{ item.nama_kursus }}
                    <span class="model-belajar badge badge-primary">{{
                      item.model_belajar
                    }}</span>
                  </h3>
                  <!-- <p class="mb-2">
                    <i class="fas fa-user-check fa-fw"></i>
                    {{ item.tentor ? item.tentor.nama_lengkap : "-" }}
                  </p> -->
                  <p class="mb-2">
                    <i class="fas fa-award fa-fw"></i>
                    {{ item.mapel ? item.mapel.nama_mapel : "-" }}
                  </p>
                  <div class="d-flex justify-content-between mb-2">
                    <p class="">
                      <i class="fas fa-tags fa-fw"></i> Rp
                      {{ formatRupiah(item.harga_kursus) }}
                    </p>
                    <p class="beda">
                      {{ item.jenjang ? item.jenjang.nama_jenjang : "-" }}
                    </p>
                  </div>
                </div>
                <div
                  class="card-bawah pb-3 px-4 m-0 bordered"
                  style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;"
                >
                  <nuxt-link
                    :to="
                      `/app/student/courses/${item.id}/detail?ref=${$route.path}`
                    "
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
            Kelas Privat masih kosong.
          </p>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-filter"
      size="lg"
      title="Filter Kelas Kursus"
      hide-footer
      centered
    >
      <div class="row align-items-center mb-4">
        <div class="col-md-6">
          <div class="form-group">
            <label for="id_mapel">Mata Pelajaran</label>
            <b-form-select
              :options="dataOption['mapel']"
              v-model="filter.id_mapel"
              value-field="id"
              text-field="nama_mapel"
            ></b-form-select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="id_jenjang">Jenjang Sekolah</label>
            <b-form-select
              :options="dataOption['jenjang']"
              v-model="filter.id_jenjang"
              value-field="id"
              text-field="nama_jenjang"
            ></b-form-select>
          </div>
        </div>
        <div class="col-md-6">
          <div class="form-group">
            <label for="model_belajar">Model Belajar</label>
            <b-form-select
              :options="modelOptions"
              v-model="filter.model_belajar"
            ></b-form-select>
          </div>
        </div>
        <div class="col-md-6" v-if="filter.model_belajar !== 'Online'">
          <div class="form-group reg-siswa">
            <label for="id_provinsi">Provinsi</label>
            <v-select
              id="provinsi"
              v-model="filter.id_provinsi"
              :options="dataOption['provinsi']"
              label="nama"
              @input="
                () => {
                  getAPI('kota_kabupaten');
                  dataOption['kecamatan'] = [];
                }
              "
              :reduce="item => item.id"
              :getOptionKey="item => item.id"
            />
            <div style="font-size: 14px" class="text-info" v-if="loading">
              Memuat...
            </div>
          </div>
        </div>
        <div class="col-md-6" v-if="filter.model_belajar !== 'Online'">
          <div class="form-group">
            <label for="id_kota">Kota/Kabupaten</label>
            <v-select
              id="kota"
              v-model="filter.id_kota"
              :options="dataOption['kota_kabupaten']"
              label="nama"
              @input="
                () => {
                  getAPI('kecamatan');
                }
              "
              :reduce="item => item.id"
              :getOptionKey="item => item.id"
            />
            <div style="font-size: 14px" class="text-info" v-if="loading">
              Memuat...
            </div>
          </div>
        </div>
        <div class="col-md-6" v-if="filter.model_belajar !== 'Online'">
          <div class="form-group">
            <label for="id_kecamatan">Kecamatan</label>
            <v-select
              id="kecamatan"
              v-model="filter.id_kecamatan"
              :options="dataOption['kecamatan']"
              label="nama"
              :reduce="item => item.id"
              :getOptionKey="item => item.id"
            />
            <div style="font-size: 14px" class="text-info" v-if="loading">
              Memuat...
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <b-button variant="outline-primary" class="square" @click="resetFilter"
          >Reset</b-button
        >
        <b-button variant="primary" class="square" @click="getData"
          >Terapkan</b-button
        >
      </div>
    </b-modal>
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
        id_mapel: null,
        id_jenjang: null,
        model_belajar: "",
        id_provinsi: null,
        id_kota: null,
        id_kecamatan: null
      },
      totalRows: 0,
      items: [],
      dataOption: {
        mapel: [],
        jenjang: [],
        provinsi: [],
        kota_kabupaten: [],
        kecamatan: []
      },
      modelOptions: [
        {
          value: "",
          text: "-- Semua Model --"
        },
        {
          value: "Online",
          text: "Online"
        },
        {
          value: "Offline",
          text: "Offline"
        },
        {
          value: "Hybrid",
          text: "Hybrid"
        }
      ]
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
    }
  },
  created() {
    this.getData();
    this.getMaster("mapel", { params: { paginate: 999 } });
    this.getMaster("jenjang", { params: { paginate: 999 } });
    this.getAPI("provinsi");
  },
  methods: {
    getAPI(type) {
      this.loading = true;

      let params = "";

      if (type == "kota_kabupaten" || type == "kota") {
        params = "/" + this.filter.id_provinsi;
      } else if (type == "kecamatan") {
        params = "/" + this.filter.id_kota;
      }
      // console.log(type, params);

      // this.$axios.defaults.headers = {};
      // this.$axios.defaults.withCredentials = false;

      this.$axios
        .$get(`/api/${type}${params}`)
        .then(res => {
          console.log(res);
          if (type == "kota") {
            type = "kota_kabupaten";
          }
          this.dataOption[type] = res.data[type];
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getMaster(type, params) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, params)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataOption[type] = [];
            if (type == "mapelxx") {
              this.dataOption[type] = res.data.data.map(item => {
                let textField = item.nama_mapel;
                return {
                  ...item,
                  textField
                };
              });
            } else {
              this.dataOption[type] = res.data.data;
            }
            console.log(this.dataOption[type]);
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getData() {
      this.$bvModal.hide("modal-filter");
      this.loading = true;
      this.$axios
        .$get("api/kursus", {
          params: {
            q: this.filter.keyword,
            paginate: this.filter.perPage,
            status: 1,
            verifikasi: 1,
            id_mapel: this.filter.id_mapel,
            id_jenjang: this.filter.id_jenjang,
            model_belajar: this.filter.model_belajar,
            id_provinsi: this.filter.id_provinsi,
            id_kota: this.filter.id_kota,
            id_kecamatan: this.filter.id_kecamatan
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
      for (let x = 0; x < 5 - rataRataFloor - sisaDesimal; x++) {
        element += '<i class="far fa-star fa-fw text-star"></i>';
      }

      return `${element} <span>${rataRata}/5</span>`;
    },
    resetFilter() {
      this.filter.id_mapel = null;
      this.filter.id_jenjang = null;
      this.filter.model_belajar = null;
      this.filter.id_provinsi = null;
      this.filter.id_kota = null;
      this.filter.id_kecamatan = null;
    }
  }
};
</script>
