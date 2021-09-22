<template>
  <div class="container-fluid konten-editprofil">
    <div class="col-md-12 dash-kelas p-0 text-left">
      <h2 class="pb-0">Dashboard</h2>
      <h5 class="mt-4">
        Halo {{ userDetail.nama_lengkap }}, selamat datang!<i class=""></i>
      </h5>
      <h5 class="info-kelas mt-5 mb-5">Kelas Les Privat Hari Ini</h5>
      <div class="kelas shadow-sm">
        <div class="col-md-8">
          <h4 class="m-0">Ikut Les Yuk!</h4>
          <p>Belajar asik, gurunya asik-asik.</p>
          <button class="btn btn-primary dashboard px-4">
            Temukan Guru Pilihanmu
          </button>
        </div>
      </div>
      <h5 class="info-kelas mt-5 mb-5">
        Coba Deh, Kamu Pilih Salah Satu Tryout Dibawah Ini!
      </h5>
      <div class="row">
        <div class="card card-karir m-3" style="width: 18rem">
          <div class="card-body text-left p-0">
            <div class="card-content px-4">
              <h3 class="card-judul card-program mt-4 mb-2">Tryout UTBK</h3>
              <p class="card-text pb-0 mb-4">
                Temukan tryout UTBK pilihanmu disini dari SAINTEK, SOSHUM,
                hingga CAMPURAN ada untukmu
              </p>

              <a href="" class="karir-link"
                >Detail <i class="fa fa-chevron-right ml-1"></i
              ></a>
            </div>
            <div class="d-flex justify-content-end pb-4 pr-4 m-0 bordered">
              <img src="/icon/tryoutasesmen.png" class="" />
            </div>
          </div>
        </div>
        <div class="card card-karir m-3" style="width: 18rem">
          <div class="card-body text-left p-0">
            <div class="card-content px-4">
              <h3 class="card-judul card-program mt-4 mb-2">
                Tryout Asesmen Nasional
              </h3>
              <p class="card-text pb-0 mb-1">
                Temukan tryout Asesmen Kompetensi Nasional pilihanmu disini.
              </p>

              <a href="" class="karir-link"
                >Detail <i class="fa fa-chevron-right ml-1"></i
              ></a>
            </div>
            <div class="d-flex justify-content-end pb-4 pr-4 m-0 bordered">
              <img src="/icon/tryoutasesmen.png" class="" />
            </div>
          </div>
        </div>
        <div class="card card-karir m-3" style="width: 18rem">
          <div class="card-body text-left p-0">
            <div class="card-content px-4">
              <h3 class="card-judul card-program mt-4 mb-2">Tryout ASPD</h3>
              <p class="card-text pb-0- mb-3">
                Temukan tryout Asesmen Standar Pendidikan Daerah pilihanmu
                disini.
              </p>

              <a href="" class="karir-link"
                >Detail <i class="fa fa-chevron-right ml-1"></i
              ></a>
            </div>
            <div class="d-flex justify-content-end pb-4 pr-4 m-0 bordered">
              <img src="/icon/tryoutasesmen.png" class="" />
            </div>
          </div>
        </div>
      </div>

      <h5 class="info-kelas mt-5 mb-5">
        Kamu Perlu Ketahui Minat dan Bakatmu Dengan Ikut Tes MBTI!
      </h5>
      <div class="kelas kelasdua mb-5 shadow-sm">
        <div class="col-md-8">
          <h4 class="m-0">Minatku Apa?</h4>
          <p>
            Siapa tau aku minat di<br />
            kampus itu...
          </p>
          <button class="btn btn-primary dashboard px-4">Ikuti Tes MBTI</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    userDetail() {
      return this.$store.state.dataUser.detail;
    },
  },
};
</script>