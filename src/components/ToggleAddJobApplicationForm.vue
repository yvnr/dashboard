<template>
  <div class="container-fluid d-flex p-2 justify-content-center">
    <div class="button" v-show="displayToggleButton">
      <button @click="onClick()">ADD APPLICATION</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToggleAddJobApplicationForm',
  props: {
    displayToggleButton: Boolean,
  },
  methods: {
    onClick() {
      this.$emit('toggle-add-job-application-form');
    },
  },
};
</script>

<style scoped>
button {
  align-items: center;
  padding: 3px 7px;
  margin-top: 0.2rem;
  border-style :groove;
}
</style>

<style lang="scss" scoped>
  .button {
    border-color: var(--grey);
  }
</style>
