<template>
  <main id="interviewExperiences">
    <h1>Here, You Can Search for others Interview Experiences</h1>
    <FilterForCompany
      @filtered-on-company="setSearchCriteria"
    ></FilterForCompany>
    <AddInterviewExperienceModal :displayAddInterviewExperience="displayAddInterviewExperience"></AddInterviewExperienceModal>
    <ExperiencesList :experiences="experiences"></ExperiencesList>
  </main>
</template>

<script>
import axios from 'axios';
import FilterForCompany from '../components/FilterForCompany.vue';
import ExperiencesList from '../components/ExperiencesList.vue';
import AddInterviewExperienceModal from '../components/AddInterviewExperienceModal.vue';

export default {
  name: 'InterviewExperiences',
  components: {
    FilterForCompany,
    ExperiencesList,
    AddInterviewExperienceModal,
  },
  data() {
    return {
      searchCriteria: {},
      experiences: [],
      displayAddInterviewExperience: false,
    };
  },
  created() {
    this.fetchInterviewExpereinces();
  },
  watch: {
    searchCriteria: 'fetchInterviewExpereinces',
  },
  methods: {
    setSearchCriteria(searchCriteria) {
      this.searchCriteria = searchCriteria;
    },
    async fetchInterviewExpereinces() {
      console.log(this.searchCriteria);
      try {
        const res = await axios.get('http://127.0.0.1:8000/api/experience', {
          headers: {
            'x-uid': 'test-value',
            'x-univ-id': '7bOGvj1uUZg5pRJziNVi',
            Authorization: 'record-1 7ff614a2-aa8a-4d1b-997e-fcb7877e91f6',
          },
        });
        this.experiences = [];
        for (let i = 0; i < res.data.length; i += 1) {
          this.experiences.push({
            id: res.data[i].id,
            role: res.data[i].role,
            result: 'Accepted',
            on: new Date(res.data[i].createdAt.seconds * 1000).toLocaleDateString(),
            data: res.data[i].summary,
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
