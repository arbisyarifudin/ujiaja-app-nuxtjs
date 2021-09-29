<template>
  <div class="save-status">
    <div v-if="props.loading" class="text-primary d-flex align-items-center">
      <b-spinner
        type="grow"
        small
        class="mr-1"
        style="width: 10px; height: 10px"
      ></b-spinner>
      Menyimpan perubahan...
    </div>
    <div v-else-if="props.submitted && props.success" class="text-success ">
      <b-icon icon="check-circle" class="mr-1"></b-icon>
      Perubah disimpan.
    </div>
    <div v-else-if="props.submitted && !props.success" class="text-danger">
      <b-icon icon="x-circle" class="mr-1"></b-icon>
      Perubah gagal disimpan. Mohon coba lagi.
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Object,
      default: () => {
        return {
          loading: false,
          submitted: false,
          success: false
        };
      }
    }
  },
  data() {
    return {
      props: {}
    };
  },
  mounted() {
    this.props = this.data;
  },
  watch: {
    data(value) {
      console.log("newprop", value);
      this.props = this.data;
    }
  }
};
</script>

<style>
.save-status {
  font-size: 10px;
  margin: 5px 0;
}
</style>
