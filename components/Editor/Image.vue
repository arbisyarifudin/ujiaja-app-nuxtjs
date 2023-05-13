<template>
  <div>
    <p><slot name="title" /></p>
    <input class="d-none" @change="setImage" type="file" accept="image/*" :id="inputId">
    <button v-if="!fakePath" @click="clickInput" class="image-placeholder">
      +
    </button>
    <br />
    <div v-if="fakePath">
      <img :src="fakePath" alt="">
      <div class="row">
        <button @click="clickInput" class="btn btn-outline-primary">Ganti Gambar</button>
        <button @click="deleteImage" class="btn btn-outline-danger ml-3">Hapus Gambar</button>
      </div>
    </div>
    <small class="text-danger"><slot name="warn" /></small>
  </div>
</template>

<script>
export default {
  model: {
    prop: 'modelValue',
    event: 'update:modelValue'
  },
  props: {
    maxSize: {
      type: Number,
      default: 2
    },
    modelValue: {
      default: null
    }
  },
  data() {
    return {
      inputId: null,
      fakePath: null,
    }
  },
  mounted() {
    this.inputId = this.generateRandomId()
    if (typeof this.$props.modelValue === 'string') {
      this.fakePath = `${this.$axios.defaults.baseURL}/${this.$props.modelValue}`
    }
  },
  methods: {
    generateRandomId() {
      return `e-i-${Math.random().toString(36).substring(2,7)}-${Math.ceil(Math.random() * 1000)}`
    },
    clickInput() {
      document.getElementById(this.inputId).click()
    },
    setImage(e) {
      const file = e.target.files[0]
      const fileSize = (file.size / 1024 / 1024).toFixed(4)
      if (fileSize > this.maxSize) {
        alert('file size too big')
        e.target.value = ''
        this.$emit('update:modelValue', null)
        this.fakePath = null
      } else {
        this.$emit('update:modelValue', file)
        this.fakePath = URL.createObjectURL(file)
      }
    },
    deleteImage() {
      document.getElementById(this.inputId).value = ''
      this.$emit('update:modelValue', null)
      this.fakePath = null
    }
  }
}
</script>

<style scoped>
.image-placeholder {
  width: 112px;
  height: 68px;
  border: 1.5px solid #6B667C;
  background-color: #fff;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
