<template>
  <div class="row d-flex no-gutters">
    <div class="col-md-12 dashboard px-0">
      <div class="d-flex justify-content-between">
        <div>
          <h2 class="dash-label">
            Halo, Arbi Syarifudin!
          </h2>
          <p style="color: #777">
            Berikut adalah hasil test MBTI yang pernah kamu kerjakan.
          </p>
        </div>
        <button class="btn btn-primary square" v-if="data">
          <i class="fas fa-reply fa-fw mr-1"></i> Tes Ulang
        </button>
      </div>
      <hr />
    </div>
    <div class="col-md-12 personality" v-if="detail && detail.kepribadian">
      <div class="row">
        <div class="col-md-4">
          <h3>Kepribadianmu</h3>
          <h1>{{detail.kepribadian.nama_singkat}}</h1>
          <div class="small">{{detail.kepribadian.nama_panjang}}</div>
        </div>
        <div class="col-md-8">
          <table class="table table-borderless table-sm mb-0">
            <tr>
              <th width="100">Jenis</th>
              <td width="10"></td>
              <td>{{detail.kepribadian.jenis}}</td>
            </tr>
            <tr>
              <th width="100">Profesi</th>
              <td width="10"></td>
              <td>{{detail.kepribadian.profesi}}</td>
            </tr>
            <tr>
              <th width="100">Pasangan</th>
              <td width="10"></td>
              <td>{{detail.kepribadian.partner}}</td>
            </tr>
          </table>
        </div>
      </div>
      <hr />
      <h5 class="mb-2">Persentase :</h5>
      <div class="row">
        <div class="col-md-3 col-sm-6 col-12 mb-4" v-for="(hitungan, index) in detail.hitungan" :key="index">
          <div class="card personality-card">
            <div class="card-body text-light" :class="[hitungan.bgClass]">
              <h4 class="personality-type">{{hitungan.label}}</h4>
              <div class="personality-circle">
                {{hitungan.persentase[0]}} <span class="percent">%</span>
              </div>
              <div class="separator"></div>
              <div class="personality-trait small">{{hitungan.dimensi[1]}}</div>
              <div class="personality-trait small"><small>vs</small></div>
              <div class="personality-trait">{{hitungan.dimensi[0]}}</div>
            </div>
          </div>
        </div>
        <!-- <div class="col-md-3 col-sm-6 col-12 mb-4">
          <div class="card personality-card">
            <div class="card-body bg-danger text-light">
              <h4 class="personality-type">Energy</h4>
              <div class="personality-circle">
                60 <span class="percent">%</span>
              </div>
              <div class="separator"></div>
              <div class="personality-trait small">Sensing</div>
              <div class="personality-trait small"><small>vs</small></div>
              <div class="personality-trait">Intuitive</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12 mb-4">
          <div class="card personality-card">
            <div class="card-body bg-success text-light">
              <h4 class="personality-type">Nature</h4>
              <div class="personality-circle">
                71 <span class="percent">%</span>
              </div>
              <div class="separator"></div>
              <div class="personality-trait small">Thinking</div>
              <div class="personality-trait small"><small>vs</small></div>
              <div class="personality-trait">Feeling</div>
            </div>
          </div>
        </div>
        <div class="col-md-3 col-sm-6 col-12 mb-4">
          <div class="card personality-card">
            <div class="card-body bg-primary text-light">
              <h4 class="personality-type">Tactics</h4>
              <div class="personality-circle">
                63 <span class="percent">%</span>
              </div>
              <div class="separator"></div>
              <div class="personality-trait small">Prospecting</div>
              <div class="personality-trait small"><small>vs</small></div>
              <div class="personality-trait">Judging</div>
            </div>
          </div>
        </div> -->
      </div>
      <hr />
      <h5 class="mb-2">Kelebihan :</h5>
      <div v-html="detail.kepribadian.deskripsi" class="list"></div>
      <!-- <ul class="list">
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          placeat numquam at modi vitae id, velit cum eveniet iusto cupiditate.
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          placeat numquam at modi vitae id, velit cum eveniet iusto cupiditate.
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          placeat numquam at modi vitae id, velit cum eveniet iusto cupiditate.
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          placeat numquam at modi vitae id, velit cum eveniet iusto cupiditate.
        </li>
      </ul> -->
      <hr />
      <h5 class="mb-2">Saran :</h5>
      <div v-html="detail.kepribadian.saran" class="list"></div>
      <!-- <ul class="list">
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          placeat numquam at modi vitae id, velit cum eveniet iusto cupiditate.
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          placeat numquam at modi vitae id, velit cum eveniet iusto cupiditate.
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          placeat numquam at modi vitae id, velit cum eveniet iusto cupiditate.
        </li>
        <li>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
          placeat numquam at modi vitae id, velit cum eveniet iusto cupiditate.
        </li>
      </ul> -->
    </div>
  </div>
</template>

<script>
export default {
  props: ['data'],
  data () {
    return {
      detail: {
        kepribadian: {}
      },
    }
  },
  mounted() {
    this.detail = this.data;
  },
  watch: {
    data(value) {
      console.log(value)
      this.detail = value
    }
  }
}
</script>
