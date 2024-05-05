<template>
  <div class="container-fluid crud">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">Produk/Event</h2>
        <p>
          Data ini berisi produk/event. Data ini dibutuhkan untuk transaksi data
          modul tryout.
        </p>
      </div>
      <div class="col-md-12 text-right mt-4 crud-tools">
        <div class="row no-gutters justify-content-between">
          <div class="col-md-4">
            <div class="row justify-content-start">
              <div class="col-md-4">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text><i class="fas fa-filter"></i></b-input-group-text>
                  </template>
                  <b-form-select v-model="filter.perPage" :options="[
                      { text: 'Tampil 9', value: 9 },
                      { text: 'Tampil 30', value: 30 },
                      { text: 'Tampil 60', value: 60 }
                    ]" @change="getData('produk')"></b-form-select>
                </b-input-group>
              </div>
              <div class="col-md-4">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text><i class="fas fa-filter"></i></b-input-group-text>
                  </template>
                  <b-form-select v-model="filter.category" :options="[
                      { text: 'Semua Kategori', value: '' },
                      { text: 'UTBK Mandiri', value: 'UTBK Mandiri' },
                      { text: 'UTBK Akbar', value: 'UTBK Akbar' },
                      { text: 'Seleksi Mandiri', value: 'SM' },
                      { text: 'ASPD', value: 'ASPD' },
                      { text: 'Paket / Bundling', value: 'Paket' }
                    ]" @change="getData('produk')"></b-form-select>
                </b-input-group>
              </div>
              <div class="col-md-4">
            <b-input-group>
              <template #prepend>
                <b-input-group-text><i class="fas fa-filter"></i></b-input-group-text>
              </template>
              <b-form-select v-model="filter.is_archived" :options="[
                  { text: 'Semua Status', value: null },
                  { text: 'Produk Aktif', value: false },
                  { text: 'Produk Tidak Aktif', value: true },
                ]"></b-form-select>
            </b-input-group>
          </div>
            </div>
          </div>

          <div class="col-md-2">
            <b-input-group>
              <template #prepend>
                <b-input-group-text><i class="fas fa-filter"></i></b-input-group-text>
              </template>
              <b-form-select v-model="filterArchive" :options="[
                  { text: 'Semua Status', value: null },
                  { text: 'Diarsipkan', value: true },
                  { text: 'Tidak Diarsipkan', value: false },
                ]"></b-form-select>
            </b-input-group>
          </div>


          <div class="col-md-4 d-flex align-items-center crud-tools">
            <b-input-group>
              <template #prepend>
                <b-input-group-text><i class="fas fa-search"></i></b-input-group-text>
              </template>
              <b-form-input v-model="filter.keyword" placeholder="Cari produk" debounce="1000"></b-form-input>
            </b-input-group>
            <nuxt-link class="btn btn-primary tambah crud-btn__add px-4 ml-2" to="/administrator/product/add">
              Tambah
            </nuxt-link>
          </div>
        </div>



      </div>
      <div class="col-md-12 crud-body">
        <div class="row mt-5" v-if="totalRows > 0">
          <div class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-3" v-for="(item, i) in filteredItems" :key="i">

            <div class="card card-karir m-2 router-push"
              @click="$router.push(`/administrator/product/${item.id}/detail`)">
              <!-- style="width: 350px; max-width: 100%" -->
              <div class="card-body text-left p-0">
                <span style="top: 14px; left: 14px; z-index: 99; position: absolute;cursor: pointer;"
                  @click.stop.prevent="archiveProdukTryOut(`${item.id}`)">
                  <img :src="`${item.is_archived_admin}` == '1' ? '/icon/archive-tick.svg' : '/icon/unarchive-tick.svg'"
                    class="img-fluid image" />
                </span>
                <div class="" style="display: flex; justify-content: flex-end;">
                  <p class="label-event mb-2 px-4 py-1" :class="[item.status_produk == 'Aktif' ? '' : 'draft']">
                    {{ item.status_produk == "Aktif" ? "Aktif" : "NonAktif" }}
                  </p>
                </div>
                <div class="card-content px-4">
                  <h3 class="card-judul card-program mb-4 mt-3" style="height: 60px">
                    {{ item.nama_produk }}
                  </h3>
                  <!-- <h5>TPS</h5> -->
                  <div class="d-flex justify-content-between mb-2" v-if="item.tipe_paket == 'Reguler'">
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
                    <p v-if="item.jenis_produk == 'Masal'">
                      {{ item.tanggal_mulai_label }}
                    </p>
                    <p class="beda" v-if="
                        item.kategori_produk == 'ASPD' ||
                          item.kategori_produk == 'Asmenas'
                      ">
                      {{ item.penjurusan[0] }}
                    </p>
                    <p class="beda" v-if="
                        (item.kategori_produk == 'UTBK' || item.kategori_produk == 'SM') &&
                          item.tipe_paket == 'Bundling'
                      ">
                      Bundling
                    </p>
                  </div>
                  <div v-if="item.tipe_paket == 'Bundling'" class="package-getlist mb-3" v-html="item.deskripsi_produk">
                  </div>
                </div>
                <div class="card-bawah pb-3 px-4 m-0 bordered"
                  style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;">
                  <nuxt-link :to="`/administrator/product/${item.id}/detail`" class="karir-link">Detail <i
                      class="fas fa-chevron-right ml-1"></i></nuxt-link>
                  <div class="icon-footer center">
                    <h4 class="title">TRYOUT</h4>
                    <h5 class="subtitle">
                      <span class="mr-0">{{ item.kategori_produk }}</span><span class="ml-0" v-if="
                          item.jenis_tryout[0] && item.tipe_paket !== 'Bundling'
                        ">
                        - {{ item.jenis_tryout[0] }}</span><span class="ml-0" v-if="
                          (item.kategori_produk == 'UTBK' || item.kategori_produk == 'SM') &&
                            item.kelompok_soal[0]
                        ">
                        {{ item.kelompok_soal[0] }}</span>
                      <span class="ml-0" v-if="
                          item.kategori_produk == 'ASPD' ||
                            item.kategori_produk == 'Asmenas'
                        ">
                        - {{ item.penjurusan[0] }}</span>
                    </h5>
                    <!-- <div>2021</div> -->
                    <img src="/icon/icon-card-bg.png" class="img-fluid image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <b-pagination class="pagination-table" v-if="totalRows > 0 && totalRows > filter.perPage && !loading"
          v-model="filter.page" :total-rows="totalRows" :per-page="filter.perPage">
        </b-pagination>
      </div>

      <UITableLoading tag="div" v-if="loading" />
      <UITableNotFound tag="div" v-if="totalRows == 0 && filter.keyword && !loading" />

      <div v-if="totalRows == 0 && !loading && !filter.keyword" class="crud-body kosong">
        <h2 class="kosong-title">Oops!</h2>
        <p class="kosong-subtitle">Belum ada produk {{filter.is_archived ? 'yang diarsipkan' : ''}}.</p>
        <nuxt-link v-if="!filter.is_archived" class="btn btn-primary tambah-kelas px-4 py-3"
          to="/administrator/product/add">
          Tambah Produk
        </nuxt-link>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: "admin",
    data() {
      return {
        loading: false,
        filter: {
          page: 1,
          perPage: 9,
          keyword: "",
          category: "",
          is_archived: false,
        },
        totalRows: 0,
        items: [],
        selectedId: null,
        selectedIndex: null,
        filterArchive: null
      };
    },
    created() {
      this.getData("produk");
    },
    watch: {
      "filter.keyword": function (value) {
        this.getData("produk");
      },
      "filter.page": function (value) {
        this.getData("produk");
      },
      "filter.category": function (value) {
        this.getData("produk");
      },
      "filter.is_archived": function (value) {
        this.getData("produk");
      }
    },
    computed: {
      filteredItems() {
        // Jika filterArchive null, tampilkan semua item
        if (this.filterArchive === null) {
          return this.items;
        }
        // Jika filterArchive true, tampilkan item dengan is_archive = 1
        if (this.filterArchive) {
          return this.items.filter(item => item.is_archived_admin === 1);
        }
        // Jika filterArchive false, tampilkan item dengan is_archive = 0
        return this.items.filter(item => item.is_archived_admin === 0);
      },
    },
    methods: {
      archiveProdukTryOut(id) {
        this.loading = true
        this.$axios
          .$put(`api/produk/archived/${id}`)
          .then(res => {
            this.loading = false
            this.getData('produk')
            return true;
          })
          .catch(err => {

            this.catchError(err);
          })
          .finally(() => (this.loading = false));

      },
      resetModal() {},
      getData(type) {
        let filterKategori, filterPaket, filterEvent;

        switch (this.filter.category) {
          case "UTBK Mandiri":
            filterKategori = "UTBK";
            filterPaket = "Reguler";
            filterEvent = "Perorangan";
            break;
          case "UTBK Akbar":
            filterKategori = "UTBK";
            filterPaket = "Reguler";
            filterEvent = "Masal";
            break;
          case "SM":
          case "Seleksi Mandiri":
            filterKategori = "SM";
            filterPaket = "Reguler";
            filterEvent = "Perorangan";
            break;
          case "ASPD":
            filterKategori = "ASPD";
            filterPaket = "Reguler";
            filterEvent = "Perorangan";
            break;
          case "Paket":
            filterKategori = "";
            filterPaket = "Bundling";
            filterEvent = "";
            break;
          default:
            filterKategori = "";
            filterPaket = "";
            filterEvent = "";
            break;
        }

        this.loading = true;
        this.$axios
          .$get(`/api/${type}`, {
            params: {
              q: this.filter.keyword,
              paginate: this.filter.perPage,
              page: this.filter.page,
              kategori_produk: filterKategori,
              jenis_produk: filterEvent,
              tipe_paket: filterPaket,
              status_produk: this.filter.is_archived == true ? 'Tidak' : this.filter.is_archived == false ? 'Aktif' :
                '',
              excludes_kategori: ["UKTT"]
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
