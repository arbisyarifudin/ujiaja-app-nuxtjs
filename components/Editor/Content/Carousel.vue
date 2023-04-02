<template>
  <div class="container-fluid">
    <div class="row border-bottom">
      <div class="col-md-12">
        <EditorImage v-model="content.image" :max-size="5">
          <template #title>
            Carousel Slider
          </template>
          <template #warn>
            *Disarankan dengan Banner 1276 x 638 pixel, dan Maksimal 5 Mb
          </template>
        </EditorImage>
      </div>
      <div class="form-user col-md-12">
        <EditorText v-model="content.judul" placeholder="Isi Judul baru">
          <template #title>Judul</template>
        </EditorText>
      </div>
      <div class="form-user col-md-12">
        <EditorTextArea v-model="content.text">
          <template #title>Text</template>
        </EditorTextArea>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>
