<template>
  <div style="padding-top: 10px">
    <CContainer fluid>
      <CRow>
        <CCol
          :key="aggregateValue.id"
          v-for="aggregateValue in aggregateValues"
        >
          <AggregateValue :aggregateValue="aggregateValue"></AggregateValue>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import {
  CContainer, CRow, CCol,
} from '@coreui/vue';
import * as icon from '@coreui/icons';
import AggregateValue from './AggregateValue.vue';

export default {
  name: 'AggregateValueList',
  props: {
    aggregateValues: Array,
  },
  components: {
    AggregateValue,
    CContainer,
    CRow,
    CCol,
  },
  setup() {
    return {
      icon,
    };
  },
};
</script>

<style scoped>
</style>
