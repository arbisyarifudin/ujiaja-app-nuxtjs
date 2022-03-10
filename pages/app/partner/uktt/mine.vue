<template>
  <div class="container-fluid crud">
    <!-- {{ $route.query }} -->
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">
          Daftar Ujianku
        </h2>
        <p>
          Ini adalah daftar ujian UKTT yang sudah dikerjakan maupun belum ya.
        </p>
      </div>
      <div class="col-md-12 text-right mt-4 crud-tools">
        <div class="row no-gutters justify-content-between">
          <div class="col-md-6">
            <!-- <div class="row justify-content-start">
              <div class="col-md-5">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text
                      ><i class="fas fa-filter"></i
                    ></b-input-group-text>
                  </template>
                  <b-form-select
                    v-model="filterStatus"
                    :options="[
                      { text: 'Semua', value: null },
                      { text: 'Sudah Dikerjakan', value: 'Sudah Dikerjakan' },
                      { text: 'Belum Dikerjakan', value: 'Belum Dikerjakan' }
                    ]"
                  ></b-form-select>
                </b-input-group>
              </div>
            </div> -->
          </div>

          <div class="col-md-5 d-flex align-items-center crud-tools">
            <b-input-group>
              <template #prepend>
                <b-input-group-text
                  ><i class="fas fa-search"></i
                ></b-input-group-text>
              </template>
              <b-form-input
                v-model="filter.keyword"
                placeholder="Cari Ujian"
                debounce="1000"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
      </div>
      <div class="col-md-12 crud-body">
        <div class="row mt-5" v-if="totalRows > 0">
          <div
            class="col-xl-4 col-lg-6 col-md-6 col-sm-6 mb-3"
            v-for="(item, i) in items"
            :key="i"
          >
            <div class="card card-karir m-2 router-push"
              @click="$router.push(`/app/partner/uktt/${item.id}/detail`)">
              <!-- style="width: 350px; max-width: 100%" -->
              <div class="card-body text-left p-0 pt-3">
                <!-- <div class="" style="display: flex; justify-content: flex-end;">
                  <p
                    class="label-event mb-2 px-4 py-1"
                    :class="[item.status_produk == 'Aktif' ? '' : 'draft']"
                  >
                    {{ item.status_produk == "Aktif" ? "Publish" : "Draft" }}
                  </p>
                </div> -->
                <div class="card-content px-4">
                  <h3
                    class="card-judul card-program mb-4 mt-3"
                    style="height: 60px"
                  >
                    {{ item.nama_produk }}
                  </h3>
                  <div class="d-flex justify-content-between">
                    <p>{{
                        item.mapel && item.mapel[0]
                          ? item.mapel[0]
                          : "-"
                      }}</p>
                    <p class="beda">
                      {{
                        item.jenjang && item.jenjang[0]
                          ? item.jenjang[0]
                          : "-"
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
                    {{getHadiahLevelName(item.level.id)}}
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
      </div>

      <UITableLoading tag="div" v-if="loading" />
      <UITableNotFound
        tag="div"
        v-if="totalRows == 0 && filter.keyword && !loading"
      />

      <div
        class="kelas lihat-tryout mt-4 d-flex w-100"
        v-if="totalRows == 0 && !loading && !filter.keyword"
      >
        <div class="col-md-8">
          <h4 class="m-0 mb-3">Oops!</h4>
          <p>
            Kamu belum pernah melakukan ujian UKTT. <br />
            Yuk mulai ujian sekarang!
          </p>
          <nuxt-link
            class="btn btn-primary dashboard px-4"
            to="/app/partner/uktt"
          >
            Mulai Ujian
          </nuxt-link>
        </div>
      </div>
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
      filter: {
        page: 1,
        perPage: 6,
        keyword: "",
        category: "UKTT"
      },
      totalRows: 0,
      items: [],
      filterStatus: null
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
  watch: {
    "filter.keyword": function(value) {
      this.getData("produk");
    },
    "filter.page": function(value) {
      this.getData("produk");
    }
  },
  created() {
    this.getData("produk");
  },
  methods: {
    getData(type) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, {
          params: {
            q: this.filter.keyword,
            paginate: this.filter.perPage,
            page: this.filter.page,
            kategori_produk: this.filter.category,
            status_produk: "Aktif",
            id_user: this.user.id
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.items = res.data.data;
            this.totalRows = res.data.paginate.total;
            this.filter.perPage = res.data.paginate.per_page;
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
