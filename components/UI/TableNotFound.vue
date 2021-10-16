<template>
  <div class="text-center">
    <span>{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: "TableNotFound",
  props: {
    text: {
      type: String,
      default: "Data tidak ditemukan."
    },
    tag: {
      type: String,
      default: null
    }
  }
};
</script>

<style lang="scss" scoped>
div.text-center {
  min-height: 100px;
  > span {
    position: absolute;
    content: "";
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    // background-color: rgba(255, 255, 255, 0.486);
    padding-top: 30px;
  }
}
</style>
