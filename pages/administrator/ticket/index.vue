<template>
  <div class="row">
    <div class="col-md-12">
      <h3>Pengaduan Customer</h3>
      <p>
        Ini adalah daftar pengaduan dari Customer, terkait teknis maupun
        non-teknis.
      </p>
    </div>
    <div class="col-md-12 my-3 crud">
      <div class="bg-white px-4 py-4 crud-body">
        <div class="row crud-tools">
          <div class="col-md-6">
            <h4>Daftar Pengaduan</h4>
          </div>
          <div class="col-md-6">
            <div class="row">
              <div class="col-md-4">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text
                      ><i class="fas fa-filter"></i
                    ></b-input-group-text>
                  </template>
                  <b-form-select
                    class="small"
                    v-model="sorting"
                    :options="[
                      { text: '-- Urutkan --', value: '' },
                      { text: 'Terbaru', value: 'latest' },
                      { text: 'Terlama', value: 'oldest' }
                    ]"
                    @change="getData()"
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
                    class="small"
                    v-model="prioritas"
                    :options="[
                      { text: '-- Prioritas --', value: '' },
                      { text: 'Rendah', value: 'Rendah' },
                      { text: 'Sedang', value: 'Sedang' },
                      { text: 'Tinggi', value: 'Tinggi' }
                    ]"
                    @change="getData()"
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
                    class="small"
                    v-model="status"
                    :options="[
                      { text: '-- Status --', value: '' },
                      { text: 'Buka', value: 'Buka' },
                      { text: 'Ditutup', value: 'Ditutup' }
                    ]"
                    @change="getData()"
                  ></b-form-select>
                </b-input-group>
              </div>
            </div>
          </div>
        </div>
        <hr class="mb-0" />
        <div class="courses-review review pos-relative">
          <ul class="review-list list-unstyled">
            <li
              class="d-flex review-item"
              v-for="(item, index) in list"
              :key="'uls' + index"
            >
              <img
                :src="ApiUrl(item.siswa ? item.siswa.foto : item.tentor.foto)"
                @error="noImage"
                alt="profile pic"
                class="review-avatar"
              />
              <div class="review-data ml-md-4">
                <div class="d-flex justify-content-between">
                  <div class="review-data__author">
                    <b>#{{ item.kode }}</b> - {{ item.subjek }}
                  </div>
                  <div>
                    <span :class="prioritasBadge(item.prioritas)">{{
                      item.prioritas
                    }}</span>
                    <span :class="statusBadge(item.status)">{{
                      item.status
                    }}</span>
                    <b-dropdown
                      size="sm"
                      variant="outline-primary"
                      toggle-class="text-decoration-none square px-2 py-0 ml-2"
                      no-caret
                    >
                      <template #button-content>
                        <b-icon icon="three-dots"></b-icon>
                      </template>
                      <b-dropdown-item
                        @click.prevent="
                          selectedData = item;
                          $bvModal.show('modal-status');
                        "
                        >Ubah Status</b-dropdown-item
                      >
                      <b-dropdown-item
                        @click.prevent="
                          selectedId = item.id;
                          selectedIndex = index;
                          $bvModal.show('modal-prioritas');
                        "
                        >Ubah Prioritas</b-dropdown-item
                      >
                    </b-dropdown>
                  </div>
                </div>
                <div class="d-flex review-data__rating">
                  <div class="time">{{ formatTanggal(item.created_at) }}</div>
                </div>
                <div class="review-data__comment mt-2">
                  {{ item.permasalahan }}
                </div>
              </div>
            </li>
          </ul>
          <div class="pos-relative" v-if="!loading && list && list.length < 1">
            <UITableNotFound text="Belum ada data pengaduan." />
          </div>
          <UILoading v-if="loading" />
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
    </div>
    <b-modal
      id="modal-status"
      title="Ubah Status"
      centered
      hide-footer
      class="admin-modal"
    >
      <div>
        <!-- <p class="modal-text">
          Apakah anda yakin ingin menghapus data tryout ini?
        </p> -->
        <b-form-select
          :options="[
            { text: 'Buka', value: 'Buka' },
            { text: 'Tutup/Selesai', value: 'Ditutup' }
          ]"
          @change="updateStatus"
          v-model="selectedData.status"
        >
        </b-form-select>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-status')"
          >
            Tutup
          </button>
          <!-- <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="updateStatus()"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner> Simpan
          </button> -->
        </div>
      </div>
    </b-modal>
    <b-modal id="modal-prioritas"></b-modal>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      submitting: false,
      loading: true,
      list: [],
      totalRows: 10,
      filter: {
        sortBy: "created_at",
        sortDir: "desc",
        page: 1,
        perPage: 10,
        keyword: ""
      },
      status: "",
      prioritas: "",
      sorting: "latest",
      selectedId: null,
      selectedIndex: null,
      selectedData: {}
    };
  },
  created() {
    this.getData();
  },
  computed: {
    tentor() {
      return this.$store.state.dataUser.detail;
    }
  },
  watch: {
    "filter.page": function(value) {
      if (value) {
        this.getData();
      }
    }
  },
  methods: {
    getData() {
      if (this.sorting == "latest") {
        this.filter.sortBy = "created_at";
        this.filter.sortDir = "desc";
      } else if (sorting == "oldest") {
        this.filter.sortBy = "created_at";
        this.filter.sortDir = "asc";
      }

      this.loading = true;
      this.$axios
        .$get("api/pengaduan", {
          params: {
            q: "",
            page: this.filter.page,
            paginate: this.filter.perPage,
            sortBy: this.filter.sortBy,
            sortDir: this.filter.sortDir,
            prioritas: this.prioritas,
            status: this.status
          }
        })
        .then(res => {
          if (res.success) {
            this.list = res.data.data;
            this.totalRows = res.data.total;
            this.filter.perPage = res.data.per_page;
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    statusBadge(status) {
      let statusClass = "badge badge-";
      switch (status) {
        case "Buka":
          statusClass += "success";
          break;
        case "Ditutup":
          statusClass += "secondary";
          break;
        default:
          statusClass += "secondary";
          break;
      }
      return statusClass;
    },
    prioritasBadge(prioritas) {
      let prioritasClass = "badge badge-";
      switch (prioritas) {
        case "Rendah":
          prioritasClass += "warning";
          break;
        case "Sedang":
          prioritasClass += "info";
          break;
        case "Tinggi":
          prioritasClass += "danger";
          break;
        default:
          prioritasClass += "secondary";
          break;
      }
      return prioritasClass;
    },
    updateStatus() {
      if(this.selectedData && this.selectedData.status) {
        this.$axios.$put(`api/pengaduan/update-status/${this.selectedData.id}`, {
          status: this.selectedData.status
        })
        .then(response => {
          if(response.success) {
            this.showToastMessage(response.message, 'success')
          }
        })
        .catch(error => {
          // console.log(error)
          this.catchError(error)
        })
      }
    }
  }
};
</script>
