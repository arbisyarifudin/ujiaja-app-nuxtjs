<template>
  <div class="container-fluid">
    <div class="row" style="position: relative; z-index: 10">
      <div class="col-md-12">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Detail Kelas
          </h2>
          <BackUrl url="/user/partner/courses" />
        </div>
      </div>
      <div class="col-md-12">
        <UIMenuCourseDetail :data="dataDetail" :loading="loading" />
      </div>
      <div class="col-md-12 my-3">
        <div class="bg-white px-4 py-4">
          <div class="row">
            <div class="col-md-5">
              <h4>Detail</h4>
              <hr />
              <table class="table table-borderless">
                <tr>
                  <th width="150">Tentor</th>
                  <td width="10">:</td>
                  <td>{{ dataDetail.tentor.nama_lengkap }}</td>
                </tr>
                <tr>
                  <th width="150">Model Belajar</th>
                  <td width="10">:</td>
                  <td>
                    <span class="badge badge-success">{{
                      dataDetail.model_belajar
                    }}</span>
                  </td>
                </tr>
                <tr v-if="dataDetail.model_belajar == 'Offline'">
                  <th width="150">Alamat</th>
                  <td width="10">:</td>
                  <td>
                    {{dataDetail.alamat}}, {{dataDetail.nama_kecamatan}}, {{dataDetail.nama_kota}}, {{dataDetail.nama_provinsi}}
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
                    <span class="small">{{ dataDetail.rerata_ulasan }}/5</span>
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
              </table>

              <!-- <hr> -->
              <h4 class="mt-3">Jadwal</h4>
              <hr />
              <table class="table table-borderless">
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
              </table>
            </div>
            <div class="col-md-7">
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
          <div class="courses-review review">
            <ul class="review-list list-unstyled">
              <li
                class="d-flex review-item"
                v-for="(item, index) in ulasan.list"
                :key="'uls' + index"
              >
                <img
                  :src="item.privasi == 'Publik' ? ApiUrl(item.foto) : noImage"
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
                  <div class="review-action d-flex justify-content-end mt-2" v-if="!item.tanggal_balasan">
                    <button class="btn btn-primary btn-sm square" :ref="'openBalasan-'+index" @click.prevent="openBalasan(index)">Balas</button>
                  </div>
                  <ul class="review-list review-list--child list-unstyled">
                    <li class="d-flex review-item" v-if="item.tanggal_balasan">
                      <img
                        v-if="ApiUrl"
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
                        <div
                          class="review-action d-flex justify-content-end mt-2"
                        >
                          <div>
                            <button class="btn btn-light btn-sm square" :ref="'openBalasan-'+index" @click.prevent="openBalasan(index)">
                              Ubah
                            </button>
                          </div>
                        </div>
                        <div class="review-reply" :ref="'formBalasan-'+index" :id="'formBalasan-'+index" style="display: none">
                          <label class="form-label">Ubah Ulasan:</label>
                          <textarea
                            rows="3"
                            class="form-control"
                            v-model="item.balasan"
                          ></textarea>
                          <div class="d-flex justify-content-end mt-3">
                            <button
                              class="btn btn-primary square"
                              @click.prevent="balasUlasan(item, index, true)"
                            :disabled="submitting"
                          >
                            <b-spinner small v-if="submitting"></b-spinner>
                            Balas
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                    <li class="review-item" v-else>
                      <div class="review-reply" :ref="'formBalasan-'+index" :id="'formBalasan-'+index"  style="display: none">
                        <label class="form-label">Balas Ulasan:</label>
                        <textarea
                          rows="3"
                          class="form-control"
                          v-model="item.balasan"
                        ></textarea>
                        <div class="d-flex justify-content-end mt-3">
                          <button
                            class="btn btn-primary square"
                            @click.prevent="balasUlasan(item, index)"
                            :disabled="submitting"
                          >
                            <b-spinner small v-if="submitting"></b-spinner>
                            Balas
                          </button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
             <div class="pos-relative" v-if="ulasan.list && ulasan.list.length < 1">
              <UITableNotFound text="Belum ada ulasan untuk kelas kursus ini."/>
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
      dataUlasan: [],
      ulasan: {
        list: [],
        totalRows: 10,
        perPage: 10
      },
      submitting: false
    };
  },
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    userDetail() {
      return this.$store.state.dataUser.detail;
    }
  },
  created() {
    if (!this.$route.params.id)
      return this.$router.push("/user/partner/courses");
    this.getDetail("kursus", this.$route.params.id);
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
            if(this.dataDetail.id_tentor !== this.user.id) {
              return this.$router.replace('/user/partner/courses');
            }
          }
        })
        .catch(err => {
          console.log(err);
          this.catchError(err);
          return this.$router.replace('/user/partner/courses');
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
            this.$router.replace("/user/partner/courses");
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
    formatRupiah(num) {
      if (num) {
        return num.toLocaleString("ID-id");
      }
      return 0;
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
            id_kursus: this.$route.params.id,
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
      for (let x = 0; x < (5 - rataRataFloor - sisaDesimal); x++) {
        element += '<i class="far fa-star fa-fw text-star"></i>';
      }

      return element;
    },
    openBalasan(index) {
      const refs1 = this.$refs['openBalasan-'+index];
      const refs2 = this.$refs['formBalasan-'+index];
      if(refs2 && refs2[0]) {
        refs1[0].style = 'display: none'
        refs2[0].style = 'display: block'
      }
    },
    balasUlasan(ulasan, index, isEdit = false) {
      this.submitting = true;
      this.$axios
        .$put("api/kursus-ulasan/reply/" + ulasan.id, {
          balasan: ulasan.balasan
        })
        .then(res => {
          this.showToastMessage("Balasan berhasil di-submit!", "success");
          ulasan.tanggal_balasan = res.data.tanggal_balasan
          const refs = this.$refs['formBalasan-'+index];
          if(refs && refs[0]) {
            refs[0].style = 'display: none'
            if(isEdit) {
              const refs2 = this.$refs['openBalasan-'+index];
               if(refs2 && refs2[0]) {
                 refs2[0].style = 'display: block'
                }
            }
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
