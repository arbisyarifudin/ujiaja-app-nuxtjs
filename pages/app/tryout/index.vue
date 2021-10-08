<template>
  <div class="container-fluid konten-editprofil">
    <div class="text-left">
      <h2>Cari Tryout</h2>
      <p>Cari Tryout Yang Sesuai Dengan Kebutuhan Kamu!</p>

      <section class="mb-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="info-kelas">Tryout UTBK Mandiri</h5>
          <a href="#" class="text-primary">Lihat Semua</a>
        </div>

        <p>
          Ayo ikuti Tryout UTBK Mandiri yang tersedia dari Uji Aja dan belajar
          dari kumpulan soal serta pembahasan sebelumnya dengan membeli tryout!
        </p>

        <div class="row">
          <div
            class="col-xl-4 col-lg-6 col-md-6 col-sm-6"
            v-for="(item, i) in utbk_list"
            :key="i"
          >
            <div class="card card-karir m-2">
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
                      <i class="fas fa-tags fa-fw"></i> Rp
                      {{ formatRupiah(item.harga_produk) }}
                    </p>
                    <!-- <p class="beda">{{ item.tipe_paket }}</p> -->
                  </div>
                </div>
                <div
                  class="card-bawah pb-3 px-4 m-0 bordered"
                  style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;"
                >
                  <nuxt-link
                    :to="`/administrator/product/${item.id}/detail`"
                    class="karir-link"
                    >Detail <i class="fas fa-chevron-right ml-1"></i
                  ></nuxt-link>
                  <div class="icon-footer">
                    <h4 class="title">TRYOUT</h4>
                    <h5 class="subtitle">
                      <span>{{ item.kategori_produk }}</span
                      ><span>TPS</span>
                    </h5>
                    <!-- <div>2021</div> -->
                    <img src="/icon/icon-card-bg.png" class="img-fluid image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="mb-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="info-kelas">Tryout UTBK Akbar</h5>
          <a href="#" class="text-primary">Lihat Semua</a>
        </div>

        <p>
          Ayo ikuti simulasi tryout UTBK yang berisi soal terbaik
        </p>

        <div class="row">
          <div
            class="col-xl-4 col-lg-6 col-md-6 col-sm-6"
            v-for="(item, i) in utbk_list"
            :key="i"
          >
            <div class="card card-karir m-2">
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
                      <i class="fas fa-tags fa-fw"></i> Rp
                      {{ formatRupiah(item.harga_produk) }}
                    </p>
                    <!-- <p class="beda">{{ item.tipe_paket }}</p> -->
                  </div>
                </div>
                <div
                  class="card-bawah pb-3 px-4 m-0 bordered"
                  style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;"
                >
                  <nuxt-link
                    :to="`/administrator/product/${item.id}/detail`"
                    class="karir-link"
                    >Detail <i class="fas fa-chevron-right ml-1"></i
                  ></nuxt-link>
                  <div class="icon-footer">
                    <h4 class="title">TRYOUT</h4>
                    <h5 class="subtitle">
                      <span>{{ item.kategori_produk }}</span
                      ><span>TPS</span>
                    </h5>
                    <!-- <div>2021</div> -->
                    <img src="/icon/icon-card-bg.png" class="img-fluid image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section class="mb-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="info-kelas">Paket Tryout</h5>
          <a href="#" class="text-primary">Lihat Semua</a>
        </div>

        <p>
          Beli paket favoritmu dengan harga yang lebih hemat!
        </p>

        <div class="row">
          <div
            class="col-xl-4 col-lg-6 col-md-6 col-sm-6"
            v-for="(item, i) in utbk_list"
            :key="i"
          >
            <div class="card card-karir m-2">
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
                      <i class="fas fa-tags fa-fw"></i> Rp
                      {{ formatRupiah(item.harga_produk) }}
                    </p>
                    <p class="beda">{{ item.tipe_paket }}</p>
                  </div>
                  <div>
                    <h6>Apa yang akan kamu dapatkan?</h6>
                    <ul>
                      <li>4x Tryout UTBK</li>
                      <li>Tes MBTI</li>
                      <li>Rekomendasi Belajar</li>
                    </ul>
                  </div>
                </div>
                <div
                  class="card-bawah pb-3 px-4 m-0 bordered"
                  style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;"
                >
                  <nuxt-link
                    :to="`/administrator/product/${item.id}/detail`"
                    class="karir-link"
                    >Detail <i class="fas fa-chevron-right ml-1"></i
                  ></nuxt-link>
                  <div class="icon-footer">
                    <h4 class="title">TRYOUT</h4>
                    <h5 class="subtitle">
                      <span>{{ item.kategori_produk }}</span
                      ><span>TPS</span>
                    </h5>
                    <!-- <div>2021</div> -->
                    <img src="/icon/icon-card-bg.png" class="img-fluid image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      utbk_list: []
    };
  },
  created() {
    this.getProduk("UTBK");
  },
  methods: {
    getProduk(kategori) {
      this.loading = true;
      this.$axios
        .$get(`/api/produk`, {
          params: {
            paginate: 3,
            page: 1,
            filter: kategori
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.utbk_list = res.data.data;
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
