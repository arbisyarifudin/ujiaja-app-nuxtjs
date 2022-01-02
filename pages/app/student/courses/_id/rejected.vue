<template>
  <div class="container-fluid">
    <div class="row" style="position: relative; z-index: 10">
      <div class="col-md-12">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Permintaan
            Bergabung Ditolak
          </h2>
          <BackUrl url="/app/student/courses" />
        </div>
      </div>
      <div class="col-md-12">
        <div class="header-detail bg-white my-4 px-5 py-4">
          <!-- <h3 class="mb-0">
            {{dataDetail.nama_kursus}}
          </h3>
          <hr> -->
          <div>
            <p>
              Kamu telah <b>ditolak</b> oleh Tentor pada kelas kursus ini. Ini
              dikarenakan kuota penuh atau Tentor belum dapat memenuhi
              permintaan siswa baru. Maka dari itu kami telah memberikan
              <b>alternatif kelas kursus lainnya</b> yang senilai dengan harga
              kursus pada kelas yang ditolak ini. Atau kamu juga bisa melakukan
              <b>refund dana</b> jika tidak ada kelas yang diinginkan / kuota
              sudah penuh / ditolak berkali-kali oleh Tentor.
            </p>
          </div>
        </div>
      </div>
      <div class="col-md-12 my-3">
        <div class="bg-white px-4 py-4">
          <div class="row">
            <div class="col-md-5">
              <h4>Detail Kelas yang Ditolak</h4>
              <hr />
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <th width="150">Nama Kelas</th>
                    <td width="10">:</td>
                    <td>{{ dataDetail.nama_kursus }}</td>
                  </tr>
                  <tr>
                    <th width="150">Tentor</th>
                    <td width="10">:</td>
                    <td>
                      <div class="d-flex align-items-center">
                        {{ dataDetail.tentor.nama_lengkap }}
                        <button
                          v-if="dataDetail.tentor"
                          class="btn btn-light px-2 ml-2"
                          @click.prevent="
                            getDetailTeacher(dataDetail.tentor.id_teacher)
                          "
                        >
                          <i class="fa fa-search"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <th width="150">Level</th>
                    <td width="10">:</td>
                    <td>
                      {{
                        dataDetail.tentor.level
                          ? dataDetail.tentor.level.nama_level
                          : "-"
                      }}
                    </td>
                  </tr>
                  <tr>
                    <th width="150">Rating Kelas</th>
                    <td width="10">:</td>
                    <td>
                      <span
                        style="font-size: 13px"
                        class="text-star"
                        v-html="rerataUlasan(dataDetail.rerata_ulasan)"
                      >
                      </span>
                      <span class="small"
                        >{{ dataDetail.rerata_ulasan }}/5</span
                      >
                    </td>
                  </tr>
                  <tr>
                    <th width="150">Mata Pelajaran</th>
                    <td width="10">:</td>
                    <td>{{ dataDetail.mapel.nama_mapel }}</td>
                  </tr>
                  <tr>
                    <th width="150">Jenjang</th>
                    <td width="10">:</td>
                    <td>{{ dataDetail.jenjang.nama_jenjang }}</td>
                  </tr>
                  <tr>
                    <th width="150">Total</th>
                    <td width="10">:</td>
                    <td>{{ dataDetail.total_siswa }} siswa</td>
                  </tr>
                  <tr>
                    <th width="150">Tarif per Sesi</th>
                    <td width="10">:</td>
                    <td>Rp {{ dataDetail.harga_kursus_label }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="text-center">
                <a
                  :href="`/app/student/courses/${dataDetail.id}/detail`"
                  target="_blank"
                  class="btn btn-sm btn-outline-primary square"
                  >Lihat detail kelas lebih lengkap</a
                >
              </div>
            </div>
            <div class="col-md-7">
              <h4>Alternatif Kelas Lain Yang Bisa Kamu Pilih</h4>
              <hr />
              <b-list-group class="other-courses-list">
                <b-list-group-item
                  v-for="(item, index) in dataKelasLain"
                  :key="'dkl' + index"
                >
                  <div class="d-flex justify-content-between">
                    <div class="h5">
                      {{ item.nama_kursus }}
                      <a
                        :href="`/app/student/courses/${item.id}/detail`"
                        target="_blank"
                        class="btn btn-sm btn-light bg-transparent px-2"
                        ><i class="fas fa-search fa-fw"></i
                      ></a>
                    </div>
                    <div>Rp {{ formatRupiah(item.harga_kursus) }}</div>
                  </div>
                  <div class="d-flex justify-content-between">
                    <div class="">
                      <i class="fas fa-user fa-fw mr-1"></i>
                      {{ item.tentor ? item.tentor.nama_lengkap : "-" }}
                    </div>
                    <button
                      class="btn btn-primary btn-sm square"
                      style="font-size: 12px"
                      :disabled="submitting"
                      @click.prevent="
                        selectedName = item.nama_kursus;
                        selectedId = item.id;
                        $bvModal.show('modal-join');
                      "
                    >
                      <b-spinner
                        small
                        v-if="submitting"
                        class="mr-1"
                      ></b-spinner>
                      <i class="fas fa-fw fa-sign-in-alt mr-1" v-else></i>
                      Gabung Kelas Ini
                    </button>
                  </div>
                </b-list-group-item>
                <b-list-group-item
                  v-if="dataKelasLain && dataKelasLain.length < 1 && !loading"
                >
                  <div class="text-center" style="font-size: 14px">
                    Mohon maaf, data alternatif kelas lain tidak ditemukan. Ini
                    bisa dikarenakan tidak ada kelas yang cocok/sama dengan
                    kelas yang sebelumnya kamu pilih atau sebab lainnya. Silakan
                    hubungi kami melalui menu pengaduan atau kamu juga bisa
                    lakukan refund dana jika diperlukan.
                  </div>
                </b-list-group-item>
                <b-list-group-item>
                  <div class="d-flex justify-content-center">
                    <nuxt-link
                      to="/app/ticket"
                      class="btn btn-primary btn-sm square mr-2"
                      ><i class="fas fa-envelope fa-fw mr-1"></i> Hubungi Kami</nuxt-link
                    >
                    <!-- <nuxt-link
                      to="/"
                      class="btn btn-outline-secondary btn-sm square"
                      >Lakukan Refund Dana</nuxt-link
                    > -->
                  </div>
                </b-list-group-item>
              </b-list-group>
            </div>
          </div>
        </div>
        <UILoading v-if="loading" />
      </div>
    </div>

    <b-modal
      id="modal-join"
      title="Konfirmasi Bergabung"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModalJoin"
    >
      <div>
        Apakah kamu yakin ingin bergabung di kelas <b>{{ selectedName }}</b
        >?
      </div>
      <div class="modal-footer justify-content-center" style="border: 0px">
        <button
          class="btn btn-sm btn-outline-secondary"
          type="button"
          @click="$bvModal.hide('modal-join')"
        >
          Batal
        </button>
        <button
          class="btn btn-primary btn-sm square"
          :disabled="submitting"
          @click="joinAfterRejected"
        >
          <b-spinner small v-if="submitting" class="mr-1"></b-spinner>
          Ya, Saya Yakin
        </button>
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
          <div class="col-md-12 modal-body-kiri">
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
                      ? "Belum Terverifikasi"
                      : "Terverifikasi"
                  }}</span>
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
                <th width="150">Jenis Kelamin</th>
                <th width="10">:</th>
                <th>{{ detailTeacher.jenis_kelamin }}</th>
              </tr>
            </table>
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
  layout: "app",
  data() {
    return {
      loading: true,
      dataDetail: {
        mapel: {},
        tentor: {},
        jenjang: {},
        penjurusan: {},
        jadwals: []
      },
      youtubeVideoId: "",
      ulasan: {
        list: [],
        totalRows: 10,
        perPage: 10
      },
      submitting: false,
      form: {
        nilai: 3,
        ulasan: "",
        privasi: "Publik"
      },
      detailTeacher: {},
      filterKelasLain: {
        totalRows: 10,
        perPage: 10
      },
      dataKelasLain: [],
      dataReject: {
        kursus: {}
      },
      selectedName: "",
      selectedId: null
    };
  },
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    userDetail() {
      return this.$store.state.dataUser.detail;
    },
    myUlasan() {
      return this.ulasan.list.find(item => item.id_siswa == this.user.id);
    }
  },
  created() {
    if (!this.$route.params.id)
      return this.$router.push("/app/partner/courses");

    if (!this.$route.query.notifId || !this.$route.query.rejectId) {
      return this.$router.replace({ path: "/app/student/courses" });
    }
    this.getDataReject(this.$route.query.rejectId)
    this.getDetail("kursus", this.$route.params.id);
    this.getKelasLain();
  },
  methods: {
    resetModal() {},
    resetModalTeacher() {
      this.detailTeacher = {};
    },
    resetModalJoin() {
      this.selectedName = "";
      this.selectedId = "";
    },
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          if (res.success) {
            this.dataDetail = res.data;
            this.youtubeVideoId = this.generateYoutubeVideoId(
              this.dataDetail.video_kursus
            );
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    generateYoutubeVideoId(url) {
      if (!url) return;
      const youtubeUrlSplit = url.split("?v=");
      if (youtubeUrlSplit[1]) {
        return youtubeUrlSplit[1];
      }
      return;
    },
    formatJam(jam) {
      const tanggal = "2021-01-01 " + jam;
      return this.moment(tanggal).format("HH:mm");
    },
    getDataReject(id) {
      this.loading = true;
      this.$axios
        .$get(`/api/kursus-siswa/find/${id}`)
        .then(res => {
          if (res.success) {
            this.dataReject = res.data;
          }
        })
        .catch(err => {
          console.log(err);
          this.showToastMessage("Data tidak ditemukan!");
          return this.$router.replace({ path: "/app/student/courses" });
          // this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    getKelasLain() {
      this.loading = true;
      this.$axios
        .$get("api/kursus/kelas-lain/" + this.$route.params.id, {
          params: {
            q: "",
            paginate: this.filterKelasLain.perPage
          }
        })
        .then(res => {
          if (res.success) {
            this.dataKelasLain = res.data;
            this.filterKelasLain.totalRows = res.data.length;
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.loading = false));
    },
    rerataUlasan(rataRata) {
      const rataRataFloor = Math.floor(rataRata);
      const sisaDesimal = Math.round(rataRata - rataRataFloor);

      let element = "";
      for (let i = 0; i < rataRataFloor; i++) {
        element += '<i class="fas fa-star fa-fw text-star"></i>';
      }
      for (let x = 0; x < sisaDesimal; x++) {
        element += '<i class="fas fa-star-half-alt fa-fw text-star"></i>';
      }
      for (let x = 0; x < 5 - rataRataFloor - sisaDesimal; x++) {
        element += '<i class="far fa-star fa-fw text-star"></i>';
      }

      return element;
    },
    getDetailTeacher(id) {
      this.$bvModal.show("modal-detail-teacher");
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
    statusBadge(status) {
      let statusClass = "badge badge-";
      switch (status) {
        case 0:
          statusClass += "secondary";
          break;
        case 1:
          statusClass += "info";
          break;
        case 2:
          statusClass += "success";
          break;
        default:
          statusClass += "warning";
          break;
      }
      return statusClass;
    },
    joinAfterRejected() {
      this.submitting = true;
      this.$axios
        .$post(`/api/kursus-siswa/join-after-reject`, {
          rejectId: this.dataReject.id,
          from: this.$route.params.id,
          to: this.selectedId
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.showToastMessage("Permintaan bergabung berhasil dikirimkan!", 'success');
            this.$router.replace({ path: "/app/student/courses" });
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

<style></style>
