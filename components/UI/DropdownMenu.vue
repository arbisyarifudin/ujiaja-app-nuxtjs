<template>
  <div class="button-dropdown" :class="isOpen ? 'show' : ''">
    <span v-if="subtitle">{{subtitle}}</span>
    <ul>
      <li v-for="(item, index) in items" :key="index" @click="selectItem(item)">{{ item.text ? item.text : item }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true
    },
    isOpen: {
      type: Boolean,
      default: false
    },
    subtitle: {
      type: String,
      default: ''
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item);
    }
  }
}
</script>

<style lang="scss" scoped>

button {
  position: relative;

  .button-dropdown {
    z-index: 100;
    position: absolute;
    display: none;
    bottom: -2px;
    right: 0;
    transform: translateY(100%);
    max-width: 100%;
    width: 100px;
    height: auto;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border: 1px solid inherit;
    cursor: default;

    &.show {
      display: block;
    }

    span {
      cursor: default;
      display: block;
      padding: 10px 0 5px;
      font-size: 10px;
      color: #6d6d6d;
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;
      li {
        cursor: pointer;
        padding: 8px 10px;
        font-size: 12px;

        &:hover {
          background-color: #f1f1f1;
        }
      }
    }
  }

  &:hover {
    .button-dropdown {
      // display: block;

      li {
        color: #8781FF;
      }
    }
  }
}

</style>
