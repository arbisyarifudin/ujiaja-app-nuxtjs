<template>
  <ol class="list-unstyled row align-items-center board-list">
    <li
      class="board-item col-2 mb-3"
      v-for="(nom, index) in list"
      :key="'n' + index"
    >
      <button
        type="button"
        class="board-item-number btn"
        :class="[
          active == nom.nomor ? 'active' : '',
          jawaban[nom.nomor].jawaban_user ? 'filled' : ''
        ]"
        @click.prevent="updateNomor(nom)"
      >
        {{ nom.nomor }}
      </button>
      <!-- <span class="bg-primary" v-if="active == nom.nomor"></span>
      <span
        class="bg-success"
        v-else-if="jawaban[nom.nomor].jawaban_user"
      ></span> -->
    </li>
  </ol>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: function() {
        return [];
      }
    },
    jawaban: {
      type: Object,
      default: function() {
        return {};
      }
    },
    active: {
      type: Number,
      default: 1
    }
  },
  methods: {
    updateNomor(dataNomor) {
      //   this.$store.commit("set", ["currentNomor", dataNomor]);
      this.$emit("update", dataNomor);
    }
  },
  mounted() {
    console.log(this.jawaban)
  },
};
</script>
