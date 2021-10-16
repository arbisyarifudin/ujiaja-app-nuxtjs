<template>
  <div>
    <div class="col-md-12 dash-kelas mandiri-detail p-0">
      <h2 class="pb-0 mb-5">
        <BackUrl :title="null" class="py-1 px-2 mr-3" />
        <b-spinner type="grow" class="mr-2" v-if="loading" /> Detail Pembayaran
      </h2>
    </div>
  </div>
</template>

<script>
export default {
  layout: "app",
  data() {
    return {
      loading: false
    };
  }
};
</script>
