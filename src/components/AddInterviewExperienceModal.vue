<template>
  <div class="container-fluid d-flex p-2 justify-content-center">
    <CButton class="button" @click="onClick()">ADD YOUR EXPERIENCE</CButton>
  </div>
  <CModal
    alignment="center"
    :visible="visibleVerticallyCenteredDemo"
    @close="
      () => {
        visibleVerticallyCenteredDemo = false;
      }
    "
  >
    <CModalHeader>
      <CModalTitle>Submit Your Experience</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <AddInterviewExperience />
    </CModalBody>
    <CModalFooter>
      <CButton
        color="primary  "
        @click="
          () => {
            visibleVerticallyCenteredDemo = false;
          }
        "
      >
        Close
      </CButton>
    </CModalFooter>
  </CModal>
</template>
<script>
import {
  CModal,
  CButton,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
} from '@coreui/vue';
import AddInterviewExperience from './AddInterviewExperience.vue';

export default {
  name: 'AddInterviewExperienceModal',
  components: {
    CModal,
    CButton,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    AddInterviewExperience,
  },
  data() {
    return {
      visibleVerticallyCenteredDemo: false,
    };
  },
  methods: {
    onClick() {
      this.visibleVerticallyCenteredDemo = true;
      this.$emit('reload-experiences');
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  background-color: var(--light-grey);
  border-style :groove;
}
</style>
