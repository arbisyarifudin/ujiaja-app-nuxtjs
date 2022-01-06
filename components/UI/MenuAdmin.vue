<template>
  <ul class="nav navbar-nav pl-3 flex-column">
    <li class="nav-item">
      <nuxt-link
        class="nav-link d-flex align-items-center"
        to="/administrator/dashboard"
        ><i class="fas fa-chart-pie fa-fw mr-2"></i> Dashboard</nuxt-link
      >
    </li>
    <li class="nav-item" v-if="isHavePermission('Jenjang', 'List')">
      <nuxt-link
        class="nav-link d-flex align-items-center"
        to="/administrator/master_jenjang"
        ><i class="fas fa-caret-square-up fa-fw mr-2"></i> Jenjang</nuxt-link
      >
    </li>
    <b-nav-item-dropdown text="Sekolah" right v-if="isHavePermission(['Kelas', 'Penjurusan', 'Mapel'], 'List')">
      <template #button-content>
        <span
          class="nav-link mb-0 p-0"
          :class="[
            $route.path.includes('master_kelas') ||
            $route.path.includes('master_penjurusan') ||
            $route.path.includes('master_mapel')
              ? 'nuxt-link-active'
              : ''
          ]"
          ><i class="fas fa-school fa-fw mr-2"></i> Sekolah</span
        >
      </template>
      <b-dropdown-item to="/administrator/master_kelas">Kelas</b-dropdown-item>
      <b-dropdown-item to="/administrator/master_penjurusan"
        >Penjurusan</b-dropdown-item
      >
      <b-dropdown-item to="/administrator/master_mapel"
        >Mata Pelajaran</b-dropdown-item
      >
    </b-nav-item-dropdown>
    <b-nav-item-dropdown text="Perguruan Tinggi" right v-if="isHavePermission(['Perguruan Tinggi', 'Program Studi'], 'List')">
      <template #button-content>
        <span
          class="nav-link mb-0 p-0"
          :class="[
            $route.path.includes('master_perguruan_tinggi') ||
            $route.path.includes('program-studi')
              ? 'nuxt-link-active'
              : ''
          ]"
          ><i class="fas fa-school fa-fw mr-2"></i> Perguruan Tinggi</span
        >
      </template>
      <b-dropdown-item to="/administrator/master_perguruan_tinggi"
        >Perguruan Tinggi</b-dropdown-item
      >
      <b-dropdown-item to="/administrator/program-studi"
        >Program Studi</b-dropdown-item
      >
    </b-nav-item-dropdown>
    <b-nav-item-dropdown text="Modul Tryout" right v-if="isHavePermission(['Tryout'], 'List')">
      <template #button-content>
        <span
          class="nav-link mb-0 p-0"
          :class="[
            $route.path.includes('tryout') ||
            ($route.path.includes('product') && !$route.path.includes('uktt'))
              ? 'nuxt-link-active'
              : ''
          ]"
        >
          <i class="fas fa-clipboard fa-fw mr-2"></i> Modul Tryout</span
        >
      </template>
      <b-dropdown-item to="/administrator/tryout"
        >Data Tryout & Soal</b-dropdown-item
      >
      <b-dropdown-item to="/administrator/product"
        >Data Produk / Event</b-dropdown-item
      >
    </b-nav-item-dropdown>
    <b-nav-item-dropdown text="Modul UKTT" right v-if="isHavePermission(['Tryout', 'UKTT'], 'List')">
      <template #button-content>
        <span
          class="nav-link mb-0 p-0"
          :class="[$route.path.includes('uktt') ? 'nuxt-link-active' : '']"
        >
          <i class="fas fa-clipboard fa-fw mr-2"></i> Modul UKTT</span
        >
      </template>
      <b-dropdown-item to="/administrator/uktt">Data Soal UKTT</b-dropdown-item>
      <b-dropdown-item to="/administrator/uktt/product"
        >Data Produk UKTT</b-dropdown-item
      >
    </b-nav-item-dropdown>
    <b-nav-item-dropdown text="Modul MBTI" right v-if="isHavePermission(['MBTI'], 'List')">
      <template #button-content>
        <span
          class="nav-link mb-0 p-0"
          :class="[
            $route.path.includes('mbti') ||
            $route.path.includes('mbti/personality') ||
            $route.path.includes('mbti/dimention')
              ? 'nuxt-link-active'
              : ''
          ]"
        >
          <i class="fas fa-clipboard fa-fw mr-2"></i> Modul MBTI</span
        >
      </template>
      <b-dropdown-item to="/administrator/mbti/personality"
        >Data Kepribadian</b-dropdown-item
      >
      <b-dropdown-item to="/administrator/mbti/dimention"
        >Data Dimensi Dasar</b-dropdown-item
      >
      <b-dropdown-item to="/administrator/mbti"
        >Data MBTI & Soal</b-dropdown-item
      >
    </b-nav-item-dropdown>
    <li class="nav-item" v-if="isHavePermission(['Transaksi'], 'List')">
      <nuxt-link
        class="nav-link d-flex align-items-center"
        to="/administrator/payment"
        ><i class="fas fa-id-badge fa-fw mr-2"></i> Transaksi</nuxt-link
      >
    </li>
    <b-nav-item-dropdown text="Pengguna" right v-if="isHavePermission(['Data Siswa', 'Data Tentor'], 'List')">
      <template #button-content>
        <span
          class="nav-link mb-0 p-0"
          :class="[
            $route.path.includes('user') ||
            $route.path.includes('user/student') ||
            $route.path.includes('user/tentor')
              ? 'nuxt-link-active'
              : ''
          ]"
        >
          <i class="fas fa-clipboard fa-fw mr-2"></i> Pengguna</span
        >
      </template>
      <b-dropdown-item to="/administrator/user/student"
        >Data Siswa</b-dropdown-item
      >
      <b-dropdown-item to="/administrator/user/tentor"
        >Data Tentor</b-dropdown-item
      >
    </b-nav-item-dropdown>
    <li class="nav-item" v-if="isHavePermission('Pengaduan', 'List')">
      <nuxt-link
        class="nav-link d-flex align-items-center"
        to="/administrator/ticket"
        ><i class="fas fa-question-circle fa-fw mr-2"></i> Pengaduan</nuxt-link
      >
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    permissions: {
      type: Array,
      default: function() {
        return [];
      }
    }
  },
  data() {
    return {
      perms: []
    };
  },
  watch: {
    permissions(value) {
      // console.log(value);
      this.perms = value;
    }
  },
  methods: {
    isHavePermission(moduleName, actionName) {
      // console.log(this.perms);
      const moduleFound = this.perms.find(module => moduleName.includes(module.label));
      if (moduleFound) {
        // console.log('moduleFound', moduleFound)
        const actionFound = moduleFound.actions.find(
          action => action.label == actionName
        );
        if (actionFound) {
          // console.log("actionFound", actionFound);
          if (actionFound.allow) {
            return true;
          }
          return false;
        }
        return false;
      }
      return false;
    }
  }
};
</script>
