<template>
  <div class="container-fluid crud">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">Daftar Admin</h2>
        <p>
          Data ini berisi data dari para Admin yang telah Superadmin daftarkan.
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
                @change="getData('users/admin')"
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
                placeholder="Cari admin"
                debounce="1000"
              ></b-form-input>
            </b-input-group>
            <nuxt-link
              class="btn btn-primary tambah crud-btn__add px-4 ml-2"
              to="/administrator/user/admin/add"
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
                <th width="100">Status</th>
                <th>Username</th>
                <th>Nama Lengkap</th>
                <th>Email</th>
                <!-- <th>No. Telp/HP</th> -->
                <th>Tanggal Dibuat</th>
              </tr>
            </thead>
            <tbody class="body-table">
              <template v-if="totalRows > 0">
                <tr v-for="(item, index) in items" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td class="btn-table">
                    <button
                      title="Detail"
                      class="btn btn-light px-2 mt-n2"
                      @click.prevent="
                        selectedId = item.id_admin;
                        selectedIndex = index;
                        getDetail('users/admin');
                      "
                    >
                      <i class="fa fa-search fa-fw"></i>
                    </button>
                    <!-- <router-link title="Permissions" class="btn btn-light px-2 mt-n2" :to="`/administrator/user/admin/${item.id_admin}/permission`"><i class="fas fa-fw fa-key"></i></router-link> -->
                    <router-link
                      title="Edit"
                      class="btn btn-light px-2 mt-n2"
                      :to="`/administrator/user/admin/${item.id_admin}/edit`"
                      ><i
                        class="fas fa-fw fa-edit"
                        style="font-size: 17px; color: #baadff;"
                      ></i
                    ></router-link>
                    <button
                      class="btn btn-light trash px-2 mt-n3"
                      @click.prevent="
                        selectedId = item.id_admin;
                        selectedIndex = index;
                        $bvModal.show('modal-delete');
                      "
                    >
                      <i
                        class="fas fa-trash-alt"
                        style="font-size: 16px; color: #baadff;"
                      ></i>
                    </button>
                  </td>
                  <td>
                    <span :class="statusBadge(item.user.verifikasi)">{{
                      item.user.verifikasi == 2
                        ? "Sudah Verifikasi"
                        : "Belum Verifikasi"
                    }}</span>
                  </td>
                  <td>{{ item.user ? item.user.username : '-' }}</td>
                  <td>{{ item.nama_lengkap }}</td>
                  <td>{{ item.email }}</td>
                  <!-- <td>{{ item.nomor_telephone }}</td> -->
                  <td>
                    {{ formatTanggal(item.created_at, "Do MMMM YYYY HH:mm") }}
                    WIB
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
        <p class="kosong-subtitle">Belum ada data Administrator</p>
      </div>
    </div>

    <b-modal
      id="modal-detail"
      title="Detail Admin"
      hide-footer
      centered
      size="lg"
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <template v-if="detail && !loading">
        <div class="row">
          <div class="col-md-12 modal-body-kiri">
            <table class="table table-borderless">
              <tr>
                <th width="150">Nama Lengkap</th>
                <th width="10">:</th>
                <th>{{ detail.nama_lengkap }}</th>
              </tr>
              <tr v-if="detail.user">
                <th width="150">Status Akun</th>
                <th width="10">:</th>
                <th>
                  <span :class="statusBadge(detail.user.verifikasi)">{{
                    detail.user.verifikasi == 2
                      ? "Sudah Verifikasi"
                      : "Belum Verifikasi"
                  }}</span>
                  <button
                    type="button"
                    v-if="detail.user.verifikasi != 2"
                    class="btn btn-sm btn-success px-2 py-0"
                    title="Verifikasi"
                    @click="verifyUser(2)"
                  >
                    <i class="fas fa-check"></i>
                  </button>
                  <button
                    type="button"
                    v-if="detail.user.verifikasi == 2"
                    class="btn btn-sm btn-danger px-2 py-0"
                    title="Verifikasi"
                    @click="verifyUser(1)"
                  >
                    <i class="fas fa-times"></i>
                  </button>
                </th>
              </tr>
              <tr>
                <th width="150">Username</th>
                <th width="10">:</th>
                <th>{{ detail.username }}</th>
              </tr>
              <tr>
                <th width="150">Email</th>
                <th width="10">:</th>
                <th>{{ detail.email }}</th>
              </tr>
              <tr>
                <th width="150">No. Telp/HP</th>
                <th width="10">:</th>
                <th>{{ detail.nomor_telephone }}</th>
              </tr>
              <tr>
                <th width="150">Tgl. Dibuat</th>
                <th width="10">:</th>
                <th>
                  {{ formatTanggal(detail.created_at, "Do MMMM YYYY") }}
                </th>
              </tr>
            </table>
          </div>
        </div>
        <div class="modal-footer justify-content-end" style="border: 0px">
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
      title="Konfirmasi Hapus Admin"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah anda yakin ingin menghapus Admin ini?
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
            @click.prevent="deleteData('users/admin')"
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
      submitting: false,
      filter: {
        page: 1,
        perPage: 5,
        keyword: ""
      },
      totalRows: 0,
      items: [],
      selectedId: null,
      selectedIndex: null,
      detail: {},
      showBukti: false,
      form: {
        verifikasi: null
      }
    };
  },
  created() {
    this.getData("users/admin");
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData("users/admin");
    },
    "filter.page": function(value) {
      this.getData("users/admin");
    }
  },
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    }
  },
  methods: {
    resetModal() {
      this.detail = {};
    },
    statusBadge(status) {
      let statusClass = "badge badge-";
      switch (status) {
        case 1:
          statusClass += "danger";
          break;
        case 2:
          statusClass += "success";
          break;
        default:
          statusClass += "secondary";
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
    verifyUser(status) {
      var conf = confirm(
        `Apakah anda yakin menjadikan User ${
          status !== 2
            ? "sebagai belum di verifikasi / nonaktif"
            : "sebagai telah di verifikasi"
        }?`
      );
      if (!conf) {
        return;
      }
      this.submitting = true;
      this.$axios
        .$put(`/api/users/admin/update/${this.selectedId}`, {
          ...this.detail,
          verifikasi: status
        })
        .then(res => {
          if (res.success) {
            this.$bvToast.toast(
              `User berhasil ${
                status !== 2 ? "dinonaktifkan" : "diverifikasi"
              }!`,
              {
                title: "Sukses",
                variant: "success",
                solid: true,
                autoHideDelay: 3000
              }
            );
            this.items[
              this.selectedIndex
            ].user.verifikasi = status;
            this.detail.user.verifikasi = status
            // this.$bvModal.hide("modal-detail");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.submitting = false));
    },
    deleteData(type) {
      this.loading = true;
      this.$axios
        .$delete(`/api/${type}/delete/${this.selectedId}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.items.splice(this.selectedIndex, 1);
            this.$bvToast.toast("Data admn berhasil dihapus.", {
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
