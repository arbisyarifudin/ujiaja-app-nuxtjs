<template>
  <div class="mt-4 crud-body bg-white">
    <div class="border-bottom d-flex justify-content-between align-items-center p-3">
      <p class="pl-3">
        <slot name="title" />
      </p>
      <button @click="showContent = !showContent" class="btn btn-outline-none">
        {{ showContent ? '- Minimize' : '+ Maximize' }}
      </button>
    </div>
    <div v-if="showContent" class="p-3">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      showContent: true
    }
  }
}
</script>
