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
        <div
          class="header-detail bg-white my-4 px-5 py-4"
          style="display: flex; justify-content: space-between; align-items: center;"
        >
           <h3 class="mb-0">Kursus Belajar Bahasa Indonesia</h3>
          <div v-if="!loading">
            <router-link
              :to="`/app/partner/courses/${dataDetail.id}/edit`"
              role="button"
              z
              class="btn btn-success square py-1 mr-2"
            >
              Ubah Kelas
            </router-link>
            <button
              type="button"
              class="btn btn-danger square py-1"
              v-b-modal.modal-option
            >
              <i class="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </div>
      </div>
      <div class="col-md-12 my-3">
        <div class="bg-white px-4 py-4">
          <div class="row">
            <div class="col-md-5">
              <h4>Detail</h4>
              <hr>
              <table class="table table-borderless">
                <tr>
                  <th width="150">Tentor</th>
                  <td width="10">:</td>
                  <td>Budi Karyadi</td>
                </tr>
                <tr>
                  <th width="150">Level</th>
                  <td width="10">:</td>
                  <td>Tentor baru</td>
                </tr>
                <tr>
                  <th width="150">Rating</th>
                  <td width="10">:</td>
                  <td>
                    <div style="font-size: 13px" class="text-star">
                      <i class="fas fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                      <i class="far fa-star"></i>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th width="150">Mata Pelajaran</th>
                  <td width="10">:</td>
                  <td>Matematika</td>
                </tr>
                <tr>
                  <th width="150">Jenjang</th>
                  <td width="10">:</td>
                  <td>SMA</td>
                </tr>
                <tr>
                  <th width="150">Total</th>
                  <td width="10">:</td>
                  <td>100 siswa</td>
                </tr>
                <tr>
                  <th width="150">Tarif per Sesi</th>
                  <td width="10">:</td>
                  <td>Rp 50.000</td>
                </tr>
              </table>
              <!-- <hr> -->
              <h4 class="mt-3">Jadwal</h4>
              <hr>
              <table class="table table-borderless">
                <tr>
                  <th width="150">Senin</th>
                  <td>10:00 - 15:00 WIB</td>
                </tr>
              </table>
            </div>
            <div class="col-md-7">
              <div class="media-box media-box--youtube">
                <iframe
                  :src="
                    `https://www.youtube.com/embed/rbe66YL5LgQ?controls=0`
                  "
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div class="text-description mt-3">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eligendi officia perferendis quas harum sit totam itaque hic dolorem magni aliquam, quod repellendus explicabo illo ducimus modi, eaque iure nam at?
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-12 my-3">
        <div class="bg-white px-4 py-4">
          <h4>Ulasan</h4>
          <hr class="mb-0">
          <div class="courses-review review">
            <ul class="review-list list-unstyled">
              <li class="d-flex review-item">
                <img src="/wilson.png" alt="profile pic" class="review-avatar">
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
                    Excellent teaching style and reaches all of the most used Javascript frameworks. Only a few areas need to be updated due to time but still applicable.
                  </div>
                  <ul class="review-list review-list--child list-unstyled">
                    <li class="d-flex review-item">
                      <img src="/randy.png" alt="profile pic" class="review-avatar">
                      <div class="review-data ml-md-4">
                        <div class="review-data__author">Randy <span class="ml-1 badge badge-primary">Tentor</span></div>
                        <div class="d-flex review-data__rating">
                          <div class="time">3 hari lalu</div>
                        </div>
                        <div class="review-data__comment mt-2">
                          Excellent teaching style and reaches all of the most used Javascript frameworks. Only a few areas need to be updated due to time but still applicable.
                        </div>
                        <div class="review-action d-flex justify-content-end mt-2">
                          <div><button class="btn btn-light btn-sm square">Ubah</button></div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </li>
              <li class="d-flex review-item">
                <img src="/rizky.png" alt="profile pic" class="review-avatar">
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
                    Excellent teaching style and reaches all of the most used Javascript frameworks. Only a few areas need to be updated due to time but still applicable.
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
          Kelas tidak akan ditampilkan dalam pencarian dan siswa tidak bisa mengakses Kelas les privat ini. Atau hapus kelas secara permanen, maka semua data dalam kelas akan dihapus dari Sistem.
        </p>
        <div class="modal-footer justify-content-end" style="border: 0px">
          <button
            class="btn btnutline-secondary"
            type="button"
            @click="$bvModal.hide('modal-option')"
          >
            Tidak
          </button>
          <button
            class="btn btn-primary tambah px-4 py-2"
            type="button"
            :disabled="loading"
            @click.prevent="deleteData('produk')"
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
  layout: "app",
  data() {
    return {
      loading: true,
      dataDetail: {}
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
          }
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
        .$delete(`/api/${type}/delete/${this.$route.params.id}`)
        .then(res => {
          console.log(res);
          if (res.success) {
            // this.items.splice(this.selectedIndex, 1);
            this.$root.$bvToast.toast("Data " + type + " berhasil dihapus.", {
              title: "Sukses",
              variant: "success",
              solid: true,
              autoHideDelay: 3000
            });
            this.$bvModal.hide("modal-delete");
            this.$router.replace("/administrator/product");
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
    }
  }
};
</script>

<style></style>
