<template>
  <div class="container-fluid">
    <div class="row border-bottom">
      <div class="col-md-12">
        <EditorImage v-model="content.carousel" :max-size="5">
          <template #title> Card </template>
          <template #warn>
            *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
          </template>
        </EditorImage>
      </div>
      <div class="form-user col-md-12">
        <EditorText
          v-model="content.judul"
          :initial-value="original.judul"
          placeholder="Isi Judul baru"
        >
          <template #title>Judul</template>
        </EditorText>
      </div>
      <div class="form-user col-md-12">
        <EditorTextArea v-model="content.text" :initial-value="original.text">
          <template #title>Text</template>
        </EditorTextArea>
      </div>
      <div class="form-user col-md-12" v-if="content.posisi != undefined">
        <label for="posisi">Posisi</label>
        <b-form-select
          id="posisi"
          name="posisi"
          class="form-control"
          v-model="content.posisi"
          :options="[
            { text: '-- Pilih --', value: null },
            { text: 'Kanan', value: 'kanan' },
            { text: 'Kiri', value: 'kiri' },
          ]"
        >
        </b-form-select>
      </div>
    </div>    
    <div class="row py-2 border-bottom mt-5">
      <button @click="$emit('add', content)" class="btn btn-outline-primary">
        + Tambah Card
      </button>
      <button @click="$emit('delete', content)" class="btn btn-outline-danger ml-3" :disabled="isLast">
        - Hapus Card
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
    original: {
      type: Object,
      default: () => ({}),
    },
    isLast: {
      type: Boolean,
      default: false,
    },
    canAdd: {
      type: Boolean,
      default: false
    }
  },
  emits: ['add', 'delete']
};
</script>
