<template>
  <div>
    <HeaderKarirDetail />
    <div class="program-studi mb-5 mt-n5">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-lg-9 col-md-8">
            <div class="cari text-center pt-3 pb-5 mt-n3">
              <h3 class="mb-4">Deskripsi Perusahaan</h3>
              <div class="text-left">
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. At ac
                  dictum etiam consectetur suspendisse. Lobortis porttitor quam
                  ac maecenas vitae etiam sit. Ac orci integer dignissim
                  tincidunt faucibus. In augue quis adipiscing penatibus.
                  Tincidunt vestibulum id morbi nascetur diam et cursus. Cursus
                  enim, integer enim, leo in nam nulla id. Enim, morbi augue
                  tincidunt egestas et turpis non. Nulla vel adipiscing molestie
                  quisque nec sed in enim, volutpat. Lacus sed cursus imperdiet
                  sociis at mollis nunc pulvinar. Pharetra suspendisse tellus ut
                  pellentesque eu natoque libero. Iaculis risus, euismod luctus
                  ultrices sed. In quis vestibulum, convallis arcu faucibus
                  viverra cursus iaculis.
                </p>
              </div>
              <h3 class="mb-3">Uraian Tugas</h3>
              <div class="text-left">
                <ol>
                  <li>Buat konsep visual berdasarkan persyaratan</li>
                  <li>
                    Pelajari ringkasan desain dan tentukan ruang lingkup proyek
                  </li>
                  <li>Siapkan draf kasar dan sajikan ide</li>
                  <li>
                    Buat elemen atau aset visual seperti video, ilustrasi, &
                    animasi untuk media sosial
                  </li>
                  <li>
                    Bekerja dengan departemen yang berbeda untuk memenuhi
                    berbagai proyek
                  </li>
                </ol>
              </div>
              <h3 class="mb-3">Kualifikasi</h3>
              <div class="text-left">
                <ol>
                  <li>Pengalaman kerja minimal satu tahun di bidang terkait</li>
                  <li>
                    Mahasiswa sarjana, lebih disukai pada semester 7 atau 8 /
                    lulusan baru dipersilakan untuk melamar Posisi Magang
                  </li>
                  <li>Kemahiran dalam Adobe Illustrator</li>
                  <li>Pengetahuan dasar dalam Adobe After Effect</li>
                  <li>Kreativitas dan inovasi tinggi</li>
                  <li>
                    Mampu menerjemahkan ringkasan desain menjadi hasil visual
                  </li>
                  <li>
                    Sangat baik dalam manajemen waktu dan keterampilan
                    organisasi
                  </li>
                  <li>
                    Memiliki perhatian yang tinggi terhadap akurasi dan detail
                  </li>
                  <li>Pengetahuan yang baik dalam tipografi dan tata letak</li>
                  <li>
                    Tetap up to date dengan tren desain terutama di komersial
                  </li>
                  <li>Suka menantang diri sendiri</li>
                  <li>
                    Bersedia untuk terus mempelajari keterampilan baru yang
                    dibutuhkan untuk pekerjaan itu
                  </li>
                </ol>
              </div>

              <div
                class="mb-5"
                style="
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                <!-- <div class="text-left">
                  <a href=""
                    ><i class="fab fa-facebook mr-1" style="color: #cdc1ff"></i
                  ></a>
                  <a href=""
                    ><i class="fab fa-twitter mr-1" style="color: #cdc1ff"></i
                  ></a>
                  <a href=""
                    ><i class="fab fa-linkedin mr-1" style="color: #cdc1ff"></i
                  ></a>
                  <a href=""
                    ><i class="fab fa-instagram mr1" style="color: #cdc1ff"></i
                  ></a>
                  <a href=""
                    ><i class="fab fa-whatsapp mr-1" style="color: #cdc1ff"></i
                  ></a>
                </div> -->
                <button
                  class="btn btn-outline-primary btn-karir px-5"
                  style="border-radius: 30px"
                  v-b-modal.modal-apply
                >
                  Lamar Pekerjaan Ini
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />

    <!-- MODAL -->
    <b-modal id="modal-apply" hide-footer hide-header content-class="p-4">
      <div class="text-center">
        <h3 class="modal-title mt-1 mb-3" id="exampleModalLongTitle">
          Daftar Sekarang
        </h3>
      </div>
      <form class="form-karir" @submit.prevent>
        <div class="form-group form-karir">
          <label for="name">Nama Lengkap</label>
          <input
            type="name"
            class="form-control form-control-karir"
            id="name"
            placeholder="Nama Lengkap"
          />
        </div>
        <div class="form-group form-karir">
          <label for="email">Email</label>
          <input
            type="email"
            class="form-control form-control-karir"
            id="email"
            placeholder="Email"
          />
        </div>
        <div class="form-group form-karir">
          <label for="text">Nomor Handphone</label>
          <input
            type="text"
            class="form-control form-control-karir"
            id="text"
            placeholder="Nomor Handphone"
          />
        </div>
        <div class="form-group form-karir">
          <label for="text">Deskripsi</label>
          <textarea
            type="text"
            class="form-control form-control-karir"
            id="text"
            placeholder="Ceritakan tentang diri, pengalaman, dan keterampilan Anda"
          ></textarea>
        </div>
        <div class="form-group form-karir">
          <label for="file">Unggah CV Mu</label>
          <input type="file" class="file-karir" id="file" />
        </div>
      </form>
      <div class="modal-footer">
        <b-button
          type="button"
          variant="outline-primary"
          @click="$bvModal.hide('modal-apply')"
          >Batal</b-button
        >
        <b-button type="submit" variant="primary" @click.prevent=""
          >Kirim Lamaran</b-button
        >
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  head() {
    return {
      bodyAttrs: {
        class: "",
      },
    };
  },
};
</script>