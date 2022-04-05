<template>
  <div class="container-fluid crud">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">Program Studi</h2>
        <p>
          Data ini berisi program studi pada suatu perguruan tinggi. Data ini
          merupakan data master yang dibutuhkan untuk transaksi data siswa.
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
                @change="getData('programStudi')"
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
                placeholder="Cari program studi"
                debounce="1000"
              ></b-form-input>
            </b-input-group>
            <nuxt-link
              class="btn btn-primary tambah crud-btn__add px-4 ml-2"
              to="/administrator/program-studi/add"
            >
              Tambah
            </nuxt-link>
            <button
              class="btn btn-outline-primary tambah crud-btn__add px-4 ml-2"
              v-b-modal.modal-import
            >
              Import
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-12 crud-body">
        <div class="overflow-auto">
          <table class="table-data-kelas table table-borderless">
            <thead class="thead-table">
              <tr>
                <th class="no" width="100px">No</th>
                <th width="100" class="text-center">Icon</th>
                <th>Nama Program Studi</th>
                <th>Mata Pelajaran Terkait</th>
                <th>Penjurusan</th>
                <th width="100" class="aksi">Aksi</th>
              </tr>
            </thead>
            <tbody class="body-table">
              <template v-if="totalRows > 0">
                <tr v-for="(item, index) in items" :key="index">
                  <td class="text-center">
                    {{ (filter.page - 1) * filter.perPage + (index + 1) }}
                  </td>
                  <td>
                    <img
                      :src="ApiUrl(item.icon_prodi)"
                      :alt="item.nama_studi"
                      class="img-fluid"
                      @error="noImage"
                    />
                  </td>
                  <td>{{ item.nama_studi }}</td>
                  <!-- <td>{{ item.mapel ? item.mapel.nama_mapel : "?" }}</td> -->
                  <td>
                    <ul class="pl-1">
                      <li v-for="(mapel, mIndex) in item.list_mapel" :key="'m-'+index+'-'+mIndex">
                        <span v-if="mapel.mapel">{{mapel.mapel.nama_mapel}}</span>
                      </li>
                    </ul>
                  </td>
                  <td>
                    {{
                      item.penjurusan ? item.penjurusan.nama_penjurusan : "?"
                    }}
                  </td>
                  <td class="btn-table">
                    <nuxt-link
                      class="btn btn-light edit px-2"
                      :to="`/administrator/program-studi/edit/${item.id}`"
                      v-if="isHavePermission('Program Studi', 'Edit')"
                    >
                      <i class="far fa-edit"></i>
                    </nuxt-link>
                    <button
                      class="btn btn-light trash px-2"
                      @click.prevent="
                        selectedId = item.id;
                        selectedIndex = index;
                        $bvModal.show('modal-delete');
                      "
                      v-if="isHavePermission('Program Studi', 'Delete')"
                    >
                      <i class="fas fa-trash-alt"></i>
                    </button>
                    <span v-if="!isHavePermission('Program Studi', 'Edit') && !isHavePermission('Program Studi', 'Delete')">-</span>
                  </td>
                </tr>
              </template>
              <UITableLoading v-if="loading" />
              <UITableNotFound
                v-if="totalRows == 0 && filter.keyword && !loading"
              />
            </tbody>
          </table>

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
        <p class="kosong-subtitle">Belum ada program studi</p>
        <nuxt-link
          class="btn btn-primary tambah-kelas px-4 py-3"
          to="/administrator/program-studi/add"
        >
          Tambah Program Studi
        </nuxt-link>
      </div>
    </div>

    <b-modal
      id="modal-delete"
      title="Konfirmasi Hapus Program Studi"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah anda yakin ingin menghapus data program studi ini?
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
            @click.prevent="deleteData('programStudi')"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner> Ya
          </button>
        </div>
      </div>
    </b-modal>

    <b-modal
      id="modal-import"
      title="Import PT dan Prodi"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Import data perguruan tinggi dan program studi berdasarkan format yang
          sudah ditentukan.
        </p>
        <div>
          <div class="form-group reg-siswa">
            <label for="file_import">Unggah File</label>
            <div class="custom-file mb-3">
              <input
                type="file"
                class="custom-file-input"
                id="file_import"
                ref="file_import"
                @change="handleUploadedFile('file_import')"
                accept=".xls,.xlsx"
              />
              <label class="custom-file-label" for="file_import"
                >Pilih file atau drag kesini</label
              >
              <div class="d-flex justify-content-between">
                <!-- <div class="text-danger mt-1" style="font-size: 13px">
                  File yang diizinkan .xls, .xlsx
                </div> -->
                <a :href="ApiUrl('file/sample_import_ptn_prodi.xlsx')" style="font-size: 13px" class="mt-2 text-info"
                  ><i class="fas fa-fw fa-download mr-1"></i> Unduh format file</a
                >
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-outline-secondary"
            type="button"
            :disabled="submitting"
            @click="$bvModal.hide('modal-import')"
          >
            Batal
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="submitting"
            @click.prevent="importFile"
          >
            <b-spinner small v-if="submitting" class="mr-1"></b-spinner>
            Jalankan Proses Import
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>
<style scoped>
.custom-file-input:lang(en) ~ .custom-file-label::after {
  content: 'Jelajahi';
  color: #444;
}
</style>
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
      selectedIndex: null,
      submitting: false,
      files: {
        file_import: ""
      }
    };
  },
  created() {
    this.getData("programStudi");
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData("programStudi");
    },
    "filter.page": function(value) {
      this.getData("programStudi");
    }
  },
  methods: {
    ApiUrl(param) {
      return process.env.apiUrl + "/" + param;
    },
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
            this.getData("programStudi");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    handleUploadedFile(param) {
      this.files[param] = this.$refs[param].files[0];
      console.log(this.files[param]);
      this.$refs[param].closest(
        ".custom-file"
      ).children[1].textContent = this.files[param].name;
    },
    importFile() {
      this.submitting = true
      let formData = new FormData();
      formData.append("file", this.files.file_import);
      this.$axios
        .$post(`/api/tranStudiPerguruan/import`, formData)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$bvToast.toast(`Data berhasil diimport!`, {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$bvModal.hide("modal-import");
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.submitting = false));
    }
  }
};
</script>
