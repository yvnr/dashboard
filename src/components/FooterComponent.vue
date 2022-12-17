<template>
  <CFooter position="fixed">
    <div>
      <span
        ><b><h5>CS520</h5></b></span
      >
    </div>
    <div>
      <span
        ><u><i>The Makers</i></u></span
      >
    </div>
  </CFooter>
</template>

<script>
import { CFooter } from '@coreui/vue';

export default {
  components: {
    CFooter,
  },
};
</script>

<style lang="scss" scoped>
div {
  background-color: var(--light-grey);
  color: var(--dark);
  margin-top: 0.5rem;
}
</style>
