<template>
  <div class="container-fluid crud">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">Kelas Privat</h2>
        <p>
          Data ini berisi Kelas Privat yang dibuat oleh Tentor.
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
                @change="getData('kursus')"
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
                placeholder="Cari kelas kursus"
                debounce="1000"
              ></b-form-input>
            </b-input-group>
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
                <th width="150">Status Verifikasi</th>
                <th>Nama Kursus</th>
                <th>Harga</th>
                <th>Mata Pelajaran</th>
                <th>Jenjang Sekolah</th>
                <th>Nama Tentor</th>
                <th width="150">Status Kelas</th>
              </tr>
            </thead>
            <tbody class="body-table">
              <template v-if="totalRows > 0">
                <tr v-for="(item, index) in items" :key="index">
                  <td class="text-center">{{ index + 1 }}</td>
                  <td class="btn-table">
                    <button
                      class="btn btn-light px-2 mt-n2"
                      @click.prevent="
                        selectedId = item.id;
                        selectedIndex = index;
                        getDetail('kursus');
                      "
                    >
                      <i class="fa fa-search"></i>
                    </button>
                  </td>
                  <td>
                    <span :class="statusBadge(item.status_verifikasi)">{{
                      item.status_verifikasi
                        ? "Sudah Diverifikasi"
                        : "Menunggu Verifikasi"
                    }}</span>
                  </td>
                  <td>{{ item.nama_kursus }}</td>
                  <td>
                    <div class="d-flex justify-content-between">
                      <span>Rp</span>
                      <strong>{{ formatRupiah(item.harga_kursus) }}</strong>
                    </div>
                  </td>
                  <td>{{ item.mapel ? item.mapel.nama_mapel : "-" }}</td>
                  <td>{{ item.jenjang ? item.jenjang.nama_jenjang : "-" }}</td>
                  <td>
                    <i class="fas fa-user"></i>
                    {{ item.tentor ? item.tentor.nama_lengkap : "" }}
                  </td>
                  <td>
                    <span :class="statusBadge(item.menerima_peserta)">{{
                      item.menerima_peserta ? "Aktif" : "Tidak Aktif"
                    }}</span>
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
        <p class="kosong-subtitle">Belum ada data Kelas Kursus</p>
      </div>
    </div>

    <b-modal
      id="modal-detail"
      title="Detail Kelas Kursus"
      hide-footer
      centered
      size="lg"
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <template v-if="detail && !loading">
        <p style="">
          Konfirmasi terlebih dahulu informasi di bawah ini dengan teliti
          sebelum melakukan verifikasi!
        </p>
        <div class="row">
          <div class="col-md-12 modal-body-kiri">
            <!-- <h5>Data Kelas Kursus</h5>
            <hr /> -->
            <table class="table table-borderless">
              <tr>
                <th width="150">Nama Kelas Kursus</th>
                <th width="10">:</th>
                <th>
                  {{ detail.nama_kursus }}
                </th>
              </tr>
              <tr>
                <th width="150">Status Verifikasi</th>
                <th width="10">:</th>
                <th>
                  <span
                    :class="statusBadge(detail.status_verifikasi)"
                    v-text="
                      detail.status_verifikasi
                        ? 'Sudah Diverifikasi'
                        : 'Menunggu Verifikasi'
                    "
                  ></span>
                </th>
              </tr>
              <tr>
                <th width="150">Harga Kursus</th>
                <th width="10">:</th>
                <th>Rp {{ formatRupiah(detail.harga_kursus) }}</th>
              </tr>
              <tr>
                <th width="150">Deskripsi Kelas</th>
                <th width="10">:</th>
                <th v-html="detail.deskripsi_kursus"></th>
              </tr>
              <tr>
                <th width="150">Tentor</th>
                <th width="10">:</th>
                <th>
                  {{ detail.tentor ? detail.tentor.nama_lengkap : "-" }}
                  <button
                    v-if="detail.tentor"
                    class="btn btn-light px-2 mt-n2"
                    @click.prevent="getDetailTeacher(detail.tentor.id_teacher)"
                  >
                    <i class="fa fa-search"></i>
                  </button>
                </th>
              </tr>
              <tr>
                <th width="150">Mata Pelajaran</th>
                <th width="10">:</th>
                <th>
                  {{ detail.mapel ? detail.mapel.nama_mapel : "-" }}
                </th>
              </tr>
              <tr>
                <th width="150">Jenjang Sekolah</th>
                <th width="10">:</th>
                <th>
                  {{ detail.jenjang ? detail.jenjang.nama_jenjang : "-" }}
                </th>
              </tr>
              <tr>
                <th width="150">Status Kelas</th>
                <th width="10">:</th>
                <th>
                  <span
                    :class="statusBadge(detail.menerima_peserta)"
                    v-text="detail.menerima_peserta ? 'Aktif' : 'Tidak Aktif'"
                  ></span>
                </th>
              </tr>
            </table>
          </div>
        </div>
        <div class="mt-4">
          <p class="mb-2 text-center">
            Apa yang ingin Anda lakukan terhadap kelas kursus ini?
          </p>
        </div>
        <div class="modal-footer justify-content-center" style="border: 0px">
          <button
            class="btn btn-sm btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-detail')"
          >
            Tutup
          </button>
          <button
            class="btn btn-sm btn-primary tambah px-4 py-1"
            type="button"
            :disabled="submitting"
            v-if="form.status_verifikasi != 1"
            @click.prevent="verifyCourse(1)"
          >
            <b-spinner small v-if="submitting" class="mr-1"></b-spinner>
            Verifikasi Kelas
          </button>
          <button
            class="btn btn-sm btn-danger tambah px-4 py-1"
            type="button"
            :disabled="submitting"
            v-if="form.status_verifikasi == 1"
            @click.prevent="verifyCourse(0)"
          >
            <b-spinner small v-if="submitting" class="mr-1"></b-spinner> Matikan
            Kelas
          </button>
        </div>
      </template>
      <div style="min-height: 200px; position: relative" v-else>
        <UILoading />
      </div>
    </b-modal>
     <b-modal
      id="modal-detail-teacher"
      title="Detail Tentor"
      hide-footer
      centered
      size="lg"
      modal-class="admin-modal"
      @hidden="resetModalTeacher"
    >
      <template v-if="detailTeacher && !loading">
        <div class="row">
          <div class="col-md-6 modal-body-kiri">
           <table class="table table-borderless">
              <tr>
                <th width="150">Nama Lengkap</th>
                <th width="10">:</th>
                <th>{{ detailTeacher.nama_lengkap }}</th>
              </tr>
              <tr v-if="detailTeacher.user">
                <th width="150">Status Akun</th>
                <th width="10">:</th>
                <th>
                  <span :class="statusBadge(detailTeacher.user.verifikasi)">{{
                    detailTeacher.user.verifikasi == 1
                      ? "Belum Diverifikasi"
                      : "Sudah Diverifikasi"
                  }}</span>
                </th>
              </tr>
              <tr>
                <th width="150">Tgl. Bergabung</th>
                <th width="10">:</th>
                <th>
                  {{ formatTanggal(detailTeacher.created_at, "Do MMMM YYYY") }}
                </th>
              </tr>
              <tr>
                <th width="150">Email</th>
                <th width="10">:</th>
                <th>{{ detailTeacher.email }}</th>
              </tr>
              <tr>
                <th width="150">No. Telp/HP</th>
                <th width="10">:</th>
                <th>{{ detailTeacher.nomor_telephone }}</th>
              </tr>
              <tr>
                <th width="150">Tanggal Lahir</th>
                <th width="10">:</th>
                <th>
                  {{ detailTeacher.tempat_lahir }},
                  {{
                    formatTanggal(
                      detailTeacher.tanggal_lahir ? detailTeacher.tanggal_lahir : "1980-01-01"
                    )
                  }}
                </th>
              </tr>
              <tr>
                <th width="150">Umur</th>
                <th width="10">:</th>
                <th>
                  {{
                    formatSelisih(
                      detailTeacher.tanggal_lahir
                        ? detailTeacher.tanggal_lahir
                        : "1980-01-01",
                      new Date(),
                      "years"
                    )
                  }}
                  tahun
                </th>
              </tr>
              <tr>
                <th width="150">Pendidikan Terakhir</th>
                <th width="10">:</th>
                <th>{{ detailTeacher.pendidikan_terakhir }}</th>
              </tr>
              <tr>
                <th width="150">Alamat Lengkap</th>
                <th width="10">:</th>
                <th>
                  {{ detailTeacher.alamat_lengkap ? detailTeacher.alamat_lengkap : "-" }}
                </th>
              </tr>
              <tr>
                <th width="150">Agama</th>
                <th width="10">:</th>
                <th>{{ detailTeacher.agama }}</th>
              </tr>
              <tr>
                <th width="150">Jenis Kelamin</th>
                <th width="10">:</th>
                <th>{{ detailTeacher.jenis_kelamin }}</th>
              </tr>
              <tr>
                <th width="150">Sumber Info</th>
                <th width="10">:</th>
                <th>{{ detailTeacher.info }}</th>
              </tr>
            </table>
          </div>
          <div class="col-md-6modal-body-kanan">
            <h5>Dokumen Tentor</h5>
            <div v-if="detailTeacher.user">
              Status Approval :
              <span :class="statusBadge(detailTeacher.verifikasi)">{{
                detailTeacher.verifikasi == 1
                  ? "Belum Diverifikasi"
                  : "Sudah Diverifikasi"
              }}</span>
            </div>
            <hr />
            <template v-if="detailTeacher.user_doc">
              <div
                v-for="(doc, index) in detailTeacher.user_doc"
                :key="'ud' + index"
                class="mb-3"
              >
                <h6 v-text="doc.doc_label"></h6>
                <div class="card">
                  <img
                    :src="ApiUrl(doc.doc_file)"
                    :alt="doc.doc_type"
                    class="card-img-top"
                    style="height: 250px; object-fit: contain"
                  />
                </div>
              </div>
            </template>
          </div>
        </div>
        <div class="modal-footer justify-content-center" style="border: 0px">
          <button
            class="btn btn-sm btn-outline-secondary"
            type="button"
            @click="$bvModal.hide('modal-detail-teacher')"
          >
            Tutup
          </button>
        </div>
      </template>
      <div style="min-height: 200px; position: relative" v-else>
        <UILoading />
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
      detailTeacher: {},
      showBukti: false,
      form: {
        status_verifikasi: null,
        alasan_penolakan: null
      }
    };
  },
  created() {
    this.getData("kursus");
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData("kursus");
    },
    "filter.page": function(value) {
      this.getData("kursus");
    }
  },
  methods: {
    resetModal() {
      this.detail = {};
      this.$bvModal.hide('modal-detail-teacher')
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
        case 2:
          statusClass += "info";
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
            this.form.status_verifikasi =
              this.detail.status_verifikasi == "Menunggu Verifikasi"
                ? null
                : this.detail.status_verifikasi;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getDetailTeacher(id) {
      this.$bvModal.show('modal-detail-teacher');
      this.loading = true;
      this.$axios
        .$get(`/api/users/teacher/find/${id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            this.detailTeacher = res.data;
          }
          return true;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    verifyCourse(status) {
      // if (!this.form.status_verifikasi) {
      //   this.showToastMessage("Status perlu dipilih", "warning");
      //   return;
      // }
      const conf = confirm("Apakah Anda yakin?");
      if (!conf) return false;

      this.submitting = true;
      this.$axios
        .$put(`/api/kursus/update/${this.selectedId}/verification`, {
          status: status
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$bvToast.toast("Status kelas kursus berhasil diperbarui!", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.items[this.selectedIndex].status_verifikasi = status;
            this.$bvModal.hide("modal-detail");
          }
          return true;
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
