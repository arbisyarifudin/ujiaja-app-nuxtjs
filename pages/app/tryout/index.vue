<template>
  <div class="container-fluid konten-editprofil">
    <div class="text-left">
      <h2>Cari Tryout</h2>
      <p>Cari Tryout Yang Sesuai Dengan Kebutuhan Kamu!</p>

      <div class="cari-tryout d-flex align-items-center p-5 my-5 row">
        <div class="col-md-1 text-md-center p-md-0">
          <img src="/icon/caritryouta.png" alt="image" />
        </div>
        <div class="col-md-8 pl-md-3 mt-3">
          <h5>Lihat Tryout Ku</h5>
          <p class="pcari-tryout" style="font-size: 14px;">
            Ayo lihat daftar tryout yang kamu punya dan jangan lupa untuk
            kerjakan Tryout-nya!
          </p>
        </div>
        <div class="col-md-3 pl-md-3 pr-md-0">
          <router-link
            class="btn btn-primary dashboard px-4"
            to="/app/tryout/mine"
          >
            Lihat Tryout Ku
          </router-link>
        </div>
      </div>

      <section class="mb-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="info-kelas">Tryout UTBK Mandiri</h5>
          <router-link
            to="/app/tryout/search?category=UTBK&package=Reguler&event=Perorangan"
            class="text-primary"
            >Lihat Semua</router-link
          >
        </div>

        <p>
          Ayo ikuti Tryout UTBK Mandiri yang tersedia dari Uji Aja dan belajar
          dari kumpulan soal serta pembahasan sebelumnya dengan membeli tryout!
        </p>

        <div class="row">
          <div
            class="col-xl-4 col-lg-6 col-md-6 col-sm-6"
            v-for="(item, i) in list['utbk_mandiri']"
            :key="i"
          >
            <div class="card card-karir m-2 router-push" @click="$router.push(`/app/tryout/${item.id}/detail`)">
              <!-- style="width: 350px; max-width: 100%" -->
              <div class="card-body text-left p-0">
                <div class="card-content px-4">
                  <h3
                    class="card-judul card-program mb-4 mt-3"
                    style="min-height: 50px;"
                  >
                    {{ item.nama_produk }}
                  </h3>
                  <!-- <h5>TPS</h5> -->
                  <div class="d-flex justify-content-between mb-2">
                    <p class="mb-2">
                      <i class="far fa-clock fa-fw"></i> {{ item.waktu }} Menit
                    </p>
                    <p class="mb-2">
                      <i class="far fa-file-alt fa-fw"></i>
                      {{ item.jumlah_soal }} Soal
                    </p>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <p class="">
                      <i class="fas fa-tags fa-fw"></i>
                      {{ item.harga_produk > 0 ? item.harga_label : 'GRATIS' }}
                    </p>
                  </div>
                </div>
                <div
                  class="card-bawah pb-3 px-4 m-0 bordered"
                  style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;"
                >
                  <nuxt-link
                    :to="`/app/tryout/${item.id}/detail`"
                    class="karir-link"
                    >Detail <i class="fas fa-chevron-right ml-1"></i
                  ></nuxt-link>
                  <div class="icon-footer center">
                    <h4 class="title">TRYOUT</h4>
                    <h5 class="subtitle">
                      <span class="mr-0">{{ item.kategori_produk }}</span
                      ><span class="ml-0" v-if="item.jenis_tryout[0]">
                        - {{ item.jenis_tryout[0] }}</span
                      ><span
                        class="ml-0"
                        v-if="
                          item.kategori_produk == 'UTBK' &&
                            item.kelompok_soal[0]
                        "
                      >
                        {{ item.kelompok_soal[0] }}</span
                      >
                      <span
                        class="ml-0"
                        v-if="
                          item.kategori_produk == 'ASPD' ||
                            item.kategori_produk == 'Asmenas'
                        "
                      >
                        - {{ item.penjurusan[0] }}</span
                      >
                    </h5>
                    <!-- <div>2021</div> -->
                    <img src="/icon/icon-card-bg.png" class="img-fluid image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UILoading
          tag="div"
          style="position: static; width: 100%;"
          v-if="loading"
        />
        <UITableNotFound
          tag="div"
          text="Belum ada data Tryout."
          style="position: relative; width: 100%;"
          v-if="!loading && list['utbk_mandiri'] && list['utbk_mandiri'].length < 1"
        />
      </section>
      <section class="mb-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="info-kelas">Tryout UTBK Akbar</h5>
          <router-link
            to="/app/tryout/search?category=UTBK&package=Reguler&event=Masal"
            class="text-primary"
            >Lihat Semua</router-link
          >
        </div>

        <p>
          Ayo ikuti simulasi tryout UTBK yang berisi soal terbaik dari Uji Aja!
        </p>

        <div class="row">
          <div
            class="col-xl-4 col-lg-6 col-md-6 col-sm-6"
            v-for="(item, i) in list['utbk_akbar']"
            :key="i"
          >
            <div class="card card-karir m-2 router-push" @click="$router.push(`/app/tryout/${item.id}/detail`)">
              <!-- style="width: 350px; max-width: 100%" -->
              <div class="card-body text-left p-0">
                <div class="card-content px-4">
                  <h3
                    class="card-judul card-program mb-4 mt-3"
                    style="min-height: 50px;"
                  >
                    {{ item.nama_produk }}
                  </h3>
                  <!-- <h5>TPS</h5> -->
                  <div class="d-flex justify-content-between mb-2">
                    <p class="mb-2">
                      <i class="far fa-clock fa-fw"></i> {{ item.waktu }} Menit
                    </p>
                    <p class="mb-2">
                      <i class="far fa-file-alt fa-fw"></i>
                      {{ item.jumlah_soal }} Soal
                    </p>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <p class="">
                      <i class="fas fa-tags fa-fw"></i>
                      {{ item.harga_produk > 0 ? item.harga_label : 'GRATIS' }}
                    </p>
                    <p class="">
                      <i class="fas fa-calendar-alt fa-fw"></i>
                      <!-- {{ item.tanggal_mulai }} -->
                      {{ item.tanggal_mulai_label }}
                    </p>
                  </div>
                </div>
                <div
                  class="card-bawah pb-3 px-4 m-0 bordered"
                  style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;"
                >
                  <nuxt-link
                    :to="`/app/tryout/${item.id}/detail`"
                    class="karir-link"
                    >Detail <i class="fas fa-chevron-right ml-1"></i
                  ></nuxt-link>
                  <div class="icon-footer center">
                    <h4 class="title small">TRYOUT AKBAR</h4>
                    <h5 class="subtitle">
                      <span>{{ item.kategori_produk }}</span
                      ><span v-if="item.jenis_tryout">{{
                        item.jenis_tryout[0]
                      }}</span>
                    </h5>
                    <!-- <div>2021</div> -->
                    <img src="/icon/icon-card-bg.png" class="img-fluid image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UILoading
          tag="div"
          style="position: static; width: 100%;"
          v-if="loading"
        />
        <UITableNotFound
          tag="div"
          text="Belum ada data Tryout."
          style="position: relative; width: 100%;"
          v-if="!loading && list['utbk_akbar'] && list['utbk_akbar'].length < 1"
        />
      </section>
      <section class="mb-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="info-kelas">Tryout ASPD</h5>
          <router-link
            to="/app/tryout/search?category=ASPD&package=&event="
            class="text-primary"
            >Lihat Semua</router-link
          >
        </div>

        <p>
          Ayo ikuti Tryout ASPD yang tersedia dari Uji Aja dan belajar dari
          kumpulan soal serta pembahasan sebelumnya dengan membeli tryout!
        </p>

        <div class="row">
          <div
            class="col-xl-4 col-lg-6 col-md-6 col-sm-6"
            v-for="(item, i) in list['aspd']"
            :key="i"
          >
            <div class="card card-karir m-2 router-push" @click="$router.push(`/app/tryout/${item.id}/detail`)">
              <!-- style="width: 350px; max-width: 100%" -->
              <div class="card-body text-left p-0">
                <div class="card-content px-4">
                  <h3
                    class="card-judul card-program mb-4 mt-3"
                    style="min-height: 50px;"
                  >
                    {{ item.nama_produk }}
                  </h3>
                  <!-- <h5>TPS</h5> -->
                  <div class="d-flex justify-content-between mb-2">
                    <p class="mb-2">
                      <i class="far fa-clock fa-fw"></i> {{ item.waktu }} Menit
                    </p>
                    <p class="mb-2">
                      <i class="far fa-file-alt fa-fw"></i>
                      {{ item.jumlah_soal }} Soal
                    </p>
                  </div>
                  <div class="d-flex justify-content-between mb-2">
                    <p class="">
                      <i class="fas fa-tags fa-fw"></i>
                      {{ item.harga_produk > 0 ? item.harga_label : 'GRATIS' }}
                    </p>
                    <p class="beda">{{ item.penjurusan[0] }}</p>
                  </div>
                </div>
                <div
                  class="card-bawah pb-3 px-4 m-0 bordered"
                  style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;"
                >
                  <nuxt-link
                    :to="`/app/tryout/${item.id}/detail`"
                    class="karir-link"
                    >Detail <i class="fas fa-chevron-right ml-1"></i
                  ></nuxt-link>
                  <div class="icon-footer">
                    <h4 class="title">TRYOUT</h4>
                    <h5 class="subtitle">
                      <span>{{ item.kategori_produk }}</span
                      >-<span v-if="item.penjurusan">{{
                        item.penjurusan[0]
                      }}</span>
                    </h5>
                    <!-- <div>2021</div> -->
                    <img src="/icon/icon-card-bg.png" class="img-fluid image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UILoading
          tag="div"
          style="position: static; width: 100%;"
          v-if="loading"
        />
        <UITableNotFound
          tag="div"
          text="Belum ada data Tryout."
          style="position: relative; width: 100%;"
          v-if="!loading && list['aspd'] && list['aspd'].length < 1"
        />
      </section>
 
      <section class="mb-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="info-kelas">Paket Tryout</h5>
          <router-link
            to="/app/tryout/search?category=&package=Bundling&event="
            class="text-primary"
            >Lihat Semua</router-link
          >
        </div>

        <p>
          Beli paket favoritmu dengan harga yang lebih hemat!
        </p>

        <div class="row">
          <div
            class="col-xl-4 col-lg-6 col-md-6 col-sm-6"
            v-for="(item, i) in list['bundling']"
            :key="i"
          >
            <div class="card card-karir m-2 router-push" @click="$router.push(`/app/tryout/${item.id}/detail`)">
              <!-- style="width: 350px; max-width: 100%" -->
              <div class="card-body text-left p-0">
                <div class="card-content px-4">
                  <h3
                    class="card-judul card-program mb-4 mt-3"
                    style="min-height: 50px;"
                  >
                    {{ item.nama_produk }}
                  </h3>
                  <!-- <h5>TPS</h5> -->
                  <!-- <div class="d-flex justify-content-between mb-2">
                    <p class="mb-2">
                      <i class="far fa-clock fa-fw"></i> {{ item.waktu }} Menit
                    </p>
                    <p class="mb-2">
                      <i class="far fa-file-alt fa-fw"></i>
                      {{ item.jumlah_soal }} Soal
                    </p>
                  </div> -->
                  <div class="d-flex justify-content-between mb-2">
                    <p class="">
                      <i class="fas fa-tags fa-fw"></i>
                      {{ item.harga_produk > 0 ? item.harga_label : 'GRATIS' }}
                    </p>
                    <p class="beda">{{ item.kategori_produk }}</p>
                  </div>
                  <div
                    class="package-getlist mb-3"
                    v-html="item.deskripsi_produk"
                  ></div>
                </div>
                <div
                  class="card-bawah pb-3 px-4 m-0 bordered"
                  style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;"
                >
                  <nuxt-link
                    :to="`/app/tryout/${item.id}/detail`"
                    class="karir-link"
                    >Detail <i class="fas fa-chevron-right ml-1"></i
                  ></nuxt-link>
                  <div class="icon-footer center">
                    <h4 class="title">PAKET</h4>
                    <h5 class="subtitle ">
                      <span>TRYOUT</span>
                      <span>{{ item.kategori_produk }}</span>
                    </h5>
                    <!-- <div>2021</div> -->
                    <img src="/icon/icon-card-bg.png" class="img-fluid image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <UILoading
          tag="div"
          style="position: static; width: 100%;"
          v-if="loading"
        />
        <UITableNotFound
          tag="div"
          text="Belum ada data Tryout."
          style="position: relative; width: 100%;"
          v-if="!loading && list['bundling'] && list['bundling'].length < 1"
        />
      </section>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      loading: false,
      list: {
        utbk_mandiri: [],
        utbk_akbar: [],
        aspd: [],
        asmenas: [],
        bundling: []
      }
    };
  },
  created() {
    this.getProduk("utbk_mandiri", {
      kategori_produk: "UTBK",
      jenis_produk: "Perorangan",
      tipe_paket: "Reguler"
    });
    this.getProduk("utbk_akbar", {
      kategori_produk: "UTBK",
      jenis_produk: "Masal",
      tipe_paket: "Reguler"
    });
    this.getProduk("aspd", {
      kategori_produk: "ASPD",
      jenis_produk: "",
      tipe_paket: "Reguler"
    });
    // this.getProduk("asmenas", {
    //   kategori_produk: "Asmenas",
    //   jenis_produk: "Perorangan",
    //   tipe_paket: "Reguler"
    // });
    this.getProduk("bundling", {
      kategori_produk: "",
      jenis_produk: "",
      tipe_paket: "Bundling"
    });
  },
  methods: {
    getProduk(type, params = {}) {
      this.loading = true;
      this.$axios
        .$get(`/api/produk`, {
          params: {
            paginate: 3,
            page: 1,
            status_produk: "Aktif",
            ...params
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.list[type] = res.data.data;
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
