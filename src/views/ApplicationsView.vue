<template>
  <main id="applications">
    <AggregateValueList :aggregateValues="aggregateValues"></AggregateValueList>
    <AddJobApplicationModal />
    <JobsApplied></JobsApplied>
  </main>
</template>

<script>
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
      // TODO: this data needs to be fetched from backend service
      this.aggregateValues = [
        { id: 1, text: 'Jobs Applied In Total', value: 400 },
        { id: 2, text: 'Applications In Progress', value: 300 },
        { id: 3, text: 'Offers', value: 10 },
      ];
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
