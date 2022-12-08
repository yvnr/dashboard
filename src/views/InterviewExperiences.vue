<template>
  <main id="interviewExperiences">
    <h1>Here, You Can Search for others Interview Experiences</h1>
    <FilterForCompany
      @filtered-on-company="fetchInterviewExpereinces"
    ></FilterForCompany>
    <ExperiencesList :experiences="experiences"></ExperiencesList>
  </main>
</template>

<script>
import FilterForCompany from '../components/FilterForCompany.vue';
import ExperiencesList from '../components/ExperiencesList.vue';

export default {
  name: 'InterviewExperiences',
  components: {
    FilterForCompany,
    ExperiencesList,
  },
  data() {
    return {
      experiences: [
        {
          id: 1,
          role: 'SDE-I',
          result: 'Accepted',
          on: '12/06/2022',
          data: 'Round 1 : Technical Interview (1 hr)\n1. This round was outsourced by intervue.io\n2. Basic DSA question\n\nRound 2: System Design Round(1 hr)\n1. This round was taken by Lokal engineering manager\n2. Design a project similar to OLX\n* Areas to discuss\n\nAfter 15 mins rejection mail received.\nPS - Common question was what is your notice period :|',
        },
        {
          id: 2,
          role: 'SDE-II',
          result: 'Accepted',
          on: '12/06/2022',
          data: 'Round 1 : Technical Interview (1 hr)\n1. This round was outsourced by intervue.io\n2. Basic DSA question\n\nRound 2: System Design Round(1 hr)\n1. This round was taken by Lokal engineering manager\n2. Design a project similar to OLX\n* Areas to discuss\n\nAfter 15 mins rejection mail received.\nPS - Common question was what is your notice period :|',
        },
        {
          id: 3,
          role: 'Lead Software Engineer',
          result: 'Rejected',
          on: '12/06/2022',
          data: 'Round 1 : Technical Interview (1 hr)\n1. This round was outsourced by intervue.io\n2. Basic DSA question\n\nRound 2: System Design Round(1 hr)\n1. This round was taken by Lokal engineering manager\n2. Design a project similar to OLX\n* Areas to discuss\n\nAfter 15 mins rejection mail received.\nPS - Common question was what is your notice period :|',
        },
      ],
    };
  },
  methods: {
    fetchInterviewExpereinces(searchCriteria) {
      console.log(searchCriteria);
      // TODO: Fetch this data from API
      this.experiences = [
        {
          id: 2,
          role: 'Prgram Manager',
          result: 'Accepted',
          on: '12/06/2022',
          data: 'Round 1 : Technical Interview (1 hr)\n1. This round was outsourced by intervue.io\n2. Basic DSA question\n\nRound 2: System Design Round(1 hr)\n1. This round was taken by Lokal engineering manager\n2. Design a project similar to OLX\n* Areas to discuss\n\nAfter 15 mins rejection mail received.\nPS - Common question was what is your notice period :|',
        },
        {
          id: 3,
          role: 'Supply Chain Manager',
          result: 'Accepted',
          on: '12/06/2022',
          data: 'Round 1 : Technical Interview (1 hr)\n1. This round was outsourced by intervue.io\n2. Basic DSA question\n\nRound 2: System Design Round(1 hr)\n1. This round was taken by Lokal engineering manager\n2. Design a project similar to OLX\n* Areas to discuss\n\nAfter 15 mins rejection mail received.\nPS - Common question was what is your notice period :|',
        },
        {
          id: 4,
          role: 'Marketing Director',
          result: 'Rejected',
          on: '12/06/2022',
          data: 'Round 1 : Technical Interview (1 hr)\n1. This round was outsourced by intervue.io\n2. Basic DSA question\n\nRound 2: System Design Round(1 hr)\n1. This round was taken by Lokal engineering manager\n2. Design a project similar to OLX\n* Areas to discuss\n\nAfter 15 mins rejection mail received.\nPS - Common question was what is your notice period :|',
        },
      ];
    },
  },
};
</script>
