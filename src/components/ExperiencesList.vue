<template>
  <div container-fluid>
    <CAccordion always-open>
      <div v-if="experiences.length">
      <div :key="experience.id" v-for="experience in experiences">
        <InterviewExperience :experience="experience"></InterviewExperience>
      </div>
      </div>
      <h3 v-else>No Experiences are added yet.</h3>
    </CAccordion>
  </div>
</template>

<script>
import { CAccordion } from '@coreui/vue';
import InterviewExperience from './InterviewExperience.vue';

export default {
  name: 'ExperiencesList',
  props: {
    /**
     * List of user experiences.
     */
    experiences: Array,
  },
  components: {
    InterviewExperience,
    CAccordion,
  },
};
</script>

<style scoped>
</style>
