<template>
  <div class="container-fluid d-flex p-2 justify-content-center">
    <button @click="onClick()">ADD JOB APPLICATION</button>
  </div>
</template>

<script>
export default {
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
  justify-content: space-between;
  padding: 3px 7px;
}
</style>
