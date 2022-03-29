<template>
  <div class="container-fluid crud">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">Materi</h2>
        <p>
          Ini adalah daftar kumpulan materi yang bisa kamu pelajari untuk menunjang kebutuhan belajarmu.
        </p>
      </div>
      <div class="col-md-12 text-right mt-4 crud-tools">
        <div class="row no-gutters justify-content-between">
          <div class="col-md-6">
            <div class="row justify-content-start">
              <div class="col-md-5">
                <b-input-group>
                  <template #prepend>
                    <b-input-group-text
                      ><i class="fas fa-filter"></i
                    ></b-input-group-text>
                  </template>
                  <b-form-select
                    v-model="filter.perPage"
                    :options="[
                      { text: 'Tampil 9', value: 9 },
                      { text: 'Tampil 30', value: 30 },
                      { text: 'Tampil 60', value: 60 }
                    ]"
                  ></b-form-select>
                </b-input-group>
              </div>
            </div>
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
                placeholder="Cari materi"
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
            <div
              class="card card-karir m-2 router-push"
              @click="
                $router.push(
                  `/app/material/${item.id}/detail?ref=${$route.path}`
                )
              "
            >
              <!-- style="width: 350px; max-width: 100%" -->
              <div class="card-top">
                <img :src="ApiUrl('storage/' + item.cover_image_link)" alt="" class="card-img-top" />
                <div class="card-top__float-top">
                  <p
                    v-if="item.transaksi &&
                      item.transaksi.status == 'Sudah Diverifikasi'"
                    class="card-top__label label-event mb-2 px-4 py-1"
                    :class="[
                      item.transaksi &&
                      item.transaksi.status == 'Sudah Diverifikasi'
                        ? ''
                        : 'draft'
                    ]"
                  >
                    {{
                      item.transaksi &&
                      item.transaksi.status == "Sudah Diverifikasi"
                        ? "Dibeli"
                        : "&nbsp;"
                    }}
                  </p>
                </div>
                <div class="card-top__float-bottom ">
                  <!-- <div class="title">A</div> -->
                  <!-- <div class="subtitle">BB</div> -->
                  <div class="title" ><i class="fas fa-tags fa-fw mr-1" style="font-size: 13px"></i>  Rp {{ formatRupiah(item.price) }}</div>
                </div>
              </div>
              <div class="card-body text-left p-0">
                <div class="" style="display: flex; justify-content: flex-end;">
                </div>
                <div class="card-content px-4 mt-4">
                  <h3
                    class="card-judul card-program mb-2 mt-3"
                  >
                    <!-- style="height: 60px" -->
                    {{ item.title }}
                    <!-- <span class="model-belajar badge badge-primary">{{
                      item.model_belajar
                    }}</span> -->
                  </h3>
                  <!-- <p class="mb-2">
                    <i class="fas fa-award fa-fw"></i>
                    {{ item.mapel ? item.mapel.nama_mapel : "-" }}
                  </p> -->
                  <div v-html="item.desc" class="mb-3" style="height: 60px"></div>
                  <div class="d-flex justify-content-between mb-2">
                    <!-- <p class="">
                      <i class="fas fa-tags fa-fw"></i> Rp
                      {{ formatRupiah(item.price) }}
                    </p> -->
                    <!-- <p class="beda">
                      {{ item.jenjang ? item.jenjang.nama_jenjang : "-" }}
                    </p> -->
                  </div>
                </div>
                <div
                  class="card-bawah pb-3 px-4 m-0 bordered justify-content-end"
                  style="border-bottom: 12px solid #D7D2F7; border-radius:0px 0px 12px 12px;"
                >
                  <nuxt-link
                    :to="
                      `/app/material/${item.id}/detail?ref=${$route.path}`
                    "
                    class="karir-link"
                    >Detail <i class="fas fa-chevron-right ml-1"></i
                  ></nuxt-link>
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
        v-if="totalRows == 0 && !loading && !filter.keyword"
        class="crud-body kosong"
      >
        <h2 class="kosong-title">Oops!</h2>
        <p class="kosong-subtitle">Belum ada materi</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      loading: false,
      filter: {
        page: 1,
        perPage: 9,
        keyword: ""
      },
      totalRows: 0,
      items: [],
      selectedId: null,
      selectedIndex: null
    };
  },
  created() {
    this.getData("material");
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData("material");
    },
    "filter.page": function(value) {
      this.getData("material");
    },
    "filter.perPage": function(value) {
      this.getData("material");
    }
  },
  methods: {
    resetModal() {},
    getData(type) {
      this.loading = true;
      this.$axios
        .$get(`/api/${type}`, {
          params: {
            q: this.filter.keyword,
            paginate: this.filter.perPage,
            page: this.filter.page,
            published: 1
          }
        })
        .then(res => {
          console.log(res);
          if (res.success) {
            this.items = res.data.data;
            this.totalRows = res.data.total;
            this.filter.perPage = res.data.per_page;
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
