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
import AggregateValue from "./AggregateValue.vue";
import { CContainer, CRow, CCol, CWidgetStatsF } from "@coreui/vue";
import { CIcon } from "@coreui/icons-vue";
import * as icon from "@coreui/icons";

export default {
  name: "AggregateValueList",
  props: {
    aggregateValues: Array,
  },
  components: {
    AggregateValue,
    CIcon,
    CContainer,
    CRow,
    CCol,
    CWidgetStatsF,
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