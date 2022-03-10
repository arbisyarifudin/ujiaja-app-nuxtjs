<template>
  <div class="container-fluid konten-editprofil">
    <div class="text-left">
      <h2>Ujian Kenaikan Tingkat Tentor</h2>
      <p>
        Yuk Ikuti Ujian Kenaikan Tingkat Tentor untuk meningkatakan Tarif
        Mengajar Kamu
      </p>

      <div class="cari-tryout d-flex align-items-center p-5 my-5 row">
        <div class="col-md-1 text-md-center p-md-0">
          <img src="/icon/caritryouta.png" alt="image" />
        </div>
        <div class="col-md-8 pl-md-3 mt-3">
          <h5>Lihat Riwayat Ujian</h5>
          <p class="pcari-tryout" style="font-size: 14px;">
            Ayo lihat daftar ujian yang pernah kamu kerjakan.
          </p>
        </div>
        <div class="col-md-3 pl-md-3 pr-md-0">
          <router-link
            class="btn btn-primary dashboard px-4"
            to="/app/partner/uktt/mine"
          >
            Lihat Ujianku
          </router-link>
        </div>
      </div>

      <section class="mb-3">
        <div class="d-flex justify-content-between align-items-center mb-3">
          <h5 class="info-kelas">Daftar UKTT Tersedia</h5>
        </div>

        <div class="row">
          <div
            class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-3"
            v-for="(item, i) in list"
            :key="i"
          >
            <div
              class="card card-karir m-2 router-push"
              @click="$router.push(`/app/partner/uktt/${item.id}/detail`)"
            >
              <div class="card-body text-left p-0 pt-3">
                <div class="card-content px-4">
                  <h3
                    class="card-judul card-program mb-4 mt-3"
                    style="height: 60px"
                  >
                    {{ item.nama_produk }}
                  </h3>
                  <div class="d-flex justify-content-between mt-1">
                    <p>
                      {{ item.mapel && item.mapel[0] ? item.mapel[0] : "-" }}
                    </p>
                    <p class="beda">
                      {{
                        item.jenjang && item.jenjang[0] ? item.jenjang[0] : "-"
                      }}
                    </p>
                  </div>
                  <p style="font-size: 13px" class="mb-2">Persyaratan:</p>
                  <div class="d-flex justify-content-between mb-0">
                    <p class="mb-2">
                      <i class="fas fa-pencil-alt fa-fw"></i>
                      {{
                        item.level ? item.level.minimal_total_mengajar : "-"
                      }}x mengajar
                    </p>
                    <p class="mb-2" v-if="item.level">
                      <i
                        class="fas fa-star fa-fw text-warning"
                        v-for="(rate, r) in item.level.minimal_rate_mengajar"
                        :key="'r' + r"
                      ></i>
                      {{ item.level.minimal_rate_mengajar }}/<small>5</small>
                    </p>
                  </div>
                  <p style="font-size: 13px" class="mb-2">Hadiah:</p>
                  <p class="mb-2" v-if="item.level">
                    <i class="fas fa-award fa-fw"></i> Lv.
                    <!-- {{ item.level ? item.level.nama_level : "-" }} -->
                    {{ getHadiahLevelName(item.level.id) }}
                  </p>
                </div>
                <div
                  class="card-bawah pb-3 px-4 m-0 bordered"
                  style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;"
                >
                  <nuxt-link
                    :to="`/app/partner/uktt/${item.id}/detail`"
                    class="karir-link"
                    >Detail <i class="fas fa-chevron-right ml-1"></i
                  ></nuxt-link>
                  <div class="icon-footer center">
                    <h4 class="title">UKTT</h4>
                    <img src="/icon/icon-card-bg.png" class="img-fluid image" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <b-pagination
          class="pagination-table"
          v-if="totalRows > 0 && totalRows > filter.perPage && !loading"
          v-model="filter.page"
          :total-rows="totalRows"
          :per-page="filter.perPage"
        >
        </b-pagination>

        <UILoading
          tag="div"
          style="position: static; width: 100%;"
          v-if="loading"
        />
        <UITableNotFound
          tag="div"
          text="Belum ada data Ujian UKTT pada jenjang ini."
          style="position: relative; width: 100%;"
          v-if="!loading && list && list.length < 1"
        />
      </section>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
  fetchOnServer: false,
  data() {
    return {
      loading: false,
      list: [],
      totalRows: 10,
      filter: {
        page: 1,
        perPage: 6,
        category: "UKTT"
      }
    };
  },
  created() {
    this.getProduk();
  },
  watch: {
    "filter.page": function(value) {
      this.getProduk();
    }
  },
  methods: {
    getProduk(params = {}) {
      this.loading = true;
      this.$axios
        .$get(`/api/produk-uktt`, {
          params: {
            paginate: this.filter.perPage,
            page: this.filter.page,
            // kategori_produk: this.filter.category,
            status_produk: "Aktif",
            ...params
          }
        })
        .then(res => {
          if (res.success) {
            this.list = res.data.data;
            this.totalRows = res.data.paginate.total;
          }
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
