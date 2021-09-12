<template>
  <div class="section section-produk pb-5">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h2>{{ props.judul }}</h2>
          <p v-html="props.deskripsi"></p>
        </div>
      </div>
      <div class="row">
        <template v-for="(item, i) in props.item">
          <div class="col-lg-6 col-md-12 mb-4" :key="'SP' + i">
            <div class="produk">
              <div class="row">
                <div
                  class="
                    col-lg-7 col-md-8
                    mb-4
                    order-md-1 order-2
                    d-flex
                    flex-column
                    justify-content-between
                    align-items-start
                  "
                >
                  <div>
                    <h4 v-html="item.judul"></h4>
                    <h5>{{ item.brand }}</h5>
                    <p class="mb-2 p-0">
                      {{ item.deskripsi }}
                    </p>
                    <p class="tp mb-2 p-0" v-if="item.tambahan">
                      {{ item.tambahan }}
                    </p>
                  </div>
                  <b-button
                    :href="item.url"
                    variant="outline-primary"
                    class="mt-1"
                  >
                    Selengkapnya <i class="fa fa-arrow-right ml-1"></i>
                  </b-button>
                </div>
                <div
                  class="
                    col-lg-5 col-md-4
                    text-center
                    order-md-2 order-1
                    mb-4 mb-md-0
                  "
                >
                  <img :src="item.gambar" class="img-fluid" />
                </div>
              </div>
            </div>
          </div>
        </template>
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