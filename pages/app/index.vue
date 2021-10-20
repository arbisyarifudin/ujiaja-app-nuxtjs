<template>
  <div></div>
</template>
<script>
export default {
  middleware: [
    function({ redirect }) {
      redirect("/app/dashboard");
    }
  ]
};
</script>
