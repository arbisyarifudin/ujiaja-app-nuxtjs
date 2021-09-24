<template>
  <tr>
    <td>
      <div class="table-loading">
        <span><b-spinner small class="mr-1"></b-spinner> Memuat data...</span>
      </div>
    </td>
  </tr>
</template>

<script>
export default {
    name:'TableLoading',
}
</script>

<style lang="scss" scoped>
.table-loading {
        min-height: 100px;
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
            background-color: rgba(255, 255, 255, 0.3);
            content: "";
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: 1;
        }
}
</style>
