<template>
  <div class="pertanyaan mb-5">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center sub-card">
          <h2>Pertanyaan Yang Sering Diajukan</h2>
        </div>
        <div class="col-lg-12 accordion px-md-5 px-3 pb-4">
          <div id="accordion" role="tablist">
            <b-card no-body class="mb-1" v-for="(item, i) in items" :key="i">
              <b-card-header
                header-tag="header"
                role="tab"
                v-b-toggle="'accordion-' + (i + 1)"
              >
                <a class="card-link">
                  <p class="text-card">{{ item.q }}</p>
                  <span class="when-closed"><i class="fas fa-plus"></i></span>
                  <span class="when-open"><i class="fas fa-minus"></i></span>
                </a>
              </b-card-header>
              <b-collapse
                :id="'accordion-' + (i + 1)"
                :visible="i == 0"
                accordion="my-accordion"
                role="tabpanel"
              >
                <b-card-body>
                  <b-card-text>{{ item.a }}</b-card-text>
                </b-card-body>
              </b-collapse>
            </b-card>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["items"],
};
</script>