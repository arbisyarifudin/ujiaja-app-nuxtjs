<template>
  <div class="section section-langkah py-4 bg-white" id="section-langkah">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center mb-3">
          <h2>{{ props.judul }}</h2>
        </div>
      </div>
      <div class="section-body">
        <div class="row">
          <div
            class="col-md-4"
            v-for="(item, i) in props.langkah"
            :key="'SL' + i"
          >
            <div class="langkah-item d-flex">
              <div class="nomor flex-none">
                <span>{{ i + 1 }}</span>
              </div>
              <div class="ml-2">
                <h3 class="judul">{{ item.judul }}</h3>
                <p>{{ item.deskripsi }}</p>
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
  props: ["props"],
};
</script>