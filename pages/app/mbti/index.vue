<template>
  <div class="container-fluid crud">
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
          <button class="btn btn-primary square">
            <i class="fas fa-reply fa-fw mr-1"></i> Lakukan Test Ulang
          </button>
        </div>
        <hr />
      </div>
      <div class="col-md-12 personality">
        <div class="row">
          <div class="col-md-4">
            <h3>Kepribadianmu</h3>
            <h1>INFJ</h1>
          </div>
          <div class="col-md-8">
            <table class="table table-borderless table-sm mb-0">
              <tr>
                <th width="100">Jenis</th>
                <td width="10"></td>
                <td>Reflektif</td>
              </tr>
              <tr>
                <th width="100">Profesi</th>
                <td width="10"></td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit</td>
              </tr>
              <tr>
                <th width="100">Pasangan</th>
                <td width="10"></td>
                <td>Lorem ipsum dolor sit amet consectetur adipisicing elit</td>
              </tr>
            </table>
          </div>
        </div>
        <hr />
        <h5 class="mb-2">Persentase :</h5>
        <div class="row">
          <div class="col-md-3 col-sm-6 col-12 mb-4">
            <div class="card personality-card">
              <div class="card-body bg-info text-light">
                <h4 class="personality-type">Mind</h4>
                <div class="personality-circle">
                  72 <span class="percent">%</span>
                </div>
                <div class="separator"></div>
                <div class="personality-trait">Introverted</div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 col-12 mb-4">
            <div class="card personality-card">
              <div class="card-body bg-danger text-light">
                <h4 class="personality-type">Energy</h4>
                <div class="personality-circle">
                  60 <span class="percent">%</span>
                </div>
                <div class="separator"></div>
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
                <div class="personality-trait">Feeling</div>
              </div>
            </div>
          </div>
          <div class="col-md-3 col-sm-6 col-12 mb-4">
            <div class="card personality-card">
              <div class="card-body bg-primary text-light">
                <h4 class="personality-type">Tatics</h4>
                <div class="personality-circle">
                  63 <span class="percent">%</span>
                </div>
                <div class="separator"></div>
                <div class="personality-trait">Judging</div>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <h5 class="mb-2">Kelebihan :</h5>
        <ul class="list">
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            placeat numquam at modi vitae id, velit cum eveniet iusto
            cupiditate.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            placeat numquam at modi vitae id, velit cum eveniet iusto
            cupiditate.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            placeat numquam at modi vitae id, velit cum eveniet iusto
            cupiditate.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            placeat numquam at modi vitae id, velit cum eveniet iusto
            cupiditate.
          </li>
        </ul>
        <hr />
        <h5 class="mb-2">Saran :</h5>
        <ul class="list">
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            placeat numquam at modi vitae id, velit cum eveniet iusto
            cupiditate.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            placeat numquam at modi vitae id, velit cum eveniet iusto
            cupiditate.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            placeat numquam at modi vitae id, velit cum eveniet iusto
            cupiditate.
          </li>
          <li>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            placeat numquam at modi vitae id, velit cum eveniet iusto
            cupiditate.
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app"
};
</script>
