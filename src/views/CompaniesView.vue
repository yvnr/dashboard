<template>
  <main id="companies">
    <h1>Here, You can see the aggregated results for each company</h1>
    <FilterForCompany @filtered-on-company="filterOnCompany"></FilterForCompany>
    <CompanyWiseData :filter-key="searchObject"></CompanyWiseData>
  </main>
</template>

<script>
import FilterForCompany from '../components/FilterForCompany.vue';
import CompanyWiseData from '../components/CompanyWiseData.vue';

export default {
  name: 'CompaniesView',
  components: {
    FilterForCompany,
    CompanyWiseData,
  },
  data() {
    return {
      /**
       * current search criteria that is set by user.
       */
      searchObject: {},
    };
  },
  methods: {
    /**
     * Gets called when the user updates the fiter.
     * updates the search object with the user entry
     * @param {Object} searchCriteria search filters set by the user
     */
    filterOnCompany(searchCriteria) {
      this.searchObject = searchCriteria;
    },
  },
};
</script>
