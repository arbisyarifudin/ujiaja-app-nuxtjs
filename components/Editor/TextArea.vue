<template>
  <div>
    <p><slot name="title" /></p>
    <div class="form-group row justify-content-between px-3 align-items-end">
      <div v-html="initialValue" type="text" class="form-control col-md-5"></div>
      =
      <client-only>
        <VueEditor
          class="col-md-5"
          id="kontent-1-text"
          ref="kontent-1-text"
          :value="modelValue"
          :editor-toolbar="customToolbar"
          @input="updateValue"
        />
      </client-only>
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
    }
  },
  data() {
    return {
      customToolbar: [
        ['bold', 'italic', 'underline']
      ]
    }
  },
  methods: {
    updateValue(val) {
      this.$emit('update:modelValue', val)
    }
  }
}
</script>

<style>
.ql-editor {
  min-height: 91px !important;
}
</style>
