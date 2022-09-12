<template>
  <div class="container">
    <div class="floating">
      <a :href="`https://wa.me/${wa}`" target="_blank">
        <img src="icon/WhatsApp.png" alt="">

      </a>
    </div>
  </div>
</template>

<style scoped>
  .floating {
    position: fixed;
    top: 85vh;
    right: 0px;
    margin: 3rem;
    margin-bottom: 5rem;
  }

  .floating img {
    width: 2.5rem;
  }
</style>

<script>
export default {
  name: "WhatsAppFloatingComponent",
  props: ["wa"]
};
</script>
