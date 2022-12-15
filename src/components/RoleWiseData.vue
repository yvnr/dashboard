<template>
  <div class="container-fluid">
    <!-- Need to add toggle for this titile also check how to handle prefix search-->
    <h4 v-show="false">Showing Results for:</h4>
    <h3 v-show="false">
      {{ this.company }}
    </h3>
    <table v-if="filteredData.length" class="container-fluid">
      <thead>
        <tr>
          <th
            :key="key"
            v-for="key in gridColumns"
            @click="sortBy(key)"
            :class="{ active: sortKey == key }"
          >
            {{ capitalize(key) }}
            <span class="arrow" :class="sortOrders[key] > 0 ? 'asc' : 'dsc'">
            </span>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr :key="entry" v-for="entry in filteredData">
          <td :key="key" v-for="key in gridColumns">
            {{ entry[key] }}
          </td>
        </tr>
      </tbody>
    </table>
    <p v-else>No matches found.</p>
  </div>
</template>

<script>
export default {
  name: 'RoleWiseData',
  props: {
    /**
     * The name of the company.
     */
    company: String,
  },
  data() {
    return {
      /**
       * Table column headers.
       */
      gridColumns: [
        'Position',
        'Applied',
        'Assessment',
        'Interview',
        'Accepted',
        'Rejected',
      ],
      /**
       * Table rows.
       */
      gridData: [],
      /**
       * Column on which the table is currently sorted.
       */
      sortKey: '',
      /**
       * Sorted order of the data in the table.
       */
      sortOrders: {},
    };
  },
  created() {
    this.fetch();
    this.computeSortedOrder();
  },
  computed: {
    /**
     * Gets called when the user click on the sort arrow.
     * @return sorted table data
     */
    filteredData() {
      const { sortKey } = this;
      const order = this.sortOrders[sortKey] || 1;
      let data = this.gridData;
      if (sortKey) {
        data = data.slice().sort((a, b) => {
          const x = a[sortKey];
          const y = b[sortKey];
          const t1 = x > y ? 1 : -1;
          return (x === y ? 0 : t1) * order;
        });
      }
      return data;
    },
  },
  methods: {
    /**
     * Gets called when the component is created.
     * Makes an API call to fetch the data
     */
    async fetch() {
      //   TODO Need to fetch this data from API
      this.gridData = [
        {
          Position: 'SDE-1',
          Applied: '100',
          Assessment: '40',
          Interview: '20',
          Accepted: '5',
          Rejected: '25',
        },
        {
          Position: 'SDE-11',
          Applied: '10',
          Assessment: '40',
          Interview: '20',
          Accepted: '5',
          Rejected: '25',
        },
        {
          Position: 'SDE-111',
          Applied: '100',
          Assessment: '40',
          Interview: '20',
          Accepted: '5',
          Rejected: '25',
        },
        {
          Position: 'Program Analyst',
          Applied: '100',
          Assessment: '40',
          Interview: '20',
          Accepted: '5',
          Rejected: '25',
        },
        {
          Position: 'Business Intelligence Manager',
          Applied: '100',
          Assessment: '40',
          Interview: '20',
          Accepted: '5',
          Rejected: '25',
        },
        {
          Position: 'Operations Manager',
          Applied: '100',
          Assessment: '40',
          Interview: '20',
          Accepted: '5',
          Rejected: '25',
        },
        {
          Position: 'HR Manager',
          Applied: '100',
          Assessment: '40',
          Interview: '20',
          Accepted: '5',
          Rejected: '25',
        },
        {
          Position: 'Diector',
          Applied: '100',
          Assessment: '40',
          Interview: '20',
          Accepted: '5',
          Rejected: '25',
        },
      ];
    },
    /**
     * Gets called when the component is created.
     * Computes ascending order of each column.
     */
    computeSortedOrder() {
      this.sortOrders = this.gridColumns.reduce(
        (o, key) => ((o[key] = 1), o),
        {},
      );
    },
    /**
     * Sort the table data based on given column name.
     * @param key column name on which the table is sorted
     */
    sortBy(key) {
      this.sortKey = key;
      this.sortOrders[key] *= -1;
    },
    /**
     * Capitalizes the given string.
     * @param str string to be capitalized
     * @return capitilazied string
     */
    capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    },
  },
};
</script>

<style scoped>
table {
  border: 2px solid #50ad72;
  border-radius: 3px;
  background-color: #f1f5f9;
  border-collapse: separate;
  left: 0;
  right: 0;
}

th {
  background-color: #50ad72;
  color: #f1f5f9;
  cursor: pointer;
  user-select: none;
}

td {
  background-color: #e7e8e9;
}

th,
td {
  min-width: 120px;
  padding: 10px 20px;
}

th.active {
  color: #f1f5f9;
}

th.active .arrow {
  opacity: 1;
}

.arrow {
  display: inline-block;
  vertical-align: middle;
  width: 0;
  height: 0;
  margin-left: 5px;
  opacity: 0.66;
}

.arrow.asc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-bottom: 4px solid #f1f5f9;
}

.arrow.dsc {
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 4px solid #f1f5f9;
}
</style>
