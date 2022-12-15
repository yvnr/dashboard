<template>
  <div class="container-fluid d-flex p-2 justify-content-center">
    <CButton class="button" @click="onClick()">ADD APPLICATION</CButton>
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
      <CModalTitle>Add Your Application</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <AddJobApplication />
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
import AddJobApplication from './AddJobApplication.vue';

export default {
  name: 'AddJobApplicationModal',
  components: {
    CModal,
    CButton,
    CModalHeader,
    CModalTitle,
    CModalBody,
    CModalFooter,
    AddJobApplication,
  },
  data() {
    return {
      visibleVerticallyCenteredDemo: false,
    };
  },
  methods: {
    onClick() {
      this.visibleVerticallyCenteredDemo = true;
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  background-color: var(--light-grey);
  border-style: groove;
}
</style>
