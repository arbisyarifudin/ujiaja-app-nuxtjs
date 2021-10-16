<template>
  <b-breadcrumb>
    <b-breadcrumb-item
      v-for="(breadcrumb, b) in breadcrumbs"
      :key="b"
      :href="breadcrumb.href"
      :active="breadcrumb.active"
      class="text-capitalize"
    >
      <b-icon
        v-if="breadcrumb && breadcrumb.icon"
        :icon="breadcrumb.icon"
        scale="1.2"
        aria-hidden="true"
        class="mr-2"
      ></b-icon>
      {{ breadcrumb.text }}
    </b-breadcrumb-item>
  </b-breadcrumb>
</template>

<script>
export default {
  computed: {
    breadcrumbs() {
      return this.$store.state.breadcrumbs;
    }
  },
  mounted() {
    this.updateBreadcrumb();
  },
  watch: {
    $route: function(value) {
      this.updateBreadcrumb();
    }
  },
  methods: {
    updateBreadcrumb() {
      const path = this.$route.path;
      const pathArray = path.split("/").filter(item => item !== "");

      let newBreadcrumbs = [];
      let href = "";

      for (let i = 0; i < pathArray.length; i++) {
        const item = pathArray[i];
        href += "/" + item;
        let text = item.charAt(0).toUpperCase() + item.slice(1);
        text = text.replace(/_/g, " ");

        newBreadcrumbs.push({
          text: text,
          href: href
        });
      }

      newBreadcrumbs = newBreadcrumbs.map((item, index) => {
        return {
          text:
            index == 0 && (item.text == "Administrator" || item.text == "App")
              ? "Dashboard"
              : item.text,
          href:
            index == 0 && (item.text == "Administrator" || item.text == "App")
              ? "/" + item.text.toLowerCase() + "/dashboard"
              : item.href,
          icon:
            index == 0 && (item.text == "Administrator" || item.text == "App")
              ? "house"
              : null,
          active:
            item.href === this.$route.path ||
            (newBreadcrumbs[index + 1] &&
              newBreadcrumbs[index + 1].href.includes(this.$route.params.id))
        };
      });

      console.log(this.$route);
      console.log(newBreadcrumbs);
      this.$store.commit("setBreadcrumb", newBreadcrumbs);
    }
  }
};
</script>
