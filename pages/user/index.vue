<template>
  <div></div>
</template>
<script>
export default {
  middleware: [
    function({ redirect }) {
      redirect("/user/dashboard");
    }
  ]
};
</script>
