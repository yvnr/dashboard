<template>
  <div container-fluid>
    <CAccordion always-open>
      <div :key="experience.id" v-for="experience in experiences">
        <Experience :experience="experience"></Experience>
      </div>
    </CAccordion>
  </div>
</template>

<script>
import Experience from "./Experience.vue";
import {
  CAccordion,
  CAccordionItem,
  CAccordionHeader,
  CAccordionBody,
} from "@coreui/vue";

export default {
  name: "ExperiencesList",
  setup() {},
  props: {
    experiences: Array,
  },
  components: {
    Experience,
    CAccordion,
    CAccordionItem,
    CAccordionHeader,
    CAccordionBody,
  },
};
</script>

<style scoped>
</style>