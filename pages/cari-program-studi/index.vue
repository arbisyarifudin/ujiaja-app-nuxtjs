<template>
  <div>
    <HeaderProdi />
    <div class="program-studi">
      <div class="container crud">
        <div class="row justify-content-center">
          <div class="col-lg-8 col-md-6 mt-n2">
            <div class="cari pb-5 pt-3 mt-n5">
              <h3 class="mb-3 mt-3 text-center">Cari Program Studi</h3>
              <form class=" form-cari-program" @submit.prevent="onSubmit">
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
                  debounce="1000"
                ></b-form-input>
                <button
                  class="btn btn-primary btn-cari-program px-4"
                  type="submit"
                >
                  Cari
                </button>
              </form>
            </div>
          </div>
        </div>

        <div class="konten-program col-md-12 text-center">
          <div class="row mb-4 crud-tools">
            <div class="col-md-8 text-left">
              <h3 class="h6 text-dark">Filter by</h3>
              <div class="row justify-content-start">
                <div class="col-md-3">
                  <b-input-group>
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
                  </b-input-group>
                </div>
                <div class="col-md-4">
                  <b-input-group>
                    <template #prepend>
                      <b-input-group-text
                        ><i class="fas fa-filter"></i
                      ></b-input-group-text>
                    </template>
                    <b-form-select
                      v-model="filter.id_mapel"
                      :options="[
                        { text: 'Semua Mapel', value: '' },
                        { text: 'Matematika', value: 1 },
                        { text: 'Bahasa Inggris', value: 2 }
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
                      v-model="filter.nama_penjurusan"
                      :options="[
                        { text: 'Semua Penjurusan', value: '' },
                        { text: 'IPA', value: 1 },
                        { text: 'IPS', value: 2 }
                      ]"
                    ></b-form-select>
                  </b-input-group>
                </div>
              </div>
            </div>
          </div>
          <div class="row justify-content-center">
            <div
              class="col-md-4 col-sm-6"
              v-for="(item, index) in items"
              :key="index"
            >
              <div class="card card-karir card-prodi">
                <div class="card-body text-left p-0">
                  <div class="card-content px-4">
                    <h3 class="card-judul card-program mt-4 mb-4">
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
                        <strong>Pelajaran</strong><br />
                        {{ item.mapel ? item.mapel.nama_mapel : "?" }}
                      </p>
                    </div>
                    <a
                      :href="`/cari-program-studi/${item.nama_studi}`"
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
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
export default {
  head() {
    return {};
  },
  data() {
    return {
      filter: {
        keyword: "",
        perPage: "",
        page: 1,
        id_mapel: "",
        nama_penjurusan: ""
      },
      totalRows: 0,
      items: []
    };
  },
  watch: {
    "filter.keyword": function(value) {
      if (value) {
        this.$router.push({
          path: "cari-program-studi",
          query: { katakunci: value }
        });
      } else {
        this.$router.push({
          path: "cari-program-studi"
        });
      }
    }
  },
  created() {
    this.getData("programStudi");
  },
  methods: {
    getData(type) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, {
          params: {
            q: this.filter.keyword,
            paginate: this.filter.perPage,
            page: this.filter.page
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
    onSubmit() {}
  }
};
</script>
