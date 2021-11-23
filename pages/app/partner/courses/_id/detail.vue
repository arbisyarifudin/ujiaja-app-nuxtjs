<template>
  <div class="container-fluid">
    <div class="row" style="position: relative; z-index: 10;">
      <div class="col-md-12">
        <div class="d-flex align-items-center justify-content-between">
          <h2 class="dash-label">
            <b-spinner type="grow" class="mr-2" v-if="loading" /> Detail Kelas
          </h2>
          <BackUrl url="/app/partner/courses" />
        </div>
      </div>
      <div class="col-md-12">
        <UIMenuCourseDetail :data="dataDetail" :loading="loading"/>
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
                  <th width="150">Rating</th>
                  <td width="10">:</td>
                  <td>
                    <span style="font-size: 13px" class="text-star">
                      <i class="fas fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                    </span>
                    <span class="small">1/5</span>
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
              <li class="d-flex review-item">
                <img
                  src="/wilson.png"
                  alt="profile pic"
                  class="review-avatar"
                />
                <div class="review-data ml-md-4">
                  <div class="review-data__author">Wilson</div>
                  <div class="d-flex review-data__rating">
                    <div class="star mr-2">
                      <i class="fas fa-star fa-fw"></i>
                      <i class="fas fa-star fa-fw"></i>
                      <i class="fas fa-star fa-fw"></i>
                      <i class="fas fa-star fa-fw"></i>
                      <i class="fas fa-star fa-fw"></i>
                      <i class="fas fa-star fa-fw"></i>
                    </div>
                    <div class="time">3 hari lalu</div>
                  </div>
                  <div class="review-data__comment mt-2">
                    Excellent teaching style and reaches all of the most used
                    Javascript frameworks. Only a few areas need to be updated
                    due to time but still applicable.
                  </div>
                  <ul class="review-list review-list--child list-unstyled">
                    <li class="d-flex review-item">
                      <img
                        src="/randy.png"
                        alt="profile pic"
                        class="review-avatar"
                      />
                      <div class="review-data ml-md-4">
                        <div class="review-data__author">
                          Randy
                          <span class="ml-1 badge badge-primary">Tentor</span>
                        </div>
                        <div class="d-flex review-data__rating">
                          <div class="time">3 hari lalu</div>
                        </div>
                        <div class="review-data__comment mt-2">
                          Excellent teaching style and reaches all of the most
                          used Javascript frameworks. Only a few areas need to
                          be updated due to time but still applicable.
                        </div>
                        <div
                          class="review-action d-flex justify-content-end mt-2"
                        >
                          <div>
                            <button class="btn btn-light btn-sm square">
                              Ubah
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="d-flex review-item">
                <img src="/rizky.png" alt="profile pic" class="review-avatar" />
                <div class="review-data ml-md-4">
                  <div class="review-data__author">Rizky</div>
                  <div class="d-flex review-data__rating">
                    <div class="star mr-2">
                      <i class="fas fa-star fa-fw"></i>
                      <i class="fas fa-star fa-fw"></i>
                      <i class="fas fa-star fa-fw"></i>
                      <i class="fas fa-star fa-fw"></i>
                      <i class="fas fa-star fa-fw"></i>
                      <i class="far fa-star fa-fw"></i>
                    </div>
                    <div class="time">3 hari lalu</div>
                  </div>
                  <div class="review-data__comment mt-2">
                    Excellent teaching style and reaches all of the most used
                    Javascript frameworks. Only a few areas need to be updated
                    due to time but still applicable.
                  </div>
                  <ul class="review-list review-list--child list-unstyled">
                    <li class="review-item">
                      <div class="review-reply">
                        <label class="form-label">Balas Ulasan:</label>
                        <textarea rows="3" class="form-control"></textarea>
                        <div class="d-flex justify-content-end mt-3">
                          <button class="btn btn-primary square">Balas</button>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
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
      youtubeVideoId: ""
    };
  },
  created() {
    if (!this.$route.params.id)
      return this.$router.push("/app/partner/courses");
    this.getDetail("kursus", this.$route.params.id);
  },
  methods: {
    resetModal() {},
    getDetail(type, id) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}/find/${id}`)
        .then(res => {
          console.log(res);
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
      console.log(tanggal);
      return this.moment(tanggal).format("HH:mm");
    }
  }
};
</script>

<style></style>
