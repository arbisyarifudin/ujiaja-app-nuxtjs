<template>
  <div class="container-fluid crud">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">Data Tryout</h2>
        <p>
          Berisi data tryout yang sudah dibuat. Data ini merupakan data yang
          dibutuhkan untuk transaksi data event/produk.
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
                      { text: 'Tampil 5', value: 5 },
                      { text: 'Tampil 10', value: 10 },
                      { text: 'Tampil 25', value: 25 },
                      { text: 'Tampil 50', value: 50 }
                    ]"
                    @change="getData('tryout')"
                  ></b-form-select>
                </b-input-group>
              </div>
              <div class="col-md-6">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text
                      ><i class="fas fa-filter"></i
                    ></b-input-group-text>
                  </template>
                  <b-form-select
                    v-model="filter.category"
                    :options="[
                      { text: 'Semua Kategori', value: '' },
                      { text: 'UTBK', value: 'UTBK' },
                      { text: 'ASPD', value: 'ASPD' },
                    ]"
                    @change="getData('tryout')"
                  ></b-form-select>
                      <!-- { text: 'Asesmen Nasional', value: 'Asmenas' } -->
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
                placeholder="Cari tryout"
                debounce="1000"
              ></b-form-input>
            </b-input-group>
            <nuxt-link
              class="btn btn-primary tambah crud-btn__add px-4 ml-2"
              to="/administrator/tryout/add"
            >
              Tambah
            </nuxt-link>
            <button
              class="btn btn-outline-primary tambah crud-btn__add px-4 ml-2"
              @click.prevent="$bvModal.show('modal-import');"
            >
              Import
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-12 crud-body">
        <div class="overflow-auto">
          <div class="data-tryout" v-if="totalRows > 0">
            <div class="card-data" v-for="(item, i) in items" :key="i">
              <div class="row d-flex align-items-start">
                <div class="col-md-1 col-6 align-self-center">
                  <div class="text-center">
                    <i class="far fa-file-alt fafile fa-3x mb-1"></i>
                    <p class="fafile">{{ item.template_soal }}</p>
                  </div>
                </div>
                <div class="col-md-2 col-6">
                  <div class="pl-3">
                    <h4 class="mb-2">
                      {{
                        item.kategori == "Asmenas"
                          ? "Asesmen Nasional"
                          : item.kategori
                      }}
                    </h4>
                    <div class="jenis" v-if="item.kategori == 'UTBK'">
                      <div class="badge">{{ item.jenis_soal }}</div>
                      <div class="badge" v-if="item.kelompok_soal">
                        {{ item.kelompok_soal }}
                      </div>
                    </div>
                    <div class="jenis" v-else>
                      <div
                        class="badge"
                        v-if="
                          item.penjurusan &&
                            item.penjurusan.kelas &&
                            item.penjurusan.kelas.jenjang
                        "
                      >
                        {{ item.penjurusan.kelas.jenjang.nama_jenjang }}
                      </div>
                      <div
                        class="badge"
                        v-if="
                          item.kategori == 'Asmenas' &&
                            item.penjurusan &&
                            item.penjurusan.kelas
                        "
                      >
                        {{ item.penjurusan.kelas.nama_kelas }}
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mt-3 mt-md-0">
                  <div class="pb-2">
                    <h4>{{ item.judul }}</h4>
                    <p>
                      {{ item.deskripsi }}
                    </p>
                    <!-- <p class="small mt-4" style="font-size: 12px">
                      <b-icon icon="calendar"></b-icon> Dibuat:
                      {{ item.created_at }}
                    </p> -->
                  </div>
                </div>
                <div class="col-md-3 align-self-center text-center">
                  <template>
                    <nuxt-link
                      v-if="
                        item.soal &&
                          item.soal.length > 0 &&
                          item.panduan_pengerjaan
                      "
                      class="btn btn-outline-success success px-3 py-1 px-4 mt-md-2"
                      :to="`/administrator/tryout/${item.id}/soal/create`"
                    >
                      Ubah Soal
                    </nuxt-link>
                    <nuxt-link
                      v-else
                      class="btn btn-outline-primary px-3 py-1"
                      :to="`/administrator/tryout/${item.id}/soal/create`"
                    >
                      Buat Soal
                    </nuxt-link>
                    <nuxt-link
                      class="btn btn-outline-primary primary px-3 py-1 px-4 mt-md-2"
                      :to="`/administrator/tryout/${item.id}/edit`"
                    >
                      Ubah Tryout
                    </nuxt-link>
                    <nuxt-link
                      class="btn btn-outline-secondary secondary px-3 py-1 px-4 mt-md-2"
                      :to="`/administrator/tryout/${item.id}/preview`"
                    >
                      Preview Tryout
                    </nuxt-link>
                    <button
                      class="btn btn-outline-danger danger px-3 py-1 mt-md-2"
                      @click.prevent="
                        selectedId = item.id;
                        selectedIndex = i;
                        $bvModal.show('modal-delete');
                      "
                    >
                      Hapus Tryout
                    </button>
                    <a
                      target="_blank"
                      class="btn btn-outline-warning warning px-3 py-1 px-4 mt-md-2"
                      :href="apiUrl + '/export?soal_tryout_id=' + item.id"
                    >
                      Export Soal
                    </a>
                  </template>
                </div>
              </div>
            </div>
          </div>
          <UITableLoading tag="div" v-if="loading" />
          <UITableNotFound
            tag="div"
            v-if="totalRows == 0 && filter.keyword && !loading"
          />
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

      <div
        v-if="totalRows == 0 && !loading && !filter.keyword"
        class="crud-body kosong"
      >
        <h2 class="kosong-title">Oops!</h2>
        <p class="kosong-subtitle">Belum ada tryout</p>
        <nuxt-link
          class="btn btn-primary tambah-kelas px-4 py-3"
          to="/administrator/tryout/add"
        >
          Tambah Tryout
        </nuxt-link>
      </div>
    </div>

    <b-modal
      id="modal-delete"
      title="Konfirmasi Hapus Tryout"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah anda yakin ingin menghapus data tryout ini?
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-delete')"
          >
            Tidak
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="deleteData('tryout')"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner> Ya
          </button>
        </div>
      </div>
    </b-modal>

    <b-modal
      id="modal-import"
      title="Import Soal Try Out"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Import data soal TryOut berdasarkan format yang sudah ditentukan.
        </p>
        <div class="form-group mb-2">
          <p class="text-weight-bold">
            Unggah File
          </p>
          <input
            type="file"
            class=""
            ref="file" />
        </div>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-import')"
          >
            Tidak
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            @click.prevent="importData()"
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
      filter: {
        page: 1,
        perPage: 5,
        keyword: "",
        category: ""
      },
      totalRows: 0,
      items: [],
      selectedId: null,
      selectedIndex: null,
      apiUrl: process.env.apiUrl
    };
  },
  mounted() {
    this.getData("tryout");
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData("tryout");
    },
    "filter.page": function(value) {
      this.getData("tryout");
    },
    "filter.category": function(value) {
      this.getData("tryout");
    }
  },
  methods: {
    resetModal() {},
    getData(type) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, {
          params: {
            q: this.filter.keyword,
            paginate: this.filter.perPage,
            page: this.filter.page,
            filter: this.filter.category,
            excludes: ['UKTT'],
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
          console.log(err.response)
          if(err.response && err.response.status && err.response.status == 500 && err.response.data && err.response.data.message && err.response.data.message.includes('SQLSTATE[23000]')) {
            return this.showToastMessage('Data tidak dapat dihapus karena sudah terdaftar pada produk yang telah dibeli oleh Siswa!', 'danger', 4000);
          }
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    importData() {
      this.loading = true;

      let file = this.$refs.file.files.item(0);

      let formData = new FormData();
      formData.append("file", file)

      this.$axios
        .$post('/api/import/soal_pertanyaan', formData, {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.items.splice(this.selectedIndex, 1);
            this.$bvToast.toast("Data berhasil dimport.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.getData("tryout");
            this.$bvModal.hide("modal-import");
          }
          return true;
        })
        .catch(err => {
          console.log(err.response)
          if(err.response && err.response.status && err.response.status == 500 && err.response.data && err.response.data.message && err.response.data.message.includes('SQLSTATE[23000]')) {
            return this.showToastMessage('Data tidak dapat di import!', 'danger', 4000);
          }
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    }
  }
};
</script>
