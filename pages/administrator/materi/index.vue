<template>
  <div class="container-fluid crud">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">Materi</h2>
        <p>
          Data ini berisi materi yang dijual ke siswa.
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
                placeholder="Cari materi"
                debounce="1000"
              ></b-form-input>
            </b-input-group>
            <nuxt-link
              class="btn btn-primary tambah crud-btn__add px-4 ml-2"
              to="/administrator/materi/add"
            >
              Tambah
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="col-md-12 crud-body">
        <div class="overflow-auto">
          <table class="table-data-kelas table table-borderless">
            <thead class="thead-table">
              <tr>
                <th class="no" width="50">No</th>
                <th width="50" class="aksi">Aksi</th>
                <th width="150">Status</th>
                <th>Nama Materi</th>
                <th>Deskripsi</th>
                <th>Sampul</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody class="body-table">
              <template v-if="totalRows > 0">
                <tr v-for="(item, index) in items" :key="index">
                  <td class="text-center">
                    {{ (filter.page - 1) * filter.perPage + (index + 1) }}
                  </td>
                  <td class="btn-table">
                    <button
                      class="btn btn-light px-2 mt-n2"
                      @click.prevent="
                        selectedId = item.id;
                        selectedIndex = index;
                        getDetail('material');
                      "
                    >
                      <i class="fa fa-search"></i>
                    </button>
                    <nuxt-link
                      class="btn btn-light px-2 mt-n2"
                      :to="`/administrator/materi/${item.id}/edit`"
                      v-if="isHavePermission('Material', 'Edit')"
                    >
                      <i class="fa fa-edit" style="font-size: 18px"></i>
                    </nuxt-link>
                    <button
                      class="btn btn-light px-2 mt-n2"
                      @click.prevent="
                        selectedId = item.id;
                        selectedIndex = index;
                        $bvModal.show('modal-delete');
                      "
                      v-if="isHavePermission('Material', 'Delete')"
                    >
                      <i class="fa fa-trash" style="font-size: 18px"></i>
                    </button>
                    <span
                      v-if="
                        !isHavePermission('Material', 'Edit') &&
                          !isHavePermission('Material', 'Delete')
                      "
                      >-</span
                    >
                  </td>
                  <td>
                    <span :class="statusBadge(item.published)">{{
                      item.published ? "Published" : "Hidden"
                    }}</span>
                  </td>
                  <td>{{ item.title }}</td>
                  <td>{{ item.desc && item.desc.substr(0, 50) }} ..</td>
                  <td>
                    <img
                      :src="ApiUrl('storage/' + item.cover_image_link)"
                      :alt="item.cover_image_link"
                      class="img-fluid"
                      width="120"
                    />
                  </td>
                  <td>
                    <a
                      target="_blank"
                      :href="ApiUrl('storage/' + item.file_link)"
                      class="btn btn-outline-primary btn-sm"
                      ><i class="fas fa-download fa-fw mr-1"></i> Unduh
                      Berkas</a
                    >
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
        <p class="kosong-subtitle">Belum ada data Materi</p>
      </div>
    </div>

    <b-modal
      id="modal-detail"
      title="Detail Materi"
      hide-footer
      centered
      size="lg"
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <template v-if="detail && !loading">
        <div class="row">
          <div class="col-md-8 modal-body-kiri">
            <!-- <h5>Data Materi</h5> -->
            <!-- <hr /> -->
            <table class="table table-borderless">
              <tr>
                <th width="150">Judul/Nama Materi</th>
                <th width="10">:</th>
                <th>
                  {{ detail.title }}
                </th>
              </tr>
              <tr>
                <th width="150">Harga</th>
                <th width="10">:</th>
                <th>
                  Rp
                  {{ formatRupiah(detail.price) }}
                </th>
              </tr>
              <tr>
                <th width="150">Deskripsi</th>
                <th width="10">:</th>
                <th>
                  {{ detail.desc }}
                </th>
              </tr>
            </table>
          </div>
          <div class="col-md-4 modal-body-kanan" v-if="ApiUrl">
            <img
              :src="ApiUrl('storage/' + detail.cover_image_link)"
              :alt="detail.cover_image_link"
              class="img-fluid"
            />
            <hr />
            <a
              target="_blank"
              :href="ApiUrl('storage/' + detail.file_link)"
              class="btn btn-outline-primary btn-sm"
              ><i class="fas fa-download fa-fw mr-1"></i> Unduh Berkas</a
            >
          </div>
        </div>
        <div class="modal-footer justify-content-center" style="border: 0px">
          <button
            class="btn btn-sm btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-detail')"
          >
            Tutup
          </button>
        </div>
      </template>
      <div style="min-height: 200px; position: relative" v-else>
        <UILoading />
      </div>
    </b-modal>
    <b-modal
      id="modal-delete"
      title="Konfirmasi Hapus Materi"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">Apakah anda yakin ingin menghapus materi ini?</p>
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
            @click.prevent="deleteData('material')"
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
      detail: {}
    };
  },
  created() {
    this.getData("material");
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData("material");
    },
    "filter.page": function(value) {
      this.getData("material");
    },
    "filter.perPage": function(value) {
      this.getData("material");
    }
  },
  methods: {
    resetModal() {
      this.detail = {};
      this.$bvModal.hide("modal-detail");
    },
    resetModalTeacher() {
      this.detailTeacher = {};
    },
    statusBadge(status) {
      let statusClass = "badge badge-";
      switch (status) {
        case 0:
          statusClass += "secondary";
          break;
        case 1:
          statusClass += "success";
          break;
        default:
          statusClass += "warning";
          break;
      }
      return statusClass;
    },
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
    getDetail(type) {
      this.loading = true;
      this.$bvModal.show("modal-detail");
      this.$axios
        .$get(`/api/${type}/find/${this.selectedId}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.detail = res.data;
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
