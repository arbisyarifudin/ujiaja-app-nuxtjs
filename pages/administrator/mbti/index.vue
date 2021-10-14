<template>
  <div class="container-fluid crud">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">Data Soal MBTI</h2>
        <p>
          Data ini berisi soal & jawaban MBTI. Data ini merupakan data master
          yang dibutuhkan untuk transaksi data modul MBTI.
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
                    @change="getData('mbti')"
                  ></b-form-select>
                </b-input-group>
              </div>
              <!-- <div class="col-md-6">
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
                      { text: 'Asesmen Nasional', value: 'Asmenas' }
                    ]"
                    @change="getData('mbti')"
                  ></b-form-select>
                </b-input-group>
              </div> -->
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
                placeholder="Cari MBTI"
                debounce="1000"
              ></b-form-input>
            </b-input-group>
            <nuxt-link
              class="btn btn-primary tambah crud-btn__add px-4 ml-2"
              to="/administrator/mbti/add"
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
              <div class="row no-gutters d-flex align-items-start">
                <div class="col-md-2 col-3 align-self-center">
                  <div class="text-center">
                    ICON
                  </div>
                </div>
                <div class="col-md-7 col-9 mt-3 mt-md-0 mb-3 mb-md-0">
                  <div class="pb-2">
                    <h4>{{ item.judul }}</h4>
                    <p>
                      {{ item.deskripsi }}
                    </p>
                  </div>
                </div>
                <div
                  class="col-md-3 d-flex flex-column align-items-center align-self-right"
                >
                  <template>
                    <nuxt-link
                      class="btn btn-outline-info px-3 py-1"
                      :to="`/administrator/mbti/${item.id}/edit`"
                    >
                      <!-- {{item.panduan === '-' ? 'Buat Soal' : 'Ubah Soal'}} -->
                      Buat Soal
                    </nuxt-link>
                    <button
                      class="btn btn-outline-danger danger px-3 py-1 mt-md-2"
                      @click.prevent="
                        selectedId = item.id;
                        selectedIndex = i;
                        $bvModal.show('modal-delete');
                      "
                    >
                      Hapus MBTI
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
        <p class="kosong-subtitle">Belum ada MBTI</p>
        <nuxt-link
          class="btn btn-primary tambah-kelas px-4 py-3"
          to="/administrator/mbti/add"
        >
          Tambah MBTI
        </nuxt-link>
      </div>
    </div>

    <b-modal
      id="modal-delete"
      title="Konfirmasi Hapus MBTI"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah anda yakin ingin menghapus data MBTI ini?
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
            @click.prevent="deleteData('mbti')"
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
      selectedIndex: null
    };
  },
  mounted() {
    this.getData("mbti");
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData("mbti");
    },
    "filter.page": function(value) {
      this.getData("mbti");
    },
    "filter.category": function(value) {
      this.getData("mbti");
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
