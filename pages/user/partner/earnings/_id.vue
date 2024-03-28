<template>
  <b-card class="shadow-none bg-transparent">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="card-title d-flex align-items-center">
        <b-spinner small type="grow" class="mr-2" v-if="loading" /> Pendapatan
        Kelas
      </h3>
      <BackUrl url="/user/partner/earnings" />
    </div>
    <hr />
    <b-card class="mb-4">
      <div class="row">
        <div class="col-md-7">
          <h4>Total Pendapatan</h4>
          <h5 class="mb-0">{{ dataPendapatanPerKursusDetail.nama_kursus }}</h5>
        </div>
        <div class="col-md-5">
          <h3 class="d-flex justify-content-between">
            <span class="h6">Rp</span>
            <span>{{ dataPendapatanPerKursusDetail.netto_pendapatan }}</span>
          </h3>
        </div>
      </div>
    </b-card>
    <b-card class="mb-4">
      <div class="row">
        <div class="col-md-12">
          <h4>Riwayat Pendapatan Kelas</h4>
          <hr />
          <div class="table-responsive">
            <table class="table table-bordered normal pos-relative">
              <thead class="thead-light">
                <tr>
                  <th style="width: 200px; max-width: 50%">Tanggal</th>
                  <th>Siswa</th>
                  <th style="width: 150px; max-width: 50%">Pendapatan</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="(kursus, index) in dataPendapatanPerKursusDetailList"
                  :key="'k' + index"
                >
                  <td>
                    {{
                      formatTanggal(kursus.tanggal, "Do MMMM YYYY HH:mm")
                    }}
                    WIB
                  </td>
                  <td>{{ kursus.nama_siswa }}</td>
                  <td>
                    <div class="d-flex justify-content-between">
                      <span>Rp</span>
                      <span>{{ kursus.netto_pendapatan }}</span>
                    </div>
                  </td>
                </tr>
              </tbody>
              <UITableLoading v-if="loading" />
              <UITableNotFound
              text="Belum ada data."
                v-if="totalRows == 0 && filter.keyword && !loading"
              />
            </table>
          </div>
        </div>
      </div>
    </b-card>
  </b-card>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      loading: false,
      dataPendapatanPerKursusDetail: {
        nama_kursus: "",
        netto_pendapatan: 0
      },
      dataPendapatanPerKursusDetailList: [],
      filter: {
        page: 1,
        perPage: 6,
        keyword: ""
      },
      totalRows: 1
    };
  },
  created() {
    this.getDetail();
    this.getDataList();
  },
  methods: {
    getDetail() {
      this.loading = true;
      this.$axios
        .$get("/api/pendapatan/tentor/perkursus/" + this.$route.params.id)
        .then(response => {
          console.log(response);
          if (response.success) {
            this.dataPendapatanPerKursusDetail = response.data;
            this.totalRows = response.data.total;
            this.filter.perPage = response.data.per_page;
          }
        })
        .catch(error => {
          this.catchError(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getDataList() {
      this.loading = true;
      this.$axios
        .$get(
          "/api/pendapatan/tentor/perkursus/" + this.$route.params.id + "/list"
        )
        .then(response => {
          console.log(response);
          if (response.success) {
            this.dataPendapatanPerKursusDetailList = response.data.data;
          }
        })
        .catch(error => {
          this.catchError(error);
        })
        .finally(() => {
          this.loading = false;
        });
    }
  }
};
</script>
