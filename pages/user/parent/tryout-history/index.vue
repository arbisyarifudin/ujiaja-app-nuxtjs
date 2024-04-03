<template>
  <div class="container-fluid crud">
    <div class="row d-flex no-gutters">
      <div class="col-md-12 dashboard px-0">
        <h2 class="dash-label">Riwayat Tryout</h2>
        <p>
          Data ini berisi riwayat dari pengerjaan Tryout siswa.
        </p>
      </div>
      <div class="col-md-12 text-right mt-4 crud-tools">
        <div class="row no-gutters justify-content-between">
          <div class="col-md-3">
            <b-input-group>
              <template #prepend>
                <b-input-group-text
                  ><i class="fas fa-filter"></i
                ></b-input-group-text>
              </template>
              <b-form-select
                v-model="filter.perPage"
                :options="[
                  { text: 'Tampil 5', value: 5 },
                  { text: 'Tampil 10', value: 10 },
                  { text: 'Tampil 25', value: 25 },
                  { text: 'Tampil 50', value: 50 }
                ]"
                 @change="getData()"
              ></b-form-select>
            </b-input-group>
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
                placeholder="Cari disini"
                debounce="300"
              ></b-form-input>
            </b-input-group>
          </div>
        </div>
      </div>
      <div class="col-md-12 crud-body">
        <div class="overflow-auto">
          <table class="table-data-kelas table table-borderless">
            <thead class="thead-table">
              <tr>
                <th class="no" width="50">No</th>
                <th width="50" class="aksi">Aksi</th>
                <th>No. Ref</th>
                <th>Nama Produk</th>
                <th>Nama Siswa</th>
                <th>Tanggal</th>
              </tr>
            </thead>
            <tbody class="body-table">
              <template v-if="totalRows > 0">
                <tr v-for="(item, index) in items" :key="index">
                  <td class="text-center">{{ (filter.page - 1) * filter.perPage + (index + 1) }}</td>
                  <td class="btn-table">
                    <nuxt-link
                      class="btn btn-light px-2 mt-n2"
                      title="Lihat Detail"
                      :to="`/user/parent/tryout-history/${item.referensi}/detail?idp=${item.id_produk}&idu=${item.id_user}&referensi=${item.referensi}`"
                    >
                      <i class="fa fa-search"></i>
                    </nuxt-link>
                  </td>
                  <td>{{ item.referensi }}</td>
                  <td>{{ item.produk ? item.produk.nama_produk : '-' }}</td>
                  <td>{{ item.user && item.user.siswa ? item.user.siswa.nama_lengkap : '-' }}</td>
                  <td>
                    {{formatTanggal(item.waktu_mulai)}}
                  </td>
                </tr>
              </template>
              <UITableLoading v-if="loading" />
              <UITableNotFound
                v-if="totalRows == 0 && filter.keyword && !loading"
              />
            </tbody>
          </table>

          <b-pagination
            class="pagination-table"
            v-if="totalRows > 0 && totalRows > filter.perPage && !loading"
            v-model="filter.page"
            :total-rows="totalRows"
            :per-page="filter.perPage"
          >
          </b-pagination>
        </div>
      </div>

      <div
        v-if="totalRows == 0 && !loading && !filter.keyword"
        class="crud-body kosong"
      >
        <h2 class="kosong-title">Oops!</h2>
        <p class="kosong-subtitle">Belum ada data Riwayat Tryout</p>
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
      submitting: false,
      filter: {
        page: 1,
        perPage: 5,
        keyword: ""
      },
      totalRows: 0,
      items: [],
      selectedId: null,
      selectedIndex: null,
      detail: {},
      showBukti: false,
      form: {
        verifikasi: null,
      }
    };
  },
  created() {
    this.getData();
  },
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
  },
  watch: {
    "filter.keyword": function(value) {
      this.getData();
    },
    "filter.page": function(value) {
      this.getData();
    }
  },
  methods: {
    statusBadge (status) {
      let statusClass = 'badge badge-';
      switch (status) {
        case 1:
          statusClass += 'danger'
          break;
        case 2:
          statusClass += 'success'
          break;
        default:
          statusClass += 'secondary'
          break;
      }
      return statusClass;
    },
    getData(type) {
      this.loading = true;
      this.$axios
        .$get(`/api/tryout_user`, {
          params: {
            q: this.filter.keyword,
            paginate: this.filter.perPage,
            page: this.filter.page,
            id_parent: this.user.id
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
    },
  }
};
</script>
