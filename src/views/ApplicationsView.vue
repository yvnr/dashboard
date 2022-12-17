<template>
  <main id="applications">
    <div class="error" v-for="error in errors" :key="error">{{ error }}</div>
    <AggregateValueList :aggregateValues="aggregateValues"></AggregateValueList>
    <AddJobApplicationModal />
    <JobsApplied></JobsApplied>
  </main>
</template>

<script>
import axios from 'axios';
import { urls } from '../config.json';
import store from '../store';
import '@coreui/coreui/dist/css/coreui.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AggregateValueList from '../components/AggregateValueList.vue';
import JobsApplied from '../components/JobsApplied.vue';
import AddJobApplicationModal from '../components/AddJobApplicationModal.vue';

export default {
  name: 'ApplicationsView',
  components: {
    AggregateValueList,
    AddJobApplicationModal,
    JobsApplied,
  },
  data() {
    return {
      /**
       * Flag to control the Applications Form visibility.
       */
      showAddJobApplication: false,
      /**
       * Aggregate values list.
       */
      aggregateValues: [],
      /**
       * error messages.
       */
      errors: [],
    };
  },
  created() {
    this.fetchAggregateValues();
  },
  methods: {
    /**
     * Gets called when the component is created.
     * Makes an API call to fetch the data.
     */
    async fetchAggregateValues() {
      try {
        const res = await axios.get(
          urls.tracker.domain + urls.tracker.aggregate_path,
          {
            headers: {
              'x-uid': store.state.uid,
              'x-univ-id': store.state.univId,
              Authorization: `idToken ${store.state.sessionToken}`,
            },
          },
        );
        console.log(res.data);
        this.aggregateValues = [
          {
            id: 1,
            text: 'Jobs Applied In Total',
            value: res.data.totalApplicationsCount,
          },
          {
            id: 2,
            text: 'Applications In Progress',
            value: res.data.inProgressCount,
          },
          { id: 3, text: 'Offers', value: res.data.offersCount },
        ];
        console.log(this.aggregateValues);
      } catch (error) {
        console.log(error);
        this.errors.push(error.response.data.errorMessage);
      }
    },
    /**
     * Gets called when the user click on Add Application.
     * toggles the Application form display
     */
    toggleAddJobAppliation() {
      this.showAddJobApplication = !this.showAddJobApplication;
    },
  },
};
</script>

<style scoped>
.error {
  color: crimson;
  font-size: 24px;
  padding-bottom: 1px;
}
</style>
