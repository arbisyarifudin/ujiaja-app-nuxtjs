<template>
  <div class="container-fluid">
    <h1>CMS</h1>
    <div class="d-flex menu-edit">
      <nuxt-link
        v-for="(m, i) in menu"
        :key="i"
        :class="linkClass(m.slug)"
        :to="`/administrator/edit-cms/${m.slug}`"
      >
        {{ m.label }}
      </nuxt-link>
    </div>
    <NuxtChild />
  </div>
</template>

<script>
export default {
  layout: "admin",
  data: function() {
    return {
      menu: [
        {
          label: 'Halaman Utama',
          slug: 'halaman-utama'
        },
        {
          label: 'TryOut',
          slug: 'tryout'
        },
        {
          label: 'Les Privat',
          slug: 'les-privat'
        },
        {
          label: 'Tentang UjiAja',
          slug: 'tentang-ujiaja'
        },
        {
          label: 'Untuk Tutor',
          slug: 'untuk-tutor'
        },
        {
          label: 'Untuk Siswa',
          slug: 'untuk-siswa'
        },
        {
          label: 'Untuk Orang tua',
          slug: 'untuk-orangtua'
        },
      ]
    }
  },
  methods: {
    linkClass(slug) {
      if (this.$route.path.includes(slug)) {
        return 'btn btn-primary text-nowrap'
      } else {
        return 'btn btn-outline-primary text-nowrap'
      }
    }
  },
  mounted() {
    if (this.$route.path === '/administrator/edit-cms') {
      this.$router.push('/administrator/edit-cms/halaman-utama')
    }
  }
}
</script>

<style scoped>
.menu-edit {
  column-gap: 14px;
  overflow: auto;
}

.container-fluid {
  z-index: 10;
  position: relative;
}
</style>
