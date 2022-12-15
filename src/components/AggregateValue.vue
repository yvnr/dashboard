<template>
  <CWidgetStatsF :color="selectColor(aggregateValue.text)">
    <template #title>
      {{ aggregateValue.text }}
    </template>
    <template #value>
      {{ aggregateValue.value }}
    </template>
    <template #icon>
      <span class="material-symbols-outlined">
        {{ selectIcon(aggregateValue.text) }}
      </span>
    </template>
  </CWidgetStatsF>
</template>

<script>
import { CWidgetStatsF } from '@coreui/vue';

export default {
  name: 'AggregateValue',
  props: {
    /**
     * Value of the current aggregate metric.
     */
    aggregateValue: Object,
  },
  components: {
    CWidgetStatsF,
  },
  methods: {
    /**
     * Gets called the dom is loaded
     * selects an material-ui-icon based on input text
     * @param text aggregate value type
     * @return material-ui-icon symbol
     */
    selectIcon(text) {
      if (text === 'Offers') {
        return 'check_circle';
      }
      if (text === 'Applications In Progress') {
        return 'pending';
      }
      return 'functions';
    },
    /**
     * Gets called the dom is loaded
     * selects an color based on input text
     * @param text aggregate value type
     * @return color value
     */
    selectColor(text) {
      if (text === 'Offers') {
        return 'success';
      }
      if (text === 'Applications In Progress') {
        return 'info';
      }
      return 'primary';
    },
  },
};
</script>

<style scoped>
.material-symbols-outlined {
  font-variation-settings: "FILL" 0, "wght" 700, "GRAD" 200, "opsz" 48;
  padding: 0rem;
}
</style>
