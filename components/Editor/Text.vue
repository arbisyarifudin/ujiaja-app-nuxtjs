<template>
  <div>
    <p><slot name="title" /></p>
    <div class="form-group row justify-content-between px-3">
      <input :value="initialValue" type="text" class="form-control col-md-5" readonly>
      =
      <input :value="modelValue" @input="updateValue" :placeholder="placeholder" type="text" class="form-control col-md-5">
    </div>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  props: {
    initialValue: {
      type: String,
      default: ''
    },
    modelValue: {
      default: null
    },
    placeholder: {
      type: String,
      default: ''
    },
  },
  methods: {
    updateValue(e) {
      this.$emit('update:modelValue', e.target.value)
    }
  }
}
</script>
