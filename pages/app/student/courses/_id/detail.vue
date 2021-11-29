<template>
  <div class="container-fluid">
    <div class="row" style="position: relative; z-index: 10">
      <div class="col-md-12">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Detail Kelas
          </h2>
          <BackUrl url="/app/student/courses" />
        </div>
      </div>
      <div class="col-md-12">
        <UIMenuCourseDetailStudent
          :data="dataDetail"
          :data2="dataDetailByStudent"
          :loading="loading"
        />
      </div>
      <div class="col-md-12 my-3">
        <div class="bg-white px-4 py-4">
          <div class="row">
            <div class="col-md-5">
              <h4>Detail</h4>
              <hr />
              <table class="table table-borderless">
                <tbody>
                  <tr>
                    <th width="150">Tentor</th>
                    <td width="10">:</td>
                    <td>{{ dataDetail.tentor.nama_lengkap }}</td>
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

              <!-- <hr> -->
              <h4 class="mt-3">Jadwal</h4>
              <hr />
              <table class="table table-borderless">
                <tbody>
                  <tr
                    v-for="(jadwal, index) in dataDetail.jadwals"
                    :key="'j' + index"
                  >
                    <th width="150">{{ jadwal.hari_jadwal }}</th>
                    <td v-if="jadwal.is_tutup == 0">
                      {{ formatJam(jadwal.jam_mulai_jadwal) }} -
                      {{ formatJam(jadwal.jam_akhir_jadwal) }} WIB
                    </td>
                    <td v-else><span class="badge badge-info">Libur</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col-md-7">
              <h4>Video Promosi</h4>
              <hr />
              <div class="media-box media-box--youtube">
                <div class="media-box__icon" v-if="!youtubeVideoId">
                  <i class="fab fa-youtube"></i>
                </div>
                <iframe
                  v-else
                  :src="
                    `https://www.youtube.com/embed/${youtubeVideoId}?controls=0`
                  "
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div
                class="text-description mt-3"
                v-html="dataDetail.deskripsi_kursus"
              ></div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 my-3">
        <div class="bg-white px-4 py-4">
          <h4>Ulasan</h4>
          <hr class="mb-0" />
          <div
            class="review-reply mt-4"
            :ref="'formTambah'"
            :id="'formTambah'"
            v-if="
              !myUlasan &&
                dataDetailByStudent &&
                dataDetailByStudent.status_dikelas == 'Sesi Selesai'
            "
          >
            <!-- <label class="form-label">Tulis Ulasan:</label> -->
            <textarea
              placeholder="Tulis ulasan Anda..."
              rows="3"
              class="form-control"
              v-model="form.ulasan"
            ></textarea>
            <div class="d-flex justify-content-between align-items-center mt-3">
              <div>
                <span>Penilaian :</span>
                <star-rating :star-size="30" :show-rating="false" v-model="form.nilai"></star-rating>
                <!-- <b-select
                  v-model="form.nilai"
                  style="width: auto"
                  class="mx-2"
                  :options="[
                    { text: 'Sangat Bagus', value: 5 },
                    { text: 'Bagus', value: 4 },
                    { text: 'Cukup', value: 3 },
                    { text: 'Buruk', value: 2 },
                    { text: 'Sangat Buruk', value: 1 }
                  ]"
                ></b-select> -->
               
              </div>
              <div>
                <span>Ulas sebagai :</span>
                <b-select
                  v-model="form.privasi"
                  style="width: auto"
                  class="mx-2"
                  :options="[
                    { text: 'Publik', value: 'Publik' },
                    { text: 'Anonim', value: 'Anonim' }
                  ]"
                ></b-select>
                <button
                  class="btn btn-primary square"
                  @click.prevent="buatUlasan"
                  :disabled="submitting"
                >
                  <b-spinner small v-if="submitting"></b-spinner>
                  Kirim Ulasan
                </button>
              </div>
            </div>
            <hr />
          </div>
          <div class="courses-review review">
            <ul class="review-list list-unstyled" v-if="ulasan.list && ulasan.list.length > 0">
              <li
                class="d-flex review-item"
                v-for="(item, index) in ulasan.list"
                :key="'uls' + index"
              >
                <img
                  :src="
                    item.privasi == 'Publik'
                      ? ApiUrl(item.foto_pengulas)
                      : noImage
                  "
                  @error="noImage"
                  alt="profile pic"
                  class="review-avatar"
                />
                <div class="review-data ml-md-4">
                  <div class="review-data__author">{{ item.pengulas }}</div>
                  <div class="d-flex review-data__rating">
                    <div class="star mr-2">
                      <i
                        class="fas fa-star fa-fw"
                        v-for="i in item.nilai"
                        :key="'fas' + i"
                      ></i>
                      <i
                        class="far fa-star fa-fw"
                        v-for="x in 5 - item.nilai"
                        :key="'far' + x"
                      ></i>
                    </div>
                    <div class="time">{{ formatTanggal(item.tanggal) }}</div>
                  </div>
                  <div class="review-data__comment mt-2">
                    {{ item.ulasan }}
                  </div>
                  <div
                    class="review-action d-flex justify-content-end mt-2"
                    v-if="item.id_siswa == user.id"
                  >
                    <!-- <button class="btn btn-light btn-sm square">
                      Hapus
                    </button> -->
                    <button
                      class="btn btn-light btn-sm square"
                      :ref="'openUbah-' + index"
                      @click.prevent="openUbah(index)"
                    >
                      Ubah
                    </button>
                  </div>
                  <div
                    class="review-reply"
                    :ref="'formUbah-' + index"
                    :id="'formUbah-' + index"
                    style="display: none"
                  >
                    <label class="form-label">Ubah Ulasan:</label>
                    <textarea
                      rows="3"
                      class="form-control"
                      v-model="item.ulasan"
                    ></textarea>
                    <div
                      class="d-flex justify-content-between align-items-center mt-3"
                    >
                      <div>
                        <span>Penilaian :</span>
                        <!-- <b-select
                          v-model="item.nilai"
                          style="width: auto"
                          class="mx-2"
                          :options="[
                            { text: 'Sangat Bagus', value: 5 },
                            { text: 'Bagus', value: 4 },
                            { text: 'Cukup', value: 3 },
                            { text: 'Buruk', value: 2 },
                            { text: 'Sangat Buruk', value: 1 }
                          ]"
                        ></b-select> -->
                        <star-rating :star-size="30" :show-rating="false" v-model="item.nilai"></star-rating>
                      </div>
                      <div>
                        <span>Ulas sebagai :</span>
                        <b-select
                          v-model="item.privasi"
                          style="width: auto"
                          class="mx-2"
                          :options="[
                            { text: 'Publik', value: 'Publik' },
                            { text: 'Anonim', value: 'Anonim' }
                          ]"
                        ></b-select>
                        <button
                          class="btn btn-primary square"
                          @click.prevent="simpanUlasan(item, index)"
                          :disabled="submitting"
                        >
                          <b-spinner small v-if="submitting"></b-spinner>
                          Simpan Ulasan
                        </button>
                      </div>
                    </div>
                  </div>
                  <ul class="review-list review-list--child list-unstyled">
                    <li class="d-flex review-item" v-if="item.balasan">
                      <img
                        :src="ApiUrl(item.foto_balasan)"
                        @error="noImage"
                        alt="profile pic"
                        class="review-avatar"
                      />
                      <div class="review-data ml-md-4">
                        <div class="review-data__author">
                          {{ dataDetail.tentor.nama_lengkap }}
                          <span class="ml-1 badge badge-primary">Tentor</span>
                        </div>
                        <div class="d-flex review-data__rating">
                          <div class="time">
                            {{ formatTanggal(item.tanggal_balasan) }}
                          </div>
                        </div>
                        <div class="review-data__comment mt-2">
                          {{ item.balasan }}
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </div>
          <div class="pos-relative" v-if="loading">
            <UILoading />
          </div>
          <div
            class="pos-relative"
            v-if="ulasan.list && ulasan.list.length < 1 && !loading"
          >
            <UITableNotFound text="Belum ada ulasan untuk kelas kursus ini." />
          </div>
        </div>
      </div>
    </div>
    <b-modal
      id="modal-finish"
      title="Konfirmasi Selesaikan Sesi"
      hide-footer
      centered
      modal-class="admin-modal"
      @hidden="resetModal"
    >
      <div>
        <p class="modal-text">
          Apakah kamu yakin ingin konfirmasi selesaikan sesi? Harap konfirmasi
          jika memang sesi dengan Tentor ini sudah selesai.
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btn-sm btn-success tambah px-4 py-2"
            type="button"
            :disabled="submitting"
            @click.prevent="selesaikanSesi"
          >
            <b-spinner small v-if="submitting" class="mr-1"></b-spinner>
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
      dataDetailByStudent: {}
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
    this.getDetail("kursus", this.$route.params.id);
    this.getDetailByStudent();
    this.getUlasan();
  },
  methods: {
    resetModal() {},
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
    getDetailByStudent() {
      this.loading = true;
      this.$axios
        .$get(`/api/kursus-siswa/find/${this.$route.params.id}/student`)
        .then(res => {
          if (res.success) {
            this.dataDetailByStudent = res.data;
          }
        })
        .catch(err => {
          console.log(err);
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
    getUlasan() {
      this.loading = true;
      this.$axios
        .$get("api/kursus-ulasan", {
          params: {
            q: "",
            paginate: 10
          }
        })
        .then(res => {
          if (res.success) {
            this.ulasan.list = res.data.data;
            this.ulasan.totalRows = res.data.total;
            this.ulasan.perPage = res.data.per_page;
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
    openUbah(index) {
      const refs1 = this.$refs["openUbah-" + index];
      const refs2 = this.$refs["formUbah-" + index];
      if (refs2 && refs2[0]) {
        refs1[0].style = "display: none";
        refs2[0].style = "display: block";
      }
    },
    simpanUlasan(data, index) {
      this.submitting = true;
      this.$axios
        .$put("api/kursus-ulasan/update/" + data.id, {
          nilai: data.nilai,
          ulasan: data.ulasan,
          privasi: data.privasi
        })
        .then(res => {
          this.showToastMessage("Balasan berhasil disimpan!", "success");
          const refs = this.$refs["formUbah-" + index];
          if (refs && refs[0]) {
            refs[0].style = "display: none";
            const refs2 = this.$refs["openUbah-" + index];
            if (refs2 && refs2[0]) {
              refs2[0].style = "display: block";
            }
          }
          data.pengulas = res.data.pengulas;
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.submitting = false));
    },
    buatUlasan() {
      this.submitting = true;
      const dataCreate = {
        ...this.form,
        id_siswa: this.user.id,
        id_kursus: this.$route.params.id
      };
      this.$axios
        .$post("api/kursus-ulasan/create/", dataCreate)
        .then(res => {
          this.showToastMessage("Balasan berhasil dikirimkan!", "success");
          const refs = this.$refs.formTambah;
          if (refs) {
            refs.style = "display: none";
          }

          window.location.href = ''
          // if(this.ulasan.list && this.ulasan.list.length < 1) {
          //   this.ulasan.list.push({
          //     ...dataCreate,
          //     pengulas: this.userDetail.nama_lengkap,
          //     foto_pengulas: this.userDetail.foto,
          //     tanggal: res.data.created_at,
          //     id: res.data.id
          //   });
          // } else {
          //    this.ulasan.list.unshift({
          //     ...dataCreate,
          //     pengulas: this.userDetail.nama_lengkap,
          //     foto_pengulas: this.userDetail.foto,
          //     tanggal: res.data.created_at,
          //     id: res.data.id
          //   });
          // }
          // console.log(this.ulasan.list)
          // this.getUlasan()

        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
        })
        .finally(() => (this.submitting = false));
    },
    selesaikanSesi() {
      this.submitting = true;
      this.$axios
        .$put(
          `/api/kursus-siswa/update/${this.dataDetailByStudent.id}/status`,
          {
            status_dikelas: "Sesi Selesai"
          }
        )
        .then(res => {
          console.log(res);
          if (res.success) {
            this.$root.$bvToast.toast(
              "Sesi berhasil dikonfirmasi! Terima kasih sudah bersama kami. Jangan lupa tinggalkan ulasanmu yah.",
              {
                title: "Sukses",
                variant: "success",
                solid: true,
                autoHideDelay: 3000
              }
            );
            this.dataDetailByStudent = res.data;
            this.$bvModal.hide("modal-finish");
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
