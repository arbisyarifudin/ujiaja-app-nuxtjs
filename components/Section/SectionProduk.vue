<template>
  <div class="section section-produk pb-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h2>{{ props.judul }}</h2>
          <div v-html="props.deskripsi" />
        </div>
      </div>
      <div class="row justify-content-around">
        <div
          class="col-lg-6 col-md-12 mb-4"
          v-for="(item, i) in props.item"
          :key="i"
        >
          <div class="produk">
            <div class="row">
              <div
                class="col-lg-7 col-md-8 mb-4 order-md-1 order-2 d-flex flex-column justify-content-between align-items-start"
              >
                <div>
                  <h4>{{ item.judul }}</h4>
                  <h5>{{ item.sub_judul }}</h5>
                  <div class="mb-2 p-0" v-html="item.text" />
                  <!-- <p class="tp mb-2 p-0" v-if="item.tambahan">
                    {{ item.tambahan }}
                  </p> -->
                </div>
                <b-button
                  :href="item.link"
                  variant="outline-primary"
                  class="mt-1"
                >
                  Tombol <i class="fa fa-arrow-right ml-1"></i>
                </b-button>
              </div>
              <div
                class="col-lg-5 col-md-4 text-center order-md-2 order-1 mb-4 mb-md-0"
              >
                <img :src="item.gambar" class="img-fluid" />
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
  name: "SectionProduk",
  props: ["props"],
};
</script>
