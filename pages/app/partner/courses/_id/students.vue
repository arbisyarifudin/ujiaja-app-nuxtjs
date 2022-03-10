<template>
  <div class="container-fluid">
    <div class="row" style="position: relative; z-index: 10">
      <div class="col-md-12">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Siswa Kelas
          </h2>
          <BackUrl />
        </div>
      </div>
      <div class="col-md-12">
        <UIMenuCourseDetail :data="dataDetail" :loading="loading" />
      </div>
      <div class="col-md-12 my-3">
        <div class="bg-white px-4 py-4">
          <div class="row">
            <div class="col-md-12 crud">
              <h4>Daftar Siswa di Kelas</h4>
              <hr />
              <b-tabs content-class="mt-3" lazy @input="updateTab">
                <b-tab title="Bergabung" :active="tabs == 0">
                  <div class="table-responsive">
                    <table class="table table-borderless">
                      <thead class="thead-light">
                        <tr>
                          <th>No</th>
                          <th>Nama Lengkap</th>
                          <th>Email</th>
                          <th>No. Telp/HP</th>
                          <th>Jenis Kelamin</th>
                          <th>Alamat</th>
                          <th>Tgl. Bergabung</th>
                          <th>Status</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody class="body-table">
                        <tr
                          v-for="(joined, index) in dataStudent['99']"
                          :key="'j' + index"
                        >
                          <td>{{ index + 1 }}</td>
                          <td>{{ joined.siswa.nama_lengkap }}</td>
                          <td>{{ joined.siswa.email }}</td>
                          <td>
                            <a :href="`tel:${joined.siswa.nomor_telephone}`">{{
                              joined.siswa.nomor_telephone
                            }}</a>
                          </td>
                          <td>{{ joined.siswa.jenis_kelamin }}</td>
                          <td>{{ joined.siswa.alamat }}</td>
                          <td>
                            {{
                              formatTanggal(
                                joined.tanggal_gabung,
                                "Do MMMM YYYY HH:mm"
                              )
                            }}
                            WIB
                          </td>
                          <td>
                            <span :class="statusBadge(joined.status_dikelas)">{{
                              joined.status_dikelas
                            }}</span>
                          </td>
                          <td>
                            <button
                            v-if="joined.status_dikelas == 'Bergabung'"
                              class="btn btn-light px-2"
                              @click.prevent="
                                selectedId = joined.id;
                                selectedIndex = index;
                                $bvModal.show('modal-finish');
                              "
                              title="Selesaikan Sesi"
                            >
                              <i class="fas fa-fw fa-check text-success"></i>
                            </button>
                            <span v-else>-</span>
                          </td>
                        </tr>
                        <UITableLoading v-if="loadingTable" />
                        <UITableNotFound
                          v-if="
                            dataStudent['99'] &&
                              dataStudent['99'].length == 0 &&
                              filterKeyword &&
                              !loadingTable
                          "
                        />
                      </tbody>
                    </table>
                    <div
                      v-if="dataStudent['99'].length == 0 && !loadingTable"
                      class="py-5 small text-center"
                    >
                      Belum ada Siswa yang bergabung dalam Kelas.
                    </div>
                  </div>
                </b-tab>
                <b-tab title="Menunggu Persetujuan" :active="tabs == 1">
                  <div class="table-responsive">
                    <table class="table table-borderless">
                      <thead class="thead-light">
                        <tr>
                          <th>No</th>
                          <th>Nama Lengkap</th>
                          <th>Jenis Kelamin</th>
                          <th>Alamat</th>
                          <th>Tgl. Pengajuan</th>
                          <th>Aksi</th>
                        </tr>
                      </thead>
                      <tbody class="body-table">
                        <tr
                          v-for="(waiting, index) in dataStudent['1']"
                          :key="'j' + index"
                        >
                          <td>{{ index + 1 }}</td>
                          <td>{{ waiting.siswa.nama_lengkap }}</td>
                          <td>{{ waiting.siswa.jenis_kelamin }}</td>
                          <td>{{ waiting.siswa.alamat }}</td>
                          <td>
                            {{
                              formatTanggal(
                                waiting.created_at,
                                "Do MMMM YYYY HH:mm"
                              )
                            }}
                            WIB
                          </td>
                          <td>
                            <button
                              class="btn btn-light px-2"
                              @click.prevent="
                                selectedId = waiting.id;
                                selectedIndex = index;
                                $bvModal.show('modal-approve');
                              "
                              title="Terima Siswa"
                            >
                              <i class="fas fa-fw fa-check text-success"></i>
                            </button>
                            <button
                              class="btn btn-light px-2"
                              @click.prevent="
                                selectedId = waiting.id;
                                selectedIndex = index;
                                $bvModal.show('modal-reject');
                              "
                              title="Tolak Siswa"
                            >
                              <i class="fas fa-times fa-fw text-danger"></i>
                            </button>
                          </td>
                        </tr>
                        <UITableLoading v-if="loadingTable" />
                        <UITableNotFound
                          v-if="
                            dataStudent['1'] &&
                              dataStudent['1'].length == 0 &&
                              filterKeyword &&
                              !loadingTable
                          "
                        />
                      </tbody>
                    </table>
                    <div
                      v-if="dataStudent['1'].length == 0 && !loadingTable"
                      class="py-5 small text-center"
                    >
                      Belum ada permintaan bergabung dari Siswa.
                    </div>
                  </div>
                </b-tab>
              </b-tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-option"
      title="Nonakifkan Kelas"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          <b>Nonaktifkan Kelas</b>, maka kelas tidak akan ditampilkan dalam
          pencarian dan siswa tidak bisa mengakses Kelas Les Privat ini. Atau
          <b>Hapus Kelas secara Permanen</b>, maka semua data dalam kelas akan
          dihapus dari Sistem.
        </p>
        <div class="modal-footer justify-content-center" style="border: 0px">
          <button
            class="btn btn-sm btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="updateStatus(dataDetail.menerima_peserta)"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner>
            {{ dataDetail.menerima_peserta ? "Nonaktifkan" : "Aktifkan" }}
          </button>
          <button
            class="btn btn-sm btn-secondary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="deleteData()"
          >
            <b-spinner small v-if="loading" class="mr-1"></b-spinner> Hapus
            Permanen
          </button>
          <button
            class="btn btn-sm btn-outline-secondary tambah px-4 py-2"
            type="button"
            @click="$bvModal.hide('modal-option')"
          >
            Batal
          </button>
        </div>
      </div>
    </b-modal>

    <b-modal
      id="modal-approve"
      title="Terima Siswa"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">Apakah Anda yakin ingin menerima Siswa Ini?</p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-sm btn-success tambah px-4 py-2"
            type="button"
            :disabled="loadingTable"
            @click.prevent="approvalStudent('Bergabung')"
          >
            <b-spinner small v-if="loadingTable" class="mr-1"></b-spinner>
            Terima Siswa
          </button>
          <button
            class="btn btn-sm btn-outline-secondary tambah px-4 py-2"
            type="button"
            @click="$bvModal.hide('modal-approve')"
          >
            Batal
          </button>
        </div>
      </div>
    </b-modal>
    <b-modal
      id="modal-reject"
      title="Tolak Siswa"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">Apakah Anda yakin ingin menolak Siswa Ini? <div class="small text-danger"><b>Perhatian:</b> Aksi tidak dapat dibatalkan.</div></p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-sm btn-danger tambah px-4 py-2"
            type="button"
            :disabled="loadingTable"
            @click.prevent="approvalStudent('Ditolak')"
          >
            <b-spinner small v-if="loadingTable" class="mr-1"></b-spinner> Tolak
            Siswa
          </button>
          <button
            class="btn btn-sm btn-outline-secondary tambah px-4 py-2"
            type="button"
            @click="$bvModal.hide('modal-reject')"
          >
            Batal
          </button>
        </div>
      </div>
    </b-modal>

    <b-modal
      id="modal-finish"
      title="Selesaikan Sesi"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">Apakah Anda yakin ingin Selesaikan Sesi?</p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-sm btn-success tambah px-4 py-2"
            type="button"
            :disabled="loadingTable"
            @click.prevent="selesaikanSesi"
          >
            <b-spinner small v-if="loadingTable" class="mr-1"></b-spinner>
            Ya
          </button>
          <button
            class="btn btn-sm btn-outline-secondary tambah px-4 py-2"
            type="button"
            @click="$bvModal.hide('modal-finish')"
          >
            Batal
          </button>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      loading: true,
      loadingTable: false,
      filterKeyword: "",
      dataDetail: {
        mapel: {},
        tentor: {},
        jenjang: {},
        penjurusan: {},
        jadwals: []
      },
      tabs: 0,
      dataStudent: {
        99: {},
        1: {}
      },
      selectedId: null,
      selectedIndex: null
    };
  },
  created() {
    if (!this.$route.params.id)
      return this.$router.push("/app/partner/courses");
    this.getDetail("kursus", this.$route.params.id);
    this.getStudent(99);
    if(this.$route.query.tab) {
        this.tabs =  parseInt(this.$route.query.tab)
        // console.log('tabs', this.tabs)
      }
  },
  watch: {
    // tabs(value) {
    //   if (value > -1) {
    //     if (value == 0) {
    //       this.getStudent(99);
    //     } else {
    //       this.getStudent(value);
    //     }
    //   }
    // }
  },
  methods: {
    resetModal() {},
    updateTab(tabIndex) {
      // if(this.$route.query.tab) {
      //   this.tabs =  parseInt(this.$route.query.tab)
      // }
      console.log('tabs', this.tabs)
      if (tabIndex == 0) {
          this.getStudent(99);
        } else {
          this.getStudent(tabIndex);
        }
    },
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail = res.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    deleteData() {
      const conf = confirm(
        "Apakah Anda Yakin? Data yang dihapus tidak dapat dikembalikan!"
      );
      if (!conf) {
        return;
      }

      this.loading = true;
      this.$axios
        .$delete(`/api/kursus/delete/${this.$route.params.id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast("Data kursus berhasil dihapus!", {
              title: "Sukses",
              variant: "danger",
              solid: true,
              autoHideDelay: 3000
            });
            this.$bvModal.hide("modal-option");
            this.$router.replace("/app/partner/courses");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    updateStatus(status) {
      const conf = confirm(
        "Apakah Anda Yakin ingin menonaktifkan Kelas? Siswa tidak dapat mengakses kelas ini lagi."
      );
      if (!conf) {
        return;
      }

      this.loading = true;
      const newStatus = status == 0 ? 1 : 0;
      this.$axios
        .$put(`/api/kursus/update/${this.$route.params.id}/status`, {
          status: newStatus
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataDetail.menerima_peserta = newStatus;
            const messageStatus =
              newStatus == 1 ? "diaktifkan" : "dinonaktifkan";
            this.$root.$bvToast.toast(
              "Data kursus berhasil " + messageStatus + "!",
              {
                title: "Sukses",
                variant: newStatus == 1 ? "success" : "danger",
                solid: true,
                autoHideDelay: 3000
              }
            );
            this.$bvModal.hide("modal-option");
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    async getStudent(tabIndex = 0) {
      const allStatus = [
        "Bergabung",
        "Pending",
        "Ditolak",
        "Ditolak & Sudah Bergabung Lagi",
        "Menunggu Konfirmasi Selesai",
        "Sesi Selesai"
      ];
      let status = [];
      if (tabIndex == 99) {
        status = ["Bergabung", "Menunggu Konfirmasi Selesai", "Sesi Selesai"];
      } else {
        status = allStatus[tabIndex];
      }

      this.loadingTable = true;
      await this.$axios
        .$get("/api/kursus-siswa", {
          params: {
            id_kursus: this.$route.params.id,
            status_dikelas: status
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.dataStudent[tabIndex] = res.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loadingTable = false));
    },
    approvalStudent(status) {
      this.loadingTable = true;
      this.$axios
        .$put(`/api/kursus-siswa/update/${this.selectedId}/status`, {
          status_dikelas: status
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            const messageStatus =
              status == "Bergabung" ? "diterima" : "ditolak";
            this.$root.$bvToast.toast("Siswa " + messageStatus + "!", {
              title: "Sukses",
              variant: status == "Bergabung" ? "success" : "danger",
              solid: true,
              autoHideDelay: 3000
            });
            this.getStudent(1);
            this.$bvModal.hide("modal-approve");
            this.$bvModal.hide("modal-reject");
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loadingTable = false));
    },
    selesaikanSesi() {
      this.loadingTable = true;
      this.$axios
        .$put(`/api/kursus-siswa/update/${this.selectedId}/status`, {
          status_dikelas: "Menunggu Konfirmasi Selesai"
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast(
              "Sesi berhasil dikonfirmasi Anda sebagai selesai dan tinggal menunggu konfirmasi dari Siswa!",
              {
                title: "Sukses",
                variant: "success",
                solid: true,
                autoHideDelay: 3000
              }
            );
            this.getStudent(99);
            this.$bvModal.hide("modal-finish");
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loadingTable = false));
    },
    statusBadge(status) {
      let statusClass = "badge badge-";
      switch (status) {
        case "Bergabung":
          statusClass += "primary";
          break;
        case "Menunggu Verifikasi Selesai":
          statusClass += "warning";
          break;
        case "Sesi Selesai":
          statusClass += "success";
          break;
        default:
          statusClass += "secondary";
          break;
      }
      return statusClass;
    }
  }
};
</script>

<style></style>
