<template>
  <CWidgetStatsF :color="selectColor(aggregateValue.text)">
    <template #title>
      {{ aggregateValue.text }}
    </template>
    <template #value>
      {{ aggregateValue.value }}
    </template>
    <template #icon
      ><CIcon :icon="selectIcon(aggregateValue.text)" size="xxl" height="36" />
    </template>
  </CWidgetStatsF>
</template>

<script>
import { CWidgetStatsF } from '@coreui/vue';
import { CIcon } from '@coreui/icons-vue';
import * as icon from '@coreui/icons';

export default {
  name: 'AggregateValue',
  props: {
    aggregateValue: Object,
  },
  components: {
    CIcon,
    CWidgetStatsF,
  },
  setup() {
    return {
      icon,
    };
  },
  methods: {
    selectIcon(text) {
      if (text === 'Offers') {
        return icon.cilCheck;
      }
      return icon.cilSettings;
    },
    selectColor(text) {
      if (text === 'Offers') {
        return 'success';
      } if (text === 'Applications In Progress') {
        return 'info';
      }
      return 'primary';
    },
  },
};
</script>
