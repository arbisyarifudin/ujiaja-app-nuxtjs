<template>
  <b-card class="shadow-none bg-transparent">
    <div class="d-flex justify-content-between align-items-center">
      <h3 class="card-title d-flex align-items-center">
        <b-spinner small type="grow" class="mr-2" v-if="loading" /> Pendapatan
      </h3>
      <button class="btn btn-sm btn-primary square px-3">
        <i class="fas fa-wallet mr-2"></i> Tarik Dana
      </button>
    </div>
    <hr />
    <div class="row">
      <div class="col-12 mb-4">
        <div class="card">
          <div class="card-body">
            <h4 class="mb-3">Grafik Pendapatan</h4>
            <div style="height: 300px"></div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h4 class="mb-3">Total Pendapatan</h4>
            <div class="text-success">
              Rp {{ dataPendapatan.totalPendapatan }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-6 mb-4">
        <div class="card">
          <div class="card-body">
            <h4 class="mb-3">Total Penarikan</h4>
            <div class="text-danger">
              Rp {{ dataPendapatan.totalPenarikan }}
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-4 col-md-12 mb-4">
        <div class="card">
          <div class="card-body">
            <h4 class="mb-3">Total Saldo</h4>
            <div class="font-weight-bold">
              Rp {{ dataPendapatan.totalSaldo }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <h4 class="mb-3 d-flex align-items-center">
              <b-spinner small type="grow" class="mr-2" v-if="loading" /> Daftar
              Pendapatan Kelas
            </h4>
            <div class="table-responsive">
              <table class="table table-bordered normal">
                <thead class="thead-light">
                  <tr>
                    <th>Kelas Kursus</th>
                    <th style="width: 150px; max-width: 50%">Pendapatan</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="(kursus, index) in dataPendapatanPerKursus"
                    :key="'k' + index"
                  >
                    <td>
                      {{ kursus.nama_kursus }}
                      <router-link
                        class="btn btn-sm btn-light px-2 ml-2"
                        :to="`/app/partner/earnings/${kursus.id_kursus}`"
                        title="Detail Pendapatan Kelas"
                        ><i class="fas fa-search"></i
                      ></router-link>
                    </td>
                    <td>
                      <div class="d-flex justify-content-between">
                        <span>Rp</span>
                        <span>{{ kursus.netto_pendapatan }}</span>
                      </div>
                    </td>
                  </tr>
                  <UITableLoading v-if="loading" />
                  <UITableNotFound
                  text="Belum ada data."
                    v-if="
                      dataPendapatanPerKursus &&
                        dataPendapatanPerKursus.lenght == 0 &&
                        filter.keyword &&
                        !loading
                    "
                  />
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      loading: true,
      dataPendapatan: {
        totalPendapatan: 0,
        totalPenarikan: 0,
        totalSaldo: 0
      },
      dataPendapatanPerKursus: []
    };
  },
  created() {
    this.getPendapatanTotal();
    this.getPendapatanPerKursus();
  },
  methods: {
    getPendapatanTotal() {
      this.loading = true;
      this.$axios
        .$get("/api/pendapatan/tentor/total-data")
        .then(response => {
          console.log(response);
          if (response.success) {
            this.dataPendapatan = response.data;
          }
        })
        .catch(error => {
          this.catchError(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    getPendapatanPerKursus() {
      this.loading = true;
      this.$axios
        .$get("/api/pendapatan/tentor/perkursus")
        .then(response => {
          console.log(response);
          if (response.success) {
            this.dataPendapatanPerKursus = response.data;
          }
        })
        .catch(error => {
          this.catchError(error);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    formatRupiah(nominal) {
      if (nominal) {
        nominal = parseFloat(nominal);
        return nominal.toLocaleString("id-ID");
      }
      return 0;
    }
  }
};
</script>
