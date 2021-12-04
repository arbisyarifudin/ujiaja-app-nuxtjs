<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col-md-12">
        <h2 class="dash-label">Dashboard</h2>
        <p>Ringkasan</p>
        <div class="dash-content text-center">
          <div class="row">
            <div class="col-md-4 d-flex">
              <div>
                <img src="/dashboard/dashboard1.png" class="img-fluid mr-3" />
              </div>
              <div class="text-left">
                <h4 class="list-dash mt-1">Tryout</h4>
                <p class="total m-0">Total {{totalTryout}}</p>
              </div>
            </div>
            <div class="col-md-4 d-flex">
              <div>
                <img src="/dashboard/dashboard2.png" class="img-fluid mr-3" />
              </div>
              <div class="text-left">
                <h4 class="list-dash mt-1">Kelas Kursus</h4>
                <p class="total m-0">Total {{totalKursus}}</p>
              </div>
            </div>
            <div class="col-md-4 d-flex">
              <div>
                <img src="/dashboard/dashboard3.png" class="img-fluid mr-3" />
              </div>
              <div class="text-left">
                <h4 class="list-dash mt-1">Transaksi</h4>
                <p class="total m-0">Total {{totalTransaksi}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "admin",
  data() {
    return {
      totalTryout: 0,
      totalKursus: 0,
      totalTransaksi: 0,
    }
  },
  created() {
    this.getDashboardData()
  },
  mounted() {
    this.$store.commit("setBreadcrumb", [{ text: "Dashboard", icon: "house" }]);
  },
  methods: {
    getDashboardData() {
      this.$axios.$get('/api/admin/dashboard')
      .then(response => {
        if(response.success) {
          this.totalTryout = response.data.total_tryout
          this.totalKursus = response.data.total_kursus
          this.totalTransaksi = response.data.total_transaksi
        }
      })
    }
  }
};
</script>
