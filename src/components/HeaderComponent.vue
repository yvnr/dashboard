<template>
    <CHeader position="fixed">
      <CHeaderBrand><b>Campus Job Board</b></CHeaderBrand>
    </CHeader>
</template>

<script>
import {
  CHeader, CHeaderBrand,
} from '@coreui/vue';

export default {
  data() {
    return {
      visible: true,
    };
  },
  components: {
    CHeader, CHeaderBrand,
  },
};
</script>

<style lang="scss" scoped>
div {
background-color: var(--light-grey);
color: var(--dark);
margin-top: 0rem;
}
</style>
