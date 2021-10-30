<template>
  <div class="row no-gutters">
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
        <!-- <button class="btn btn-primary square">
          <i class="fas fa-shopping-cart fa-fw mr-1"></i> Beli Tes MBTI
        </button> -->
      </div>
      <hr />
    </div>
    <div class="col-md-12">
      <div class="kelas lihat-tryout mt-4 d-flex w-100">
        <div class="col-md-8">
          <h4 class="m-0 mb-3">Oops!</h4>
          <p>
            Kamu belum pernah melakukan tes kepribadian. <br />
            Yuk beli tes MBTI sekarang..
          </p>
          <nuxt-link class="btn btn-primary dashboard px-4" to="/app/mbti/enroll">
            Beli Tes MBTI
          </nuxt-link>
        </div>
      </div>
    </div>
  </div>
</template>
