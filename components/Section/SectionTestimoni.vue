<template>
  <div :class="['section testimoni', bgColor]">
    <div class="container">
      <div class="row">
        <div class="col-md-12 text-center">
          <h2>{{ props.judul }}</h2>
          <p>{{ props.deskripsi }}</p>
        </div>
        <div class="row w-100 w-md-auto mx-auto">
          <div
            class="col-md-6 mb-md-0 mb-4"
            v-for="(item, i) in props.item"
            :key="'ST' + i"
          >
            <div :class="['testimoni-content', contentColor]">
              <div class="row">
                <div class="col-lg-4 col-12 text-center mb-lg-4 mb-4">
                  <img :src="item.foto" class="img-fluid" />
                </div>
                <div class="col-lg-8 col-12 pt-lg-5">
                  <h3>{{ item.nama }}</h3>
                  <h4>{{ item.titel }}</h4>
                </div>
              </div>
              <p>
                {{ item.testimoni }}
              </p>
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
  data() {
    return {
      bgColor: "",
      contentColor: "",
    };
  },
  mounted() {
    // console.log(this.props.varian);
    // console.log(this.bgColor);
    // console.log(this.contentColor);
    console.log(this.props.varian);
    if (this.props.varian && this.props.varian == "secondary") {
      this.bgColor = "bg-transparent";
      this.contentColor = "bg-white";
    } else {
      this.bgColor = "";
      this.contentColor = "";
    }
  },
};
</script>

<style scoped>
.bg-white {
  background: #fdfdfd !important;
}
</style>