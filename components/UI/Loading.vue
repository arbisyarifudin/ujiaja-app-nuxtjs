<template>
  <div class="loading">
    <span :style="textStyle"><b-spinner small class="mr-1"></b-spinner> {{text}}</span>
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Memuat data...'
    },
    textStyle: {
      type: Object,
      default: function() {
        return {}
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.loading {
  min-height: 200px;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  > span {
    z-index: 5;
    color: #000;
    padding: 5px 20px;
  }
  &::before {
    position: absolute;
    // background-color: rgba(255, 255, 255, 0.3);
    content: "";
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
