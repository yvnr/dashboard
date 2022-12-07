<template>
  <main id="companies">
    <h1>Here, You can see the aggregated results for each company</h1>
    <FilterForCompany @filtered-on-company="filterOnCompany"></FilterForCompany>
    <CompanyWiseData :filter-key="searchObject"></CompanyWiseData>
  </main>
</template>


<script>
import FilterForCompany from "../components/FilterForCompany.vue";
import CompanyWiseData from "../components/CompanyWiseData.vue";

export default {
  name: "Companies",
  setup() {},
  components: {
    FilterForCompany,
    CompanyWiseData,
  },
  data() {
    return {
      searchObject: {},
    };
  },
  methods: {
    filterOnCompany(searchCriteria) {
      this.searchObject = searchCriteria;
    },
  },
};
</script>