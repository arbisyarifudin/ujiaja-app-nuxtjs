<template>
  <div class="container">
    <div class="floating">
      <a href="https://api.whatsapp.com/send/?phone=6285773716731&text&type=phone_number&app_absent=0" target="_blank">
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
  props: ["props"],
};
</script>
