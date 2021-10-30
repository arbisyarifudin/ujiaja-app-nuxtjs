<template>
  <div class="container-fluid">
    <no-ssr>
      <SectionPersonalityTestResult v-if="!empty"/>
      <SectionPersonalityTestEmpty v-else/>
    </no-ssr>
  </div>
</template>

<script>
export default {
  layout: "app",
  data () {
    return {
      empty: true,
    }
  }
};
</script>
