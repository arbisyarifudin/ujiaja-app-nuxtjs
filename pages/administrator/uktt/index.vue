<template>
  <div class="container-fluid crud">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">Data Soal UKTT</h2>
        <p>
          Berisi data soal UKTT yang sudah dibuat. Data ini merupakan data yang
          dibutuhkan untuk transaksi data produk/paket UKTT.
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
                placeholder="Cari UKTT"
                debounce="1000"
              ></b-form-input>
            </b-input-group>
            <nuxt-link
              class="btn btn-primary tambah crud-btn__add px-4 ml-2"
              to="/administrator/uktt/add"
            >
              Tambah
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="col-md-12 crud-body">
        <div class="overflow-auto">
          <div class="data-tryout" v-if="totalRows > 0">
            <div class="card-data" v-for="(item, i) in items" :key="i">
              <div class="row d-flex align-items-start">
                <div class="col-md-2 col-6">
                  <div class="pl-3">
                    <h4 class="mb-2">{{item.kategori}}</h4>
                    <div class="jenis">
                      <div class="badge">{{item.jenjang ? item.jenjang.nama_jenjang : '-'}}</div>
                    </div>
                  </div>
                </div>
                <div class="col-md-6 mt-3 mt-md-0">
                  <div class="pb-2">
                    <h4>{{ item.judul }}</h4>
                    <p>
                      {{ item.deskripsi }}
                    </p>
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
                      :to="`/administrator/uktt/${item.id}/soal/create`"
                    >
                      Ubah Soal
                    </nuxt-link>
                    <nuxt-link
                      v-else
                      class="btn btn-outline-primary px-3 py-1"
                      :to="`/administrator/uktt/${item.id}/soal/create`"
                    >
                      Buat Soal
                    </nuxt-link>
                    <nuxt-link
                      class="btn btn-outline-primary primary px-3 py-1 px-4 mt-md-2"
                      :to="`/administrator/uktt/${item.id}/edit`"
                    >
                      Ubah UKTT
                    </nuxt-link>
                    <button
                      class="btn btn-outline-danger danger px-3 py-1 mt-md-2"
                      @click.prevent="
                        selectedId = item.id;
                        selectedIndex = i;
                        $bvModal.show('modal-delete');
                      "
                    >
                      Hapus UKTT
                    </button>
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
        <p class="kosong-subtitle">Belum ada UKTT</p>
        <nuxt-link
          class="btn btn-primary tambah-kelas px-4 py-3"
          to="/administrator/uktt/add"
        >
          Tambah UKTT
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
          Apakah anda yakin ingin menghapus data UKTT ini?
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
        category: "UKTT"
      },
      totalRows: 0,
      items: [],
      selectedId: null,
      selectedIndex: null
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
            filter: this.filter.category
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
            this.$bvToast.toast("Data UKTT berhasil dihapus.", {
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
