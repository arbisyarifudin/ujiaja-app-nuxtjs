<template>
  <div class="container-fluid crud">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">Dimensi Sifat Dasar</h2>
        <p>
          Data ini berisi data dimensi kecenderungan sifat dasar manusia. Data
          ini merupakan data master yang dibutuhkan untuk transaksi data modul
          MBTI.
        </p>
      </div>
      <div class="col-md-12 text-right mt-4 crud-tools">
        <div class="row no-gutters justify-content-between">
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

          <div class="col-md-5 d-flex align-items-center crud-tools">
            <b-input-group>
              <template #prepend>
                <b-input-group-text
                  ><i class="fas fa-search"></i
                ></b-input-group-text>
              </template>
              <b-form-input
                v-model="filter.keyword"
                placeholder="Cari dimensi"
                debounce="1000"
              ></b-form-input>
            </b-input-group>
            <!-- <nuxt-link
              class="btn btn-primary tambah crud-btn__add px-4 ml-2"
              to="/administrator/mbti/dimensi/add"
            >
              Tambah
            </nuxt-link> -->
          </div>
        </div>
      </div>
      <div class="col-md-12 crud-body">
        <div class="overflow-auto">
          <table class="table-data-kelas table table-borderless">
            <thead class="thead-table">
              <tr>
                <th class="no" width="100px">No</th>
                <th>Dimensi Sifat Dasar</th>
                <th>Psikologi 1</th>
                <th>Psikologi 2</th>
                <th>Deskripsi</th>
                <th width="100" class="aksi">Aksi</th>
              </tr>
            </thead>
            <tbody class="body-table">
              <template v-if="totalRows > 0">
                <tr v-for="(item, index) in items" :key="index">
                  <td class="text-center">{{ (filter.page - 1) * filter.perPage + (index + 1) }}</td>
                  <td>{{ item.nama }}</td>
                  <td>{{ item.psikologi_1 }}</td>
                  <td>{{ item.psikologi_2 }}</td>
                  <td>{{ item.deskripsi }}</td>
                  <td class="btn-table">
                    <nuxt-link
                      class="btn btn-light px-2"
                      :to="`/administrator/mbti/dimention/edit/${item.id}`"
                    >
                      <i class="fa fa-edit"></i>
                    </nuxt-link>
                    <!-- <button
                      class="btn btn-light px-2"
                      @click.prevent="
                        selectedId = item.id;
                        selectedIndex = index;
                        $bvModal.show('modal-delete');
                      "
                    >
                      <i class="fa fa-trash"></i>
                    </button> -->
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
          <UITableLoading tag="div" v-if="loading" />
          <UITableNotFound
            tag="div"
            v-if="totalRows == 0 && filter.keyword && !loading"
          />

          <b-pagination
            class="pagination-table"
            v-if="totalRows > 0 && totalRows > filter.perPage && !loading"
            v-model="filter.page"
            :total-rows="totalRows"
            :per-page="filter.perPage"
          >
          </b-pagination>
        </div>
      </div>

      <div
        v-if="totalRows == 0 && !loading && !filter.keyword"
        class="crud-body kosong"
      >
        <h2 class="kosong-title">Oops!</h2>
        <p class="kosong-subtitle">Belum ada dimensi</p>
        <!-- <nuxt-link
          class="btn btn-primary tambah-kelas px-4 py-3"
          to="/administrator/master_dimensi/add"
        >
          Tambah dimensi
        </nuxt-link> -->
      </div>
    </div>

    <!-- <b-modal
      id="modal-delete"
      title="Konfirmasi Hapus dimensi"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah anda yakin ingin menghapus data dimensi ini?
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
            @click.prevent="deleteData('dimensi')"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner> Ya
          </button>
        </div>
      </div>
    </b-modal> -->
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
        perPage: 5,
        keyword: ""
      },
      totalRows: 0,
      items: [],
      selectedId: null,
      selectedIndex: null
    };
  },
  created() {
    this.getData("dimensi");
  },
  mounted () {
    this.$store.commit("setBreadcrumb", [
        { text: "Dashboard", href: "/administrator/dashboard", icon: "house" },
        {
          text: "MBTI",
          href: "/administrator/mbti/personality"
        },
        {
          text: "Dimention",
          href: "#",
          active: true
        }
      ]);
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData("dimensi");
    },
    "filter.page": function(value) {
      this.getData("dimensi");
    },
    "filter.perPage": function(value) {
      this.getData("dimensi");
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
