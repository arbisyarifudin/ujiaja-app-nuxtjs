<template>
  <div class="info-board bg-white p-4">
    <h2 class="board-timer d-flex align-items-center">
      <i class="far fa-clock fa-fw mr-1 small"></i> 01:30:00
    </h2>
    <hr />
    <h2 class="board-title mb-3">Nomor Soal</h2>
    <UjianNumberList :list="listNomorSoal" :active="currentNomor.nomor" />
    <hr />
    <!-- <h3 class="board-title mb-3">Panduan Pengerjaan:</h3>
    <div class="board-guide-text" v-html="dataTryout.panduan_pengerjaan"></div> -->
  </div>
</template>

<script>
export default {
  props: {
    dataTryout: {
      type: Object,
      default: {}
    }
  },
  computed: {
    listNomorSoal() {
      return this.$store.state.listNomorSoal;
    },
    currentNomor() {
      return this.$store.state.currentNomor;
    }
  },
  methods: {
    updateNomor(dataNomor) {
      this.$store.commit("set", ["currentNomor", dataNomor]);
    }
  }
};
</script>
