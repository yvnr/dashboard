<template>
  <main id="interviewExperiences">
    <h1>Here, you can search for Interview Experiences</h1>
    <!-- <FilterForCompany
      @filtered-on-company="setSearchCriteria"
    ></FilterForCompany> -->
    <AddInterviewExperienceModal
      :displayAddInterviewExperience="displayAddInterviewExperience"
    ></AddInterviewExperienceModal>
    <ExperiencesList :experiences="experiences"></ExperiencesList>
    <div class="error" v-for="error in errors" :key="error">{{ error }}</div>
  </main>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
import { ref } from 'vue';
import { urls } from '../config.json';
import store from '../store';
// import FilterForCompany from '../components/FilterForCompany.vue';
import ExperiencesList from '../components/ExperiencesList.vue';
import AddInterviewExperienceModal from '../components/AddInterviewExperienceModal.vue';

export default {
  name: 'InterviewExperiences',
  components: {
    // FilterForCompany,
    ExperiencesList,
    AddInterviewExperienceModal,
  },
  data() {
    return {
      /**
       * copmany details entered by user to filter experiences data.
       */
      searchCriteria: {},
      /**
       * Experiences list.
       */
      experiences: [],
      /**
       * Flag to control the Interview Experiences Form visibility.
       */
      displayAddInterviewExperience: false,
      /**
       * error messages.
       */
      errors: [],
      /**
       * reload on form addition.
       */
      reloadToggleSrore: ref(store.state.reloadToggle),
    };
  },
  created() {
    this.fetchInterviewExpereinces();
    this.unwatch = store.watch(
      (state, getters) => getters.reloadToggle,
      (newValue, oldValue) => {
        console.log(oldValue, newValue);
        this.reloadToggleSrore = newValue;
      },
      {
        deep: true,
      },
    );
  },
  watch: {
    searchCriteria: 'fetchInterviewExpereinces',
    reloadToggleSrore: 'fetchInterviewExpereinces',
  },
  methods: {
    /**
     * Gets called when user update search criteria.
     * sets the search criteria to criteria enterd by user
     * @param {Object} searchCriteria search filters set by the user
     */
    setSearchCriteria(searchCriteria) {
      console.log(searchCriteria);
      this.searchCriteria = searchCriteria;
    },
    /**
     * Gets called when the search criteria is updated.
     * Makes an API call to fetch the data.
     */
    async fetchInterviewExpereinces() {
      console.log(this.searchCriteria);
      try {
        const res = await axios.get(urls.record.domain + urls.record.path, {
          headers: {
            'x-uid': store.state.uid,
            'x-univ-id': store.state.univId,
            Authorization: `idToken ${store.state.sessionToken}`,
          },
        });
        console.log(res.data);
        this.experiences = [];
        for (let i = 0; i < res.data.length; i += 1) {
          this.experiences.push({
            id: res.data[i].id,
            role: res.data[i].role,
            result: res.data[i].status,
            on: moment(res.data[i].updatedAt).format('YYYY-MM-DD'),
            data: res.data[i].summary,
          });
        }
      } catch (error) {
        console.log(error);
        this.errors.push(error.response.data.errorMessage);
      }
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
