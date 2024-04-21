<template>
  <div>
    to administrator/index.vue
  </div>
</template>

<script>
// redirect to dashboard
export default {
  async asyncData({ redirect }) {
    redirect('/administrator/dashboard')
  }
}
</script>
