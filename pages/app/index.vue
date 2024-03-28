<template>
  <div>
    app to user
  </div>
</template>

<script>
// redirect to user page
export default {
  async asyncData({ redirect }) {
    redirect('/user')
  }
}
</script>
