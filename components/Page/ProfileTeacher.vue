<template>
  <b-card>
    <h3 class="card-title">Profil</h3>
    <hr />
    <div class="row">
      <div class="col-md-7 mb-md-0 mb-4">
        <div class="table-responsive">
          <table class="table table-borderless">
            <tbody>
              <tr>
                <th width="140">Foto</th>
                <th width="20" class="px-0 text-center">:</th>
                <td>
                  <img
                    v-if="ApiUrl"
                    :src="ApiUrl(user_detail.foto)"
                    @error="noImage"
                    alt="foto"
                    class="img-fluid"
                    style="width: 150px"
                  />
                </td>
              </tr>
              <tr>
                <th width="140">Nama Lengkap</th>
                <th width="20" class="px-0 text-center">:</th>
                <td>{{ user_detail.nama_lengkap }}</td>
              </tr>
              <tr>
                <th width="140">Username</th>
                <th width="20" class="px-0 text-center">:</th>
                <td>{{ user.username }} <span title="Status Verifikasi" class="ml-1">
                  <i class="fas fa-check text-success" v-if="user.verifikasi == 2"></i>
                  <i class="fas fa-times text-danger" v-else></i>
                  </span></td>
              </tr>
              <tr>
                <th width="140">Email</th>
                <th width="20" class="px-0 text-center">:</th>
                <td>{{ user.email }}</td>
              </tr>
              <tr>
                <th width="140">Kepribadian</th>
                <th width="20" class="px-0 text-center">:</th>
                <td v-if="user_detail.nama_kepribadian">
                  <div class="">
                    <h5
                      v-text="user_detail.nama_kepribadian"
                      class="mb-2 mr-2"
                      style="border: 1px dashed #aaa; border-radius: 10px; padding: 10px 20px; display: inline-block"
                    ></h5>
                    <nuxt-link
                      to="/app/mbti"
                      class="btn btn-sm btn-light square"
                      >Lihat Hasil Tes Kepribadian</nuxt-link
                    >
                  </div>
                </td>
                <td v-else>
                  <nuxt-link to="/app/mbti" class="btn btn-sm btn-light square"
                    >Ikuti Tes Kepribadian</nuxt-link
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <nuxt-link to="/app/profile/edit" class="btn btn-info btn-sm"
          >Ubah Profil</nuxt-link
        >
      </div>
      <div class="col-md-5">
        <h4>Level</h4>
        <hr />
        <div class="level row">
          <div class="col-md-3">
            <div class="level-circle mx-auto mx-md-0 mb-3">
              <span class="level-name">BASE</span>
            </div>
          </div>
          <div class="col-md-8">
            <div class="level-rating text-left mb-2">
              <div class="title">Rating saat Ini:</div>
              <div class="text-star" v-html="rerataUlasan(user_detail.rate_mengajar)"></div>
              <div><b>{{user_detail.rate_mengajar}}</b>/5</div>
            </div>
            <div class="level-honorarium text-left mb-2">
              <div class="title">Honorarium Maksimum:</div>
              <div v-if="user && formatRupiah">Rp {{user_detail.level ? formatRupiah(user_detail.level.honor_level) : 0}}</div>
            </div>
            <div class="level-job text-left mb-2">
              <div class="title">Total Mengajar:</div>
              <div>{{user_detail.total_mengajar}} sesi</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </b-card>
</template>

<script>
export default {
  computed: {
    user() {
      return this.$store.state.dataUser.user;
    },
    user_detail() {
      return this.$store.state.dataUser.detail;
    }
  },
  methods: {
    statusBadge(status) {
      let statusClass = "badge badge-";
      switch (status) {
        case 0:
          statusClass += "secondary";
          break;
        case 1:
          statusClass += "info";
          break;
        case 2:
          statusClass += "success";
          break;
        default:
          statusClass += "warning";
          break;
      }
      return statusClass;
    },
    rerataUlasan(rataRata) {
      const rataRataFloor = Math.floor(rataRata);
      const sisaDesimal = Math.round(rataRata - rataRataFloor);

      let element = "";
      for (let i = 0; i < rataRataFloor; i++) {
        element += '<i class="fas fa-star fa-fw text-star"></i>';
      }
      for (let x = 0; x < sisaDesimal; x++) {
        element += '<i class="fas fa-star-half-alt fa-fw text-star"></i>';
      }
      for (let x = 0; x < (5 - rataRataFloor - sisaDesimal); x++) {
        element += '<i class="far fa-star fa-fw text-star"></i>';
      }

      return element;
    },
  }
};
</script>
