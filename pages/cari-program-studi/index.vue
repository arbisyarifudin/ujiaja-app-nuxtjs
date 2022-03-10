<template>
  <div>
    <HeaderProdi :navData="navData" />
    <div class="program-studi min-vh-100">
      <div class="container crud">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-8 mt-n2">
            <div class="cari pb-5 pt-3 mt-n5">
              <h3 class="mb-3 mt-3 text-center">Cari Program Studi</h3>
              <form
                class=" form-cari-program"
                @submit.prevent="getPaginate('program/studi')"
              >
                <!-- <input
                  class="form-control mb-4"
                  type="search"
                  aria-label="Search"
                  placeholder="Tulis nama program studi..."
                /> -->
                <b-form-input
                  class="mb-4"
                  type="search"
                  v-model="filter.keyword"
                  placeholder="Tulis nama program studi..."
                ></b-form-input>
                <button
                  class="btn btn-primary btn-cari-program px-4 d-flex align-items-center"
                  type="submit"
                  :disabled="loading || !filter.keyword"
                >
                  <b-spinner v-if="loading" small class="mr-2"></b-spinner>
                  Cari
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="konten-program col-md-12 text-center">
          <div class="row mb-4 crud-tools">
            <div class="col-md-12 text-left">
              <!-- <h3 class="h6 text-dark">Filter by</h3> -->
              <div class="row justify-content-start align-items-center">
                <!-- <div class="col-md-3"> -->
                <!-- <b-input-group>
                    <template #prepend>
                      <b-input-group-text
                        ><i class="fas fa-filter"></i
                      ></b-input-group-text>
                    </template>
                    <b-form-select
                      v-model="filter.perPage"
                      :options="[
                        { text: 'Tampil 5', value: 5 },
                        { text: 'Tampil 10', value: 10 },
                        { text: 'Tampil 25', value: 25 },
                        { text: 'Tampil 50', value: 50 }
                      ]"
                    ></b-form-select>
                  </b-input-group> -->
                <!-- </div> -->
                <!-- <div class="col-md-4">
                  <h3 class="h6 text-dark mt-0 mb-3">Filter by</h3>
                  <b-input-group>
                    <template #prepend>
                      <b-input-group-text
                        ><i class="fas fa-filter"></i
                      ></b-input-group-text>
                    </template>
                    <b-form-select
                      v-model="filter.mapel"
                      :options="dataMaster['mapel']"
                    ></b-form-select>
                  </b-input-group>
                </div> -->
                <div class="col-md-7">
                  <h3 class="h6 text-dark mt-0 mb-3">Filter by</h3>
                  <!-- <b-input-group>
                    <template #prepend>
                      <b-input-group-text
                        ><i class="fas fa-filter"></i
                      ></b-input-group-text>
                    </template>
                    <b-form-select
                      v-model="filter.mapel"
                      :options="dataMaster['mapel']"
                    ></b-form-select>
                  </b-input-group> -->
                  <b-input-group class="d-flex">
                    <template #prepend>
                      <b-input-group-text
                        ><i class="fas fa-filter"></i
                      ></b-input-group-text>
                    </template>
                    <!-- <b-form-select
                      v-model="filter.mapel"
                      :options="dataMaster['mapel']"
                    ></b-form-select> -->
                    <v-select
                      :options="dataPerguruan"
                      placeholder="- Perguruan Tinggi -"
                      v-model="filter.id_perguruan_tinggi"
                      :reduce="item => item.id"
                      label="nama_perguruan"
                      id="cari-prodi"
                      class="bg-white custom-select"
                    >
                      <template
                        #no-options="{ search, /* searching, loading */ }"
                      >
                        <div class="small py-2" v-if="search">
                          <em class="text-muted">{{ search }}</em> tidak
                          ditemukan
                        </div>
                        <div class="small py-2" v-else>
                          Tidak ada data perguruan.
                        </div>
                      </template>
                    </v-select>
                  </b-input-group>
                    <div class="small text-info mt-2" v-if="loading">
                      Mengambil data...
                    </div>
                </div>
                <div class="col-md-4">
                  <h3 class="h6 text-dark mt-0 mb-lg-3 mb-0">&nbsp;</h3>
                  <b-input-group>
                    <template #prepend>
                      <b-input-group-text
                        ><i class="fas fa-filter"></i
                      ></b-input-group-text>
                    </template>
                    <!-- <b-form-select
                      v-model="filter.penjurusan"
                      :options="dataMaster['penjurusan']"
                    ></b-form-select> -->
                    <b-form-select
                      v-model="filter.akreditasi_program_studi"
                      :options="akreditasiOption"
                    ></b-form-select>
                  </b-input-group>
                  <div class="small text-info mt-2" v-if="loading">
                     &nbsp;
                    </div>
                </div>
                <div class="col-md-1">
                  <div class="mt-0 mb-lg-3 mb-0">&nbsp;</div>
                  <button class="btn btn-primary" @click.prevent="getPaginate('program/studi')">Filter</button>
                  <div class="small text-info mt-2" v-if="loading">
                     &nbsp;
                    </div>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-start pos-relative">
            <UILoading v-if="loading" />
            <div
              class="col-md-4 col-sm-6 mb-4"
              v-for="(item, index) in items"
              :key="index"
            >
              <div
                class="card card-karir card-prodi router-push"
                @click="$router.push(`/cari-program-studi/${item.slug}`)"
              >
                <div class="card-body text-left p-0">
                  <div class="card-content px-4">
                    <h3
                      class="card-judul card-program mt-4 mb-4"
                      style="height: 50px; overflow: hidden"
                    >
                      {{ item.nama_studi }}
                    </h3>
                    <!-- <p class="card-text pb-3">Komputer & Teknologi</p> -->
                    <div class="d-flex card-prodi__info mb-3">
                      <p class="mr-5 pb-2">
                        <strong>Penjuruan</strong><br />
                        {{
                          item.penjurusan
                            ? item.penjurusan.nama_penjurusan
                            : "?"
                        }}
                      </p>
                      <p class="pb-2">
                        <strong>Pelajaran Terkait</strong><br />
                        <!-- {{ item.mapel ? item.mapel.nama_mapel : "?" }} -->
                        <span
                          v-if="item.list_mapel && item.list_mapel.length > 0"
                        >
                          {{ item.list_mapel[0].mapel.nama_mapel }}
                          <span v-if="item.list_mapel.length > 1">
                            & {{ item.list_mapel.length - 1 }} lainnya
                          </span>
                        </span>
                        <span v-else>-</span>
                      </p>
                    </div>
                    <a
                      :href="`/cari-program-studi/${item.slug}`"
                      class="karir-link"
                      >Detail <i class="fa fa-chevron-right ml-1"></i
                    ></a>
                  </div>
                  <div
                    class=" d-flex justify-content-end pb-4 pr-4 m-0"
                    style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;"
                  >
                    <img
                      :src="ApiUrl(item.icon_studi)"
                      @error="noImage"
                      class="img-fluid card-prodi__icon"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div
              v-if="!loading && items && items.length == 0"
              class="d-flex align-items-center justify-content-center"
              style="min-height: 150px; width: 100%;"
            >
              <span class="small">Tidak ada data program studi.</span>
            </div>
          </div>
          <b-pagination
            class="pagination-table"
            v-if="totalRows > 0 && totalRows > filter.perPage"
            v-model="filter.page"
            :total-rows="totalRows"
            :per-page="filter.perPage"
          >
          </b-pagination>
        </div>
      </div>
    </div>
    <Footer :footerData="footerData" />
  </div>
</template>

<style>
#cari-prodi .vs__dropdown-toggle {
  border-color: transparent !important;
}
#cari-prodi .vs__search {
  font-size: 12px;
}
#cari-prodi .vs__selected-options {
  overflow-x: hidden;
  white-space: nowrap;
}
</style>

<script>
import vSelect from "vue-select";
import "vue-select/dist/vue-select.css";
export default {
  components: {
    vSelect
  },
  head() {
    return {
      title: "Cari Program Studi"
    };
  },
  asyncData(context) {
    function getSetting(key) {
      const settings = context.store.state.dataSetting;
      const foundSetting = settings.find(item => item.key == key);
      if (foundSetting) {
        return foundSetting.isi;
      }
      return "";
    }

    const navData = {
      logo: getSetting("logo")
    };

    const footerData = {
      logo: getSetting("logo"),
      alamat_kantor: getSetting("alamat_kantor"),
      telp: getSetting("telp"),
      whatsapp: getSetting("whatsapp"),
      instagram: getSetting("instagram"),
      facebook: getSetting("facebook"),
      youtube: getSetting("youtube"),
      email: getSetting("email")
    };

    return {
      navData,
      footerData
    };
  },
  data() {
    return {
      loading: true,
      filter: {
        keyword: "",
        perPage: 9,
        page: 1,
        mapel: null,
        penjurusan: null,
        id_perguruan_tinggi: null,
        akreditasi_program_studi: null
      },
      totalRows: 0,
      items: [],
      dataMaster: {
        mapel: [],
        penjurusan: []
      },
      dataPerguruan: [],
      akreditasiOption: [
        {
          text: "-- Akreditasi --",
          value: ""
        }
      ]
    };
  },
  watch: {
    "filter.perPage": function(value) {
      if (value) {
        this.$router.push({
          path: "cari-program-studi",
          query: { ...this.$route.query, perhalaman: value }
        });
      }
      this.getPaginate("program/studi");
    },
    // "filter.keyword": function(value) {
    //   if (value) {
    //     this.$router.push({
    //       path: "cari-program-studi",
    //       query: { ...this.$route.query, katakunci: value }
    //     });
    //   }
    //   // this.getPaginate("program/studi");
    // },
    "filter.page": function(value) {
      if (value) {
        this.$router.push({
          path: "cari-program-studi",
          query: { ...this.$route.query, halaman: value }
        });
      }
      this.getPaginate("program/studi");
    },
    "filter.mapel": function(value) {
      if (value) {
        this.filter.page = 1;
        this.filter.mapel = value;
        this.$router.push({
          path: "cari-program-studi",
          query: { ...this.$route.query, mapel: value }
        });
      }
      this.getPaginate("program/studi");
    },
    "filter.penjurusan": function(value) {
      if (value) {
        this.$router.push({
          path: "cari-program-studi",
          query: { ...this.$route.query, penjurusan: value }
        });
      }
      this.getPaginate("program/studi");
    },
    "filter.id_perguruan_tinggi": function(value) {
      if (value) {
        this.akreditasiOption = [
          {
            text: "-- Akreditasi --",
            value: ""
          },
          {
            text: "A",
            value: "A"
          },
          {
            text: "B",
            value: "B"
          },
          {
            text: "C",
            value: "C"
          }
        ];
      }
    }
  },
  created() {
    this.filter.page = this.$route.query.halaman ?? 1;
    this.getPaginate("program/studi");
    // this.getData("mapel");
    // this.getData("penjurusan");
    this.getData("perguruan");
  },
  methods: {
    getPaginate(type) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, {
          params: {
            q: this.filter.keyword,
            paginate: this.filter.perPage,
            page: this.filter.page,
            // mapel: this.filter.mapel,
            // penjurusan: this.filter.penjurusan
            id_perguruan_tinggi: this.filter.id_perguruan_tinggi,
            akreditasi_program_studi: this.filter.akreditasi_program_studi
          }
        })
        .then(res => {
          console.log(res);
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
    onSubmit() {},
    getData(type) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/list`, {
          params: {
            paginate: 999,
            page: 1
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            if (type == "mapel") {
              this.dataMaster[type] = res.data.data.map(item => {
                return {
                  value: item.id,
                  text: item.nama_mapel
                };
              });
              this.dataMaster[type].unshift({
                text: "Semua Mapel",
                value: null
              });
            } else if (type == "penjurusan") {
              res.data.data.forEach((item, index) => {
                if (item.nama_penjurusan != "-" && item.nama_penjurusan) {
                  if (
                    !this.dataMaster[type].find(
                      opt => opt.value == item.nama_penjurusan
                    )
                  ) {
                    this.dataMaster[type].push({
                      value: item.nama_penjurusan,
                      text: item.nama_penjurusan
                    });
                  }
                }
              });
              this.dataMaster[type].unshift({
                text: "Semua Penjurusan",
                value: null
              });
            } else if (type == "perguruan") {
              this.dataPerguruan = res.data.data;
              console.log(this.dataPerguruan);
            }
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
