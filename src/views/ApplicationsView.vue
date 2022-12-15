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
      showAddJobApplication: false,
      aggregateValues: [],
    };
  },
  created() {
    // TODO: this data needs to be fetched from backend service
    this.aggregateValues = [
      { id: 1, text: 'Jobs Applied In Total', value: 400 },
      { id: 2, text: 'Applications In Progress', value: 300 },
      { id: 3, text: 'Offers', value: 10 },
    ];
  },
  methods: {
    toggleAddJobAppliation() {
      this.showAddJobApplication = !this.showAddJobApplication;
    },
  },
};
</script>
